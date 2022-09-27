import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../../slices/store';
import GuestBookForm from './GuestBookForm';
import GuestBookList from './GuestBookList';
import GuestTransactionForm from './GuestTransactionForm';
import GuestTransactionList from './GuestTransactionList';
import GuestBookSidebar from './GuestBookSidebar';

export const GuestPages = {
  GUESTS: 'guests',
  TRANSACTIONS: 'transactions',
  GUEST_FORM: 'guests/form',
  TRANSACTION_FORM: 'transactions/form'
};

export default function GuestBook() {
  const [ page, setPage ] = useState(GuestPages.GUESTS);
  const [ guestId, setGuestId ] = useState();
  const [ trxId, setTrxId ] = useState();

  const switchPage = (page) => {
    if (Object.values(GuestPages).includes(page)) {
      setPage(page);
    }
  }

  const ViewPage = (props) => {
    const { switchPage } = props;

    switch (page) {
      case GuestPages.TRANSACTION_FORM:
        return <GuestTransactionForm switchPage={switchPage} trxId={trxId} resetSelectedTrx={() => setTrxId(null)} />
      case GuestPages.GUEST_FORM:
        return <GuestBookForm switchPage={switchPage} guestId={guestId} resetSelectedGuest={() => setGuestId(null)} />
      case GuestPages.TRANSACTIONS:
        return <GuestTransactionList switchPage={switchPage} selectTrx={setTrxId} />
      default:
        return <GuestBookList switchPage={switchPage} selectGuest={setGuestId} />
    }
  }

  return (
    <Card className="shadow-lg">
      <Card.Header>
        <strong className="fs-5">Guestbook App</strong>
      </Card.Header>
      <Card.Body className="row">
        <Col as="section" sm="2">
          <GuestBookSidebar switchPage={switchPage} />
        </Col>
        <Col as="section" sm="10">
          <Provider store={store}>
            <ViewPage switchPage={switchPage} />
          </Provider>
        </Col>
      </Card.Body>
    </Card>
  )
}
