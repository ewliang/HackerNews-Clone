import React, { Component } from 'react';
import axios from 'axios';

class UserPageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: null
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    document.title = `Profile: ${params.user} | HackerNews Clone by Eric Liang`;
    axios.get(`https://hacker-news.firebaseio.com/v0/user/${params.user}.json`)
    .then((response) => {
      this.setState({
        isLoaded: true,
        user: response.data
      });
    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  render() {
    const { error, isLoaded, user } = this.state;
    if(error) {
      return <div>Error: { error.message }</div>;
    } else if(!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>{ 'User: ' + user.id }</h1>
          <p>
            About: { user.about }
            <br/>
            Created: { user.created }
            <br/>
            Karma: { user.karma }
          </p>
        </div>
      );
    }
  }
}

export default UserPageComponent;
