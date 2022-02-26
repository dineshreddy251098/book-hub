import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookDetailsApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    bookDetailsData: {},
    bookDetailsApiStatus: bookDetailsApiStatuses.initial,
  }

  componentDidMount() {
    this.getBookDetailsApi()
  }

  getBookDetailsApi = async () => {
    this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(bookDetailsApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          readStatus: fetchedData.book_details.read_status,
          title: fetchedData.book_details.title,
          aboutAuthor: fetchedData.book_details.about_author,
        },
      }
      this.setState({
        bookDetailsData: updatedData,
        bookDetailsApiStatus: bookDetailsApiStatuses.success,
      })
    } else {
      this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getBookDetailsApi()
  }

  renderBookDetailsInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={32} width={32} />
    </div>
  )

  renderBookDetailsFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645337269/Group_7522_vwrftq.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something went wrong. Please try again
      </p>
      <button
        className="top-rated-books-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetailsData} = this.state
    const {bookDetails} = bookDetailsData
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails
    return (
      <div className="book-details-card-container">
        <div className="book-details-container">
          <img className="book-details-image" src={coverPic} alt={title} />
          <div>
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author-name">{authorName}</p>
            <div className="book-details-rating-container">
              <p className="book-details-avg-rating-heading">Avg rating</p>
              <BsFillStarFill className="book-details-star-icon" />
              <p className="book-details-rating ">{rating}</p>
            </div>
            <p className="book-details-status-heading">
              Status: <p className="book-details-status">{readStatus}</p>
            </p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div>
          <h1 className="about-heading">About Author</h1>
          <p className="about-paragraph">{aboutAuthor}</p>
        </div>
        <div>
          <h1 className="about-heading">About Book</h1>
          <p className="about-paragraph">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetailsApiStatus} = this.state

    switch (bookDetailsApiStatus) {
      case bookDetailsApiStatuses.success:
        return <>{this.renderBookDetailsSuccessView()}</>
      case bookDetailsApiStatuses.inProgress:
        return <>{this.renderBookDetailsInProgressView()}</>
      case bookDetailsApiStatuses.failure:
        return <>{this.renderBookDetailsFailureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header shelves />
        <div className="book-details-bg-container">
          {this.renderBookDetails()}
        </div>
        <Footer />
      </>
    )
  }
}
export default BookItemDetails
