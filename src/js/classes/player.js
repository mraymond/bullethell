class PlayerObj extends EntityObj {
	constructor(canvas) {
		super(canvas);
		this.speed = 4;
		this.canMove = true;
		this.inMotion = false;
		this.canCollide = true;
		this.width = 30;
		this.height = 30;
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height - 10;
		this.bounds = {
			x: canvas.width - this.width,
			y: canvas.height - this.height,
		}
		this.moveDirection = {
			up: false,
			down: false,
			right: false,
			left: false,
		};
		window.addEventListener("keydown", this.onKeyDown.bind(this), false);
		window.addEventListener("keyup", this.onKeyUp.bind(this), false);
	}
	onKeyDown(e) {
		switch(e.keyCode) {
			case 37:
				this.moveDirection.left = true;
				break;
			case 38:
				this.moveDirection.up = true;
				break;
			case 39:
				this.moveDirection.right = true;
				break;
			case 40:
				this.moveDirection.down = true;
				break;
		}
	}
	onKeyUp(e) {
		switch(e.keyCode) {
			case 37:
				this.moveDirection.left = false;
				break;
			case 38:
				this.moveDirection.up = false;
				break;
			case 39:
				this.moveDirection.right = false;
				break;
			case 40:
				this.moveDirection.down = false;
				break;
		}
	}
	move() {
		if(this.moveDirection.up) {
			this.y -= this.speed;
		}
		if(this.moveDirection.down) {
			this.y += this.speed;
		}
		if(this.moveDirection.left) {
			this.x -= this.speed;
		}
		if(this.moveDirection.right) {
			this.x += this.speed;
		}
	}

	checkBounds() {
		if (this.x < 0) this.x = 0;
		else if (this.x > this.bounds.x) this.x = this.bounds.x;
		if (this.y < 0) this.y = 0;
		else if (this.y > this.bounds.y) this.y = this.bounds.y;
	}
	
	render(context) {
		this.move();
		this.checkBounds(0);
		context.fillStyle = "#FFFFFF";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
  }