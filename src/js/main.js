var canvas, context, entities = [], playerEntity, clickHandlers = [];
var shouldRender = true;
init();
render();

var enemySpawner;

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	playerEntity = new PlayerObj(canvas);
	entities.push(playerEntity);
	window.addEventListener("keydown", onKeyDown, false);
	canvas.addEventListener("click", onClick, false);
	enemySpawner = setInterval(createEnemy, 5000);
}

function startOver() {
	entities = [];
	entities.push(playerEntity);
	enemySpawner = setInterval(createEnemy, 5000);
}

function onKeyDown(e) {
	switch(e.keyCode) {
		case 32:
			fireBullet();
			break;
	}
}

function createEnemy() {
	entities.push(new EnemyObj(canvas, Math.random()*canvas.width, 0));
}

function fireBullet() {
	entities.push(new BulletObj(canvas, playerEntity.x + playerEntity.width / 2, playerEntity.y));
}

function render() {
	clearCanvas()
	drawBackground();
	entities.every((entity, index, object) => {
		entity.render(context);
		if (entity.canCollide && entity !== playerEntity) {
			if (checkCollision(entity, playerEntity)) {
				gameOver();
				return false;
			}
		}
		if (entity.remove) {
			console.log('removing');
			object.splice(index, 1);
		}
		return true;
	});
	if (shouldRender) {
		window.requestAnimationFrame(render);
	}
}

function checkCollision(objA, objB) {
	if (objA.x < objB.x + objB.width &&
		objA.x + objA.width > objB.x &&
		objA.y < objB.y + objB.height &&
		objA.y + objA.height > objB.y) {
		 return true;
	}
	return false;
}

function drawBackground() {
	context.fillStyle = "#000000";
	context.fillRect(0, 0, canvas.height, canvas.width);
}

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
	clearInterval(enemySpawner);
	entities = [];
	entities.push(new TextObj(canvas,
		canvas.width/2,
		canvas.height/2,
		'GAME OVER',
		{
			color: '#ff0000',
			textAlign: 'center',
			font: '48px Arial',
		}
	));
	var newGame = new TextObj(canvas,
		canvas.width/2,
		canvas.height/2+60,
		'PLAY AGAIN?',
		{
			color: '#00FF00',
			textAlign: 'start',
			font: '48px Arial',
		}
	);
	addClickEvent(newGame, startOver);
	entities.push(newGame);
}

function addClickEvent(entity, callback) {
	clickHandlers.push({
		entity: entity,
		callback: callback,
	})
}

function onClick(event) {
	var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
	clickHandlers.forEach(function(handler) {
		console.log(x, y, handler);
		if (y < handler.entity.y && y > handler.entity.y - handler.entity.height 
            && x > handler.entity.x && x < handler.entity.x + handler.entity.width) {
            handler.callback();
        }
	});
}