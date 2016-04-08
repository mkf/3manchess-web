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

const color_field_1_light = "#fff";
const color_field_2_light = "#000";
/******************************/

var board_radius; 
var board_radius_rim;
var board_radius_ring;

var board;
var ctx;

var pawns;
var pawns_radius;

/******************************/

window.addEventListener("load", initBoard);
window.addEventListener("load", initPawns);

function initPawns(){
	pawns = document.getElementById('pawns');
	if(pawns.width < pawns.height){
		pawns_radius = pawns.width/2;
	} else {
		pawns_radius = pawns.height/2;
	}
	$('#pawns').translateCanvas({
	  translateX: pawns_radius, translateY: pawns_radius
	});
	console.log("Polecenie 1");
	pawns.addEventListener ("mousemove", function (event) {
        var x = event.clientX-pawns_radius;
        var y = event.clientY-pawns_radius;
		var st = kat(x, y);
		var kol = Math.round((st+7.5)/15);
		var pier = Math.round((Math.pow(x*x+y*y, (1/2))-(1/2*board_radius_ring))/board_radius_ring)-1;
		if(pier < 1 || pier > 6){
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
		for(i = 1; i <= 24; i++){
			for(j = 1; j <= 6; j++){
				drawField(i, j);
			}
		}
}

function drawField(a, b){
	var color;
	var ang_start = 15*(a-1);
	var ang_stop = ang_start+15;
	var r_1 = (b+1)*board_radius_ring;
	var r_2 = r_1+board_radius_ring;
	var w = a;
	if(b%2 == 1){
		w++;
	}
	if(w%2 == 0){
		color = color_field_1_light;
	} else {
		color = color_field_2_light;
	}
	$('#pawns').drawPath({
	  fillStyle: color,
	  strokeWidth: 4,
	  closed: true,
	  layer: true,
	  name: 'l'+a+'_'+b,
	  x: 0, y: 0,
	  mouseover: function(layer) {
		$('#pawns').setLayer(layer, {
		  visible: true,
      fillStyle: 'blue'
		})
		.drawLayers();
	  },
	  mouseout: function(layer) {
		$('#pawns').setLayer(layer, {
		  visible: true,
      fillStyle: color
		})
		.drawLayers();
	  },
	  p1: {
		type: 'arc',
		x: 0, y: 0,
		start: ang_start, end: ang_stop,
		radius: r_1
	  },
	  p2: {
		type: 'arc',
		x: 0, y: 0,
		start: ang_start, end: ang_stop,
		radius: r_2
	  }
	});
}

function kat(x, y){
	if(x >= 0){
		return Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	} else {
		return 360-Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	}
}

function pawn(){
	var w = board_radius_ring/2;
	$('#pawns').addLayer({
	  type: 'rectangle',
	  name: 'pionek_1',
	  fillStyle: '#585',
	  x: 0, y: 0,
	  width: w, height: w
	})
	.drawLayers();
}

function pionek(x, y, nazwa){
	$('#pawns').drawArc({
	  strokeStyle: '#000',
	  strokeWidth: 5,
	  x: x, y: y,
	  radius: 50,
	  layer: true,
	  name: nazwa
	});
}

function animate(x1, y1, x2, y2, nazwa){
	$('#pawns').animateLayer(nazwa, {
	  x: x1, y: y1,
	  strokeStyle: '#fff'
	}, 1000, function(layer) {
	  $(this).animateLayer(layer, {
		strokeStyle: '#000',
		x: x2, y: y2
	  }, 'slow', 'swing');
	});
}

function remove(nazwa){
	$('#pawns').removeLayer(nazwa);
	$('#pawns').drawLayers();
}

function pionek2(x, y){
	// Create a rectangle layer
	$('#pawns').addLayer({
	  type: 'rectangle',
	  fillStyle: '#585',
	  x: x, y: y,
	  width: 100, height: 50
	})
	.drawLayers();
}

function initBoard(){
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
		drawBoard();
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
}
