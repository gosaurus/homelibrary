import { useState } from "react";
import { openLibraryCoverObject } from "../../../models/apiModels";
import { openLibraryCoverAPI } from "../../../utils/apiClients";
import { options } from "../../../utils/apiHeader";

export function CoverResult ({ coverIdentifier } : { coverIdentifier: string } //could this be a util to return URL for images?
) {

  // const [responseData, setResponseData] = useState(null);
  const [coverInfo, setCoverInfo] = useState<openLibraryCoverObject>({
    olidIdentifier: "",
    olidIdentifierType: null
  });
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState("");

  const coverIdentifierType = Number(coverIdentifier) ? "isbn" : "olid";

  
  const imageURL = (): string => {
        setCoverInfo(({
          olidIdentifier: coverIdentifier,
          olidIdentifierType: coverIdentifierType,
        }))
      return (import.meta.env.VITE_OPEN_LIBRARY_COVER_API + "/" +
      coverInfo.olidIdentifierType + "/" +
      coverInfo.olidIdentifier + "-M.jpg" + 
      "?default=false")
  };
  // const fetchCover = async (): Promise<void> => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const response = await openLibraryCoverAPI(options, coverInfo);
  //     setResponseData(response);
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       setError(`${error.message}`);
  //     }
  //     else
  //       setError("An Error has occured. Contact the administrator.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const coverImage = (
    <div className="cover-image">
      <img src={imageURL} />
    </div>
  )

  return (
    <>
    {coverImage}
    </>
  )
}