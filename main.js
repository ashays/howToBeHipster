$(function(){

var totalHipsterScore;
var hipsterIndex;
var totalImportantQuestions;

//Genre scale for each level of hipster
var genres = ["pop", "indie pop", "indie rock", "folk", "hipster"];
var genreCodes = [0, 0, 0, 0, 0]; //Code for genre in Music Dealers API 

setUpSurvey();

function setUpSurvey() {
	for(i = 0; i < questions.length; i++) {
		if(questions[i].type != "control") {
			totalImportantQuestions++;
		}
		//Add question to HTML form
		$("#survey").append("<div class=\"questionBlock\">");
		$("#survey").append("<span class=\"question\">" + questions[i].question + "</span>");
	}
}

function calculateHipsterIndex() {
	for(i = 0; i < question.length; i++) {
		totalHipsterScore += $("input:radio[name=question" + i + "]:checked").val();
	}
	hipsterIndex = totalHipsterScore / totalImportantQuestions;
}

})