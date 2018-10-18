import React, { Component } from 'react';

class NewPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          items: response.data
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

export default NewPageComponent;
