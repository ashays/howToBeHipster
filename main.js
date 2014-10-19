var totalHipsterScore = 0;
var hipsterIndex = 0;
var totalImportantQuestions = 0;

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
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"1\">1<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"2\">2<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"3\">3<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"4\">4<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"5\">5<br />");
			} else if(questions[i].type == "anti") {
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"5\">1<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"4\">2<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"3\">3<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"2\">4<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"1\">5<br />");
			} else if(questions[i].type == 'yesNo'){
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"5\">Yes<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"1\">No<br />");

			} else if(questions[i].type == 'control'){
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"0\">1<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"0\">2<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"0\">3<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"0\">4<br />");
				$("#survey").append("<input type=\"radio\" name=\"question" + i + "\" value=\"0\">5<br />");
			}
		}
		$("#survey").append("<input type=\"button\" onclick=\"calculateAndDoHipster()\" value=\"Submit\">");
	}

})

function calculateAndDoHipster() {
	calculateHipsterIndex();

}

function calculateHipsterIndex() {
	for(i = 0; i < questions.length; i++) {
		console.log(parseInt($("input:radio[name=question" + i + "]:checked").val()));
		totalHipsterScore += parseInt($("input:radio[name=question" + i + "]:checked").val());
	}
	hipsterIndex = Math.round(totalHipsterScore / totalImportantQuestions);
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
