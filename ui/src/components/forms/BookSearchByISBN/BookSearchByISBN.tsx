
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
	const [apiError, setAPIError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [displayErrorObject, setDisplayErrorObject] = useState<isbnValidationModel>({
        numberError: "",
        lengthError: "",
        prefixError: "",
  })
  
  const validateForm = (isbnInput: string): isbnValidationModel => {
      const formErrors: isbnValidationModel = {
        numberError: "",
        lengthError: "",
        prefixError: "",
      };

    if (isNaN(Number(isbnInput))) {
      formErrors.numberError = 
        "Invalid input. ISBNs must be 10 or 13 numerical characters only.";
      console.log("Set isNan error");
    };

    if (!isCorrectLength(isbnInput)) {
      formErrors.lengthError = 
        `Invalid ISBN length of ${isbnInput.length}. ISBNs must be 10 or 13 numerical characters long.`;
      console.log("Set incorrect length error");
    }
      
    if (isbnInput.length == 13 && !isValidISBNPrefix(isbnInput)) {
      formErrors.prefixError = 
      "Invalid ISBN-13. ISBN-13s must be prefixed with '978' or '979'";
      console.log("Set invalid prefix error");
    }
    console.log(`Form errors function. Validation check: Length: ${formErrors.lengthError}, Prefix error ${formErrors.prefixError}, non-number error ${formErrors.numberError}`);
    return formErrors;
    }

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
    setAPIError("");
    setResponseData(null);
    setDisplayErrorObject({
      numberError: "",
      lengthError: "",
      prefixError: "",
    })
    const { name, value } = event.target;
    console.log(`Name: ${name}, Trimmed Value: ${value}`);

    setFormData(formData => ({...formData, [name]: value}));
	};
  
	const handleSubmit = async (
    event: React.FormEvent
	): Promise<void> => {
    event.preventDefault();
    const formErrorsObject = validateForm(formData.isbn);

    console.log(`HandleSubmit form log out: Form errors function. Validation check: Length:
       ${formErrorsObject.lengthError}, Prefix error ${formErrorsObject.prefixError}, 
       non-number error ${formErrorsObject.numberError}`);
    const formIsInvalid = Object.values(formErrorsObject).some((errorValue) => errorValue.length > 0);
    console.log(`Has Form Errors state is: ${formIsInvalid}`); 

    if (formIsInvalid) {
      setDisplayErrorObject(formErrorsObject);
      console.log(`Length error ${displayErrorObject.lengthError.length}`)
      console.log(`Prefix error ${displayErrorObject.prefixError}`)
      return;
    } 
    setLoading(true);
    try {
      const response = await openLibrarySearchISBNAPI(formData.isbn);
      setResponseData(response);
      setAPIError("");
    } catch (error: unknown
    ) {
      if (error instanceof Error)
      setAPIError(
        `${error.message}`
      )
      else 
        setAPIError("An error has occurred. Please contact the administrator.");
    } finally {
      setLoading(false);
    }
  };

  const noQueryString = "No search parameters given"
  const queryDisplay = Object
    .entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const errorDisplay = ({displayErrorObject} : 
    {displayErrorObject: isbnValidationModel}) : ReactNode => {
    const items = Object.entries(displayErrorObject)
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
              value={formData.isbn.trim()}
              onChange={handleChange}
              minLength={10}
              maxLength={13}
            >
            </input>
            {Object.entries(displayErrorObject)
              .some(([_, value]) => value.length > 0) && 
              errorDisplay({displayErrorObject})}
					</div>
					<button type="submit">Search</button>
				</form>
        <div className="results-wrapper">
          {loading && 
            (<RotatingLines visible={true} width="50" />
            )
          }
          {apiError.length > 0 && (<p>{apiError}</p>)}
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
