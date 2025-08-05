import React, { Component } from "react";

export class YearlyComment extends Component {
  static displayName = YearlyComment.name;

  constructor(props) {
    super(props);
    this.state = { comment: null, loading: true };
  }

  componentDidMount() {
    this.getYearlyComment();
  }

  render() {
    const { loading, comment } = this.state;
    if (loading) {
      return <em>Loading...</em>;
    }

    const text = comment[0]?.comment ?? "";
    return (
      <>
        {text.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </>
    );
  }

  async getYearlyComment() {
    const params = new URLSearchParams();
    if (this.props.year !== undefined && this.props.year !== null) {
      params.append("year", this.props.year);
    }
    const response = await fetch(
      `api/music/favorite-songs/comments?${params.toString()}`
    );
    const comment = await response.json();
    console.log(`${this.props.year} Comment:`, comment);
    this.setState({ comment: comment, loading: false });
  }
}
