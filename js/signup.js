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
		$("#authkey").val(authkey);
		$("#userid").val(data.id);
		//getting playerid
		klie.userInfo(parseInt($("#userid").val()),function(pdata) {
			console.log(pdata);
			$("#playerid").val(pdata.playerid);
		});
		enablebotadd();
	});
	return false;
});

function enablebotadd() {
	$("#whoami").prop("disabled",false);
	$("#ownname").prop("disabled",false);
	$("#settings").prop("disabled",false);
	$("#loginsubmit").prop("disabled",false);
}

$("#signingform").submit(function() {
	loginu = $("#signlogin").val();
	passwdu = $("#signpasswd").val();
	klie.signup(loginu,passwdu,$("#signupname").val(),function(data) {
		$("#logininput").val(loginu);
		$("#passwdu").val(passwdu);
		console.log("signup",data);
		authkey = data.authkey;
		$("#authkey").val(authkey);
		$("#userid").val(data.userid);
		$("#playerid").val(data.playerid);
		enablebotadd();
	});
	return false;
});

$("#addbotform").submit(function() {
	var whoami = $("#whoami").val();
	var ownname = $("#ownname").val();
	var settings = $("#settings").val();
	klie.newBot(whoami,ownname,{id:parseInt($("#userid").val()),authkey:authkey},settings,function(data) {
		console.log(data);
		$("#botid").val(data.botid);
		$("#botplayerid").val(data.playerid);
		$("#botauthkey").val(data.authkey);
	});
	return false;
});
