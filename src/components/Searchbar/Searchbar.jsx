import { useState } from 'react';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [tags, setTags] = useState('');

  const handleInputChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    setTags(searchTerm);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(tags);
    if (!tags.trim() === '') {
      toast.error('Please write a word for your request');
      return;
    }
    setTags('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={tags}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
