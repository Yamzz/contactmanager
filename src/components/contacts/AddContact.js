import React, { Component } from 'react';
//if its not exported by default then dont put {}
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

//import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    //prevents any default values from submiting to the form
    const { name, email, phone } = this.state;

    if (name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }

    if (email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }

    if (phone === '') {
      this.setState({
        errors: {
          name: 'Phone is required'
        }
      });
      return;
    }

    const newContact = {
      //id: uuid(), //generates a unique id
      name,
      email,
      phone
    };

    //make http post request
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    //reset state clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //redirect to contacts page
    //the actual page is not being rephresed at all,
    //SINGLE PAGE NAVIGATION
    this.props.history.push('/');
  };

  //what ever the value is in the form to be the state
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h2>Add Contact</h2>
              </div>
              <div className="card-body" />

              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter 
              Phone"
                  value={phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />

                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-dark btn-block"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
