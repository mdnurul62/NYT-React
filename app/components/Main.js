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
      results: [], 
      history: [] 
    };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {
    //If we have a new search term, run a new search
    if (this.state.searchTerm !== "" && (prevState.searchTerm !== this.state.searchTerm || prevState.searchStartYear !== this.state.searchStartYear || prevState.searchEndYear !== this.state.searchEndYear)) {
      console.log("Updated!")
    // Run the query for the address
    helpers.runQuery(this.state.searchTerm, this.state.searchStartYear, this.state.searchEndYear).then(function(response) {
      if (response !== this.state.results) {
        console.log("Articles", response);
        this.setState({results: response });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory().then(function(response) {
          console.log("Updated!", response);

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data.response);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  }
},
  // This function allows childrens to update the parent.
  setTerm: function(term, startYear, endYear) {
    this.setState({ 
      searchTerm: term,
      searchStartYear: startYear,
      searchEndYear: endYear
       });
  },

  
    // /*This code handles the sending of the search terms to the parent component*/
    handleClick: function(item, event){
      event.preventDefault();
    console.log("CLICKED");
    helpers.postHistory(item.headline.main, item.pub_date, item.web_url)
      .then(function(data){
        console.log(item.web_url);
      }.bind(this))

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
