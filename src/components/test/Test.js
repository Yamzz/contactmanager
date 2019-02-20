import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    id: ''
  };
  //second most used lifecycle
  componentDidMount() {
    //making http calls to and api
    //putting those data into state
    //fetcthing data from a data into compoent state
    //console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          id: data.id
        })
      );
  }

  // componentWillMount() {
  //   //this will run first before component did mount
  //   console.log('componentWillMount');
  // }

  // componentDidUpdate() {
  //   //changing its state //regular CRUD operations will be detected
  //   console.log('component did update');
  // }

  // //UNSAFE it is being deprecated
  // componentWillUpdate() {}

  // //UNSAFE it is being deprecated
  // componentWillReceiveProps(nextProps, nextState) {
  //   //when your component recievs new properties this will run, usally used with redux so you can map it as props
  //   console.log('compoenet willrecieve props');
  // }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   //must return a state or null
  //   //cannot use setState ''Wierd
  //   return {
  //     test: 'something'
  //   };
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log('getSnapshotBeforeUpdate');
  // }

  render() {
    //pull out our data from state
    const { title, id } = this.state;
    return (
      <div>
        <h1>Test Component</h1>
        <h2>{title}</h2>
        <p>{id}</p>
      </div>
    );
  }
}

export default Test;

// Test uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
//   componentWillMount
//   componentWillReceiveProps
//   componentWillUpdate

// The above lifecycles should be removed. Learn more about this warning here:
