import { ResultsProps } from "../../../models/apiModels";
import { openLibraryDocument } from "../../../models/apiModels";

export function BookSearchResultsTable({ queryProps, responseProps }: ResultsProps) {

  const queryList = Object.entries(queryProps).filter(
    ([_, value]) => typeof value === "string" && value.length > 0
  );

  const queryDisplay = queryList.map(([key, value]) => `${key}: ${value}`).join(", ");
  const noQueryString = "No search parameters given"
  const docListItem = responseProps.docs.map((doc: openLibraryDocument, index: number) => 
    <div key={doc.key}>
      <div className="resultTitle">
        <h3>
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
      <p>You searched for: "{queryDisplay || noQueryString}".</p>
      <p>Number of results: {responseProps.num_found}</p>
      <div className="results-container">
        {docListItem}
      </div>
    </>
  )
};