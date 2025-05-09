export interface bookSearchParameters {
  keywords: string;
  authorName: string;
  title: string;
  isbn: string;
}

export interface isbnValidationModel {
  numberError: string,
  lengthError: string,
  prefixError: string,
}