import { bookSearchParameters } from "../models/searchParameterModels";

export const filteredQueries = (searchParameters: bookSearchParameters) => {
  return Object.entries(searchParameters).filter(
    ([_, value]) => typeof value === "string" && value.length > 0
  );
};

export const keyToQuery = (regex: RegExp, valueString: string) => {
  const tokenToAppend = valueString.replace(regex, "+")
  return tokenToAppend;
}