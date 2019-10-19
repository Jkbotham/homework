$(document).ready(function () {

    var i = 10;
    var x = 0;
    var playerScore = 0;
    var highScores = JSON.parse(localStorage.getItem("mScore"));
    var nScore = [];

    $("#startButton").on("click", function () {
        questionSort();
        startGame();
        timeInt();
        writeQuestion();
        console.log(highScores, nScore);
    });


    $("#nextQuestion").on("click", function () {
        x++;
        $("#rightWrong").empty();
        writeQuestion();
        $(".answer").removeAttr('disabled', 'disabled');
    });

    $(".answer").on("click", function () {
        $(".answer").attr('disabled', 'disabled');
        if ($(this).text() === question[x].answer) {
            playerScore += 10;
            $("#rightWrong").text("That is correct! +10 points");
        }
        else {
            $("#rightWrong").text("That is incorrect. -10 Seconds");
            i -= 10;
        }
    });

    $("#subBtn").on("click", function () {
        var scoreInitials = $("#formInitials").val();
        console.log(scoreInitials);
        highScoreList();
        if (highScores === null) {
            nScore.push([playerScore, scoreInitials]);
            localStorage.setItem("mScore", JSON.stringify(nScore));
          highScores = JSON.parse(localStorage.getItem("mScore"));
        }
        else {
            highScores.push([playerScore, scoreInitials]);
            localStorage.setItem("mScore", JSON.stringify(highScores));
        }
        printHigh();
    });

    $("#highScore").on("click", function() {
        event.preventDefault();
        highScoreList();
        printHigh();
    });

    function startGame() {
        $("#startPage").attr("style", "display: none");
        $("#questionPage").removeAttr("style");
        $("#timerScore").removeAttr("style");
        writeQuestion();
    }

    // Creates the question elements, inserts the question from randomized array.  Creates buttons for all answers an dassigns classes and appends them to the page.
    function writeQuestion() {
        $("#pQuestion").text(question[x].title);
        $("#answer1").text(question[x].choices[0]);
        $("#answer2").text(question[x].choices[1]);
        $("#answer3").text(question[x].choices[2]);
        $("#answer4").text(question[x].choices[3]);
    };

    function gameOver() {
        $("#questionPage").attr("style", "display: none");
        $("#subInPage").removeAttr("style");
        $("#timerScore").attr("style", "display: none");
    };

    function highScoreList() {
        $("#startPage").attr("style", "display: none");
        $("#questionPage").attr("style", "display: none");
        $("#subInPage").attr("style", "display: none");
        $("#highScorePage").removeAttr("style");
        $("#indexH").attr("class","nav-link");
        $("#highScore").attr("class", "nav-link active");
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
            }
        }, 1000);
    }

    // Randomizes question order
    function questionSort() {
        question.sort(function () {
            return .5 - Math.random();
        })
        console.log(question);
    };

    function printHigh() {
        $("h1").text("High Scores");
        console.log(highScore.length)
        highScores.sort();
        for (i = highScores.length - 1; i > -1; i--) {
            var tRow = $("<tr>");
            var pName = $("<td>").text(highScores[i][1]);
            var pScore = $("<td>").text(highScores[i][0]);
            $(tRow).append(pName, pScore);
            $("#tBody").append(tRow);
        };
    };

});



