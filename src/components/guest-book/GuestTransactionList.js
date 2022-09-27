import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { guestSelector } from '../../slices/guest-slice';
import { GuestPages } from './GuestBook';

export default function GuestTransactionList(props) {
  const { guests, transactions } = useSelector(guestSelector);
  const { selectTrx, switchPage } = props;
  const handleCheckout = (trxId) => {
    selectTrx(trxId);
    switchPage(GuestPages.TRANSACTION_FORM);
  }

  return (
    <>
      <div className="mb-3 d-flex justify-content-end">
        <Button variant="primary" size="sm" onClick={() => switchPage(GuestPages.TRANSACTION_FORM)}>Check In</Button>
      </div>
      <Table hover responsive className="m-0">
        <thead>
        <tr>
          <th>#</th>
          <th>Guest</th>
          <th>Check-in Day</th>
          <th>Check-out Day</th>
          <th>Nights</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody className="table-group-divider">
        {
          Array.isArray(transactions) && transactions.length > 0 ?
            transactions.map((trx, index) => (
              <tr key={trx.id}>
                <td>{ index + 1}</td>
                <td>{ guests.find(g => g.id === trx.guestId)?.name || '-' }</td>
                <td>{ trx.checkInDay }</td>
                <td>{ trx.checkOutDay || '-' }</td>
                <td>{ trx.checkOutDay ? Math.abs(trx.checkOutDay - trx.checkInDay) : '-' }</td>
                <td>{ trx.payment || '-' }</td>
                <td>
                  {
                    !trx.payment ?
                      (<Button variant="warning" size="sm" className="text-light" onClick={() => handleCheckout(trx.id)}>Checkout</Button>)
                      :
                      (<span className="badge bg-success py-1 px-2">Paid</span>)
                  }
                </td>
              </tr>
            )) :
            ( <tr><td colSpan="8" className="text-center fw-bold fst-italic text-info">No Transactions Data.</td></tr> )
        }
        </tbody>
      </Table>
    </>
  )
}
