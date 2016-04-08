/* encoding="UTF-8" */
/*******************************
*
*
*		3mannchess
*
*	Patryk Kisielewski
*
*******************************/
const color_rim = "#ff9900";
const color_field_1 = "#a65c13";
const color_field_2 = "#f4d80b";
const color_moat = "#66ff33";

const color_field_1_light = "#003300";
const color_field_2_light = "#009900";
/******************************/

var board_radius; 
var board_radius_rim;
var board_radius_ring;

var board;
var ctx;

var pawns;
var pawns_radius;

/******************************/

//window.addEventListener("load", initBoard);
window.addEventListener("load", initPawns);

function initPawns(){
	pawns = document.getElementById('pawns');
	if(pawns.width < pawns.height){
		pawns_radius = pawns.width/2;
	} else {
		pawns_radius = pawns.height/2;
	}
	board_radius_rim = pawns_radius-pawns_radius/20;
	board_radius_ring = board_radius_rim/8;
	$('#pawns').translateCanvas({
	  translateX: pawns_radius, translateY: pawns_radius
	})
	.drawArc({
		fillStyle: color_rim,
		layer: true,
		name: 'rim',
		x: 0, y: 0,
		radius: pawns_radius,
		start: 0, stop: 360
	});
	pawns.addEventListener ("mousemove", function (event) {
        var x = event.clientX-pawns_radius;
        var y = event.clientY-pawns_radius;
		var st = kat(x, y);
		var kol = Math.round((st+7.5)/15)-1;
		kol = kol-8;
		if(kol < 0) kol = kol+24;
		var pier = 7-Math.round((Math.pow(x*x+y*y, (1/2))-(1/2*board_radius_ring))/board_radius_ring);
		if(pier < 0 || pier > 5){
			pier = "X";
			kol = "X";
		}
		
		console.log("x: "+x+" y: "+y+" kąt: "+Math.round(st)+" st. kol: "+kol);
		
		document.getElementById("col").innerHTML = kol;
		document.getElementById("row").innerHTML = pier;
		
    });
	drawFields();
}

function drawFields(){
        var i, j;
		for(i = 0; i <= 23; i++){
			for(j = 0; j <= 5; j++){
				drawField(i, j);
			}
		}
		standardColor();
}

function drawField(a, b){
	var ang_start = 8*15+15*a;
	var ang_stop = ang_start+15;
	var r_1 = (7-b)*board_radius_ring;
	var r_2 = r_1+board_radius_ring;
	var w = a;
	if(b%2 == 1){
		w++;
	}
	$('#pawns').drawPath({
	  closed: true,
	  layer: true,
	  name: 'l'+a+'_'+b,
	  x: 0, y: 0,
	  p1: {
		type: 'arc',
		x: 0, y: 0,
		start: ang_start, end: ang_stop,
		radius: r_1
	  },
	  p2: {
		type: 'arc',
		x: 0, y: 0,
		ccw: true,
		start: ang_stop, end: ang_start,
		radius: r_2
	  }
	});
}

function changeColor(a, b){
	var color;
	var w = a+1;
	if(b%2 == 1){
		w++;
	}
	if(w%2 == 0){
		color = color_field_1_light;
	} else {
		color = color_field_2_light;
	}
	$('#pawns').setLayer('l'+a+'_'+b, {
		fillStyle: color
	});
}

function standardColor(){
	var i, j;
	var color;
	var w;
	for(i = 0; i <= 23; i++){
		for(j = 0; j <= 5; j++){
			w = i+1;
			if(j%2 == 1){
				w++;
			}
			if(w%2 == 0){
				color = color_field_1;
			} else {
				color = color_field_2;
			}
			$('#pawns').setLayer('l'+i+'_'+j, {
				fillStyle: color
			});
		}
	}
	$('#pawns').drawLayers();
}

function draw(){
	$('#pawns').drawLayers();
}

function removeField(a, b){
	$('#pawns').removeLayer('l'+a+'_'+b);
}

function kat(x, y){
	if(x >= 0){
		return Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	} else {
		return 360-Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	}
}

function przykladowePodswietlenie(){
	changeColor(1, 1);
	changeColor(2,2);
	changeColor(3,3);
	changeColor(4,3);
	changeColor(10,4);
	changeColor(11,4);
	changeColor(11,5);
	draw();
}

/*** PIONKI ***/
function pionek(color, figtype, nazwa){
	$('#pawns').drawImage({
		layer: true,
		name: nazwa,
		source: pionekurl(color, figtype),
		x: 0, y: 0
	});
}

function przesunPionek(x, y, nazwa){
	$('#pawns').setLayer(nazwa, {
		x: x, y: y
	})
	.drawLayers();
}

function remove(nazwa){
	$('#pawns').removeLayer(nazwa)
	.drawLayers();
}
/*** KONIEC PIONKOW ***/

/***Stary zwykły Canvas rysujący szachownicę***/
/*function initBoard(){
	board = document.getElementById('board');
	if (board.getContext){
		ctx = board.getContext('2d');
		if(board.width < board.height){
			board_radius = board.width/2;
		} else {
			board_radius = board.height/2;
		}
		board_radius_rim = board_radius-board_radius/20;
		board_radius_ring = board_radius_rim/8;
		ctx.translate(board_radius,board_radius);
		//drawBoard();
	}
}

function drawBoard() {
	ctx.beginPath();
	ctx.fillStyle=color_rim;
	ctx.arc(0,0,board_radius,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	
	var i;
	var j;
	var licz = 0;
	var l;
	var w;
	for(j = 0; j < 6; j++) {
		for(i = 0; i < 24; i++){
			ctx.beginPath();
			if(licz%2 == 0) {
				ctx.fillStyle = color_field_1;
			} else {
				ctx.fillStyle = color_field_2;
			}
			ctx.rotate(Math.PI/12);
			ctx.moveTo(0,0);
			l = board_radius_rim*(8-j)/8;
			ctx.lineTo(l,0);
			ctx.arc(0,0,l,0,Math.PI/12);
			ctx.closePath();
			ctx.fill();
			licz++;
		}
		
		if(j < 3){
		w = Math.PI/120*((4-j)/4);
		ctx.rotate(Math.PI/6);
		ctx.rotate(-w/2);
			for(i = 0; i < 3; i++){
					l = board_radius_rim;
					ctx.beginPath();
					ctx.moveTo(0,0);
					ctx.lineTo(l,0);
					ctx.arc(0,0,l,0,w);
					ctx.closePath();
					ctx.fillStyle = color_moat;
					ctx.fill();
					ctx.rotate(Math.PI*2/3);
				}
				ctx.rotate(-Math.PI/6);
				ctx.rotate(w/2);
			}
		licz++;
	}
	l = board_radius_rim*2/8;
	ctx.beginPath();
	ctx.arc(0,0,l,0,2*Math.PI);
	ctx.fillStyle=color_rim;
	ctx.closePath();
	ctx.fill();
}*/


/*** Adres obrazków pionków **/
const basepionki = "res/pionki/Chess_";
const baseendpionki = "t60.png";

function pionekurl(color, figtype) {
	var typ = "";
	var kol = "";
	switch (color) {
		case Tools.White: kol="l";break;
		case Tools.Gray: kol="g";break;
		case Tools.Black: kol="d";break;
	}
	switch (figtype) {
		case Tools.Rook: typ="r";break;
		case Tools.Knight: typ="n";break;
		case Tools.Bishop: typ="b";break;
		case Tools.King: typ="k";break;
		case Tools.Queen: typ="q";break;
		case Tools.Pawn: typ="p";break;
	}
	return basepionki+typ+kol+baseendpionki;
}
