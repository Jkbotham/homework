$(document).ready(function () {

    var i = 100;
    var x = 0;
    var playerScore = 0;
    var highScores = JSON.parse(localStorage.getItem("mScore"));
    var nScore = [];

    $("#startButton").on("click", function () {
        questionSort();
        startGame();
        // timeInt();
        writeQuestion();
        console.log(highScores, nScore)
    });

    $(".uAnswer").on("click", function () {
        userAnswer();
    });

    $("#theScore").on("click", function () {
        empty();
        printHigh();
    })

    $(".nQuestion").on("click", function () {
        x++;
        $("#rightWrong").empty();
        writeQestion();
    });

    $(".answer").on("click", function () {
        console.log($(this).text());
        userAnswer();
        if ($(this).text() === question[x].answer) {
            playerScore += 10;
            $(".answer").attr('disabled', 'disabled');
            $("#rightWrong").text("That is correct! +10 points");
        }
        else {
            $(".answer").attr('disabled', 'disabled');
            $("#rightWrong").text("That is incorrect. -10 Seconds");
            i -= 10;
        }
    });


    // Creates the question elements, inserts the question from randomized array.  Creates buttons for all answers an dassigns classes and appends them to the page.
    function writeQuestion() {
        $("#pQuestion").text(question[x].title);
        $("#answer1").text(question[x].choices[0]);
        $("#answer2").text(question[x].choices[1]);
        $("#answer3").text(question[x].choices[2]);
        $("#answer4").text(question[x].choices[3]);
    };

    function writeAnswer() {

        var numbQuestion = question[x].choices.length;
        for (var z = 0; z < numbQuestion; z++) {
            var newBtn = $('<button type="button" class="btn btn-primary btn-lg uAnswer">');
            newBtn.attr("data", question[x].choices[z])
            newBtn.text(question[x].choices[z]);
            $(".questionBody").append(newBtn, '<br><br>');
        };
        $(".questionBody").append('<hr>');
        $("#nxtQuest").append('<button type="button" class="btn btn-primary btn-lg float-right nQuestion">Next Question</button>');
        
    };


    function gameOver() {
        empty();
        $(".questionBody").append("<h2 class='gOver'>Game Over<h2>", "<h3>You Scored: " + playerScore + " Points! <h2>", '<hr>', "<input class='form-control' type='text' placeholder='Enter Your Initials' id='formInitials'>", '<button type="button" class="btn btn-primary" id="subBtn">Submit</button>');
        $("#cBody").empty();
        $("#subBtn").on("click", function () {
            var scoreInitials = $("#formInitials").val();
            printHigh();
            if (highScores === null) {
                // nScore.score.push(playerScore);
                // nScore.name.push(scoreInitials);
                nScore.push([playerScore, scoreInitials]);
                localStorage.setItem("mScore", JSON.stringify(nScore));
            }
            else {
                highScores.push([playerScore, scoreInitials]);
                localStorage.setItem("mScore", JSON.stringify(highScores));
            }
            console.log(nScore);
            console.log(highScores);
        })
    }
    function userAnswer() {

    };


    // Starts the timer and updates timer on website
    function timeInt() {
        var time = setInterval(function () {
            if (i < 0) {
                gameOver();
                clearInterval(time);
            }
            else {
                i--;
                $(".timer").text("Time Remaining: " + i);
                $(".score").text("Score: " + playerScore);
                ;
            }
        }, 1000);
    }


    // Empties the contents of the main content div
    function empty() {
        $(".questionBody").empty();
        $("#nxtQuest").empty();
    };


    // Randomizes question order
    function questionSort() {
        question.sort(function () {
            return .5 - Math.random();
        })
        console.log(question);
    };
    function printHigh() {
        empty();
        $("#cBody").empty();
        $("h1").text("High Score");
        highScores.sort();
        $(".questionBody").append("<ol class='list'>")
        for (i = highScores.length - 1; i > -1; i--) {
            var scoree = $("<li>");
            scoree.attr("id", "li" + i);
            scoree.text(highScores[i][1] + " " + highScores[i][0]);
            $(".list").append(scoree);
            console.log(highScores);
        };
        $("#list").append("</ol>");
    };
    function startGame() {
        $("#startPage").attr("style","display: none");
        $("#questionPage").removeAttr("style");
    }
});

