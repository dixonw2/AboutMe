import React, { Component } from 'react';

export class FavoriteSongsComment extends Component {
  static displayName = FavoriteSongsComment.name;

  constructor(props) {
    super(props);
    this.state = { comment: [], loading: true };
  }

  componentDidMount() {
    this.getYearlyComment();
  }

  render() {
    let comment = this.state.loading
      ? <p><em>Loading...</em></p>
      : <div>{this.state.comment.map(com => <p>{com}</p>)}</div>

    return (
      <div>
        {comment}
      </div>
    );
  }

  async getYearlyComment() {
    const comment = await fetch(`api/music/yearlycomments/${this.props.year}`);
    const commentData = await comment.json();
    this.setState({ comment: commentData.comment.split('--+--'), loading: false });
  }
}
