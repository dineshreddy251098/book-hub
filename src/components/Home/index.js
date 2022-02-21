import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const topRatedApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  autoplay: true,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedApiStatus: topRatedApiStatuses.initial, topRatedBooks: []}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: topRatedApiStatuses.inProgress})
    const topRatedBooksApi = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(topRatedBooksApi, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      const updatedData = booksList.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState({
        topRatedApiStatus: topRatedApiStatuses.success,
        topRatedBooks: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: topRatedApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  renderSliderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(eachBook => {
          const {id, title, coverPic, authorName} = eachBook
          const onClickedTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div className="top-rated-book-item-container" key={id}>
              <button
                onClick={onClickedTopRatedBook}
                className="top-rated-card-btn"
                type="button"
              >
                <div className="top-rated-book-image-container">
                  <img
                    className="top-rated-book-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="top-rated-book-name">{title}</h1>
                <p className="top-rated-book-author">{authorName}</p>
              </button>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderSliderProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderSliderFailureView = () => (
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

  renderSlider = () => {
    const {topRatedApiStatus} = this.state
    switch (topRatedApiStatus) {
      case topRatedApiStatuses.success:
        return <>{this.renderSliderSuccessView()}</>
      case topRatedApiStatuses.inProgress:
        return <>{this.renderSliderProgressView()}</>
      case topRatedApiStatuses.failure:
        return <>{this.renderSliderFailureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home-page-bg-container">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-paragraph">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="home-find-books-btn books-responsive-btn-sm"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div>
            <div className="home-top-rated-container">
              <div className="top-rated-heading-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <button
                  className="home-find-books-btn books-responsive-btn-lg"
                  type="button"
                  onClick={this.onClickFindBooks}
                >
                  Find Books
                </button>
              </div>
              <div className="slick-container">{this.renderSlider()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
