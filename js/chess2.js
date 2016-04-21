/* encoding="UTF-8" */
/*******************************
 *
 *
 *		3manchess
 *
 *	Patryk Kisielewski
 *
 *******************************/
const color_rim = "#ff9900"; //kolor brzegu
const color_field_1 = "#a65c13"; //kolor ciemnego pola
const color_field_2 = "#f4d80b"; //kolor jasnego pola
const color_moat = "#66ff33"; //kolor moat'a

const color_field_1_light = "#003300"; //kolor podświetlonego ciemnego pola
const color_field_2_light = "#009900"; //kolor podświetlonego jasnego pola
/******************************/

var board_radius_rim; 	// promień bez brzegu
var board_radius_ring; 	// szerokość jednego pierścienia

var pawns; 		//nasz obiekt
var pawns_radius; 	//promień szachownicy wraz z brzegiem

var color_rotation = 1; 	//color który jest na dole zwrócony w stronę usera //demo: 1, will be NaN by def (there should be no default here)
//	potrzebny jest przycisk który będzie zmieniał tą zmienną na wybrany kolor i triggerował przerysowanie planszy

var pionekIsClicked = false; //czy pionek został klinięty
var pionekClickedName; //nazwa pionka podświetlonego
var pionekClickedChessPoz;

var pionek_width = 60; //wymiary pionkow
var pionek_height = 60;
var pionek_width_light = 40;
var pionek_height_light = 40;

var gameboard = cleanboard();
var nazwypionkow = cleanboard();
var vftparr = cleanarrboard();
console.log(cleanboard());
var nowyoucan = true;

/******************************/

var ladujvftp = function () {
	var naszapo = [0,0];
	for (naszapo[0]=0;naszapo[0]<6;naszapo[0]++) {
		for (naszapo[1]=0;naszapo[1]<24;naszapo[1]++) {
			var vftpourlenftp = vftplist.fromtoproms.length;
			for (var ii=0;ii<vftpourlenftp;ii++) {
				if (vftplist.fromtoproms[ii].fromto[0]==naszapo) {
					vftparr[naszapo[0]][naszapo[1]].push({
						to: vftplist.fromtoproms[ii].fromto[1], 
						prom: vftplist.fromtoproms[ii].pawnpromotion
					});
				}
			}
		}
	}
};

var czypytacprom = function (ofromto) {
	var vfarrlent = vftparr[ofromto[0][0]][ofromto[0][1]].length;
	var vfarrpromlist = [];
	for (var ii=0;ii<vfarrlent;ii++) {
		var vftarrpromcur = vftparr[ofromto[0][0]][ofromto[0][1]][ii].prom;
		if (vftarrpromcur>0) {
			vfarrpromlist.push(vftarrpromcur);
		}
	}
	return vfarrpromlist;
}

function nazwapola(chesspos) {
	return "pos"+chesspos[0]+"a"+chesspos[1]+"";
}

console.log(nazwapola([0,0]));
console.log(nazwapola([5,23]));

var wedlugnazw = gentablicanazw();
console.log(wedlugnazw);

function gentablicanazw() {
	var tocozwracamy = {};
	var naszateraznazwapola;
	var naszpos;
	for (i=0;i<6;i++) {
		for (j=0;j<24;j++) {
			naszpos = [i,j];
			naszateraznazwapola = nazwapola(naszpos);
			tocozwracamy[naszateraznazwapola]=naszpos;
		}
	}
	return tocozwracamy;
}

function cleanboard() {
	var clearboard = new Array(6);
	for (var i=0;i<6;i++) {
		clearboard[i] = new Array(24);
	}
	return clearboard;
}

function cleanarrboard() {
	var clearboard = new Array(6);
	for (var i=0;i<6;i++) {
		clearboard[i] = new Array(24);
		for (var iii=0;iii<24;iii++) {
			clearboard[i][iii]=[];
		}
	}
	return clearboard;
}

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n; //modulo zrobione tak żeby nie było negative
}

window.addEventListener("load", initPawns);

