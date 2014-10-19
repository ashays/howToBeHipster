var totalHipsterScore = 0;
var hipsterIndex = 0;
var totalImportantQuestions = 0;

//Genre scale for each level of hipster
var genres = ["pop", "indie pop", "indie rock", "folk", "hipster"];
var genreCodes = [0, 0, 0, 0, 0]; //Code for genre in Music Dealers API 

$(function(){
	setUpSurvey();

	function setUpSurvey() {
		var HTMLinputStart = "<li><input type=\"radio\" name=\"";
		for(i = 0; i < questions.length; i++) {
			if(questions[i].type != "control") {
				totalImportantQuestions++;
			}
			//Add question to HTML form
			var HTMLnameFor = "question" + i;
			$("#survey").append("<div class=\"questionBlock\">");
			$("#survey").append("<span class=\"question\">" + questions[i].question + "</span><ul>");
			if(questions[i].type == "normal") {
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" id=\"" + HTMLnameFor + "\" value=\"1\"><label for=\"" + HTMLnameFor + "\">1</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"2\"><label for=\"" + HTMLnameFor + "\">2</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"3\"><label for=\"" + HTMLnameFor + "\">3</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"4\"><label for=\"" + HTMLnameFor + "\">4</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"5\"><label for=\"" + HTMLnameFor + "\">5</label></li>");
			} else if(questions[i].type == "anti") {
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"5\"><label for=\"" + HTMLnameFor + "\">1</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"4\"><label for=\"" + HTMLnameFor + "\">2</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"3\"><label for=\"" + HTMLnameFor + "\">3</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"2\"><label for=\"" + HTMLnameFor + "\">4</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"1\"><label for=\"" + HTMLnameFor + "\">5</label></li>");
			} else if(questions[i].type == 'yesNo'){
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"5\"><label for=\"" + HTMLnameFor + "\">Yes</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"1\"><label for=\"" + HTMLnameFor + "\">No</label></li>");
			} else if(questions[i].type == 'control'){
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"0\"><label for=\"" + HTMLnameFor + "\">1</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"0\"><label for=\"" + HTMLnameFor + "\">2</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"0\"><label for=\"" + HTMLnameFor + "\">3</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"0\"><label for=\"" + HTMLnameFor + "\">4</label></li>");
				$("#survey").append(HTMLinputStart + HTMLnameFor + "\" value=\"0\"><label for=\"" + HTMLnameFor + "\">5</label></li>");
			}
			$("#survey").append("</ul></div>");
		}
		$("#survey").append("<input type=\"button\" onclick=\"calculateAndDoHipster()\" value=\"Submit\">");
	}

})

function calculateAndDoHipster() {
	calculateHipsterIndex();
	getHipsterMusic();
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

// var xhr = new XMLHttpRequest();
// xhr.open("POST", "https://private-anon-d150c1785-mdlrs.apiary-mock.com/authentication/login");
// xhr.onreadystatechange = function () {
//   if (this.readyState == 4) {
//     alert('Status: '+this.status+'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'\nBody: '+this.responseText);
//   }
// };
// xhr.send("Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryp7MA4YWxkTrZu0gW\n----WebKitFormBoundaryE19zNvXGzXaLvS5C\nContent-Disposition: form-data; name=\"username\"\nfvirani6@gatech.edu\n----WebKitFormBoundaryE19zNvXGzXaLvS5C\nContent-Disposition: form-data; name=\"password\"\nfv0404\n----WebKitFormBoundaryE19zNvXGzXaLvS5C");	

	//Authentication
	$.ajax({
	  type: "POST",
	  url: "http://api.musicdealers.com/authentication/login",
	  data: { username: "faizan.virani.44@gmail.com", password: "fv0404" },
	  success: function(resp) {
	  	console.log("music dealers success")
	  	$.ajax({
	  		type: "POST",
	  		url: "http://api.musicdealers.com/songs/{1,1}",
	  		data: genres,
		});
	  }
	});


	$.ajax({
  url: "http://developer.echonest.com/api/v4/song/search",
  data: {
  	'api_key': 'KL8LOBUKZKX4SDIXK',
  	'results': '1',
  	'style': genres[hipsterIndex],
  	'bucket': 'tracks'
  },
  dataType: 'json',
  success: function (resp) {
  	console.log("successful"),
  	console.log(resp.response.songs[0].artist_name)
  }
});
}
