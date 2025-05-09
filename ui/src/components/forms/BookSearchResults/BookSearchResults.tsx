import { openLibraryDocument } from "../../../models/apiModels";
import { bookSearchParameters } from "../../../models/formModels";
import "./BookSearchResults.scss";

export interface ResultsProps {
  queryProps: bookSearchParameters,
  responseProps: {
    q: string,
    num_found: number,
    docs: openLibraryDocument[],
  }
}
export function BookSearchResults({ responseProps }: ResultsProps) {

  const docListItem = responseProps.docs.map((doc: openLibraryDocument, index: number) => 
    <div key={doc.key} className="result">
      <div className="resultTitle">
        <h3 className="resultTitleHeader">
          No. {index+1} | {doc.title}
        </h3>
      </div> 
      <div className="resultDetail">
        <p>Author(s): {doc.author_name?.join(", ")}</p>
        <p>First published: {doc.first_publish_year}</p>
        <p>Number of editions available: {doc.edition_count}</p>
        <p>Languages available: {doc.language?.join(", ")}</p>
      </div>   
    </div>
  )

  return (
    <>
      <p>Number of results: {responseProps.num_found}</p>
      <div className="results-container">
        {docListItem}
      </div>
    </>
  )
};