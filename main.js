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
