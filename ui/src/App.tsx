import './App.css'
import { Route, Routes } from "react-router";
import { BookSearchPage } from './components/pages/BookSearchPage/BookSearchPage';


function App() {

  return (
    <>
      <Routes> 
        <Route path="/" element={<BookSearchPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
