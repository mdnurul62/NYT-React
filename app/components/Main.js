// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./search/Search");
var Saved = require("./search/Saved");
var Results = require("./search/Results");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Create the Main component
var Main = React.createClass({
  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { 
      searchTerm: "",
      searchStartYear: 0,
      searchEndYear: 0, 
      results: "", 
      history: [] 
    };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(results) {
      console.log(results);
      if (results !== this.state.history) {
        console.log("History", results);
        this.setState({ history: [results] });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {
    //If we have a new search term, run a new search
    if (this.state.searchTerm !== "" && (prevState.searchTerm !== this.state.searchTerm || prevState.searchStartYear !== this.state.searchStartYear || prevState.searchEndYear !== this.state.searchEndYear)) {
      console.log("Updated!")
    // Run the query for the address
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(data) {
      if (data !== this.state.results) {
        console.log("Articles", data.response);
        this.setState({results: data.response });
     }
    }.bind(this));
  }
},
  // This function allows childrens to update the parent.
  setTerm: function(newTerm, newStartYear, newEndYear) {
    this.setState({ 
      searchTerm: newTerm,
      searchStartYear: newStartYear,
      searchEndYear: newEndYear
       });
  },

 
 //Here we render parent and children to page 
  render: function() {

    return (
      // We can only render a single div. So we need to group everything inside of this main-container one
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-default" role="navigation">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/search">Search</a></li>
                    <li><a href="/saved">Saved Articles</a></li>
                 </ul>
              </div>
          </nav> 

          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="lead text-center"><strong>NY Times Article Search</strong></h1>
            <h3 className="lead text-center">Find and save articles of interest.</h3>
          </div>
           {/* Here we will deploy the sub components (Search or Saved */}
          {/* These sub-components are getting passed as this.props.children */}
            <div className="col-md-12">
                <Search  setTerm={this.setTerm} />
            </div>
            <div className="col-md-12">
                <Results articles={this.state.results} />
            </div>
            <div className="col-md-12">
                <Saved history={this.state.history} />
            </div>
            <footer>
                <hr />
                <p className="text-center">md@nurul</p>
            </footer>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
