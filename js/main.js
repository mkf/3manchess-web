var JSONlikeNEWGAME = new State(
		{
			"board":[
				[9, 10,11,12,13,11,10,9 ,17,18,19,20,21,19,18,17,25,26,27,28,29,27,26,25],
				[14,14,14,14,14,14,14,14,22,22,22,22,22,22,22,22,30,30,30,30,30,30,30,30],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			],
			"moatsstate":[false,false,false],
			"movesnext":1,
			"castling":[[true,true],[true,true],[true,true]],
			"enpassant":[[127,127],[127,127]],
			"halfmoveclock":0,
			"fullmovenumber":1,
			"alivecolors":[true,true,true]
		});

var gameID = -1;
var loginu="";
var passwordu="";
var authkey;
var gameplaydata;
var gamestate;

var ustawobecny = function() {
	var pozycja = [0,0];
	for (pozycja[0]=0;pozycja[0]<6;pozycja[0]++) {
		for (pozycja[1]=0;pozycja[1]<24;pozycja[1]++) {
			if (!(gamestate.board[pozycja[0]][pozycja[1]].empty())) {
				postaw(gamestate.board[pozycja[0]][pozycja[1]],pozycja);
			} else {
				zdejmij(pozycja);
			}
		}
	}
}

var gameformsubmit = function() {
	gameID=parseInt($("#gameid_input").val());
	console.log("gameid_input gave ",gameID);
	klie.play(gameID,function(data) {
		console.log(data);
		gameplaydata = data;
		$("#whitenew").val(data.whiteplayer);
		$("#graynew").val(data.grayplayer);
		$("#blacknew").val(data.blackplayer);
		//to samo z datą gameplay'a
		klie.state(data.stateid,function(stadata) {
			console.log(stadata);
			gamestate = stadata;
			//rotacja, jeśli ustawiona żeby obracać na auto
			//moaty, jak już będą zmienialne (są?)
			//info kto rusza następny i kto żyje
			ustawobecny(); //funkcja od boarda
		});
	});
	return false;
};

$("#game_form").submit(gameformsubmit);

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

$("#newgameform").submit(function() {
	var whiteu=parseInt($("#whitenew").val());
	var grayu=parseInt($("#graynew").val());
	var blacku=parseInt($("#blacknew").val());
	console.log(whiteu,grayu,blacku);
	klie.addGame(JSONlikeNEWGAME,whiteu,grayu,blacku,function(data) {
		console.log(data);
		$("#gameid_input").val(data.gameid);
		gameformsubmit();
	});
	return false;
});
