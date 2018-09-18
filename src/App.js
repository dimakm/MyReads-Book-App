import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {books: []}

  //get all the books when the Component instances are mounted 
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
    this.setState({books})
    })
  }

  /* This function gets the array of the books in the library -without the updated/new book - and put it in currentBooks, 
  and we push the new book in currentBooks , and then it changes the state */ 
  filterBooks = (aBook) => {
    // get all the books in the library except the updated book
    var currentBooks = this.state.books.filter( book => book.id !== aBook.id ) 
    currentBooks.push(aBook)
    this.setState({books: currentBooks})
  }


  // this function assigns aBook to a new shelf
  switchShelf = ( aBook, newShelf ) => {
    BooksAPI.update(aBook, newShelf).then(response => {
		aBook.shelf = newShelf 
	  //console.log(aBook.title + " Book moved to: " + aBook.shelf );
		this.filterBooks(aBook);
	})
  }

  render() {
    const {books} = this.state

    return (
      <div className="app">
        <Route exact  path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Library
              books={books}
              switchShelf={this.switchShelf}
            />
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={({history}) => (
          <Search
            switchShelf = {this.switchShelf}
            books = {books}
          /> 
          )} 
        />
      </div>
    )
 }
}

export default BooksApp
