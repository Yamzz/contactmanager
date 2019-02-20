import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

//this is where my state lives, the parent of Contact state
class Contacts extends Component {
  render() {
    //pulling contacts out of the state
    //const { contacts } = this.state;
    return (
      //loop through each state in component
      //we are passing the contact in as a property
      //this is the consumer of our aplkcation level state in our provider
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb2">
                {' '}
                <span className="text-danger">Contact List</span>{' '}
              </h1>

              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
