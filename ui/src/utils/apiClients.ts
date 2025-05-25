import { bookSearchParameters } from "../models/formModels";
import { keyToQuery } from "./queryFilter";
import { options } from "./apiHeader";
import { openLibraryCoverObject } from "../models/apiModels";

export const openLibrarySearchAPI = async (
  options: { method: string, headers: Headers },
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
  if (response.status === 404) {
    console.log(`Error: ${response}`)
    throw new Error(`HTTP error ${response.status}. No matching book record found.`);
  }
  if (!response.ok && response.status != 404) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data = await response.json();
  return data;
}

export const openLibrarySearchISBNAPI = async (
  isbn: string
) => {
  const response = await fetch(
    import.meta.env.VITE_OPEN_LIBRARY_SEARCH_ISBN_API + "/" + isbn + ".json"
  );
  console.log("Doing isbn request...");
  if (response.status === 404) {
    throw new Error(`Uh oh! No matching ISBN found.`);
  }
  if (!response.ok && response.status !== 404) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  };

  const data = await response.json();
  return data;
};

export const openLibraryCoverAPI = async (
  options: { method: string, headers: Headers },
  openLibraryCoverIdentifier: openLibraryCoverObject
) => {
  const response = await fetch(
    import.meta.env.VITE_OPEN_LIBRARY_COVER_API + "/" +
    openLibraryCoverIdentifier.olidIdentifierType + "/" +
    openLibraryCoverIdentifier.olidIdentifier + "-M.jpg" +
    "?default=false" +
    options
  );
  //GET https://covers.openlibrary.org/b/isbn/0553812173-L.jpg
  console.log("Doing cover request...");
  if (response.status === 404) {
    throw new Error(`Uh oh! No matching cover found.`);
  }
  // if ((!response.ok || response.status !== 302) && response.status !== 404) {
  //   throw new Error(`HTTP error. Status: ${response.status}`);
  // };

  const blobData = await response.blob();
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/blob
  const objectUrl = URL.createObjectURL(blobData);
  console.log(`objectUrl ${objectUrl}`);
  return objectUrl;
}