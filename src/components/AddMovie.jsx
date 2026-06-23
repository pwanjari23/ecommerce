import React, { useRef } from 'react';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleRef.current.value.trim();
    const enteredOpeningText = openingTextRef.current.value.trim();
    const enteredReleaseDate = releaseDateRef.current.value.trim();

    // Check if empty values
    if (!enteredTitle || !enteredOpeningText || !enteredReleaseDate) {
      return;
    }

    const NewMovieObj = {
      title: enteredTitle,
      openingText: enteredOpeningText,
      releaseDate: enteredReleaseDate
    };

    // Requirement: console.log(NewMovieObj)
    console.log(NewMovieObj);

    // Call onAddMovie callback to lift state up
    if (props.onAddMovie) {
      props.onAddMovie(NewMovieObj);
    }

    // Reset inputs
    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = '';
  }

  return (
    <div className="add-movie-card mb-5">
      <form onSubmit={submitHandler} className="add-movie-form">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="opening-text" className="form-label">Opening Text</label>
          <textarea
            rows="5"
            id="opening-text"
            ref={openingTextRef}
            required
          ></textarea>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="date" className="form-label">Release Date</label>
          <input
            type="text"
            id="date"
            ref={releaseDateRef}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="add-movie-btn">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
