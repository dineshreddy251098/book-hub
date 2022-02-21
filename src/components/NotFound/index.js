import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645269848/Group_7484_bsltav.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      We are sorry, the page you requested could not be found, please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-back-to-home-btn" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