function initPawns(){
	pawns = document.getElementById('pawns'); 
	if(pawns.width < pawns.height){
		pawns_radius = pawns.width/2; 
	} else {
		pawns_radius = pawns.height/2;
	}
	board_radius_rim = pawns_radius-pawns_radius/20; //promień bez brzegu to promień obiektu bez 1/20 czyli szer brzegu
	board_radius_ring = board_radius_rim/8;    //szerokość jednego pierścienia to promień_bez_brzegu / (2dziury+6ranks)
	$('#pawns').translateCanvas({
		translateX: pawns_radius, translateY: pawns_radius}) 	//translacja żeby środek był (0,0)
		.drawArc({ 			//rysuj brzeg
			fillStyle: color_rim, 		//brzeg o kolorze brzegu
			layer: true, 			//jest... warstwą?
			name: 'rim', 			//nazwiemy go 'rim'
			x: 0, y: 0, 			//środek łuku w (0,0) po translacji czyli naszym środku
			radius: pawns_radius, 		//o promieniu całego naszego obiektu
			start: 0, stop: 360 		//od 0 do 360 (czyli koło)
		});
	pawns.addEventListener ("mousemove", function (event) { //eventlistener na ruch myszy
		var x = event.clientX-pawns_radius;
		var y = event.clientY-pawns_radius; 	//współrzędne gdzie jest mysz z translacją żeby środek był 0,0
		var strad = pospolar(x,y); 		//strad to współrzędne biegunowe położenia myszy
		console.log(strad);
		console.log(poscartes(strad.phi,strad.r));
		var boardstrad=phiboard(strad.phi); 		//boardstrad to kąt phi szachownicowy od osi zerowego file'a
		console.log(boardstrad);
		var boardpos = boardrankfile(boardstrad,strad.r); 	//pozycja szachownicowa położenia myszy
		console.log(boardpos);
		if(boardpos[0] < 0 || boardpos[0] > 5){ 	//jeśli !boardpos.Correct
			boardpos = [false,false];  			//podmień współrzędne na Boolean(false)
		}

		console.log("x: "+x+" y: "+y+" kąt: "+Math.floor(boardstrad*180/Math.PI)+" st. kol: "+boardpos);
		//	daj do logu współrzędne myszy, kąt w stopniach i pozycję szachownicową

		document.getElementById("col").innerHTML = boardpos[1];	//daj pozycję szachownicową do GUI
		document.getElementById("row").innerHTML = boardpos[0];
	});
	drawFields();
	//demo figures below somehow interfered with chessboard
	//pionek(1,1,"p1",[0,0]);
	//pionek(3,3,"p2",[4,10]);
	//pionek(2,2,"p3",[5,20]);
}



function drawFields(){ 	//funkcja dla każdego pola wzywająca drawField
	var i, j;
	for(i = 0; i < 6; i++){
		for(j = 0; j < 24; j++){
			drawField(i, j); 
		}
	}
	standardColor();  //kolorowanie na standardowe, ciemny i jasny, kolory szachownicy 
}

function drawField(a, b){  	//drawField(file, rank)
	var ang_start = 8*15+15*b; // zaczynamy od 120°, potem jedziemy co 15° (jeden file)
	var ang_stop = ang_start+15; // rysujemy jeden file-łuk, czyli 15°
	var r_1 = (7-a)*board_radius_ring;  //rysujemy rank-promień, konwersja pozycji boardowej
	var r_2 = r_1+board_radius_ring; //po drugiej stronie ranka
	var w = b;  	//obsolete?
	if(a%2 == 1){	//obsolete?
		w++;	//obsolete?
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
		},
		click: function(layer){
			if(pionekIsClicked){ //jeżeli jest kliknięty pionek
				pionekIsClicked = false; //odkliknij go
				standardColor(); //wyzeruj kolorowanie
				$('#pawns').setLayer(pionekClickedName,{
					width: pionek_width, //przywróć normalne wymiary pionka
					height: pionek_height
				});
				var czypytour = czypytacprom([pionekClickedChessPoz,[a,b]]); //zbierz możliwe promocje
				var czypytourlennn = czypytour.length;
				var naszpromotionpokico = 0; //jeżeli nie ma możliwej promocji, promocja jest 0
				if (czypytourlennn>0) { //jeżeli są możliwe promocje
					naszpromotionpokico = parseInt(prompt("Promotion: "+czypytour)); //pytaj o promocję
				}
				klie.turn(  //wykonaj ruch
						gameID, //na gameplayu o id
						{
							"fromto":[pionekClickedChessPoz,[a,b]],
								//z pozycji klikniętego pionka do pozycji tego pola
							"pawnpromotion":naszpromotionpokico //z promocją na
						},
						parseInt($("#playerid").val()),  //jako gracz o playerid pobranym z disabled input
						authkey, //klucz API
						function(turdata) { //jak już będzie id ruchu i after
							console.log(turdata);
							$("#gameid_input").val(turdata.after);  //wstawić to do input disabled
						}
					 );
				//animujPionek(pozycjasrodka([a,b])); //zbędna animacja, w sumie nie wiem czy tego nie wywalić bo mylące przesunięcie
					//animację możnaby włączyć, jeśli byłby wzywany gameformsubmit()
				//gameformsubmit(); //można to zastąpić po prostu podświetlonym pokazaniem na liście after, nie trzeba wtedy przerzucać gameformsubmit gdzieś wcześniej
			}
		}
	});
}

