import uniqid from 'uniqid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form } from 'react-bootstrap';
import { GuestPages } from './GuestBook';
import { createGuest, guestSelector, updateGuest } from '../../slices/guest-slice';

const initialFormState = {
  id: '',
  name: '',
  phone: '',
  email: '',
  address: ''
};

export default function GuestBookForm(props) {
  const { guests } = useSelector(guestSelector);
  const { guestId, switchPage, resetSelectedGuest } = props;
  const dispatch = useDispatch();
  const guest = guests.find((g) => g.id === guestId);
  const [ form, setFormValue ] = useState(guest || initialFormState);

  const handleChange = (e, field) => {
    const { target: { value } } = e;

    if (Object.keys(form).includes(field)) {
      setFormValue({ ...form, [field]: value });
    }
  }

  const handleBack = () => {
    resetSelectedGuest();
    setFormValue(initialFormState);
    switchPage(GuestPages.GUESTS);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guest) {
      dispatch(updateGuest(form));
    } else {
      form.id = uniqid();
      dispatch(createGuest(form));
    }

    resetSelectedGuest();
    setFormValue(initialFormState);
    switchPage(GuestPages.GUESTS);
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="name">Guest Name</Col>
        <Col sm="9">
          <Form.Control type="text" id="name" size="sm"
                        value={form.name} onChange={(e) => handleChange(e, 'name')} />
        </Col>
      </Form.Group>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="phone">Guest Phone</Col>
        <Col sm="9">
          <Form.Control type="text" id="phone" size="sm"
                        value={form.phone} onChange={(e) => handleChange(e, 'phone')} />
        </Col>
      </Form.Group>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="email">Guest Email</Col>
        <Col sm="9">
          <Form.Control type="text" id="email" size="sm"
                        value={form.email} onChange={(e) => handleChange(e, 'email')} />
        </Col>
      </Form.Group>
      <Form.Group className="row mb-3">
        <Col as={Form.Label} sm="3" htmlFor="address">Guest Address</Col>
        <Col sm="9">
          <Form.Control as="textarea" type="text" id="address" size="sm" rows="5"
                        value={form.address} onChange={(e) => handleChange(e, 'address')} />
        </Col>
      </Form.Group>
      <Form.Group className="row">
        <Col sm="9" className="offset-sm-3">
          <Button type="submit" variant="success" size="sm">Save</Button>
          <Button type="reset" variant="light" size="sm" className="ms-2"
                  onClick={handleBack}>Back</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}
