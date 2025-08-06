import React, { Component } from "react";

export class Hand extends Component {
  static displayName = Hand.name;

  constructor(props) {
    super(props);
    this.state = { cards: [] };
  }
}
