import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state, //spread operator
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case 'ADD_CONTACT':
      //updating the state by adding the new contact
      return {
        ...state, //spread operator
        contacts: [action.payload, ...state.contacts]
      };

    case 'UPDATE_CONTACT':
      //updating the state by updating the new contact
      return {
        ...state, //to get initialse state
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };

    default:
      return state;
  }
};

//this acts as a global state
export class Provider extends Component {
  state = {
    contacts: [
      // {
      //   id: 1,
      //   name: 'john Doe',
      //   email: 'jdoe@gmail.com',
      //   phone: '555-555-555'
      // },
      // {
      //   id: 2,
      //   name: 'Karen Doe',
      //   email: 'karen@gmail.com',
      //   phone: '555-556-556'
      // },
      // {
      //   id: 3,
      //   name: 'henry Doe',
      //   email: 'henry@gmail.com',
      //   phone: '333-115-555'
      // }
    ],
    //calls the action in our reducer
    dispatch: action => this.setState(state => reducer(state, action))
  };

  //you can use axios or ftech to mke http request
  async componentDidMount() {
    //initailise our state micmicing the backend

    //usin async
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({ contacts: res.data });
    // axios.get('https://jsonplaceholder.typicode.com/users').then(res =>
    //   this.setState({
    //     contacts: res.data
    //   })
    // )
  }

  render() {
    return (
      //passing the state so it can be consumed by any component that wants to use it

      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

//export our consumer
//we use the consumer within any compoenet we want to access the state from
export const Consumer = Context.Consumer;

//so we can use <consumer></consumer>
