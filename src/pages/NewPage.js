import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../public/css/style.css';

class NewPageComponent extends Component {
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
    document.title = 'Newest | HackerNews Clone by Eric Liang';
    axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then((response) => {
      this.setState({
        items: response.data
      });
      console.log("IDs Collected: " + this.state.items.length);
      var promises = [];
      this.state.items.forEach((id) => {
        promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      });
      Promise.all(promises).then((results) => {
        results.forEach((response, index) => {
          if(response.data == null)
            console.log("NULL FOUND");
          else {
            this.state.posts.push(response.data);
          }
        });
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
    if(rawURL == '' || rawURL == null || rawURL == 'undefined')
      return ''
    else
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
        <ul className = { styles['posts-list'] }>
          {
            posts.map((post) => (
              <li key = { post.id }>
                <a href = { (post.hasOwnProperty('url')) ? post.url : '#' } className = { styles['post-list-title'] }>{ post.title }</a><small><a href = { (post.hasOwnProperty('url')) ? post.url : '#' }>({ (post.hasOwnProperty('url') || post.url != null || post.url != '' || post.url != 'undefined') ? this.parseRootURL(post.url) : '' })</a></small>
                <br/>
                <small>{ (post.score > 1) ? post.score + ' points': post.score + ' point' } by <a href = { `/user/${post.by}` }>{ post.by }</a> | { moment.unix(post.time).format('MMM DD, YYYY') } | <a href = { `/item/${post.id}` }>{ (post.kids) ? ((post.kids.length > 1) ? (post.kids.length + ' comments') : '1 comment') : '0 comments' }</a></small>
              </li>
            ))
          }
        </ul>
      );
    }
  }
}

export default NewPageComponent;
