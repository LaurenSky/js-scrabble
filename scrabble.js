// scoreChart[1] ==>>> [ 'A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T' ]
// Object.keys(this.scoreChart) ====>>> [ '1', '2', '3', '4', '5', '8', '10' ]
var Scrabble = {
  scoreChart: {
    1: ["A","E","I","O","U","L","N","R","S","T"],
    2: ["D","G"],
    3: ["B","C","M","P"],
    4: ["F","H","V","W","Y"],
    5:["K"],
    8: ["J","X"],
    10: ["Q","Z"]
  },

  // score(word): returns the total score value for the given word. The word is input as a  string (case insensitive).
  score: function(wordPlayed) {
    var score = 0;
    var word = wordPlayed.toUpperCase();
    var wordArray = word.split("");
    var scoreValues = Object.keys(this.scoreChart);
    var scoreLetterValue = this.scoreChart;

    wordArray.forEach(function(letter) {
      scoreValues.forEach(function(value) {
        if(scoreLetterValue[value].includes(letter)) {
          score += Number(value);
        }
      });
    });
    if (wordArray.length == 7) {
      score += 50;
    }
    return score;
  },

  // highestScoreFrom(arrayOfWords): returns the word in the array with the highest score
  highestScoreFrom: function(arrayOfWords){
    var winningWord = "";
    var winningScore = 0;

    for (var i = 0; i < arrayOfWords.length; i++) {
      var word = arrayOfWords[i];
      var score = this.score(word);

      //should return the word with the highest score
      if (score > winningScore) {
        winningWord = word;
        winningScore  = score;

      } else if (score == winningScore) {
        //should return the first word supplied in the case of tie of both score a length
        if (winningWord.length != 7) { //this runs if winningWord length is not 7
          if (word.length == 7) { //if word length is 7, word is winningWord
            winningWord = word;
            winningScore = score;

            // if score tie, shorter length wins
          } else if ( word.length < winningWord.length) {
            winningWord = word;
            winningScore = score;
          }
        }
      }
    }
    return winningWord;
  }
};

// TESTS!!!!
console.log(">>>>>>>>>>>>");
var result = Scrabble.score("cat");
console.log("should be 5: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.score("");
console.log("should be 0: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.score("AAAAAAA");
console.log("should be 57: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.score("AAAAAAA");
console.log("should be 57: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["AAAAAAA", "cat", "bank"]);
console.log("should be AAAAAAA: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["AAAAAAA", "cat", "bank", "DAAAAAA"]);
console.log("should be DAAAAAA: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["AAAAAAA", "cat", "bank", "EEEEEEE"]);
console.log("should be AAAAAAA: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["EEEEEEE", "AAAAAAA", "cat", "bank"]);
console.log("should be EEEEEEE: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["EEEEEEE", "ZZZZZZ", "cat", "bank"]);
console.log("should be ZZZZZZ: " + result);

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["JJJJJ", "ZZZZ", "cat", "bank"]);
console.log("should be ZZZZ: " + result);
module.exports = Scrabble;

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["ZZZZ", "JJJJJ", "cat", "bank"]);
console.log("should be ZZZZ: " + result);
module.exports = Scrabble;

console.log(">>>>>>>>>>>>");
var result = Scrabble.highestScoreFrom(["ZZZZZJ", "AAAAAAD", "cat", "bank"]);
console.log("should be AAAAAAD: " + result);
module.exports = Scrabble;

// -----------------------------

//Constructor: Called when you use new Player(name)
var Player = function(name) {
  this.name = name;
  this.plays = [];

};

//totalScore(): Function which sums up and returns the score of the players words
Player.prototype.totalScore = function(player) {
  var playerWords = this.plays;
  var totalScore = 0;

  for (var i = 0; i < playerWords.length; i++) {
    var wordScore = Scrabble.score(playerWords[i]);
    totalScore += wordScore;
  }
  return totalScore;
};

//hasWon(): Function which returns true if the player has over 100 points, otherwise returns false
Player.prototype.hasWon = function(player) {
  var score = this.totalScore(player);
  var pointsNeedToWin = 100;

  if (score > pointsNeedToWin) {
    return true;
  } else {
    return false;
  }
};

//Function which adds the input word to the plays Array & Returns false if player has already won
Player.prototype.play = function(word) {
  var hasWonYet = this.hasWon();
  if (hasWonYet === true) {
    return false;
  } else {
    this.plays.push(word);
    console.log(word);
    console.log(this.plays);
    return true;
  }
};

//highestScoringWord(): Function which returns the highest scoring word the user has played
Player.prototype.highestScoringWord = function() {
  var wordsPlayed = this.plays;
  var highestWord = Scrabble.highestScoreFrom(wordsPlayed);
  return highestWord;
};



//highestWordScore(): Function which returns the highestScoringWord score
Player.prototype.highestWordScore = function() {
  var highestWordPlayed = this.highestScoringWord();
  var highestWordPlayedScore = Scrabble.score(highestWordPlayed);
  return highestWordPlayedScore;
};


console.log(">>>>>>>>>>>>");
var sky = new Player("sky");

var addWord = sky.play("dog");
console.log("sky play should be false: " + addWord);
console.log(sky.plays);

var myScore = sky.totalScore("sky");
console.log("skys score should be 5: " + myScore);

console.log(">>>>>>>>>>>>");
var addWord = sky.play("cat");
console.log("sky play should be true: " + addWord);
console.log(sky.plays);

var myScore = sky.totalScore("sky");
console.log("skys score should be 10: " + myScore);

console.log(">>>>>>>>>>>>");
var addWord = sky.play("giraffe");
console.log("sky play should be true: " + addWord);
console.log(sky.plays);

var myScore = sky.totalScore("sky");
console.log("skys score should be 74: " + myScore);

var won = sky.hasWon("sky");
console.log("sky has won should be false: " + won);

console.log(">>>>>>>>>>>>");
var addWord = sky.play("ZZZZZZ");
console.log("sky play should be true: " + addWord);
console.log(sky.plays);

var myScore = sky.totalScore("sky");
console.log("skys score should be 134: " + myScore);

var won = sky.hasWon("sky");
console.log("sky has won should be true: " + won);

console.log(">>>>>>>>>>>>");
var addWord = sky.play("parrot");
console.log("sky play should be false: " + addWord);
console.log(sky.plays);

var myScore = sky.totalScore("sky");
console.log("skys score should be 134: " + myScore);

var won = sky.hasWon("sky");
console.log("sky has won should be false: " + won);

console.log(">>>>>>>>>>>>");
var highestPlayerWord = sky.highestScoringWord();
console.log("sky highest scoring word should be giraffe: " + highestPlayerWord);

var highestPlayerWordScore = sky.highestWordScore();
console.log("sky highest scoring word should be giraffe: " + highestPlayerWordScore);


module.exports = Scrabble;
