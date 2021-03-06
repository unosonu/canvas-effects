import Entity from '../CanvasEffect/Entity';

export default class Point extends Entity {
	constructor(ctx, pos) {
		super(ctx);
		this.pos = pos;
		this.color = [0,0,0,1];
		this.radius = this.getRandomArbitrary(4, 2);
		this.speed = this.getRandomArbitrary(0.2, 0.1);
		this.theta = this.getRandomTheta();
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	getRandomTheta() {
		return Math.random() * 2 * Math.PI;
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	init(config) {
		if (config) {
			if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
				this.color = config.color;
			}
			if (config.radius && config.radius.length == 2 && config.radius[0] > config.radius[1]) {
				this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
			}
			if (config.speed && config.speed.length == 2 && config.speed[0] > config.speed[1]) {
				this.speed = this.getRandomArbitrary(config.speed[0], config.speed[1]);
			}
		}
	}
	update() {
		if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
			this.theta = Math.PI - this.theta;
		}
		if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
			this.theta = 2*Math.PI - this.theta;
		}
		this.pos[0] += Math.cos(this.theta) * this.speed;
		this.pos[1] += Math.sin(this.theta) * this.speed;
	}
	render() {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.beginPath();
		this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}
