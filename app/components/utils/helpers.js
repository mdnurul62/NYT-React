// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NYTimes API
//var apikey = "a467541ace4b4a76abae45497ce4f5ae";
var APIkey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(term, startYear, endYear) {
    //Adjusted search term
    var formattedTerm = term;
    var formattedStartYear = startYear + "0101";
    var formattedEndYear = endYear + "1231";
    console.log("Search term ", formattedTerm);
    console.log("Search startYear ", formattedStartYear);
    console.log("Search endYear ", formattedEndYear);
    // NYTimes url for article search


    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        console.log(queryURL);
   return axios.get(queryURL, {
    params: { 
          "api-key": APIkey,
                "q": formattedTerm,
       "begin_date": formattedStartYear,
         "end_date": formattedEndYear
    }
   }).then(function(response) {

      var resultsArr = [];
      for (var i = 0; i < 5; i++) {
        var dataObj = {
          title: response.data.response.docs[i].headline.main,
          date: response.data.response.docs[i].pub_date,
          url: response.data.response.docs[i].web_url
        }
        resultsArr.push(dataObj);
      }
      return resultsArr;
      console.log(resultsArr);
  });
},
  // This function hits our own server to retrieve the record of query results
  getHistory: function(title, date, url) {
    return axios.get("/api/saved", {
      title: title,
      "url": url,
      "date": date
    }).then(function(response) {
     console.log("Saved results: ", response.data);
      return response;
    });
  },

  // This function posts new searches to our database.
  postHistory: function(title, date, url) {
    var newArticle = {
      title: title,
      date: Date,
      url: url
    };
    return axios.post("/api/saved", newArticle)
    .then(function(response) {
      console.log("Results data id: ", response.data._id);
      return response.data._id;

    });
  },

  deleteHistory: function(title, data, url) {
    return axios.delete("/api/saved", {
      params: {
        title: title,
        date: Date,
        url: url
      }
    }). then(function(response) {
      console.log("Delete data id: ", response.data.title);
      return response.data.title;
    })
  }
};

// We export the API helper
module.exports = helpers;
