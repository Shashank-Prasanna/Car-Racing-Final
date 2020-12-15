class Game {
	constructor() {}

	getState() {
		var gameStateRef = database.ref('gameState');
		gameStateRef.on('value', function (data) {
			gameState = data.val();
		});
	}

	update(state) {
		database.ref('/').update({
			gameState: state,
		});
	}

	async start() {
		if (gameState === 'Lobby') {
			player = new Player();
			var playerCountRef = await database.ref('playerCount').once('value');
			if (playerCountRef.exists()) {
				playerCount = playerCountRef.val();
				player.getCount();
			}
			form = new Form();
			form.display();
		}

		car1 = createSprite(100, 200);
		car1.addImage(image1);
		car2 = createSprite(300, 200);
		car2.addImage(image2);
		car3 = createSprite(500, 200);
		car3.addImage(image3);
		car4 = createSprite(700, 200);
		car4.addImage(image4);
		cars = [car1, car2, car3, car4];
	}

	play() {
		form.hide();

		Player.getPlayerInfo();
		player.getCarsAtEnd();

		if (allPlayers !== undefined) {
			//var display_position = 100;

			//index of the array
			var index = 0;

			//x and y position of the cars
			var x = 200;
			var y;
			background(imageGround);
			image(imageTrack, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

			for (var plr in allPlayers) {
				//add 1 to the index for every loop
				index = index + 1;

				//position the cars a little away from each other in x direction
				x = x + 300;
				//use data form the database to display the cars in y direction
				y = displayHeight - allPlayers[plr].distance;
				cars[index - 1].x = x;
				cars[index - 1].y = y;

				//textSize(15);
				//text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

				if (index === player.index) {
					fill('#FF0000');
					ellipse(x, y, 70);
					console.log(player.name);
					cars[index - 1].shapeColor = 'red';
					camera.position.x = displayWidth / 2;
					camera.position.y = cars[index - 1].y;
				}
			}
		}

		if (keyIsDown(UP_ARROW) && player.index !== null) {
			player.distance += 10;
			player.update();
		}

		drawSprites();
		if (player.distance > 5189) {
			gameState = 'End';
			player.rank++;
			Player.updateCarsAtEnd(player.rank);
		}
	}

	end() {
		console.log('Ended!');
		console.log(player.rank);
		var lbTitle = createElement('h1', 'Leaderboard');
		lbTitle.position(displayWidth / 2, 50);
		var lbRank = createElement('h3', player.rank);
		lbRank.position(displayWidth / 2, 150);
	}
}
