import { useState } from "react";
import { openLibraryCoverObject } from "../../../models/apiModels";
import { openLibraryCoverAPI } from "../../../utils/apiClients";
import { options } from "../../../utils/apiHeader";

export interface coverProps {
    olidIdentifier: string,
    olidIdentifierType: "isbn" | "olid" | null 
}

export function CoverResult (
  { coverPropObject } : { coverPropObject: coverProps} //could this be a util to return URL for images?
) {

  //deconstruction coverPropObject & call the API
  const coverInfo: openLibraryCoverObject = {
    olidIdentifier: coverIdentifier,
    olidIdentifierType: Number(coverIdentifier) ? "isbn" : "olid"
  } 

  const coverIdentifierType = Number(coverIdentifier) ? "isbn" : "olid";
  
  
  // todo! 

  return (
    <>
    <div className="cover-image">
      <img src={import.meta.env.VITE_OPEN_LIBRARY_COVER_API + "/" +
      coverInfo.olidIdentifierType + "/" +
      coverInfo.olidIdentifier + "-M.jpg" + 
      "?default=false"} />
    </div>
    {/* {loading && <p>Cover image loading</p>} */}
    </>
  )};