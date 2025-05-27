import { useEffect, useState } from "react";
import { openLibraryCoverAPI } from "../../../utils/apiClients";
import { RotatingLines } from "react-loader-spinner";
import "../ISBNResult/ISBNResults.scss";

export interface coverProps {
    olidIdentifier: string,
    olidIdentifierType: "isbn" | "olid" | null 
}

export function CoverResult (
  { coverPropObject } : { coverPropObject: coverProps} //could this be a util to return URL for images?
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [responseUrl, setResponseUrl] = useState("");
  const [responseError, setResponseError] = useState("")
  
  useEffect(() => {
    const imageResponse = async (): Promise<void> => {
      setLoading(true);
      try {
        const responseUrlString = await openLibraryCoverAPI(coverPropObject); 
        setResponseUrl(responseUrlString);
      } catch (error: unknown) {
        if (error instanceof Error)
          setResponseError(`${error.message}`)
        else
          setResponseError("An error has occured. Please contact the administrator.")
      } finally {
        setLoading(false);
      }
    };
    imageResponse();
  }, []
  )
  
  const imageSource = "https://openlibrary.org/isbn/" + coverPropObject.olidIdentifier;

  return (
    <>
    {loading && 
      (<RotatingLines visible={true} width="50" />)
    }
    {responseUrl.length > 0 &&
    <div className="cover-image">
      <img src={responseUrl} />
      <p><a href={imageSource} target="">Image source</a></p>
    </div>
    }
    {responseError.length > 0 &&
      (<p>{responseError}</p>)
    }
    </>
  )};