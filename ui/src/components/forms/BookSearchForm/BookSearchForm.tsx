import { useState } from "react";
import { bookSearchParameters } from "../../../models/bookModels";
import { openLibrarySearchAPI } from "../../../utils/apiClients";

function BookSearchForm() {
	const [formData, setFormData] = useState<bookSearchParameters>({
    keywords: "",
    authorName: "",
    title: "",
    isbn: "",
    language: ""
    });
	
	const [error, setError] = useState("");

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFormData({...formData, [name]: value})
	};

	const handleSubmit = async (
		event: React.FormEvent
	): Promise<void> => {
		event.preventDefault()
		try {
			const response = await openLibrarySearchAPI(formData);
		}
		catch (error: unknown
		) {
			if (error instanceof Error)
			setError(
				`${error.message}`
			)
			else 
				setError("An error has occurred. Please contact the administrator.");
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
							Search by keyword:
						</label>
						<input type="text" name="author-name" value={formData.authorName}></input>
					</div>
					<div className="field">
						<label htmlFor="title">
							Search by keyword:
						</label>
						<input type="text" name="title" value={formData.title}></input>
					</div>
					<div className="field">
						<label htmlFor="isbn">
							Search by keyword:
						</label>
						<input type="text" name="isbn" value={formData.isbn}></input>
					</div>
					<div className="field">
						<label htmlFor="language">
							Search by keyword:
						</label>
						<input type="text" name="language" value={formData.language}></input>
					</div>
					<button type="submit">Search</button>
				</form>
			</div>
			{error.length > 0 && (<div>{error}</div>)}
		</>
	)

}

export default BookSearchForm;
