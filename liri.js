//Read and set any environment variables with the dotenv package
require("dotenv").config();

let axios = require("axios");

let Spotify = require('node-spotify-api');

let keys = require("./keys.js");

let spotify = new Spotify(keys.spotify);

let action = process.argv[2];

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
      says();
      break;
    }

function movie(){
    // Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
//console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
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

}

function song(){
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var songName = "";



// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
    } else {
    songName += nodeArgs[i];

    }
}
spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=1', function(error, response) {
        if (error){
            return console.log(error);
        }
       //console.log(JSON.stringify(response, null, 2));
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("URL: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
    });

}

