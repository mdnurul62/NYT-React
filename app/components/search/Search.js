// Include React
var React = require("react");
var helpers = require("../utils/helpers");

// This is the Form, our main component. It includes the banner and form element
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", startYear: 0, endYear: 0 };
  },

  // This function will respond to the user input
  handleChange: function(event) {
    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
    // switch(event.target.id) {
    //         case "term":
    //             this.setState({term: event.target.value});
    //             break;
    //         case "startYear":
    //             this.setState({startYear: event.target.value});
    //             break;
    //         case "endYear":
    //             this.setState({endYear: event.target.value});
    //             break;
    //     }

  },

  //When user submits
  handleClick: function(event) {
    event.preventDefault();
    console.log("handle submit clicked!");
    console.log("Found: ", this.state.term, this.state.startYear, this.state.endYear);
    //set the Search to have the search terms
    this.props.setTerm(this.state.term, this.state.startYear, this.state.endYear);
    //this.props.setStartYear(this.state.startYear);
    //this.props.setEndYear(this.state.endYear);
    //clearing the input field after submitting
    // this.setState({
    //   term: "",
    //   startYear: 0,
    //   endYear: 0
    // });

  },

  // Here we descibe this component's render method
  render: function() {
    return (
            <div className="panel panel-default">
              <div className="panel-heading ">
                <h3 className="panel-title text-center">Article Search</h3>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="term"><h4><strong>Topic</strong></h4></label>
                    <input type="text" value={this.state.term} className="form-control" id="term" onChange={this.handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startYear"><h4><strong>Start Year</strong></h4></label>
                    <input type="number" value={this.state.startYear} className="form-control" id="startYear" onChange={this.handleChange} required />
                  </div>
                  <div className="form-group">
                   <label htmlFor="endYear"><h4><strong>End Year</strong></h4></label>
                    <input type="number" value={this.state.endYear} className="form-control" id="endYear" onChange={this.handleChange} required />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" type="submit" onClick={this.handleClick}><strong> Search</strong></button>
                  </div>
                </form>
              </div>
            </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;
