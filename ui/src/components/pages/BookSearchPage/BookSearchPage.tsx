import { useState } from "react";
import BookSearchForm from "../../forms/BookSearchForm/BookSearchForm";
import { bookSearchParameters } from "../../../models/bookModels";
import BookSearchByISBN from "../../forms/BookSearchByISBN/BookSearchByISBN";
import { BookSearchFormSelection } from "../../forms/BookSearchFormSelection/BookSearchFormSelection";

export const BookSearchPage = () => {

  const [radioValue, setRadioValue] = useState("");
  const handleFormSelection = (selectedValue: string) => {
    setRadioValue(selectedValue);
    console.log(`Search selection`)
  }

  const formSelectionInstructions = () => (
    <>
    <p>This form uses the OpenLibrary API to search for books and retrieve bibliographic
      data. Choose how you want to search by selecting from the options below and filling
      in the necessary fields. 
    </p>
    <p>
      Tip: ISBN searches are the most accurate.
    </p>
    </>
  );

  return (
    <div>
      {formSelectionInstructions()}
      <BookSearchFormSelection 
        radioValue={radioValue} 
        onChangeFormSelection={handleFormSelection}
      />
      {(radioValue === "keyword" || radioValue === "title") && <BookSearchForm />}
      {radioValue === "author" && <p>Author search form</p>}
      {radioValue === "isbn" && <BookSearchByISBN />}


    </div>
  )
};