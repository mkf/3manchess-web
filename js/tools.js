var Tools = {
	ZeroFigType: 0,
	Rook: 1,
	Knight: 2,
	Bishop: 3,
	Queen: 4,
	King: 5,
	Pawn: 6,

	White: 1,
	Gray: 2,
	Black: 3,

	uint8ToFigure: function (uint8) {
		return new Figure(uint8 & 7, (uint8 >> 3) & 7, (uint8 >> 6) > 0);
	},

	boardFromUint8: function (sourceBoard) {
		var source = sourceBoard;
		for (var y = 1; y < 6; y++) {
			for (var x = 1; x < 24; x++) {
				var t = source[y][x];
				source[y][x] = Tools.uint8ToFigure(t);
			}
		}

		return source;
	},

	boardToUint8: function (sourceBoard) {
		var source = sourceBoard;
		for (var y = 1; y < 6; y++) {
			for (var x = 1; x < 24; x++) {
				var t = source[y][x];
				source[y][x] = t.uint8();
			}
		}
		return source;
	},

	askPromotion: function (what, topos) {
		return (what == Pawn && topos[0] == 0);
	}
};
