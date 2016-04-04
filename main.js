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
				}
			}
		}
		state.prepareforsending();
		var data = JSON.stringify({"state":state,"whiteplayer":white,"grayplayer":gray,"blackplayer":black});
		xhr.send(data);
	}
}

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

function state(uint8board, moatsstate, movesnext, castling, enpassant, halfmoveclock, fullmovenumber, alivecolors) {
	this.board = boardfromuint8(board);
	this.moatsstate = moatsstate;
	this.movesnext = movesnext;
	this.castling = castling;
	this.enpassant = enpassant;
	this.halfmoveclock = halfmoveclock;
	this.fullmovenumber = fullmovenumber;
	this.alivecolors = alivecolors;
	this.prepareforsending = function() {
		var temp = this.board;
		this.board = boardtouint8(temp);
	}
}

function statejson(obj) {
	return state(obj.board, obj.moatsstate, obj.movesnext, obj.castling, obj.enpassant, obj.halfmoveclock, obj.fullmovenumber, obj.alivecolors);
}
