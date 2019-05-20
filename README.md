# Liri Node App
-----
- **For:** Coding Bootcamp
- **Developer:** Rafael Uzcategui
- **Built With** Node.js, Javascript
- **APIs** OMDB, Spotify, Bandsintown
- **Demo** See a full demo [here!](https://drive.google.com/file/d/12E46cJU3jHKJAdcmtjht1EkZzktD1FX0/view)


### Description & Requirements
---
Liri is a command line application that takes user commands and queries from the command line and returns data from API's. The following commands have been hard coded into the program and neatly returns to users information about their requested film, band, or movie.

-	concert-this
-	Spotify-this-song
-	movie-this
-	do-what-it-says

### Functionality
--- 
1. concert-this
   By running 

   node liri.js concert-this <band>

   This will search the Bands in Town Artist Events API for an artist and returns the next concert time and date for that artist, as        well   as location and city.

-	Name of the venue
-	Venue location
-	Date of the Event (use moment to format this as "MM/DD/YYYY")

![Screenshot](/images/concert-this.png)

2. spotify-this-song
    By running

    node liri.js spotify-this-song <song>

    This will search for the user input and returns the artist, full track name, album and a preview link.

-	Artist(s)
-	The song's name
-	A preview link of the song from Spotify
-	The album that the song is from

![Screenshot](/images/spotify-this-song.png)

3. movie-this
   By running

   node liri.js movie-this <movie>

   Function takes the user input and it will output the following information to your terminal/bash window:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Rotten Tomatoes Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.

![Screenshot](/images/movie-this.png)

4. do-what-it-says
   By running

   node liri.js do-what-it-says


   LIRI will use the text from “random.txt” and call on of LIRI’s commands. It should run Spotify-this-song for “I want it That way”. 

![Screenshot](/images/do-what-it-says.png)

## Technologies used:

* Spotify API
* OMDB API
* Bands In Town API
* Node.js
* Javascript
* NPM packages

