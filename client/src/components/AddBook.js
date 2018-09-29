import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import { getBooksQuery, getAuthersQuery, addBookMutation } from '../queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }
  displayAuthors() {
    let data = this.props.getAuthersQuery;
    if (data.loading) {
      return ( <option>Loading Authors</option> );
    } else {
      return data.authors.map(author => {
        return ( <option key={author.id} value={author.id}>{ author.name }</option> );
      });
    }
  }
  submitForm(event) {
      event.preventDefault();
      this.props.addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      });
  }
  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ e => this.setState({ name: e.target.value })}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={ e => this.setState({ genre: e.target.value })}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={ e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthersQuery, { name: 'getAuthersQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
