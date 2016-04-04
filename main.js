const ZeroFigType = 0;
const Rook = 1;
const Knight = 2;
const Bishop = 3;
const Queen = 4;
const King = 5;
const Pawn = 6;

const White = 1;
const Gray = 2;
const Black = 3;

function fig(figtype,color,pawncenter) {
	this.figtype=figtype;
	this.color=color;
	this.pawncenter=pawncenter;
	this.uint8 = function() {
		return (this.pawncenter << 6) | (this.color << 3) | this.figtype;
	}
	this.empty = function() {
		return (this.figtype==0);
	}
}

function uint8tofig(uint8) {
	return fig(uint8 & 7, (uint8>>3) & 7, (i>>7)>0);
}

function boardfromuint8(sourceboard) {
	var source = sourceboard;
	for (var y=1;y<6;y++) {
			var t = source[y][x];
			source[y][x]=uint8tofig(t);
		}
	}
	return source;
}

function boardtouint8(sourceboard) {
	var source = sourceboard;
	for (var y=1;y<6;y++) {
		for (var x=1;x<24;x++) {
			var t = source[y][x];
			source[y][x]=t.uint8();
		}
	}
	return source;
}

function state(obj) {
	this.board = boardfromuint8(obj.board);
	this.moatsstate = obj.moatsstate;
	this.movesnext = obj.movesnext;
	this.castling = obj.castling;
	this.enpassant = obj.enpassant;
	this.halfmoveclock = obj.halfmoveclock;
	this.fullmovenumber = obj.fullmovenumber;
	this.alivecolors = obj.alivecolors;
	this.prepareforsending = function() {
		var temp = this.board;
		this.board = boardtouint8(temp);
	}
}

function client(baseURL) {
	this.baseURL=String(baseURL);
	this.addGame = func(state,white,gray,black) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/addgame";
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status==422) {
					var err = JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		state.prepareforsending();
		var data = JSON.stringify({"state":state,"whiteplayer":white,"grayplayer":gray,"blackplayer":black});
		xhr.send(data);
	}
	this.after = function (gameid, white, gray, black) {
		func queraft(white, gray, black) {
			if (white!=null || gray!=null || black!=null) {
				var o = "?";
				if (white!=null) {
					o+="white="+white;
					if (gray!=null || black!=null) {
						o+="&";
					}
				}
				if (gray!=null) {
					o+="gray="+gray;
					if (black!=null) {
						o+="&";
					}
				}
				if (black!=null) {
					o+="black="+black;
				}
				return o;
			}
			return "";
		}
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/play/"+gameid+"/after"+queraft(white,gray,black);
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.before = function (gameid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/play/"+gameid+"/after";
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.botinfo = function (botid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/bot/"+botid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.userinfo = function (userid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/user/"+userid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.whoisit = function (playerid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/player/"+playerid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.botkey = function (botid, userid, userauth) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/botkey";
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		var data = JSON.stringify({"botid":botid,"userauth":{"id":userid,"authkey":userauth}});
		xhr.send(data);
	}
	this.login = function (login, passwd) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/login";
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		var data = JSON.stringify({"login":login,"passwd":passwd});
		xhr.send(data);
	}
	this.move = function (moveid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/move/"+moveid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.play = function (gameid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/play/"+gameid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.state = function (stateid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/state/"+stateid;
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					var st = new state(give)
					console.log(st);
					return st;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.vftpgen = function (stateid) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/state/"+stateid+"/vftpgen";
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.newbot = function (whoami, owner, userauth, ownname, settings) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/newbot";
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		var data = JSON.stringify({"whoami":btoa(whoami),"owner":{"id":owner,"authkey":userauth},"ownname":ownname,"settings":btoa(settings)});
		xhr.send(data);
	}
	this.ownersbots = function (owner) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/user/"+owner+"/bots";
		xhr.open("GET",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		xhr.send();
	}
	this.signup = function (login, passwd, name) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/signup";
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		var data = JSON.stringify({"login":login,"passwd":passwd,"name":name});
		xhr.send(data);
	}
	this.turn = function (gameid, fromtoprom, playerid, authkey) {
		xhr = new XMLHttpRequest();
		var url=this.baseURL+"api/play/"+gameid;
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var give = JSON.parse(xhr.responseText);
					console.log(give);
					return give;
				} else if (xhr.status>=400) {
					var err=JSON.parse(xhr.responseText);
					console.log(err);
					throw {"statuscode":xhr.status,"error":err};
				}
			}
		}
		var data = JSON.stringify({"fromtoprom":fromtoprom,"whoplayer":{"id":playerid,"authkey":authkey}});
		xhr.send(data);
	}
}
