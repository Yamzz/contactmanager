import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfor: true
  };
  //arrow function is auto binding
  onShowClick = e => {
    this.setState({ showContactInfor: !this.state.showContactInfor });
  };

  onDeleteClick = async (id, dispatch) => {
    //create a prop called delete this halder
    //this needs to be added to contacts stae property so it can be handled allowing us to change state from one component to another
    //this.props.deleteClickHandler();
    //we will use the consumer to activate the delete click
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  //use http delete request here
  //   axios
  //     .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(res => dispatch({ type: 'DELETE_CONTACT', payload: id }));
  // };

  // dispatch({ type: 'DELETE_CONTACT', payload: id });
  //our dispatch calls our reducer function

  render() {
    const { id, name, email, phone } = this.props.contact;
    //const { contact } = this.props;
    const { showContactInfor } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
              </h4>
              <Link to={`contact/edit/${id}`}>
                <i
                  className="fas fa-pencil-alt"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    color: 'black',
                    marginRight: '1rem'
                  }}
                />
              </Link>

              {showContactInfor ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  // to get rid of failed warning prop name
  // name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // phone: PropTypes.string.isRequired
  contact: PropTypes.object.isRequired
  //deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;
