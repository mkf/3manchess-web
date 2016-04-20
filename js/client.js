var gameID = -1;
var gameplaydata;
var authkey;
var vftplist;

var Client = function (baseUrl) {
	this.baseURL = String(baseUrl);

	this.addGame = function (state, white, gray, black, callback, callbackParameters) {
		state.prepareForSending();
		ourqueryis = ({
			url: this.baseURL + "api/addgame",
			type: "POST",
			dataType: "json",
			data: JSON.stringify({state: state, whiteplayer: white, grayplayer: gray, blackplayer: black}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.after = function (gameid, white, gray, black, callback, callbackParameters) {
		function queraft(white, gray, black) {
			if (white != null || gray != null || black != null) {
				var o = "?";
				if (white != null) {
					o += "white=" + white;
					if (gray != null || black != null) {
						o += "&";
					}
				}
				if (gray != null) {
					o += "gray=" + gray;
					if (black != null) {
						o += "&";
					}
				}
				if (black != null) {
					o += "black=" + black;
				}
				return o;
			}
			return "";
		}

		ourqueryis = ({
			url: this.baseURL + "api/play/" + gameid + "/after" + queraft(white, gray, black),
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};


	this.before = function (gameid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/play/" + gameid + "/after",
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.botInfo = function (botid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/bot/" + botid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.userInfo = function (userid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/user/" + userid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.whoIsIt = function (playerid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/player/" + playerid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.botKey = function (botid, userid, userauth, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/botkey",
			type: "POST",
			dataType: "json",
			data: JSON.stringify({botid: botid, userauth: {id: userid, authkey: userauth}}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.login = function (login, passwd, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/login",
			type: "POST",
			dataType: "json",
			data: JSON.stringify({"login": login, "passwd": passwd}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.move = function (moveid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/move/" + moveid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.play = function (gameid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/play/" + gameid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.state = function (stateid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/state/" + stateid,
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				var statefromdata = new State(data);
				console.log(statefromdata);
				callback(statefromdata, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.vftpgen = function (stateid, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/state/" + stateid + "/vftpgen",
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.diff = function(moveid,callback,callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/move/"+moveid+"/diff",
			type:"GET",
			dataType: "json",
			complete: function() {
			},
			success: function (data) {
				console.log(data);
				callback(data,callbackParameters);
			},
			error: function(err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.newBot = function (whoami, owner, userauth, ownname, settings, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/newbot",
			type: "POST",
			dataType: "json",
			data: JSON.stringify({
				whoami: btoa(whoami),
				owner: {id: owner, authkey: userauth},
				ownname: ownname,
				settings: btoa(settings)
			}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.ownersBots = function (owner, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/user/" + owner + "/bots",
			type: "GET",
			dataType: "json",
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.signup = function (login, passwd, name, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/signup",
			type: "POST",
			dataType: "json",
			data: JSON.stringify({login: login, passwd: passwd, name: name}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};

	this.turn = function (gameid, fromtoprom, playerid, authkey, callback, callbackParameters) {
		ourqueryis = ({
			url: this.baseURL + "api/play/" + gameid,
			type: "POST",
			dataType: "json",
			data: JSON.stringify({fromtoprom: fromtoprom, whoplayer: {id: playerid, authkey: authkey}}),
			complete: function () {
			},
			success: function (data) {
				console.log(data);
				callback(data, callbackParameters);
			},
			error: function (err) {
				console.log(err);
			}
		});
		console.log(ourqueryis);
		jQuery.ajax(ourqueryis);
	};
};

var klie = new Client("http://platinum.edu.pl:8082/");
