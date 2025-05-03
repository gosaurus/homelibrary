import { bookSearchParameters } from "./bookModels";
export interface ResultsProps {
  queryProps: bookSearchParameters,
  responseProps: {
    q: string,
    num_found: number,
    docs: openLibraryDocument[],
  }
}

export interface openLibraryDocument {
    author_name: string[],
    key: string,
    title: string,
    first_publish_year: number,
    edition_count: number,
    language: string[]
}

export interface openLibraryCover {
    olid_key: string,
    size: "S" | "M" | "L",
}