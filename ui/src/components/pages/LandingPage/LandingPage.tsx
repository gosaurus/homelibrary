import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <>
      <p>
        Landing page
      </p>
      <p>
        <Link to="/BookSearch">Book Search</Link>
      </p>
    </>
  )
}