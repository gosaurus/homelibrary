
import { ReactNode, useState } from "react";
import { bookSearchParameters, isbnValidationModel } from "../../../models/formModels";
import { openLibrarySearchISBNAPI } from "../../../utils/apiClients";
import { ISBNResult } from "../ISBNResult/ISBNResult";
import { RotatingLines } from "react-loader-spinner";
import { isValidISBNPrefix, isCorrectLength } from "../../../utils/formValidation";

function BookSearchByISBN() {
	const [formData, setFormData] = useState<bookSearchParameters>({
    keywords: "",
    authorName: "",
    title: "",
    isbn: "",
    });
	
  const [responseData, setResponseData] = useState(null);
	const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrorMessage, setFormErrorMessage] = useState("")
  const [availableISBN, setAvailableISBN] = useState(null);

  const [formErrors, setFormErrors] = useState<isbnValidationModel>({
    numberError: "",
    lengthError: "",
    prefixError: "",
  });

  const validateForm = ({formErrors} : {formErrors: isbnValidationModel}) => {
    let valid = true;
    Object.values(formErrors).forEach((errorValue:any) => {
      if (errorValue.length > 0) 
        valid = false;
    });
    return valid;
    }

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
    setError("");
    setLoading(false);
    setResponseData(null);
    const { name, value } = event.target;
    console.log(`Name: ${name}, Value: ${value}`);

    if (isNaN(Number(value))) {
      setFormErrors({...formErrors, numberError: "Invalid input. ISBNs must be 10 or 13 numerical characters only."});
      console.log("Set isNan error");
    }
    if (!isCorrectLength(value)) {
      setFormErrors({...formErrors, lengthError: `Invalid ISBN length ${value.length}. ISBNs must be 10 or 13 numerical characters long.`});
      console.log("Set incorrect length error");
    }
    if (!isValidISBNPrefix) {
      setFormErrors({...formErrors, prefixError: "Invalid ISBN-13. ISBN-13s must be prefixed with '978' or '979'"})
      console.log("Set invalid isbn error");
    }
    setFormData({...formData, [name]: value});
	};
  
	const handleSubmit = async (
    event: React.FormEvent
	): Promise<void> => {
    event.preventDefault();
    setResponseData(null);
    
    if (!validateForm({formErrors})) {
      setFormErrorMessage("Invalid form input.")
    } 
    else {
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
    }
	};

  const noQueryString = "No search parameters given"
  const queryDisplay = Object
    .entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const errorDisplay = ({formErrors} : {formErrors: isbnValidationModel}) : ReactNode => {
    const items = Object.entries(formErrors)
      .filter(([_, value]) => value.length > 0)
      .map(([k, value]) => <li key={k}>{value}</li>);
      return (items.length > 0 ? <ul>{items}</ul> : null) 
  };
  
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
            {formErrorMessage && 
              errorDisplay({formErrors})}
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
            <ISBNResult
              responseObject={responseData}
              availableISBN={formData.isbn}
            />
          }
        </div>
			</div>
		</>
	)

}

export default BookSearchByISBN;
