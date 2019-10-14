$(document).ready(function () {

    var i = 10;
    var x = 0;
    var playerScore = 0;
    var highScores = JSON.parse(localStorage.getItem("mScore"));
    var nScore = [];

    $("#startButton").on("click", function () {
        questionSort();
        empty();
        timeInt();
        writeQuestion();
        writeAnswer();
        console.log(highScores, nScore)
    });

    $(".uAnswer").on("click", function () {
        userAnswer();
    });

    $("#theScore").on("click", function () {
        empty();
        printHigh();
    })



    // Creates the question elements, inserts the question from randomized array.  Creates buttons for all answers an dassigns classes and appends them to the page.
    function writeQuestion() {
        var titleQuestion = $("<h5>")
        titleQuestion.attr("class", "pageQuestion");
        titleQuestion.text(question[x].title);
        $(".questionBody").append(titleQuestion, "<br>");
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
        $(".uAnswer").on("click", function () {
            console.log($(this).text());
            userAnswer();
            if ($(this).text() === question[x].answer) {
                playerScore += 10;
                $(".uAnswer").attr('disabled', 'disabled');
                $("#nxtQuest").append("<h3 class='correct'>That is correct! +10 points</h3>")
            }
            else {
                $("#nxtQuest").append("<h3 class='incorrect'>That is incorrect. -10 Seconds</h3>")
                $(".uAnswer").attr('disabled', 'disabled');
                i -= 10;
            }
        });
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
        $(".nQuestion").on("click", function () {
            x++;
            empty();
            writeQuestion();
            writeAnswer();
        });
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
        $("#list").append("</ol>")
    };
});

