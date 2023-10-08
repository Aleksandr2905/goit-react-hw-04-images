import { Component } from 'react';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    tags: '',
  };

  handleInputChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    this.setState({ tags: searchTerm });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.tags);
    if (!this.state.tags.trim() === '') {
      toast.error('Please write a word for your request');
      return;
    }
    this.setState({ tags: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.tags}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
