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
              id="keyword"
              name="searchSelection"
              value="keyword"
              checked={radioValue==="keyword"}
              onChange={() => onChangeFormSelection("keyword")} 
            />
            <label htmlFor="keywordSearch">Keyword</label>
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