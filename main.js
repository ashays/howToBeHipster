var totalHipsterScore;
var hipsterIndex;
var totalImportantQuestions;

//Genre scale for each level of hipster
var genres = ["pop", "indie pop", "indie rock", "folk", "hipster"];
var genreCodes = [0, 0, 0, 0, 0]; //Code for genre in Music Dealers API 

$(function(){
	setUpSurvey();

	function setUpSurvey() {
		for(i = 0; i < questions.length; i++) {
			if(questions[i].type != "control") {
				totalImportantQuestions++;
			}
			//Add question to HTML form
			$("#survey").append("<div class=\"questionBlock\">");
			$("#survey").append("<span class=\"question\">" + questions[i].question + "</span>");
			if(questions[i].type == "normal") {
				//append all the answer choices with the values matching the labels
			} else if(questions[i].type == "anti") {
				//append all the answer choices except with the values inversed of the labels
			} //add else if the question type is the yes/no thing
		}
	}

})

function calculateAndDoHipster() {
	calculateHipsterIndex();

}

function calculateHipsterIndex() {
	for(i = 0; i < question.length; i++) {
		totalHipsterScore += $("input:radio[name=question" + i + "]:checked").val();
	}
	hipsterIndex = totalHipsterScore / totalImportantQuestions;
}

function getHipsterMusic() {
	var genres = genreCodes[hipsterIndex - 1];

	//Authentication
	$.ajax({
	  type: "POST",
	  url: "http://api.musicdealers.com/authentication/login",
	  data: { username: "ashay@gatech.edu", password: "brownteam" },
	});

	$.ajax({
	  type: "POST",
	  url: "http://api.musicdealers.com/songs/{1,1}",
	  data: genres,
	});
}
