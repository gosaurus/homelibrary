import { bookSearchParameters } from "../models/bookModels"
export const openLibrarySearchAPI = async (
  formData: bookSearchParameters,
) => {
  const queryParameters = new URLSearchParams();

//   if (formData.keywords.length > 0) {
//     queryParameters.append("q", formData.keywords)
//   }
  const regex = /\s/g;

  if (formData.authorName.length > 0) {
    const newAuthorString = formData.authorName.replace(regex, "+")
    queryParameters.append("author", newAuthorString);
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