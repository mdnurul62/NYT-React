// Include React as a dependency
var React = require("react");

// // Include the Helper (for the saved recall)
 var helpers = require("../utils/helpers");

// Create the Saved component
var Saved = React.createClass({

  getInitialState: function(){
    return {
      history: ""
    }
  },

 componentDidMount: function(){

    helpers.getHistory()
      .then(function(historyData){
        this.setState({
          history: historyData.data
        });
        console.log("saved results", historyData.data);
      }.bind(this))
  },
 
  handleClick: function(item, event) {
    console.log("handleClick");
    console.log(item);
    //Delete list
    helpers.deleteHistory(item.title, item.date, item.url).then(function(data) {
      //get revised list
      helpers.getHistory().then(function(historyData) {
        this.setState({history: historyData.data});
      }.bind(this))
    }.bind(this))
  },

  render: function() {
    return (
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
              <h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
              </div>
              <div className="panel-body">
                <h4> Articles: </h4>
                {this.props.history.map((search, i) =>{
                  return (
                    <p key={i} onClick={this.handleClick}>
                      {search.title} - {search.date}
                      <button type="submit">Delete</button>
                    </p>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
    );
  }

});

  
//   // A helper method for rendering the HTML when we have no saved articles
//   renderEmpty: function() {
//     return (
//       <li className="list-group-item">
//         <h3><span><em>Save your first article...</em></span></h3>
//       </li>
//     );
//   },

//   // A helper method for mapping through our articles and outputting some HTML
//   renderArticles: function() {
//     return this.props.articles.map(function(article, index) {

//       return (
//         <div key={index}>
//           <li className="list-group-item">
//             <h3><span><em>{article.title}</em></span><span className="btn-group pull-right"><a href={article.url} rel="noopener noreferrer" target="_blank"><button className="btn btn-default ">View Article</button></a><button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button></span></h3>
//             <p>Published date: {article.date}</p>
//           </li>
//         </div>
//       );
//     }.bind(this));
//   },

//   // A helper method for rendering a container and all of our artiles inside
//   renderContainer: function() {
//     return (
//             <div className="panel panel-primary">
//               <div className="panel-heading">
//                 <h1 className="panel-title"><strong><i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong></h1>
//               </div>
//               <div className="panel-body">
//                 <ul className="list-group">
//                   {this.props.renderArticles}
//                 </ul>
//               </div>
//             </div>
//     );
//   },
//   // Our render method. Utilizing a few helper methods to keep this logic clean
//   render: function() {
//     // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
//     if (!this.props.articles) {
//       return this.renderEmpty();
//     }
//     // If we have articles, return this.renderContainer() which in turn returns all saves articles
//     return this.renderContainer();
//   }
// });

// Export the component back for use in other files
module.exports = Saved;
