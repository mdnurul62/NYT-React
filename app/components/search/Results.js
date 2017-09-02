// Include React as a dependency
var React = require("react");
var helpers = require("../utils/helpers");

// Results Component Declaration
var Results = React.createClass({
// Here we will save states for the contents we save 
  getInitialState: function(){
    return { title: "", url: "", pubDate: ""}
  },
 
  handleChange: function(event) {
    // Here we create syntax to capture any change in text to the query terms (pre-search).
    // See this Stack Overflow answer for more details:
    // http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },
  //When user submits
  handleClick: function(search, event) {
    event.preventDefault();
    console.log("handle submit clicked!");
    //set the Search to have the search terms

    helpers.postHistory(search.headline.main, search.pub_date, search.web_url).then(function(data) {
        console.log(search.headline.main);
    }.bind(this))
    //this.props.setArticles(this.state.articles);
  },

  // A helper method for rendering a container and all of our artiles inside
  render: function() {
    if (!this.props.articles.hasOwnProperty("docs")) {
      <li>
        <h3><span><em>Enter search terms ---</em></span></h3>
      </li>
    } else {

      //loop through articles
      var article = this.props.articles.docs.map(function(search, index) {
        return (
          <div key={index} >
            <li className="list-group-item">
              <h3>
                <span><em>{search.headline.main}</em></span><span className="btn-group pull-right"><a href={search.web_url} rel="noopener noreferrer" target="_blank"><button className="btn btn-primary">View Article</button></a><button className="btn btn-action" type="submit" onClick={this.handleClick}> Save</button></span>
              </h3>
              <p>Published date: {search.pub_date}</p>
            </li>
          </div>
          )
      }.bind(this))
    }


    return (
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title"><strong><i className="fa fa-list-alt"></i>Results</strong></h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {article}
                </ul>
              </div>
            </div>
        );
      }
    });

// Export the component back for use in other files
module.exports = Results;
