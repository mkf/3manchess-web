var State = function(obj) {
	this.board = Tools.boardFromUint8(obj.board);
	this.moatsstate = obj.moatsstate;
	this.movesnext = obj.movesnext;
	this.castling = obj.castling;
	this.enpassant = obj.enpassant;
	this.halfmoveclock = obj.halfmoveclock;
	this.fullmovenumber = obj.fullmovenumber;
	this.alivecolors = obj.alivecolors;

	this.prepareForSending = function() {
		var temp = this.board;
		this.board = boardToUint8(temp);
	};
};
