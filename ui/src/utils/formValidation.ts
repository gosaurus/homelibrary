export function isCorrectLength(isbnString: string) : boolean {
  if (isbnString.length !== 13 || isbnString.length !== 10 )
    return false;
  return true;
};

export function isValidISBNPrefix(isbnString: string) : boolean {
  if (isbnString.slice(0,2) !== "978" || isbnString.slice(0,2) !== "979") 
    return false;
  return true;
};