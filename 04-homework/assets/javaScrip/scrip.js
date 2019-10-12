$(document).ready(function() {

    var i = 100;
    var x = 0;
    var playerScore = "";

     console.log(question[x].title);
$("#startButton").on("click", function(){
   
    questionSort();
    empty();
    timeInt();
    writeQuestion();

});

// Creates the question elements, inserts the question from randomized array.  Creates buttons for all answers an dassigns classes and appends them to the page.
function writeQuestion() {
    var titleQuestion = $("<h5>")
    titleQuestion.attr("class", "pageQuestion");
    titleQuestion.text(question[x].title);
    $(".questionBody").append(titleQuestion,"<br>");

    question[x].choices.forEach(function(element) {
        var newAnswerBtn = $('<button type="button" class="btn btn-primary btn-lg answer">');
        newAnswerBtn.text(element);
        $(".questionBody").append(newAnswerBtn,"<br><br>");
      });  
      
    $(".questionBody").append("<br class='vBreak'>");
}


// Starts the timer and updates timer on website
function timeInt () {
    setInterval(function() { 
        if(i > 0) {
            i--;
            $(".timer").text("Time Remaining: " + i);
            }
        },1000);
}


// Empties the contents of the main content div
function empty() {
    $(".questionBody").empty();
};


// Randomizes question order
function questionSort() {
   question.sort(function() {
        return .5 - Math.random();
        })
        console.log(question);
    };
});