function changeColor(a, b){
	var color;
	var w = b+1;
	if(a%2 == 1){
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
	for(i = 0; i < 6; i++){
		for(j = 0; j < 24; j++){
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

function posradius(x,y) {  //zwraca promień = √(x²+y²)
	return Math.pow(x*x+y*y,(1/2));
}

function posangle(x,y) {
	return Math.atan2(x,y);
}

function poscartes(phi,r) {
	return [Math.sin(phi)*r,Math.cos(phi)*r]; //exchanged sin with cos
}

function pospolar(x,y) {
	return {phi:posangle(x,y),r:posradius(x,y)};
}

function phiboard(canvasatan2) {
	return (Math.PI*(1/3))-canvasatan2;
}
function phicanvas(boardphi) {
	return phiboard(boardphi);
}

function boardrankfile(boardphi,radius) {
	return [ 7 - Math.floor( radius/board_radius_ring ) , ( Math.floor( boardphi / (Math.PI/12) ) ).mod(24) ];
}

function chesspos(rankfile) {
	return [rankfile[0],   rankfile[1] +   (  8 * (color_rotation-1)  )   ];
}

function dechess(poschess) {
	return [poschess[0],  poschess[1] - ( 8 * (color_rotation-1) )  ];
}

function kat(x, y){
	if(x >= 0){
		return Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	} else {
		return 360-Math.acos((-y)/Math.pow(x*x+y*y, (1/2)))*(180/Math.PI);
	}
}

function pozycjasrodekpolarny(rankfile) {
	return {phi: (rankfile[1]+0.5)*Math.PI/12, r: (-rankfile[0]+7+0.5)*board_radius_ring};
}

function pozycjasrodka(rankfile) {
	var a = pozycjasrodekpolarny(rankfile);
	return poscartes(phicanvas(a.phi),a.r);
}
function przykladowePodswietlenie(){ 	//test podświetlenia pól
	changeColor(1, 1);
	changeColor(2,2);
	changeColor(3,3);
	changeColor(4,3);
	changeColor(4,10);
	changeColor(4,11);
	changeColor(5,11);
	draw();
}

/*** PIONKI ***/

//pionek: nowy pionek, konstruowany z kolory, typu, nazwy obiektu (initpos?) i współrzędnych canvasa
function pionek(color, figtype, nazwa, poschess){ 	
	var poz = pozycjasrodka(dechess(poschess));
	$('#pawns').drawImage({
		layer: true,
		name: nazwa, 
		data: {
			szachpos: [poschess[0],poschess[1]]
		},
		source: pionekurl(color, figtype),
		x: poz[0], y: poz[1],
		width: pionek_width,
		height: pionek_height,
		click: function(layer){  //jeżeli pionek kliknięty
			if(pionekIsClicked){ //jeżeli jest już jakiś kliknięty pionek
				$(this).setLayer(pionekClickedName,{
					width: pionek_width, //przywróć tamtemu klikniętemu pionkowi standardowy rozmiar
					height: pionek_height
				})
			}
			$(this).setLayer(layer, {
				width: pionek_width_light,  //następnie zmień temu pionkowi rozmiar na "wciśnięty"
				height: pionek_height_light
			})
			.drawLayers();  //i przerysuj warstwy
			pionekIsClicked = true; //ustaw że pionek jest kliknięty
			pionekClickedName = layer.name; //zmienną z nazwą
			pionekClickedChessPoz = layer.data.szachpos; //i pozycją
			var naszlenvftpu = vftparr[pionekClickedChessPoz[0]][pionekClickedChessPoz[1]].lenght; //ile destynacji
			for (var iii=0;iii<naszlenvftpu;iii++) { //dla każdej z destynacji
				var curpossss = dechess(vftparr[pionekClickedChessPoz[0]][pionekClickedChessPoz[1]][iii].to);
				//zmień kolor pola na highlighted
				changeColor(curpossss[0],curpossss[1]);
			}
			draw(); //po czym przerysuj
		}
	});
}

function animujPionek(poz){
	$('#pawns')
		.animateLayer(pionekClickedName, {
			x: poz[0], y: poz[1]
		}, 1000);
}

function zanikaniePionka(nazwa){
	$('#pawns').animateLayer(nazwa, {
		opacity: 0
	}, 500)
	.drawLayers();
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
	//console.log(nazwa);
}

function zdejmij(posinchess){
	if (nazwypionkow[posinchess[0]][posinchess[1]]!==null) { //jeżeli coś tam jest
		//console.log("zdejmijkitchen",posinchess);
		var nazwategotupionka = nazwypionkow[posinchess[0]][posinchess[1]];
		//console.log("zdejmijkitchen",nazwategotupionka);
		remove(nazwategotupionka); //usuń warstwę tego pionka
		nazwypionkow[posinchess[0]][posinchess[1]]=null; //wyzerowanie elementu tablicy, żeby było że usunięty
		gameboard[posinchess[0]][posinchess[1]]=null; //wyzerowanie pionka na tablicy do diffów (przyszłość)
	}
}

function postaw(fig,pozchess) {
	zdejmij(pozchess);  //zdejmij pionka jeżeli już jest
	var ournazwapola = nazwapola(pozchess);
	//console.log("stawiamynazywamy",pozchess,ournazwapola);
	pionek(fig.color,fig.figtype,ournazwapola,pozchess);
	//console.log("postaw::ournazwapola",pozchess,ournazwapola);
	nazwypionkow[pozchess[0]][pozchess[1]]=ournazwapola;
	//console.log("cosiezapisalo",nazwypionkow[pozchess[0]][pozchess[1]],JSON.stringify(nazwypionkow));
	gameboard[pozchess[0]][pozchess[1]]=fig;
}

/*** KONIEC PIONKOW ***/

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
