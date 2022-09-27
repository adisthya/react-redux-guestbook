import { useState } from "react";
import { Provider } from "react-redux";
import { Card, Col } from 'react-bootstrap';
import { guestStore } from "../../reducers/guest-reducer";
import GuestBookForm from "./GuestBookForm";
import GuestBookList from "./GuestBookList";
import GuestBookSidebar from './GuestBookSidebar';
import GuestTransactionList from './GuestTransactionList';
import GuestTransactionForm from './GuestTransactionForm';

export const GuestPages = {
  GUESTS: 'guests',
  TRANSACTIONS: 'transactions',
  GUEST_FORM: 'guests/form',
  TRANSACTION_FORM: 'transactions/form'
};

export default function GuestBook() {
  const [ page, setPage ] = useState('list');
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
        <strong className="fs-5">Guest Book App</strong>
      </Card.Header>
      <Card.Body className="row">
        <Col as="section" sm="2">
          <GuestBookSidebar switchPage={switchPage} />
        </Col>
        <Col as="section" sm="10">
          <Provider store={guestStore}>
            <ViewPage switchPage={switchPage} />
          </Provider>
        </Col>
      </Card.Body>
    </Card>
  )
}
