var canvas, context, entities = [], playerEntity;
var shouldRender = true;
init();
render();

function init() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	playerEntity = new PlayerObj(canvas);
	entities.push(playerEntity);
	window.addEventListener("keydown", onKeyDown, false);
}

function onKeyDown(e) {
	switch(e.keyCode) {
		case 32:
			fireBullet();
			break;
	}
}

function fireBullet() {
	entities.push(new BulletObj(canvas, playerEntity.x + playerEntity.width / 2, playerEntity.y));
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	entities.forEach((entity, index, object) => {
		entity.render(context);
		if (entity !== playerEntity) {
			if (checkCollision(entity, playerEntity)) {
				gameOver();
				entities = [];
				shouldRender = false;
			}
		}
		if (entity.remove) {
			object.splice(index, 1);
		}
	});
	if (shouldRender) {
		console.log('?');
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

function gameOver() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	context.fillStyle = "#ff0000";
	context.textAlign = "center"; 
	context.font = '48px Arial';
	context.fillText('GAME OVER', canvas.width/2, canvas.height/2);
}