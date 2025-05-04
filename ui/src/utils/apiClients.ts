import { bookSearchParameters } from "../models/bookModels";
import { keyToQuery } from "./queryFilter";

export const openLibrarySearchAPI = async (
  formData: bookSearchParameters,
) => {
  const queryParameters = new URLSearchParams();

  const regex = /\s/g;
  
  if (formData.keywords.length > 0) {
    const tokenToAppend = keyToQuery(regex, formData.keywords);
    queryParameters.append("q", tokenToAppend);
  }
  if (formData.authorName.length > 0) {
    const tokenToAppend = keyToQuery(regex, formData.authorName);
    queryParameters.append("author", tokenToAppend);
  }

  // if (formData.title.length > 0) {
  //   queryParameters.append("title", formData.keywords)
  // }

  console.log(`Query param = ${queryParameters.toString()}`)

  const response = await fetch(
    `${import.meta.env.VITE_OPEN_LIBRARY_SEARCH_API}?${queryParameters.toString()}&sort=new`
  );

  if (!response.ok) {
    console.log(`Error: ${response}`)
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}