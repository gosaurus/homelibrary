import { useState } from "react";
import BookSearchForm from "../../forms/BookSearchForm/BookSearchForm";
import { bookSearchParameters } from "../../../models/bookModels";
import BookSearchByISBN from "../../forms/BookSearchByISBN/BookSearchByISBN";

export const BookSearchPage = () => {

  const [radioValue, setRadioValue] = useState("");
  const handleFormSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value);
    console.log(`Search selection`)
  }

  return (
    <div>
      <form>
        <fieldset>
          <legend>Select the book search form</legend>
          <input 
            type="radio" 
            id="keywordSearch"
            name="searchSelection"
            value="keyword"
            checked={radioValue==="keyword"}
            onChange={handleFormSelection} 
          />
          <label htmlFor="keywordSearch">Keyword</label>
          <input 
            type="radio" 
            id="authorNameSearch"
            name="searchSelection"
            value="authorName"
            checked={radioValue==="authorName"}
            onChange={handleFormSelection} 
          />
          <label htmlFor="authorNameSearch">Author</label>
          <input 
            type="radio" 
            id="titleSearch"
            name="searchSelection"
            value="title"
            checked={radioValue==="title"}
            onChange={handleFormSelection} 
          />
          <label htmlFor="titleSearch">Title</label>
          <input 
            type="radio" 
            id="isbnSearch"
            name="searchSelection"
            value="isbn"
            checked={radioValue==="isbn"}
            onChange={handleFormSelection} 
          />
          <label htmlFor="isbnSearch">ISBN</label>
        </fieldset>
      </form>
      {(radioValue === "keyword" || radioValue === "title") && <BookSearchForm />}
      {radioValue === "author" && <p>Author search form</p>}
      {radioValue === "isbn" && <BookSearchByISBN />}

      {/* <p>Refactor radio button form as component and pass in onChange handler as function?</p> */}

    </div>
  )
};