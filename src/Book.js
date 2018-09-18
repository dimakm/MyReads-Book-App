import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    switchShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, books, switchShelf } = this.props

   //checking whether the book cover image exisits or not so if it doesn't exist a placeholder will show up instead 
   let bookImg ;
   bookImg = (!!book.imageLinks) ?  `url("${book.imageLinks.thumbnail}")` : `url('http://via.placeholder.com/193x128')` ;

     
    let currentShelf ;
    // currentShelf will hold the value of book shelf, then later we'll use it for the default value of the bookShelf
    for (let publication of books ) {
      if (publication.id === book.id)  {
        currentShelf = publication.shelf
        break
      }
    }


    return (
          <li>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{width: 128,
                         height: 193,
                         backgroundImage:  bookImg } }>
                </div>
                <div className="book-shelf-changer">
                  <select  onChange={(event) => switchShelf(book, event.target.value)}
                    defaultValue={ currentShelf }>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="removed">Remove</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                {book.title}
              </div>
              <div className="book-authors">
                {book.authors}
              </div>

            </div>
          </li>
    )
  }

}

export default Book
