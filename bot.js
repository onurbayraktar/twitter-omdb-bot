console.log("The Bot is started..");

// Importing the packages: twit, omdb-wrapper, config.js ... //
var Twit = require('twit');
const omdbWrapper = require('omdb-wrapper').default;
var config = require('./config');
var movie_id = 0;
let filmInfo = {};

// Twitter OAUth //
var T = new Twit(config);
console.log("The Bot has connected to twitter");

// Omdb Variable //
const omdb = new omdbWrapper({
    apiKEY: '13b5b79b'
});
console.log("The Bot has connected to omdb");



// Setting up a user stream //
var stream = T.stream('statuses/filter', {track:'@ustboa67'});
stream.on('tweet', tweetEvent);
console.log("Stream is open");

function tweetEvent(eventMsg)
{
    var replyto, text, from, movieid, movie_name;      // Variables
    replyto = eventMsg.in_reply_to_screen_name;
    text = eventMsg.text;
    text = text.split(" ");
    movie_name = "";
    from = eventMsg.user.screen_name;
    console.log("Tweet received from: " + from + " Content is: " + text + " Sender is: " + replyto);

    // Fetch the film name only //
    for(var i=0; i<text.length; i++)
    {
        if(i > 0)
        {
            movie_name = movie_name + text[i];
            if(i !== (text.length)-1)
            {
                movie_name = movie_name + ' ';
            }
        }
    }
    console.log(movie_name);
    omdb.search.movies(String(movie_name))
        .then(data=> {
            var length = data['Search'].length;              // No of occurence with our 'keyword'
            var filmObject = data['Search'];
            for(var i=0; i<length; i++)                      // Iterate over the occurences
            {
                if(movie_name === filmObject[i]['Title'])     // If the title is exactly the same with the one we're looking for.
                {
                    movie_id = filmObject[i]['imdbID'];   // We return the movie id.
                    console.log("Movie ID is returning:" + movie_id);
                    break;
                }
            }

        });

    setTimeout(function () {
        omdb.movie.getMovie(movie_id.toString())                       // We search the film through the api by id.
            .then(data => {
                console.log(data);
                filmInfo = {                            // Create the information object.
                    title: data['Title'],
                    released: data['Released'],
                    runtime: data['Runtime'],
                    director: data['Director'],
                    writer: data['Writer'],
                    imdb_score: data['imdbRating'],
                    grossing: data['BoxOffice']
                };
                console.log(data['Title']);
            })
    }, 2000);


    setTimeout(function () {
        // Creating the new tweet with the info we got. //
        var new_tweet = '@'+from+' Title: '+filmInfo.title+', Released: '+filmInfo.released+
            ', Runtime: '+filmInfo.runtime+', Director: '+filmInfo.director+', Writer: '+
            filmInfo.writer+', IMDB Score: '+filmInfo.imdb_score+', Grossing: '+filmInfo.grossing;
        tweetTheInfo(new_tweet);
    }, 4000);

}

