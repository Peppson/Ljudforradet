import { Link, useLocation } from "react-router-dom";


export default function NotFoundPage() {
  return <>
    <h2>Not Found: 404</h2>
    <p>
      We are sorry, but there doesn't seem to be any page on this
      site that matches the url:
    </p>
    <p><strong>{useLocation().pathname.slice(1)}</strong></p>
    <p>Please <Link to="/">visit the start page</Link> instead.</p>
  </>;
}