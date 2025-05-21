export function isCorrectLength(isbnString: string) : boolean {
  if (isbnString.length !== 13 && isbnString.length !== 10 )
    return false;
  return true;
};

export function isValidISBNPrefix(isbnString: string) : boolean {
  const prefix = isbnString.slice(0,3);
  console.log(prefix);
  if (prefix !== "978" && prefix !== "979") {
    console.log(`ISBN Prefix check: ${isbnString}`);
    return false;
  }
  return true;
};