function tweetTheInfo(text)
{
    var tweet = {
        status: text
    }
    T.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if(err){
            console.log("Something went wrong !!");
        }
        else{
            console.log("It worked !");
        }
    }

}



    /**
// Function that takes the text, make calls for omdb api and tweets ! //
function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;     // The user that tweet was sent to.
    var text = eventMsg.text;                           // The text of the tweet
    var from = eventMsg.user.screen_name;               // The user that tweet was sent from.
    var movieID = 0;
    // Processing the mention to take the film name.
    text = text.split(" ")[1];                     // Splitting the text in order not to take @username part.
    let f_name, counter;
    var movie = "";
    f_name = text.split(" ");
    counter = 1;
    var noOfWords = text.length;

    while (counter < noOfWords)
    {
        movie = movie + f_name[counter];
        counter++;
    }

      if (replyto === 'ustboa67')    // We care only the tweets that was sent to us
      {
          console.log("Film name is: " + text);
          setTimeout(function () {
              omdb.search.movies(text)                            // We search the film through the api.
                  .then(data=> {
                      var length = data['Search'].length;              // No of occurence with our 'keyword'
                      var filmObject = data['Search'];
                      for(var i=0; i<length; i++)                      // Iterate over the occurences
                      {
                          if(text === filmObject[i]['Title'])     // If the title is exactly the same with the one we're looking for.
                          {
                              movieID = filmObject[i]['imdbID'];   // We return the movie id.
                              console.log("Movie ID is returning:" + movieID);
                              break;
                          }
                      }
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          }, 2000);


              setTimeout(function () {
                  console.log("ID IS: " + movieID);
                  omdb.movie.getMovie(movieID.toString())                       // We search the film through the api by id.
                      .then(data => {
                          console.log(data);
                          filmInfo = {                            // Create the information object.
                              title: data['Title'],
                              released: data['Released'],
                              runtime: data['Runtime'],
                              director: data['Director'],
                              writer: data['Writer'],
                              imdb_score: data['imdbRating'],
                              grossing: data['BoxOffice']
                          };
                          console.log(data['Title']);
                      })
                      .catch((error) => {
                              console.log(error);
                          });
              },3000);

              setTimeout(function () {
                  // Creating the new tweet with the info we got. //
                  var new_tweet = '@'+from+' Title: '+filmInfo.title+', Released: '+filmInfo.released+
                      ', Runtime: '+filmInfo.runtime+', Director: '+filmInfo.director+', Writer: '+
                      filmInfo.writer+', IMDB Score: '+filmInfo.imdb_score+', Grossing: '+filmInfo.grossing;
                  tweetTheInfo(new_tweet);
              }, 4000);

    }
}






/*
// Function that fetches and return the film id from the api.
function getFilmID(film_name)
{
    omdb.search.movies(film_name)                            // We search the film through the api.
        .then(data=> {
           var length = data['Search'].length;              // No of occurence with our 'keyword'
           var filmObject = data['Search'];
           var movieID = 0;
           for(var i=0; i<length; i++)                      // Iterate over the occurences
           {
               if(film_name === filmObject[i]['Title'])     // If the title is exactly the same with the one we're looking for.
               {
                   movieID = filmObject[i]['imdbID'];   // We return the movie id.
                   console.log("Movie ID is returning:" + movieID);
                   break;
               }
           }
            return movieID;
        });
}

// Function that fetches and return the film information from the api
function getFilmInfo(movie_id)
{
    omdb.movie.getMovie(movie_id.toString())                       // We search the film through the api by id.
        .then(data => {
            var filmInfo = {                            // Create the information object.
                title: data['Title'],
                released: data['Released'],
                runtime: data['Runtime'],
                director: data['Director'],
                writer: data['Writer'],
                imdb_score: data['imdbRating'],
                grossing: data['BoxOffice']

            };
            console.log("Movie infos are returning:");
            console.log(data);
            return filmInfo;                            // Return the info.
        });
}*/













/*
var movie = 'Inception';
var movieID;
omdb.search.movies('Inception')
    .then(data =>{
        var length = data['Search'].length;
        for(var i=0; i<length; i++)
        {
           if(movie === data['Search'][i]['Title'])
           {
               movieID = data['Search'][i]['imdbID'];
               break;
           }
        }
    });
*/
/*
omdb.movie.getMovie('tt1375666')
    .then(data => {
        console.log(data);
    });
*/













/*
// Setting up a user stream //
var stream = T.stream('user');
stream.on('follow', followed);

// Callback function
function followed(eventMsg)
{
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
}
*/



/*
// Search tweets from twitter app. //
// Parameters for the search as object form
var params = {
    q: 'from:@ustboa67',
    count: 100
};

// Get the tweets
T.get('search/tweets', params, gotTweets);

// Callback function to get the tweets
function gotTweets(err, data, response){
    var tweets = data.statuses;
    for (var i=0; i<tweets.length; i++)
    {
        console.log(tweets[i].text);
    }
}*/