class BulletObj {
	constructor(canvas, x, y) {
		this.speed = 2;
		this.canMove = true;
		this.inMotion = false;
		this.width = 5;
		this.height = 5;
		this.x = x - this.width / 2;
        this.y = y - 5;
        this.remove = false;
	}
	move() {
        this.y -= this.speed;
        if (this.y < 0 ) this.remove = true;
	}
	
	render(context) {
        this.move();
		context.fillStyle = "#00FF00";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
  }