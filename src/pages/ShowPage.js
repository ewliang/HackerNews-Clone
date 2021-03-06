import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../public/css/style.css';

class ShowPageComponent extends Component {
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
    document.title = 'Show | HackerNews Clone by Eric Liang';
    axios.get('https://hacker-news.firebaseio.com/v0/showstories.json')
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
    });
  }

  parseRootURL(rawURL) {
    const urlRegex = /(https:\/\/|http:\/\/)?((www.)?([a-z\-]+.))?(([a-z\-]+)(?:\.\w+)+)/i;
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
        <div>
          <p className = { styles['page-description'] }>Please read the rules. You can also browse the newest Show HNs.</p>
          <ul className = { styles['posts-list'] }>
            {
              posts.map(post => (
                <li key = { post.id }>
                  <a href = { post.url } className = { styles['post-list-title'] }>{ post.title }</a> <small><a href = { post.url }>({ (post.hasOwnProperty('url')) ? this.parseRootURL(post.url) : post.url })</a></small>
                  <br/>
                  <small>{ (post.score > 1) ? post.score + ' points': post.score + ' point' } by <a href = { `/user/${post.by}` }>{ post.by }</a> | { moment.unix(post.time).format('MMM DD, YYYY') } | <a href = { `/item/${post.id}` }>{ (post.kids) ? ((post.kids.length > 1) ? (post.kids.length + ' comments') : '1 comment') : '0 comments' }</a></small>
                </li>
              ))
            }
          </ul>
        </div>
      );
    }
  }
}

export default ShowPageComponent;
