export interface openLibraryDocument {
    author_name: string[],
    key: string,
    title: string,
    first_publish_year: number,
    edition_count: number,
    language: string[]
}

export interface openLibraryCoverObject {
    olidIdentifier: string,
    olidIdentifierType: "olid" | "isbn" | null,
}

export interface openLibraryBookObject {
  title: string,
  authors: openLibraryInterface[],
  contributions: string[],
  publish_date: string,
  publishers: string[],
  languages: openLibraryInterface[]
  key: string,
  number_of_pages: number,
  works: openLibraryInterface[],
  isbn_10: string[],
  isbn_13: string[]
}

export interface openLibraryInterface {
  key: string,
}

export interface openLibraryLanguages {
  key: string,
}

export interface openLibraryWork {
  key: string,
}