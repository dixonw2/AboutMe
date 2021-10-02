import React, { Component } from 'react';

export class NotFoundPage extends Component {
  static displayName = NotFoundPage.name;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for can't be found</p>
      </div>
    );
  }
}
