import React, { Component } from "react";
import { OutTable, ExcelRenderer } from "./ExcelParser";
import zipcelx from "zipcelx";

import "./App.css";

const config = {
  filename: "general-ledger-Q1",
  sheet: {
    data: [
      [
        {
          value: "National Number",
          type: "number"
        },
        {
          value: "First Name",
          type: "string"
        },
        {
          value: "Last Name",
          type: "string"
        },
        {
          value: "Birthday",
          type: "string"
        },
        {
          value: "",
          type: "string"
        },
        {
          value: 1000,
          type: "number"
        },
        {
          value: "Income - Webshop",
          type: "string"
        },
        {
          value: 1000,
          type: "number"
        },
      ]
    ]
  }
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: []
    };
  }
  fileHandler = event => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  };
  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            zipcelx(config);
          }}
        >
          GENERATE
        </button>
        <input
          type="file"
          onChange={this.fileHandler.bind(this)}
          style={{ padding: "10px" }}
        />
        <OutTable
          data={this.state.rows}
          columns={this.state.cols}
          tableClassName="ExcelTable2007"
          tableHeaderRowClass="heading"
        />
      </div>
    );
  }
}

export default App;
