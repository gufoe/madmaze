import type { Rect } from "../../lib/game";

export class GameService {
  int: NodeJS.Timeout;

  constructor(public root: Element, public squares: Rect[]) {}

  update() {

    const hit = this.getCollisions();

    if (hit && !int) {
      int = setTimeout(() => {
        if (hit.victory) {
          this.pl.end = new Date().getTime();
          alert(
            "Hai vinto!!\nTempo: " +
              ((this.pl.end - this.pl.start) / 1000).toFixed(2) +
              "s"
          );
        } else {
          alert("You lose :(");
          this.initGame();
          int = undefined;
        }
      }, 500);
    }
  }

}
