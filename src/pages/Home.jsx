import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

const tourDates = [
  { date: 'JUL 16', city: 'DETROIT, MI', venue: 'DTE ENERGY MUSIC THEATRE' },
  { date: 'JUL 19', city: 'TORONTO, ON', venue: 'BUDWEISER STAGE' },
  { date: 'JUL 22', city: 'BRISTOW, VA', venue: 'JIFFY LUBE LIVE' },
  { date: 'JUL 29', city: 'HARTFORD, CT', venue: 'XFINITY THEATRE' },
  { date: 'AUG 2', city: 'EAST RUTHERFORD, NJ', venue: 'METLIFE STADIUM' },
  { date: 'AUG 7', city: 'CONCORD, CA', venue: 'CONCORD PAVILION' },
];

const Home = () => {
  return (
    <main className="main-content">
      {/* Home Hero Promo */}
      <section className="home-promo-section py-4 text-center">
        <Container>
          <button className="promo-album-btn mb-3" type="button">
            Get our Latest Album
          </button>
          <br />
          <button className="promo-play-btn" type="button" aria-label="Play Album">
            <FaPlay />
          </button>
        </Container>
      </section>

      {/* Tour Dates Section */}
      <section className="py-5">
        <Container>
          <div className="section-title-container mb-5">
            <h2 className="section-title">TOURS</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="tours-table-wrapper mx-auto" style={{ maxWidth: '800px' }}>
            {tourDates.map((tour, index) => (
              <Row key={index} className="tour-row align-items-center py-3 border-bottom border-secondary text-light">
                <Col xs={3} md={2} className="tour-date font-weight-bold">
                  {tour.date}
                </Col>
                <Col xs={5} md={3} className="tour-city text-muted">
                  {tour.city}
                </Col>
                <Col xs={12} md={5} className="tour-venue text-muted py-2 py-md-0">
                  {tour.venue}
                </Col>
                <Col xs={4} md={2} className="text-end">
                  <button className="buy-btn-premium py-1 px-3 text-nowrap" type="button">
                    BUY TICKETS
                  </button>
                </Col>
              </Row>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Home;
