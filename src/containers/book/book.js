import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBook, haveLikedBook, haveDeletedBook } from '../../actions/book'
import BookCommentContainer from './bookCommentContainer'
import UsersContainer from './UsersContainer'
import { BookCover } from './../../components/book/bookCover'
import { getBook, likeBook } from '../../services/book'
import './book.css'

class BookContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {book: props};
        this.bookLike = this.bookLike.bind(this);
    }
    componentWillMount() {
        getBook(this.state.book.slug)
            .then((response) => {
                this.props.dispatch(fetchBook(response.data));
            });
    }
    bookLike() {
        likeBook(this.props.books.id).then((response) => {
            this.props.dispatch(haveLikedBook(this.props.books.id));
        });
    }
    render() {
        let book = this.props.books;
        if (typeof book.id === 'undefined') {
            return null;
        }
        return (
            <div>
                <div id='book-page'>
                    <BookCover book={this.props.books}/>
                    {(book.liked ?
                        <div id='book-comment'>
                            <BookCommentContainer book={book}/>
                        </div>
                        : <a id='book-like' className='button is-large is-success' onClick={this.bookLike}>Gilla</a>
                    )}
                </div>
                <hr />
                {(book.liked ?
                    <div>
                        <UsersContainer slug={book.slug} id={book.id}/>
                    </div>
                    : null
                )}
            </div>
        );
  }
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchBook : () => dispatch(fetchBook),
    haveLikedBook : () => dispatch(haveLikedBook),
    haveDeletedBook : () => dispatch(haveDeletedBook)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer)
