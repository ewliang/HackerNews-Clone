import React, { Component } from 'react';

class AskPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if(error) {
      return <div>Error: { error.message }</div>;
    } else if(!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key = { item }>
              { item }
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default AskPageComponent;
