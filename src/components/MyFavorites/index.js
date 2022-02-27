import Header from '../Header'
import Footer from '../Footer'
import FavoriteContext from '../../Context/FavoriteContext'
import BookItem from '../BookItem'
import './index.css'

const MyFavorites = props => {
  const onClickedAddFavorite = () => {
    const {history} = props
    history.push('/shelf')
  }

  return (
    <>
      <Header favorite />
      <FavoriteContext.Consumer>
        {value => {
          const {favoriteList} = value
          return (
            <div className="favorite-books-bg-container">
              <h1 className="favorite-books-heading">My Favorite Books</h1>
              {favoriteList.length === 0 ? (
                <div className="no-favorite-container">
                  <img
                    src="https://res.cloudinary.com/dynx08ls1/image/upload/v1645934728/Pngtree_vector_favorite_icon_4187240_yltq08.png"
                    className="no-favorites-image"
                    alt="no favorite"
                  />
                  <p className="top-rated-books-failure-heading">
                    No Favorites Books
                  </p>
                  <button
                    onClick={onClickedAddFavorite}
                    className="top-rated-books-failure-btn"
                    type="button"
                  >
                    Add Favorites
                  </button>
                </div>
              ) : (
                <ul className="favorite-books-list-container">
                  {favoriteList.map(eachItem => (
                    <BookItem key={eachItem.id} bookDetails={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </FavoriteContext.Consumer>
      <Footer />
    </>
  )
}

export default MyFavorites
