$(function(){

var totalHipsterScore;
var hipsterScore;

//Genre scale for each level of hipster
var genres = ["pop", "indie pop", "indie rock", "folk", "hipster"];
var genreCodes = [0, 0, 0, 0, 0]; //Code for genre in Music Dealers API 

setUpSurvey();

function setUpSurvey() {
	for(i = 0; i < questions.length; i++) {
		$("#survey").append("<div class=\"questionBlock\">");
		$("#survey").append("<span class=\"question\">" + questions[i].question + "</span>");
	}
}

})