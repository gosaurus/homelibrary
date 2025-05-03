import { ResultsProps } from "../../../models/apiModels";
import { openLibraryDocument } from "../../../models/apiModels";

export function BookSearchResultsTable({ queryProps, responseProps }: ResultsProps) {
 
  // const authorList = responseProps.docs.map((doc: openLibraryDocument) =>
  //   doc.author_name.forEach((author: string) => 
    
  //   )
  // )

  const docListItem = responseProps.docs.map((doc: openLibraryDocument) => 
    <div key={doc.key}>
      <div className="resultTitle">
        <h3>
          {doc.title}
        </h3>
      </div> 
      <div className="resultDetail">
        <p>Author(s): {doc.author_name}</p>
        <p>First published: {doc.first_publish_year}</p>
        <p>Number of editions available: {doc.edition_count}</p>
        <p>Languages available: {doc.language}</p>
      </div>   
    </div>
  )

  return (
    <>
      <p>You searched for "{queryProps.authorName}"</p>.
      <p>Number of results: {responseProps.num_found}</p>
      <div className="results-container">
        {docListItem}
      </div>
    </>
  )
};