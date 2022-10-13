title = "Planeshift";

description = `Press to change dimensions`;

characters = [
`
c    c
cccccc
c cc c
cccccc
cccccc
cccccc
`,
`
pppp
pppp
pppp
`
];

// Game design variable container
const G = {
	WIDTH: 100,
	HEIGHT: 150,

    STAR_SPEED_MIN: 0.5,
	STAR_SPEED_MAX: 1.0,
    
    PLAYER_FIRE_RATE: 4,
    PLAYER_GUN_OFFSET: 3,

    FBULLET_SPEED: 5,

    ENEMY_MIN_BASE_SPEED: 1.0,
    ENEMY_MAX_BASE_SPEED: 2.0,
    ENEMY_FIRE_RATE: 45,

    EBULLET_SPEED: 2.0,
    EBULLET_ROTATION_SPD: 0.1
};

// Game runtime options
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2,
    seed: 1,
    // isPlayingBgm: true,
    isReplayEnabled: true,
    // theme: "dark"
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number,
 * color: number,
 * vx: number,
 * vy: number,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

let blue = 0; // type blue and red instead of 1 and 0
let red = 1;

/**
 * @typedef {{
 * pos: Vector,
 * color: number,
 * }} Block
 */

/**
 * @type { Block }
 */
let block;

/**
 * @type { Block [] }
 */
let blocks;

/**
 * @type { number }
 */
const blockspeed = 0.2; // can be changed to depend on difficulty

/**
 * @type { number }
 */
let counter = 0;

function update() {
	if (!ticks) {
		// initialization
		player = {
            pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			speed: 0,
			color: blue,
			vx: 0,
			vy: 0,
        };
		block = {
			pos: vec(0, G.HEIGHT * 0.5),
			color: blue,
		};
		blocks = [];
	}

	counter++; // increment counter for spawning blocks
	counter = counter % 65;

	

	if (counter == 64) {
		const posX = G.WIDTH;
		const posY = (G.HEIGHT * 0.5) + rnd(0, 3);
		blocks.push({ pos: vec(posX, posY) , color: blue});
	}
	
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	char("a", player.pos); // draw player character


	remove(blocks, (b) => {
		b.pos.x -= blockspeed; // move block 

		// if fish collides with player
		const blockCollide = char("b", b.pos).isColliding.char.a;
		if (blockCollide) {
			if (b.color == player.color) {
				addScore(1); // add to score
				play("hit"); // sound effect
			} else {
				end("Game over"); // wrong color, end game
			}
			
			color("purple"); // purple particles
			particle(
				player.pos.x,
				player.pos.y - 3, // a little bit above player
				4,
				1,
				-PI/2,
				PI/2,
			);
			color("black"); // setting color to black means default colors

			return true; // delete block
		} else {
			return false;
		}
	});
}

