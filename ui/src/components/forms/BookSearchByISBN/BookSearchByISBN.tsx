
import { useState } from "react";
import { bookSearchParameters } from "../../../models/bookModels";
import { openLibrarySearchAPI } from "../../../utils/apiClients";
import { BookSearchResults} from "../BookSearchResults/BookSearchResults";
import { RotatingLines } from "react-loader-spinner";

function BookSearchByISBN() {
	const [formData, setFormData] = useState<bookSearchParameters>({
    keywords: "",
    authorName: "",
    title: "",
    isbn: "",
    language: ""
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
			const response = await openLibrarySearchAPI(formData);
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
				<h2>Book Search Form</h2>
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
            (<BookSearchResults
              responseProps={responseData}
              queryProps={formData} 
            />)
          }
        </div>
			</div>
		</>
	)

}

export default BookSearchByISBN;
