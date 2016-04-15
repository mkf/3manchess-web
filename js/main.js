var gameID = -1;
var loginu="";
var passwordu="";
var authdat;

var klie = Client("http://platinum.edu.pl:8082/");

$("#game_form").submit(function() {
	gameID=$("#gameid_input").val();

	return false;
}
		);

$("#loginform").submit(function() {
	var loginu=$("#logininput").val();
	var passwdu=$"#passwdinput").val();
		klie.login(loginu,passwdu,
	function(data) {
		authdat=data;
	});
return false;
});
