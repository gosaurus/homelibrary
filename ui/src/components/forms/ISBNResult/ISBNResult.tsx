import { openLibraryBookObject, openLibraryInterface } from "../../../models/apiModels";
import { openLibraryDocument } from "../../../models/apiModels";
import { CoverResult } from "../CoverResult/CoverResult";


export interface ISBNResultsProps {
  responseObject: openLibraryBookObject,
  availableISBN: string
  }

export function ISBNResult ( 
{ responseObject, availableISBN }: ISBNResultsProps) {

  const list = (listValues: openLibraryInterface[]) =>  {
    console.log(`listValues: ${listValues}`);
    return listValues?.map((object) => 
      object.key
    )
  };

  const bookItem = (
    <div key={responseObject.key} className="result">
      <div className="resultTitle">
        <h3 className="resultTitleHeader">
          {responseObject.title}
        </h3>
      </div> 
      <div className="resultDetail">
        <p>Authors key(s): {list(responseObject.authors)}</p>
        <p>Authors key(s): {responseObject.contributions?.join(", ")}</p>
        <p>Published: {responseObject.publish_date}</p>
        <p>Publishers: {responseObject.publishers}</p>
        <p>Languages available: {list(responseObject.languages).map((valueObject) => 
          valueObject.substring(10)
        )}</p>
        <p>Number of pages: {responseObject.number_of_pages}</p>
        <p>ISBN-10: {responseObject.isbn_10.join(", ")}</p>
        <p>ISBN-13: {responseObject.isbn_13.join(", ")}</p>
      </div>
    </div>
  )
  
  return (
    <>
      <div className="results-container">
        {bookItem}

        {/* <CoverResult coverIdentifier={availableISBN}/> */}
      </div>
    </>
  )
};