import React, { Component } from "react";

    export default class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      search: "",
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    fetch("https://hn.algolia.com/api/v1/search?query=hello&page=0")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    let filteredItems = this.state.items.filter((item) => {
      return (
        item.symbol.toUpperCase().indexOf(this.state.search.toUpperCase()) !==
          -1 || item.industry.indexOf(this.state.search) !== -1
      );
    });
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } 
  }
}