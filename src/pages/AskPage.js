import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../public/css/style.css';

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
    document.title = 'Ask | HackerNews Clone by Eric Liang';
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
        <ul className = { styles['posts-list'] } id = { styles['postScored'] }>
          {
            posts.map(post => (
              <li key = { post.id } className = { styles['post'] }>
                <div className = { styles['post-list-score'] }>{ post.score }</div>
                <div>
                  <a href = { post.url } className = { styles['post-list-title'] }>{ post.title }</a>
                  <br/>
                  <small>{ post.by } | { post.time }</small>
                </div>
              </li>
            ))
          }
        </ul>
      );
    }
  }
}

export default AskPageComponent;
