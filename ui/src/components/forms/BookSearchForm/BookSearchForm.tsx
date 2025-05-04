import { useState } from "react";
import { bookSearchParameters } from "../../../models/bookModels";
import { openLibrarySearchAPI } from "../../../utils/apiClients";
import { BookSearchResultsTable } from "../BookSearchResultsTable/BookSearchResultsTable";

function BookSearchForm() {
	const [formData, setFormData] = useState<bookSearchParameters>({
    keywords: "",
    authorName: "",
    title: "",
    isbn: "",
    language: ""
    });
	
  const [responseData, setResponseData] = useState();

	const [error, setError] = useState("");

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
		event.preventDefault()
		try {
			const response = await openLibrarySearchAPI(formData);
      setResponseData(response);
		}
		catch (error: unknown
		) {
			if (error instanceof Error)
			setError(
				`${error.message}`
			)
			else 
				setError("An error has occurred. Contact the administrator.");
		}
	};


	return (
		<>
			<div className="book-search-form-container">
				<h2>Book Search Form</h2>
				<p>
					Input your search terms in the form below.
					At least one search field needs to be completed before you can submit
				</p>
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="keywords">
							Search by keyword:
						</label>
						<input 
							id="keywords"
							type="text"
							name="keywords"
							value={formData.keywords}
							onChange={handleChange}
							>
							</input>
					</div>
					<div className="field">
						<label htmlFor="author-name">
							Search by author:
						</label>
						<input
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
            >
            </input>
					</div>
					<div className="field">
						<label htmlFor="title">
							Search by title:
						</label>
						<input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            >
            </input>
					</div>
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
					<div className="field">
						<label htmlFor="language">
							Search by language:
						</label>
						<input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
            >
            </input>
					</div>
					<button type="submit">Search</button>
				</form>
        {error.length > 0 && (<div>{error}</div>)}
        {responseData &&
          (<BookSearchResultsTable
            responseProps={responseData}
            queryProps={formData} 
          />)
        }
			</div>
		</>
	)

}

export default BookSearchForm;
