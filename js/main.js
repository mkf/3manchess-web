var JSONlikeNEWGAME = { //new State(
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
};
//JSONlikeNEWGAME.prepareForSending();

var loginu="";
var passwordu="";
var gamestate;

function strbefaft(befaft,aftnotbef) {
	return "<input type=\"radio\" name=\"switchba\" class=\"switchba\" value=\"" +
		(aftnotbef?befaft.move.aftergp:befaft.move.beforegp) +
		"\"> ID"+befaft.id+" " +
		befaft.move.fromto[0]+","+befaft.move.fromto[1]+"→"+befaft.move.fromto[2]+","+befaft.move.fromto[3] +
		"("+befaft.move.pawnpromotion+") playerid"+befaft.move.playerid +
		(aftnotbef?" →"+befaft.move.aftergp:" "+befaft.move.beforegp+"← ") +
		"<br>";
};

var ustawobecny = function() {
	var pozycja = [0,0];
	for (pozycja[0]=0;pozycja[0]<6;pozycja[0]++) {
		for (pozycja[1]=0;pozycja[1]<24;pozycja[1]++) {
			if (!(gamestate.board[pozycja[0]][pozycja[1]].empty())) {  //jeżeli jest w grze na tym polu
				postaw(gamestate.board[pozycja[0]][pozycja[1]],pozycja); //postaw tego pionka na planszy
			} else {  //jeżeli niczego nie ma być na tym polu
				zdejmij(pozycja); //wyczyść to pole, jeżeli coś na nim jest
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
		klie.vftpgen(data.stateid,function(vftpdat) {
			console.log(vftpdat);
			vftplist = vftpdat;
			ladujvftp();
			showalive();
			showcastling();
		});
	});
	return false;
};

var castnames = [['cawk','cawq'],['cagk','cagq'],['cabk','cabq']];

var castwhat = [Tools.King, Tools.Queen];

var showalive = function() {
	var ouralive = gamestate.alivecolors;
	for (var i=0;i<3;i++) {
		var colstr = Tools.coldict[i+1].toLowerCase();
		if (ouralive[i]) {
			document.getElementById(colstr).src = pionekurl(i+1,Tools.Pawn);
			if (gamestate.movesnext===i+1) {
				document.getElementById(colstr).height = 60;
			} else {
				document.getElementById(colstr).height = 40;
			}
		} else {
			document.getElementById(colstr).src = "#";
		}
	}
};

var showcastling = function() {
	var ourcastl = gamestate.castling;
	for (var i=0;i<3;i++) {
		for (var j=0;j<2;j++) {
			var elestr = castnames[i][j];
			if (ourcastl[i][j]) {
				document.getElementById(elestr).src = pionekurl(i+1,castwhat[j]);
			} else {
				document.getElementById(elestr).src = "#";
			}
		}
	}
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

var beaffunc = function(aftnotbef) {
	var wearereturnin = function(datt) {
		var dattlen = datt.length;
		var ourstrr = " ";
		for (var ii=0;ii<dattlen;ii++) {
			ourstrr+=strbefaft(datt[ii],aftnotbef);
		}
		document.getElementById("afterlist").innerHTML=ourstrr;
		doradios();
	};
	return wearereturnin;
};

var doradios = function() {
	$("input[type=radio][name=switchba]").change(function() {
		console.log("sba",this.value);
		$("#gameid_input").val(this.value);
		gameformsubmit();
	});
};

var befchefun = function() {
	gameID=parseInt($("#gameid_input").val());
	klie.before(gameID, beaffunc(false));
};

$("#getbefore").click(befchefun);

var aftchefun = function() {
	gameID=parseInt($("#gameid_input").val());
	klie.after(gameID,null,null,null,beaffunc(true));
};

$("#getafter").click(aftchefun);

var thisispolling;

$("#stapoll").click(function() {
	console.log("stapoll");
	$("#stapoll").prop("disabled",true);
	$("#stopoll").prop("disabled",false);
	thisispolling = setInterval(aftchefun,parseInt($("#intervalms").val()));
});

$("#stopoll").click(function() {
	console.log("stopoll");
	clearInterval(thisispolling);
	$("#stopoll").prop("disabled",true);
	$("#stapoll").prop("disabled",false);
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
