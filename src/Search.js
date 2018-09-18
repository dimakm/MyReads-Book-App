import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  
 constructor () {
        super();
        this.state = {
          searchQuery: '',
          newBooks: [],
         /*checkSearch changes from 1 to 0 depending on the search resluts,default is 1. if there are results it is 1, 
         if no results then checkSearch= 0*/
          checkSearch: 1 

        }
    }

  render() {

    const { searchQuery, newBooks, checkSearch } = this.state
    const { books, switchShelf } = this.props

      return (
        <div className="search-books">
          <div className="search-books-bar">
              <div class="route-link">
                <Link
                  to="/"
                  className="close-search"
                >
                  Close
                </Link>   
              </div>
              <div className="search-books-input-wrapper">
              <input type="text"
                value={searchQuery}
                placeholder="Search for a book"
                onChange={  //An event will trigger when a change happen to the input field 
                    (event) => {
                        const searchQuery = event.target.value.trim() //put the entered text into searchQuery 
                        this.setState({ searchQuery: searchQuery }) //change the state 

                        if (searchQuery) { 
                          /*Run the search if there's a user input 
                          then check if books array includes books (its length is >0) then set the state newBook to the Books array
                          otherwise set it back to default state */
                          BooksAPI.search(searchQuery, 20).then((books) => 
                            books.length > 0 ?  this.setState({newBooks: books}) : this.setState({ newBooks: [] , checkSearch: 0 })
                          )
                      } else this.setState({newBooks: [] , checkSearch: 1 })
                      }

                } />
            </div>

            

          </div>

          <div className="search-books-results">
            { newBooks.length > 0 && (
              <div>
                <div className=''> 
                  <h3>Found {newBooks.length} books </h3>
                </div>
                <ol className="books-grid">
                  {newBooks.map((book) => (
                    <Book
                      book={ book }
                      books={ books }
                      key={ book.id }
                      switchShelf={ switchShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
            {  this.state.checkSearch === 0 && (
              <div>
                <div className='no-search-result'>
                  <h3>Sorry, no books found </h3>
                  </div>
                </div>
            )}
          </div>
        </div>
      )}
}
export default Search
