$(document).ready(function() {

var argArray = [ , , ] ;
var guessArray = [ ] ;
var sWord = "";
var sKey ;
var numLives = 3;

var oGame = {
    
      selectWordAndCategory: function(sTopic, sWord) {
        var arrTopics =  [
            ["the-beatles", "led-zepplin", "van-halen", "aerosmith", "pink-floyd"],
            ["bourne-identity", "the-titanic", "forrest-gump", "goodwill-hunting", "the-godfather"],
            ["london", "paris", "toronto", "new-york", "hong-kong"]
        ];
        var sTopic = arrTopics[Math.floor(Math.random() * arrTopics.length)]; // 0 1 2 
        var sWord = sTopic[Math.floor(Math.random() * sTopic.length)];
        sWord = sWord.replace(/\s/g, "-");
        console.log("sTopic=", sTopic, "sTopicIndex= ", arrTopics.indexOf(sTopic));
        console.log("sWord=", sWord, "sWordIndex=", sTopic.indexOf(sWord) );
        
        if (sTopic === arrTopics[0]) {
            $("#Category").append (" Famous Bands.");
        } 
        else if (sTopic === arrTopics[1]) {
            $("#Category").append (" Popular Movies.");
        } 
        else if (sTopic === arrTopics[2]) {
            $("#Category").append (" Major World Cities.");
        }

        var guessArray = [ ];
        // dashes
        for (var i = 0; i < sWord.length; i++) {
            if (sWord[i] === "-") {
                $("#dash").append (" - ");
                guessArray[i] = " - " ;
                space = 1;
            } 
            else {
                $("#dash").append (" _ ");
                guessArray[i] = " _ " ;
            }
        } //end for
    
         //create array to return sWord, indexTopic, indexWord 
         var arrReturn = [arrTopics.indexOf(sTopic), sTopic.indexOf(sWord), sWord, guessArray ] ;
         return arrReturn;
    } , // end selectWordAndCategory

    getHint: function(i, j) {
        //var i2 = i; j2 = j; 
        console.log("inside getHint i=", i, "j=", j);
        //console.log("inside getHint i2=", i2, "j2=", j2);
        var arrHints = [
            ["From Liverpool", "Originated Heavy Metal", "Formed in Pasadena, CA", "THINK 'Toxic Twins'", "Produced 'The Wall'"],
            ["CIA Version of James Bond", "I'm on Top of the World!", "Bubba Gump Shrimp Factory", "Genius from Boston", "Original Mafia Series"],
            ["Big Ben", "Eiffel Tower", "CN Tower", "Times Square", "UK Gave This City Back"]
        ] ; 
        $("#Hint").html("Here's a hint: " + arrHints[i][j]);
     } , // end getHint
  
    check: function(sKey2, sWord2, guessArray) {
        //var sKey1 = "" ; sKey1 = sKey;
        var sDash = guessArray;
        console.log ("inside oGame.check. sKey2=", sKey2, "sWord2=", sWord2, "sDash=", sDash ); //, "sKey1=", sKey1 );
        console.log ("inside oGame.check. guessArray=", guessArray[0]);

        // fill in dashes
        for (var i = 0; i < sWord2.length; i++) {
            alert( guessArray[i]);
            if (sKey2 === sWord2[i]) {
                


            }

        } //end for
    } //end check
} ; // end oGame  

// need Word and indexes (arrTopics and arrWord)

argArray = oGame.selectWordAndCategory();
console.log("argArray", argArray);

sWord = argArray[2] ;

$("#hint").on("click", function() {
    oGame.getHint(argArray[0], argArray[1] );
}); // end hint 

//JS keypress
document.onkeyup = function(event) {
    sKey = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("Key Press: ", sKey);
    oGame.check(sKey, sWord, guessArray) ;   
} 

//JQ keypress
/* $(document).keypress(function(event) {
    var sKey = String.fromCharCode(event.keyCode).toLowerCase();
    alert(sKey);
    oGame.check(sKey) ;
}); */


}); // end doc ready

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
