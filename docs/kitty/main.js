title = "Kitty";

description = `Kitty game`;

characters = [
`
 c  c 
cccccc
c cc c
cccccc
cccccc
cccccc
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
// Refer to the official documentation for all available options
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
 * isJumping: boolean,
 * vy: number,
 * }} Player
 */

/**
 * @type { Player }
 */
 let player;


function update() {
	if (!ticks) {
		player = {
            pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			speed: 0,
			isJumping: false,
			vy: 0,
            // firingCooldown: G.PLAYER_FIRE_RATE,
            // isFiringLeft: true
        };
	}
	if (player.isJumping) {
		player.vy += 0.05;            // decrease upward velocity
		player.pos.y += player.vy;    // move sprite
		if (player.pos.y >= (G.HEIGHT * 0.5)) {
			player.vy = 0;            // sprite has hit "ground"
			player.pos.y = G.HEIGHT * 0.5;
			player.isJumping = false; // reset
		}
	} else {
		if (input.isJustPressed) {
			player.vy = -1;           // initial upward velocity
			player.isJumping = true;
		}
	}
	
	// player.pos = vec(input.pos.x, input.pos.y);
	player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	char("a", player.pos);
}

