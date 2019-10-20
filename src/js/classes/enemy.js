class EnemyObj extends EntityObj {
	constructor(canvas, x, y) {
        super(canvas);
		this.speed = 2;
		this.canMove = true;
		this.inMotion = false;
		this.width = 25;
		this.height = 25;
		this.x = x - this.width / 2;
        this.y = y - 5;
        this.remove = false;
        this.canCollide = true;
        this.enemy = true;
        this.bottom = canvas.height;
	}
	move() {
        this.y += this.speed;
        if (this.y > this.bottom ) this.remove = true;
	}
	
	render(context) {
        this.move();
		context.fillStyle = "#FF0000";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
  }