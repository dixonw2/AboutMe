import React, { Component } from "react";

export class Board extends Component {
  static displayName = Board.name;

  constructor(props) {
    super(props);
    this.state = {
      previousBoard: null,
      currentBoard: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };
  }

  render() {
	  // begin with a blank board
	  // place cards in specific indices, update previousBoard to currentBoard 
	  // and then add the card to current
    return <></>;
  }
}
