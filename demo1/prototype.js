function User() {
	this.name = "";
	this.life = 100;
	this.giveLife = function giveLife(targetPlayer) {
		targetPlayer.life += 1;
		console.log(this.name + " gave 1 life to " + targetPlayer.name);
	};
};

var bucky = new User();
var wendy = new User();
bucky.name = "bucky";
wendy.name = "wendy";

wendy.giveLife(bucky);

console.log(bucky.life);
console.log(wendy.life);

User.prototype.uppercut = function (targetPlayer) {
	targetPlayer.life -= 5;
};

bucky.uppercut(wendy);

console.log(bucky.life);
console.log(wendy.life);