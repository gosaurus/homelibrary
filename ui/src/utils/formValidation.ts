export function isValidISBN(isbnString: string) : string {
  if (Number.isNaN(isbnString)) {
    return "Invalid input. ISBNs must be numbers.";
  }
  if ((isbnString.slice(0,2) !== "978" ||
    isbnString.slice(0,2) !== "979") &&
    isbnString.length === 13) {
    return "Invalid input. Your ISBN must be prefixed with '978' or '979' ";
  }
  return "Hello"
}