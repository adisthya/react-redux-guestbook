import { Col, Container, Row } from 'react-bootstrap';
import GuestBook from './components/guest-book/GuestBook';

function App() {
  return (
    <Container fluid>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col sm="8">
          <GuestBook />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
