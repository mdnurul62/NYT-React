// Include React as a dependency
var React = require("react");

// // Include the Helper (for the saved recall)
 var helpers = require("../utils/helpers");

// Create the Saved component
var Saved = React.createClass({
  getInitialState: function(){
    return {
      history: []
    }
  },

 componentDidMount: function(){

    helpers.getHistory()
      .then(function(results){
        this.setState({
          history: [results]
        });
        console.log("saved results", results);
      }.bind(this))
  },
 
  handleClick: function(item, event) {
    console.log("handleClick");
    console.log(item);
    //Delete list
    helpers.deleteHistory(item.title, item.date, item.url).then(function(data) {
      //get revised list
      helpers.getHistory().then(function(historyData) {
        console.log(historyData);
        this.setState({history: historyData.data});
        console.log("Saved results", historyData.data)
      }.bind(this))
    }.bind(this))
  },

  render: function() {
    if (this.state.history == "") {
      return(
        <div className= "row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h2> Save your first article</h2>
              </div>
            </div>
          </div>
        </div>
        )
    } else {

      var newHistory = this.state.history.map(function(article, index) {
          <div key={index}>
            <li className="list-group-item">
              <h3><span><em>{article.title}</em></span><span className="btn-group pull-right"><button className="btn btn-primary" onClick={this.handleClick.bind(this, article)}> Delete</button></span>
              </h3>
              <p> Published date: {article.date} </p>
            </li>
          </div>
      }.bind(this))
    }
    
    return (

        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
              <h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
              </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {newHistory}
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }

});


// Export the component back for use in other files
module.exports = Saved;
