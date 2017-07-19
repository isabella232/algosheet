import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox
} from "react-instantsearch/dom";

class HeaderForm extends Component {
  constructor() {
    super();
    this.state = { appId: "", apiKey: "", indexName: "" };
  }

  onChangeProps(e) {
    let attributeName = e.target.name;
    console.log("target name", e.target.name);
    console.log("state", this.state);
    // To pass a variable in an object as a key: option1
    // Create an empty object then use the bracket notation
    // const obj = {};
    // obj[targetName] = e.target.value;
    //Option 2: dynamic attribute
    //this.setState(obj)
    this.setState({ [attributeName]: e.target.value }, () => {
      console.log(this.props);
      this.props.onChange(this.state);
    });
  }

  render() {
    return (
      <div>
        <form>
          <label>
            App ID<input
              name="appId"
              type="text"
              onChange={this.onChangeProps.bind(this)}
            />
          </label>
          <label>
            API Key<input
              name="apiKey"
              type="text"
              onChange={this.onChangeProps.bind(this)}
            />
          </label>
          <label>
            Index Name<input
              name="indexName"
              type="text"
              onChange={this.onChangeProps.bind(this)}
            />
          </label>
        </form>
      </div>
    );
  }
}

function Product({ hit }) {
  return (
    <div>
      <Highlight attributeName="city" hit={hit} />
    </div>
  );
}

function Search() {
  return <div className="container"><Hits hitComponent={Product} /></div>;
}

class App extends Component {
  constructor() {
    super();
    // The state needs to be initialized
    this.state = {
      appId: "latency",
      apiKey: "6be0576ff61c053d5f9a3225e2a90f76",
      indexName: "airbnb_instant_web_hack"
    };
  }

  render() {
    let content;
    if (
      this.state.appId.length === 0 ||
      this.state.indexName === 0 ||
      this.state.apiKey !== "6be0576ff61c053d5f9a3225e2a90f76"
    ) {
      content = (
        <div>
          <strong>Please fill in the input fields</strong>
        </div>
      );
    } else {
      content = (
        <InstantSearch
          appId={this.state.appId}
          apiKey={this.state.apiKey}
          indexName={this.state.indexName}
        >
          <br />
          <hr />
          <br />
          <SearchBox />
          <br />
          <Search />
        </InstantSearch>
      );
    }
    return (
      <div>
        <HeaderForm
          onChange={credentials => {
            this.setState(credentials);
          }}
        />
        {content}
      </div>
    );
  }
}

export default App;
