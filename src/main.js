import Phaser from 'phaser'


import GameScene from './scenes/gamescene'
import TitleScene from './scenes/titlescene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	backgroundColor: '#396B96',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
		},
	},

	scene: [TitleScene , GameScene],
	// scene: [HelloWorldScene],
}

export default new Phaser.Game(config)


