import { bookSearchParameters } from "../models/bookModels"
export const openLibrarySearchAPI = async (
  formData: bookSearchParameters,
) => {
  const queryParameters = new URLSearchParams();

  if (formData.keywords.length > 0) {
    queryParameters.append("q", formData.keywords)
  }

  if (formData.authorName.length > 0) {
    queryParameters.append("author", formData.keywords)
  }

  console.log(`Query param = ${queryParameters.toString()}`)

  const response = await fetch(
    `${import.meta.env.VITE_OPEN_LIBRARY_SEARCH_API}?${queryParameters.toString()}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}