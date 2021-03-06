import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../public/css/style.css';

class JobsPageComponent extends Component {
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
    document.title = 'Jobs | HackerNews Clone by Eric Liang';
    axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
    .then((response) => {
      this.setState({
        items: response.data
      });

      var promises = [];
      this.state.items.forEach((id) => {
        promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
      });
      Promise.all(promises).then((results) => {
        results.forEach((response, index) => {
          this.state.posts.push(response.data);
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
          <p className = { styles['page-description'] }>
            These are jobs at YC startups. You can apply to many at once through <a href = "https://www.workatastartup.com" rel = "nofollow">Work at a Startup</a> or <a href = "https://triplebyte.com/iv/L4ymNN4/cp">Triplebyte</a>, and browse company profiles at Key Values (YC W18).
          </p>
          <ul className = { styles['posts-list'] }>
            {
              posts.map(post => (
                <li key = { post.id }>
                  <a href = { post.url } className = { styles['post-list-title'] }>{ post.title }</a> <small><a href = { post.url }>({ (post.hasOwnProperty('url')) ? this.parseRootURL(post.url) : post.url })</a></small>
                  <br/>
                  <small>{ moment.unix(post.time).format('MMM DD, YYYY') }</small>
                </li>
              ))
            }
          </ul>
        </div>
      );
    }
  }
}

export default JobsPageComponent;
