import { bookSearchParameters } from "../models/formModels";
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
  if (formData.title.length > 0) {
    const tokenToAppend = keyToQuery(regex, formData.title);
    queryParameters.append("title", tokenToAppend);
  }

  const response = await fetch(
    `${import.meta.env.VITE_OPEN_LIBRARY_SEARCH_API}?${queryParameters.toString()}&sort=new`
  );
  console.log(`response.status = ${response.status}`)
  if (response.status === 404) {
    console.log(`Error: ${response}`)
    throw new Error(`HTTP error ${response.status}. No matching ISBN found.`);
  }
  if (!response.ok && response.status != 404) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data = await response.json();
  return data;
}

export const openLibrarySearchISBNAPI= async (
  isbn: string
) => {
  const response = await fetch(
    import.meta.env.VITE_OPEN_LIBRARY_SEARCH_ISBN_API + "/" + isbn + ".json"
  );

  if (!response.ok) {
    console.log(`Error: ${response}`)
    throw new Error(`HTTP error. Status: ${response.status}`);
  };

  const data = await response.json();
  return data;
};