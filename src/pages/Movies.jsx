import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import AddMovie from '../components/AddMovie';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const retryTimerRef = useRef(null);

  // Handler to add a movie locally to the list
  const addMovieHandler = useCallback((newMovie) => {
    setMovies((prevMovies) => {
      const movieWithId = {
        id: Date.now(),
        title: newMovie.title,
        openingCrawl: newMovie.openingText,
        releaseDate: newMovie.releaseDate
      };
      return [movieWithId, ...prevMovies];
    });
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

  // Fetch movies handler using clean async / await with retry logic
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
        const response = await fetch('https://swapi.info/api/films');
        
        // Verify response success status
        if (!response.ok) {
          throw new Error('Something went wrong ....Retrying');
        }

        const data = await response.json();

        // Map dynamic fields from SWAPI structure
        const transformedMovies = data.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingCrawl: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });

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
                        <span className="text-accent-gold fw-bold">
                          Ep. {movie.id}
                        </span>
                      </div>
                      <h6 className="text-muted mb-3">
                        Released: {movie.releaseDate}
                      </h6>
                      <Card.Text className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {movie.openingCrawl}
                      </Card.Text>
                    </div>
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
