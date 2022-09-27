import { connect } from "react-redux"
import { GUEST_ACTIONS } from "../../reducers/guest-reducer";
import { Button, Table } from 'react-bootstrap';
import { GuestPages } from './GuestBook';

function GuestBookList(props) {
  const { guests, deleteGuest, selectGuest, switchPage } = props;
  const handleClickUpdate = (guestId) => {
    selectGuest(guestId);
    switchPage(GuestPages.GUEST_FORM);
  }

  const handleClickDelete = (guestId) => {
    deleteGuest(guestId);
  }

  return (
    <>
      <div className="mb-3 d-flex justify-content-end">
        <Button variant="primary" size="sm" onClick={() => switchPage(GuestPages.GUEST_FORM)}>Add Guest</Button>
      </div>
      <Table hover responsive className="m-0">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody className="table-group-divider">
        {
          Array.isArray(guests) && guests.length > 0 ?
          guests.map((guest, index) => (
            <tr key={guest.id}>
              <td>{ index + 1}</td>
              <td>{ guest.name }</td>
              <td>{ guest.phone }</td>
              <td>{ guest.email }</td>
              <td>{ guest.address }</td>
              <td>
                <Button variant="warning" size="sm" className="text-light" onClick={() => handleClickUpdate(guest.id)}>Update</Button>
                <Button variant="danger" size="sm" className="text-light ms-2" onClick={() => handleClickDelete(guest.id)}>Delete</Button>
              </td>
            </tr>
          )) :
          ( <tr><td colSpan={6} className="text-center fw-bold fst-italic text-info">No Guests Data.</td></tr> )
        }
        </tbody>
      </Table>
    </>
  )
}

function mapStateToProps(state) {
  return { guests: [ ...state.guests ] };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGuest: (payload) => dispatch({ type: GUEST_ACTIONS.DELETE_GUEST, payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestBookList);
