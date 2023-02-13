import { Game, type LevelName } from './game';
import { MAPS } from './maps';

export class Engine {
	public game?: Game;

	goToLevel(lebel: LevelName) {
		return (this.game = new Game(MAPS[lebel]));
	}
}
