import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class Library extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    switchShelf: PropTypes.func.isRequired
  }

  //A function to sort the books depending on shelf, so it filter the books and assign the book to the related shelf
  sortBooks = (shelf) => {
    const { books } = this.props;
    return books.filter((book) => book.shelf === shelf);
  }                      


  render() {
    const { books, switchShelf } = this.props

    return (
       
      <div className="list-books-content">
        <div className="bookshelf">
          <div className="bookshelf-books">

            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookShelf
              name="Currently Reading"
              books={ this.sortBooks('currentlyReading') }
              switchShelf={ switchShelf }
            />

            <h2 className="bookshelf-title">Want to Read</h2>
            <BookShelf
              name="Want to Read"
              books={ this.sortBooks('wantToRead') }
              switchShelf={ switchShelf }
            />

            <h2 className="bookshelf-title">Finished Reading</h2>
            <BookShelf
              name="Finished Reading"
              books={ this.sortBooks('read') }
              switchShelf={ switchShelf }
            />
          </div>
        </div>
      </div>
     
    )
  }
}

export default Library
