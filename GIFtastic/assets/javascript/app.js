$(document).ready(function(){

        // $(window).keydown(function(event){
        //   if(event.keyCode == 13) {
        //     event.preventDefault();
        //     return false;
        //   }
        // });





// This app takes a string input to create buttons at the same time as 
// interface with the GIPHY search API and return 10 static GIFs.
// Upon user click, the GIF will animate, click again to stop.
// --------------------------
// DONE: Array of strings of favorite cult movies of mine
var topics = ["Monty Python and the Holy Grail", "Galaxy Quest", "Blues Brothers", "Office Space", "Dazed and Confused", "Boondock Saints", "Fight Club", "Pulp Fiction"];
// FUNCTIONS
// --------------------------
// DONE: Make buttons for each item in array, then gives a class=cult-movie, gives it an attribute 
// named data-name with a value and text of the name of the movie and appends the button to the HTML div #buttons
function renderButtons(){
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++){
        var b = $("<button>");
        b.addClass("cult-movie");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttons").append(b);
    }
}
renderButtons();
$("#form").submit(function(event){
    event.preventDefault();
})
// --------------------------
// MAIN PROCESS
// --------------------------
// DONE: Add search term to #buttons div--with guard statement
$("#form").on("click", "search-btn" ,function(event){
    event.preventDefault();
    // stores the string value in a variable userSearch
    var userSearch = $("#gif-search").val().trim();
    var gifSearch = $("#gif-search").val();
    if (gifSearch === ""){
        return;
    } else {
    // pushes the string to the topics array
    topics.push(userSearch);
    // renders the new search button in the div
    renderButtons();
    console.log(userSearch);
    console.log(topics);
        
    }
});
// DONE: Get GIFs
$(document).on("click","cult-movie", function(){
    // event.preventDefault();
    // storing the button's data-name for getting GIFs
    var movie = $(this).attr("data-name");
    console.log(movie);
    // search formula for queryURL; APIkey includes limit parameter
    // var APIkey = "&api_key=jHRNaBgtdwHE0t21Vv2Q0qLafzbpiahG&limit=10";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    movie + "&api_key=jHRNaBgtdwHE0t21Vv2Q0qLafzbpiahG&limit=10";
    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        // store response in a variable 
        var results = response.data;
        console.log(results);
        // loop through each result 
        for (var i = 0; i < results.length; i++){
            var moviediv = $("<div>");
            moviediv.attr("style", "text-align: center;")
            // create variable for paragraph with item rating
            var description = $("<p>Rating: " + results[i].rating + "</p>");
            // creating image tags for GIFs
            var movieImage = $("<img>");
            // set the src of the image to the url pulled from the JSON in the console; it was put there by the AJAX call
            movieImage.attr("src", results[i].images.fixed_height_still.url);
            movieImage.attr("still", results[i].images.fixed_height_still.url)
            movieImage.attr("animate", results[i].images.fixed_height.url)
            moviediv.prepend(movieImage, description);
            // append GIFs to page
            $("#gif-bin").prepend(moviediv);
        }
    });
    
});
// TODO: PAUSING GIFs
$(document).on("click", "img", function(){
    event.preventDefault();

    var state = $(this).attr("data-state");

    if (state === "still"){
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate")
    } else {
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("data-state", "still");
    }

})


});

