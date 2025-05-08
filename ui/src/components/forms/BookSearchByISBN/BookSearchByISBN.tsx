
import { useState } from "react";
import { bookSearchParameters } from "../../../models/searchParameterModels";
import { openLibrarySearchISBNAPI } from "../../../utils/apiClients";
import { ISBNResult } from "../ISBNResult/ISBNResult";
import { RotatingLines } from "react-loader-spinner";
import { isValidISBN } from "../../../utils/formValidation";

function BookSearchByISBN() {
	const [formData, setFormData] = useState<bookSearchParameters>({
    keywords: "",
    authorName: "",
    title: "",
    isbn: "",
    });
	
  const [responseData, setResponseData] = useState();
	const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
    const { name, value } = event.target;
    console.log(`Name: ${name}, Value: ${value}`);
		setFormData({...formData, [name]: value})
	};


	const handleSubmit = async (
		event: React.FormEvent
	): Promise<void> => {
		event.preventDefault();
    setLoading(true);
		try {
			const response = await openLibrarySearchISBNAPI(formData.isbn);
      setResponseData(response);
      setError("");
		} catch (error: unknown
		) {
			if (error instanceof Error)
			setError(
				`${error.message}`
			)
			else 
				setError("An error has occurred. Contact the administrator.");
		} finally {
      setLoading(false);
    }
	};

  const noQueryString = "No search parameters given"
  const queryDisplay = Object
    .entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

	return (
		<>
			<div className="book-search-form-container">
				<p>
          ISBNs are unique numbers used to identify books.
          Input ISBNs with 10 or 13 characters below to search.
				</p>
				<form onSubmit={handleSubmit}>
          <div className="field">
						<label htmlFor="isbn">
							Search by ISBN:
						</label>
						<input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              minLength={10}
              maxLength={13}
            >
            </input>
					</div>
					<button type="submit">Search</button>
				</form>
        <div className="results-wrapper">
          {loading && 
            (<RotatingLines 
              visible={true}
              width="50"
            />)
          }
          {error.length > 0 && (<p>{error}</p>)}
          {(responseData && <p>Results for parameters: {queryDisplay}</p>) ||
            (responseData && noQueryString)}
          {responseData &&
            (<ISBNResult
              responseObject={responseData}
            />)
          }
        </div>
			</div>
		</>
	)

}

export default BookSearchByISBN;
