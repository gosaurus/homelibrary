import './App.css'
import { Route, Routes } from "react-router";
import { BookSearchPage } from "./components/pages/BookSearchPage/BookSearchPage";
import { LandingPage } from "./components/pages/LandingPage/LandingPage";


function App() {

  return (
    <>
      <Routes> 
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/BookSearch" element={<BookSearchPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
