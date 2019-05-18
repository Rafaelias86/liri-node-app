//Read and set any environment variables with the dotenv package
require("dotenv").config();
// fs is a core Node package for reading and writing files
const fs = require("fs")

const axios = require("axios");

const moment = require('moment')

const Spotify = require('node-spotify-api');

const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

 function userCommand(action, userQuery){
    // We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "movie-this":
    movie();
    break;
  
  case "spotify-this-song":
    song();
    break;
  
  case "concert-this":
    concert();
    break;
  
  case "do-what-it-says":
    says(userQuery);
    break;
  }

}

userCommand(action, userQuery);

function movie(){
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  if (!userQuery) {
    userQuery = "mr nobody"
  };

// Run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    console.log("\n =========== Search Result ===========\n ");
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " +response.data.Language );
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    //console.log(response.data);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

};

function song(){
  //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  if (!userQuery) {
    userQuery = "the sign ace of base"
  };

// // Spotify search query format
spotify.request('https://api.spotify.com/v1/search?q=track:' + userQuery + '&type=track&limit=1', function(error, response) {
        if (error){
            return console.log(error);
        }
       //console.log(JSON.stringify(response, null, 2));
        console.log("\n =========== Search Result ===========\n ");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("URL: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
    });

};

function concert(){

var queryUrl = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp";

axios.get(queryUrl).then(
  function(response){
    //console.log(response);
    console.log("\n =========== Search Result ===========\n ")
    console.log("Venue: " + response.data[0].venue.name);
    console.log("City: " + response.data[0].venue.city);
    //console.log(moment("Date: " + response.data[0].datetime).format("YYYY-MM-DD"));
    let eventDate = moment(response.data[0].datetime).format("MM/DD/YYYY");
    console.log('Date: ' + eventDate)
  });

};

function says(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
      let output = data.split(",");

      action = output[0];
      userQuery = output[1];
        
      userCommand(action, userQuery);
    });
};


