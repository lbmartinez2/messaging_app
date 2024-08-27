import React from 'react'
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);


  return (
    <div id="error-page">
      <h1 className='error-heading'>Oops!</h1>
      <p className='error-text'>Sorry, an unexpected error has occurred.</p>
      <p className='error-text error-subtext'>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className='home' to='https://www.youtube.com/watch?v=xvFZjo5PgG0'>Go Home</Link>
    </div>
  )
}

export default ErrorPage