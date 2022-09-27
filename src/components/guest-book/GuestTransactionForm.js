import uniqid from 'uniqid';
import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn, checkOut, guestSelector, rate } from '../../slices/guest-slice';
import { GuestPages } from './GuestBook';

const initialState = {
  id: '',
  guestId: '',
  payment: '',
  checkInDay: '',
  checkOutDay: ''
}

export default function GuestTransactionForm(props) {
  const { guests, transactions } = useSelector(guestSelector);
  const { trxId, switchPage, resetSelectedTrx } = props;
  const dispatch = useDispatch();
  const trx = transactions.find((t) => t.id === trxId);
  const [ form, setFormValue ] = useState(trx || initialState);

  const handleChange = (e, field) => {
    const { target: { value } } = e;

    if (Object.keys(form).includes(field)) {
      setFormValue({ ...form, [field]: value });

      if (field === 'checkOutDay' && value > 0) {
        const payment = Math.abs(( value - form.checkInDay )) * rate;

        setFormValue({ ...form, [field]: value, payment: payment > 0 ? payment : rate });
      }
    }
  }

  const handleBack = () => {
    resetSelectedTrx();
    setFormValue(initialState);
    switchPage(GuestPages.TRANSACTIONS);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (trx) {
      dispatch(checkOut(form));
    } else {
      form.id = uniqid();
      dispatch(checkIn(form));
    }

    resetSelectedTrx();
    setFormValue(initialState);
    switchPage(GuestPages.TRANSACTIONS);
  }

  const getDaysInMonth = () => {
    const now = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() + 1, 0));
    const count = now.getDate();
    const days = [];

    for (let d = 1; d <= count; d++) {
      days.push(d);
    }

    return days;
  }

  const getMonthName = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = new Date().getMonth();

    return months[ month ];
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="guest">Guest</Col>
        <Col sm="9">
          <Form.Select id="guest" name="guestId" size="sm"
                       value={form.guestId} onChange={(e) => handleChange(e, 'guestId')}>
            <option key="1">Select Guest</option>
            {
              guests.map((guest) => (
                <option key={guest.id} value={guest.id}>{guest.name}</option>
              ))
            }
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="checkInDay">Check In Day</Col>
        <Col sm="9">
          <Form.Select id="checkInDay" name="checkInDay" size="sm"
                       value={form.checkInDay}
                       onChange={(e) => handleChange(e, 'checkInDay')}>
            <option key="1">Select Day in { getMonthName() }</option>
            {
              getDaysInMonth().map((d) => (
                <option key={d} value={d}>{d}</option>
              ))
            }
          </Form.Select>
        </Col>
      </Form.Group>
      { trxId && trx ? (
        <>
          <Form.Group className="row mb-3">
            <Col as={Form.Label} sm="3" htmlFor="checkOutDay">Check Out Day</Col>
            <Col sm="9">
              <Form.Select id="checkOutDay" name="checkOutDay" size="sm"
                           value={form.checkOutDay}
                           onChange={(e) => handleChange(e, 'checkOutDay')}>
                <option key="1">Select Day in { getMonthName() }</option>
                {
                  getDaysInMonth().map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))
                }
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group className="row mb-3">
            <Col as={Form.Label} sm="3" htmlFor="payment">Payment</Col>
            <Col sm="9">
              <Form.Control type="number" id="payment" size="sm"
                            value={form.payment} readOnly
                            onChange={(e) => handleChange(e, 'payment')} />
            </Col>
          </Form.Group>
        </>
      ) : '' }
      <Form.Group className="row">
        <Col sm="9" className="offset-sm-3">
          <Button type="submit" variant="success" size="sm">Save</Button>
          <Button type="reset" variant="light" size="sm" className="ms-2"
                  onClick={handleBack}>Back</Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
