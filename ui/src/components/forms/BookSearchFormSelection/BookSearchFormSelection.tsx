interface BookSearchFormSelectionInterface {
  radioValue: string;
  onChangeFormSelection: (selectedValue: string) => void
}
export const BookSearchFormSelection = ({
  radioValue,
  onChangeFormSelection
}: BookSearchFormSelectionInterface) => {
  
  return (
    <>
        <form>
          <fieldset>
            <legend>Select the book search form</legend>
            <input 
              type="radio" 
              id="keywordSearch"
              name="searchSelection"
              value="keyword"
              checked={radioValue==="keyword"}
              onChange={() => onChangeFormSelection("keyword")} 
            />
            <label htmlFor="keywordSearch">Keyword</label>
            <input 
              type="radio" 
              id="authorNameSearch"
              name="searchSelection"
              value="authorName"
              checked={radioValue==="authorName"}
              onChange={() => onChangeFormSelection("authorName")} 
            />
            <label htmlFor="authorNameSearch">Author</label>
            <input 
              type="radio" 
              id="titleSearch"
              name="searchSelection"
              value="title"
              checked={radioValue==="title"}
              onChange={()=> onChangeFormSelection("title")} 
            />
            <label htmlFor="titleSearch">Title</label>
            <input 
              type="radio" 
              id="isbnSearch"
              name="searchSelection"
              value="isbn"
              checked={radioValue==="isbn"}
              onChange={()=> onChangeFormSelection("isbn")} 
            />
            <label htmlFor="isbnSearch">ISBN</label>
          </fieldset>
        </form>
    </>
  )
}