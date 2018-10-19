import React, { Component } from 'react';
import axios from 'axios';

class AskPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      posts: []
    };
  }

  componentDidMount() {
    axios.get('https://hacker-news.firebaseio.com/v0/askstories.json')
    .then((response) => {
      this.setState({
        items: response.data
      });

      var promises = [];
      this.state.items.forEach((id) => {
        promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      });
      Promise.all(promises).then((results) => {
        results.forEach((response) => {
          this.state.posts.push(response.data);
        });
        console.log(this.state.posts);
        this.setState({
          isLoaded: true
        });
      });

    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  parseRootURL(rawURL) {
    const urlRegex = /(https:\/\/|http:\/\/)?((www.)?([a-z\-]+.))(([a-z\-]+)(?:\.\w+)+)/i;
      console.log(rawURL.match(urlRegex)[0]);
    return rawURL.match(urlRegex)[0];
  }

  render() {
    const { error, isLoaded, items, posts } = this.state;
    if(error) {
      return <div>Error: { error.message }</div>;
    } else if(!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {
            posts.map(post => (
              <li key = { post.id }>
                <a href = { post.url }>{ post.title }</a> <small><a href = { post.url }>({ (post.hasOwnProperty('url')) ? this.parseRootURL(post.url) : post.url })</a></small>
                <small>{ post.time }</small>
              </li>
            ))
          }
        </ul>
      );
    }
  }
}

export default AskPageComponent;
