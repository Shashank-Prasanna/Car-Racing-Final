var canvas, backgroundImage;

var gameState = 'Lobby';
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var music;

var cars, car1, car2, car3, car4;
var image1, image2, image3, image4, imageTrack, imageGround;

function preload() {
	image1 = loadImage('images/car1.png');
	image2 = loadImage('images/car2.png');
	image3 = loadImage('images/car3.png');
	image4 = loadImage('images/car4.png');
	imageTrack = loadImage('images/track.jpg');
	imageGround = loadImage('images/ground.png');

	music = loadSound('Music.mp3');
}

function setup() {
	canvas = createCanvas(displayWidth - 20, displayHeight - 30);
	database = firebase.database();
	game = new Game();
	game.getState();
	game.start();
	music.play(-1);
}

function draw() {
	if (playerCount === 4) {
		game.update('Play');
	}
	if (gameState === 'Play') {
		clear();
		game.play();
	}
	if (gameState === 'End') {
		game.end();
	}
}
