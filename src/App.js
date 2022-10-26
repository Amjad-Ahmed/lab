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
    } else {
      return (
        <div>
          <form className="form-for-table-search">
            SelectSymbol: &emsp;
            <input
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            &emsp; &emsp;{" "}
            <button type="button" className="btn-submit">
              Search
            </button>
            <br />
            &emsp; Industry: &emsp; &emsp; &emsp;
            <input
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            <button type="button" className="btn-submit">
              Search
            </button>
            &emsp; &emsp; History of Symbol and date : &emsp; &emsp; &emsp;
            <input
              type="text"
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
            />
            &emsp; &emsp;
            <button type="button" className="btn-submit">
              Search
            </button>
          </form>
          <table border={2} cellPadding={1}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Industry</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr>
                  <td key={item.symbol}>{item.symbol}</td>
                  <td key={item.name}>{item.name}</td>
                  <td key={item.industry}>{item.industry}</td>
                </tr>
              ))}
              {"}"}
            </tbody>
          </table>
        </div>
      );
    }
  }
}