import { Nav } from 'react-bootstrap';
import { GuestPages } from './GuestBook';

export default function GuestBookSidebar(props) {
  const { page = 'guests', switchPage } = props;

  const handleClick = (e, page) => {
    e.preventDefault();
    switchPage(page);
  }

  return (
    <>
      <h2 className="fs-6 fw-bold border border-light border-2 border-top-0 border-start-0 border-end-0 pb-2 mb-3">Menu</h2>
      <Nav variant="pills" defaultActiveKey={`/${page}`} className="flex-column" fill>
        <Nav.Item>
          <Nav.Link href="/guests" className="text-start" onClick={(e) => handleClick(e, GuestPages.GUESTS)}>Guests</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/transactions" className="text-start" onClick={(e) => handleClick(e, GuestPages.TRANSACTIONS)}>Transactions</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
