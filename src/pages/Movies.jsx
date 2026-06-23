import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import AddMovie from '../components/AddMovie';

const FIREBASE_DB_URL = 'https://react-http-ecommerce-default-rtdb.firebaseio.com';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryTimerRef = useRef(null);

  // Handler to add a movie to the database (POST request)
  const addMovieHandler = useCallback(async (newMovie) => {
    try {
      const response = await fetch(`${FIREBASE_DB_URL}/movies.json`, {
        method: 'POST',
        body: JSON.stringify(newMovie),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong while saving the movie.');
      }

      const data = await response.json();
      
      const movieWithId = {
        id: data.name, // Firebase generated auto ID
        title: newMovie.title,
        openingCrawl: newMovie.openingText,
        releaseDate: newMovie.releaseDate
      };

      setMovies((prevMovies) => [movieWithId, ...prevMovies]);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }, []);

  // Cancel retrying handler
  const cancelRetryHandler = useCallback(() => {
    setIsRetrying(false);
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
    setError('Retrying cancelled by user.');
  }, []);

  // Fetch movies handler using GET request to Firebase database
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsRetrying(false);

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    const performFetch = async () => {
      try {
        const response = await fetch(`${FIREBASE_DB_URL}/movies.json`);
        
        // Verify response success status
        if (!response.ok) {
          throw new Error('Something went wrong ....Retrying');
        }

        const data = await response.json();

        const transformedMovies = [];
        for (const key in data) {
          transformedMovies.push({
            id: key,
            title: data[key].title,
            openingCrawl: data[key].openingText || data[key].openingCrawl,
            releaseDate: data[key].releaseDate,
          });
        }

        setMovies(transformedMovies);
        setError(null);
        setIsRetrying(false);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err.message === 'Something went wrong ....Retrying'
          ? err.message
          : 'Something went wrong ....Retrying';
        setError(errorMessage);
        setIsLoading(false);
        setIsRetrying(true);

        // Schedule retry automatically after 5 seconds
        retryTimerRef.current = setTimeout(() => {
          setIsLoading(true);
          performFetch();
        }, 5000);
      }
    };

    await performFetch();
  }, []);

  // Delete movie handler (DELETE request)
  const deleteMovieHandler = useCallback(async (id) => {
    try {
      const response = await fetch(`${FIREBASE_DB_URL}/movies/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Something went wrong while deleting the movie.');
      }

      // Update local state to instantly reflect deletion in the UI
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }, []);

  // Automatically fetch movies when the component mounts, and clean up timers on unmount
  useEffect(() => {
    fetchMoviesHandler();

    return () => {
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
    };
  }, [fetchMoviesHandler]);

  return (
    <main className="main-content py-5">
      <Container>
        {/* Section Header */}
        <div className="section-title-container mb-5">
          <h2 className="section-title">STAR WARS MOVIES</h2>
          <div className="section-title-line"></div>
        </div>

        {/* Add Movie Form */}
        <AddMovie onAddMovie={addMovieHandler} />

        {/* Fetch Action Panel */}
        <div className="text-center mb-5 d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <button 
            className="promo-album-btn py-3 px-5" 
            onClick={fetchMoviesHandler}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'FETCHING...' : 'FETCH MOVIES'}
          </button>

          {isRetrying && (
            <button 
              className="btn-cancel-retry py-3 px-4" 
              onClick={cancelRetryHandler}
              type="button"
            >
              CANCEL RETRY
            </button>
          )}
        </div>

        {/* Dynamic Content Rendering */}
        {isLoading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="purple" className="custom-spinner" />
            <p className="mt-3 text-muted">Loading Star Wars films...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mx-auto" style={{ maxWidth: '600px' }}>
            <Alert.Heading>Connection Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {!isLoading && !error && movies.length === 0 && (
          <div className="text-center text-muted my-5">
            <p>No movies fetched yet. Click "FETCH MOVIES" to retrieve them.</p>
          </div>
        )}

        {!isLoading && !error && movies.length > 0 && (
          <Row className="g-4">
            {movies.map((movie) => (
              <Col key={movie.id} xs={12} md={6}>
                <Card className="premium-product-card h-100">
                  <Card.Body className="d-flex flex-column justify-content-between p-4">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Card.Title className="text-light mb-0 fs-4">
                          {movie.title}
                        </Card.Title>
                        {typeof movie.id === 'number' || (typeof movie.id === 'string' && !movie.id.startsWith('-')) ? (
                          <span className="text-accent-gold fw-bold">
                            Ep. {movie.id}
                          </span>
                        ) : null}
                      </div>
                      <h6 className="text-muted mb-3">
                        Released: {movie.releaseDate}
                      </h6>
                      <Card.Text className="text-muted mb-4" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {movie.openingCrawl}
                      </Card.Text>
                    </div>
                    <button 
                      className="delete-movie-btn" 
                      onClick={() => deleteMovieHandler(movie.id)}
                      type="button"
                    >
                      Delete Movie
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </main>
  );
};

export default Movies;
