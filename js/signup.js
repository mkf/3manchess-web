var loginu = "";
var passwdu = "";
var authkey = "";

$("#loginform").submit(function() {
	var loginu=$("#logininput").val();
	var passwdu=$("#passwdinput").val();
	console.log(loginu,passwdu);
	console.log(klie);
	klie.login(loginu,passwdu,function(data) {
		console.log(data);
		authkey = data.authkey;
		$("#userid").val(data.id);
		//getting playerid
		klie.userInfo(parseInt($("#userid").val()),function(pdata) {
			console.log(pdata);
			$("#playerid").val(pdata.playerid);
		});
	});
	return false;
});

$("#signingform").submit(function() {
	loginu = $("#signlogin").val();
	passwdu = $("#signpasswd").val();
	klie.signup(loginu,passwdu,$("#signupname").val(),function(data) {
		$("#logininput").val(loginu);
		$("#passwdu").val(passwdu);
		console.log("signup",data);
		authkey = data.authkey;
		$("#userid").val(data.userid);
		$("#playerid").val(data.playerid);
	});
	return false;
});
