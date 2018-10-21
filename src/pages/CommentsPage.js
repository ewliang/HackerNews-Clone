import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from '../../public/css/style.css';

class CommentsPageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: []
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    // Get the Specific Post
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.item}.json`)
    .then((response) => {
      this.setState({
        post: response.data
      });
      document.title = `Comments for ${this.state.post.title} | HackerNews Clone by Eric Liang`;

      if(this.state.post.hasOwnProperty('kids')) {
        // Get the Comments From The Post
        var promises = [];
        this.state.post.kids.forEach((id) => {
          promises.push(axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
        });
        Promise.all(promises).then((results) => {
          results.forEach((response, index) => {
            this.state.comments.push(response.data);
          });
          this.setState({
            isLoaded: true
          });
        });
      } else {
        this.setState({
          isLoaded: true
        });
      }

    })
    .catch((error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  render() {
    const { error, isLoaded, post, comments } = this.state;
    if(error) {
      return <div>Error: { error.message }</div>;
    } else if(!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <header className = { styles['page-header'] }>
            <small>Comments</small>
            <h1 className = { styles['page-title'] }>{ post.title }</h1>
            <small><a href = { post.url }>( { post.url } )</a></small>
            <br/>
            <br/>
            <span>{ (post.score > 1) ? post.score + ' points': post.score + ' point' } by <a href = { `/user/${post.by}` }>{ post.by }</a></span>
          </header>
          <ul className = { styles['posts-list'] }>
            {
              comments.map((comment) => (
                <li key = { comment.id }>
                  <small>by <a href = { `/user/${comment.by}` }>{ comment.by }</a> | { moment.unix(comment.time).format('MMM DD, YYYY') }</small>
                  <br/>
                  <p className = { styles['comments-text'] }>{ comment.text }</p>
                </li>
              ))
            }
          </ul>
        </div>
      );
    }
  }
}

export default CommentsPageComponent;
