$(document).ready(function() {

//var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//$("#letters").append(alphabet) ;

var argArray = [ ] ;    var guessArray = [ ] ;  var sWord = "";     var sTopic;   
var iTopicIndex = 0;    var iWordIndex = 0;     var numLives = 7;   var sKey ;  
var sCategory = "";     var bGameOn = true;     var iCounterCorrect = 0 ;  
var numWins = 0;        var numLosses = 0;      var checkArray = [ ];
var sUsedLetters = "";

var oGame = {
    //sets all game parameters
      selectWordAndCategory: function() {

        //initialize arrays for next call 
        guessArray = [ ] ;  checkArray = [ ] ;

        var arrTopics =  [
            ["the-beatles", "led-zepplin", "van-halen", "aerosmith", "pink-floyd"],
            ["bourne-identity", "the-titanic", "forrest-gump", "goodwill-hunting", "the-godfather"],
            ["london", "paris", "toronto", "new-york", "hong-kong"]
        ];
        sTopic = arrTopics[Math.floor(Math.random() * arrTopics.length)]; // 0 1 2 
        sWord = sTopic[Math.floor(Math.random() * sTopic.length)];
        sWord = sWord.replace(/\s/g, "-");

        iTopicIndex =  arrTopics.indexOf(sTopic);   
        iWordIndex = sTopic.indexOf(sWord); 
                
        console.log("sTopic=", sTopic, "iTopicIndex= ", arrTopics.indexOf(sTopic));
        console.log("sWord=", sWord, "iWordIndex=", sTopic.indexOf(sWord) );
        
        switch(sTopic) {
            case arrTopics[0]:
                sCategory = "The Category is Famous Bands." ;
                break;
            case arrTopics[1]:
                sCategory = "The Category is Popular Movies." ;
                break;
            case arrTopics[2]:
                sCategory = "The Category is Major World Cities." ;
                break;            
            default:
                sCategory = "The Category is Bands, Movies, or Cities." ;
        } // end switch 

        $("title").html("Press any key to start.");
        $("#Category").html(sCategory);

        // set dashes based on word
        for (var i = 0; i < sWord.length; i++) {
            if (sWord[i] === "-") {
                guessArray[i] = " - " ;
                checkArray[i] = " - " ;
                //space = 1;
            } 
            else {
                guessArray[i] = " _ " ;
            }
        } //end for

        $("#dash").html(guessArray);
        $("#Hint").html("-");
        $("#letters").html("") ;
        numLives = 7;
        sUsedLetters = "";
        bGameOn = true; 
        
    } , // end 

    getHint: function(i, j) {
        
        var arrHints = [
            ["From Liverpool", "Originated Heavy Metal", "Formed in Pasadena, CA", "THINK 'Toxic Twins'", "Produced 'The Wall'"],
            ["CIA Version of James Bond", "I'm on Top of the World!", "Bubba Gump Shrimp Factory", "Genius from Boston", "Original Mafia Series"],
            ["Big Ben", "Eiffel Tower", "CN Tower", "Times Square", "UK Gave This City Back"]
        ] ; 
        $("#Hint").html("Here's a hint: " + arrHints[i][j]);
     } , // end getHint
  
    check: function() {
        // method checks the letter pressed aganst the word        
        var bCheckIncorrect = true;

        // fill in letters per user guess
        for (var i = 0; i < sWord.length; i++) {
            if (sKey == sWord[i]) {
                bCheckIncorrect = false;
                //set sKey in position on dash
                guessArray[i] = " " + sWord[i] + " ";                
                $("#dash").html(guessArray) ;
                iCounterCorrect += 1;

                checkArray[i] = guessArray[i]; 
                console.log("checkArr=", checkArray, "guessArr=", guessArray);
                //console.log("iCounter=", iCounterCorrect, "guessArrayLenth=", guessArray.length)
                
                //if ((iCounterCorrect + 1) == guessArray.length) {
                if (checkArray.join() == guessArray.join()) {  
                    numWins++ ;
                    $("#lives").html("YOU WIN!! The answer was: " + sWord + "<br><br> Now try the NEW word!") ;
                    $("#numWins").html("# Times Won: " + numWins);
                    bGameOn = false ; 
                    oGame.selectWordAndCategory();
                    break ;
                }
            } //end if sKey = sWord[i]
        } //end for

        // if the key pressed was incorrect do this
        if (bCheckIncorrect) {
            var j = (sWord.indexOf(sKey));
            if (j === -1) {
                numLives -= 1;
                $("#lives").html("You have " + numLives + " lives remaining.") ;
            }

            if (numLives == 5) { $("#title").html("Click HINT for some help.");}
                        
            if (numLives == 0) {
                numLosses++;
                $("#lives").html("You missed ~ now try the NEW word!!") ;
                $("#numLosses").html("# Times Lost: " + numLosses);
                bGameOn = false ;
                oGame.selectWordAndCategory();
                //break ;
            }
        } // end bCheckIncorrect
    } //end check
} ; // end oGame 

//MAIN
    oGame.selectWordAndCategory();

//JS keypress
    document.onkeyup = function(event) {
        if (bGameOn) {    
            sKey = String.fromCharCode(event.keyCode).toLowerCase();
            
            if (sUsedLetters.search(sKey) > -1 ) {
                //console.log("inside if used" + "search=" + (sUsedLetters.search(sKey))) ;
                alert("You've already used " + sKey) ;
            }
            else {
                sUsedLetters += sKey ;
                $("#letters").append(" " + sKey + " ") ;
                oGame.check() ;
            }
        } //end bGameOn              
    } //end keypress

    $(".hint").on("click", function() {
        oGame.getHint(iTopicIndex, iWordIndex);
    }); // end hint 

    $(".btn-primary").on("click", function() {
        oGame.selectWordAndCategory();
    }); // end hint

    $("#reset").on("click", function() {
        var bReset = confirm("Caution: this will reset your score! Click OK to Proceed or Cancel: ");
        if (bReset) { location.reload() } ;
    }); // end hint 

}); // end doc ready

//JQ keypress
/* $(document).keypress(function(event) {
    var sKey = String.fromCharCode(event.keyCode).toLowerCase();
    alert(sKey);
    oGame.check(sKey) ;
}); */

/* arrWords : [
    ["the-beatles", "led-zepplin", "van-halen", "aerosmith", "pink-floyd"],
    ["bourne-identity", "the-titanic", "forrest-gump", "goodwill-hunting", "the-godfather"],
    ["london", "paris", "toronto", "new-york", "Hong-Kong"]
],

arrHints : [
    ["From Liverpool", "Originated Heavy Metal", "Started in Pasadena, CA", "THINK 'Toxic Twins'", "Produced 'The Wall'"],
    ["CIA Version of James Bond", "I'm on Top of the World!", "Bubba Shrimp Factory", "Genius from Boston", "Original Mafia Series"],
    ["Windsor Castle & Big Ben", "Eiffel Tower", "CN Tower", "Times Square", "England Gave This City Back"]
],  */
