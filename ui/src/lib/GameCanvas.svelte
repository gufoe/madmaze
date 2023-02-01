<script lang="ts">
  import { onMount } from "svelte";
  import { Game, MAPS } from "../../lib/game";
  import Circle from "./Graphics/Circle.svelte";
  import Rect from "./Graphics/Rect.svelte";
  let canvas: Element;
  let game: Game = new Game(MAPS.DEFAULT);
  let tick = 0;
  let death_elapesed = false;
  let int: NodeJS.Timeout;
  setInterval(() => {
    tick++;
    game = game.update();
    if (game.pl.status == "dead" && !int) {
      int = setTimeout(() => {
        death_elapesed = true;
      }, 1000);
    }
  }, 1000 / 30);
  const handleRestart = () => {
    death_elapesed = false;
    int = undefined;
    game.initGame();
  };
</script>

<div bind:this={canvas} class="relative flex flex-col flex-grow">
  <div class="relative flex flex-grow bg-black overflow-hidden">
    <div style="scale:1" class="absolute bg-green">
      {#each game.squares as square}
        <Rect
          shape={Object.assign(
            {
              color: square.victory ? "#0ff" : "#f00",
            },
            square
          )}
        />
      {/each}
      <Circle
        shape={Object.assign(
          {
            color: {
              idle: "#ff0",
              alive: "#0f0",
              dead: "#f00",
              victory: "#fff",
            }[game.pl.status],
          },
          game.pl
        )}
      />
    </div>
  </div>
  {#if ["alive", "idle"].includes(game.pl.status)}
    <div class="buttons bg-red flex flex-row">
      <button
        on:pointerdown={() => (game.pl.movex = +1)}
        on:pointerup={() => (game.pl.movex = 0)}
      >
        →
      </button>
      <button
        on:pointerdown={() => (game.pl.movex = -1)}
        on:pointerup={() => (game.pl.movex = 0)}
      >
        ←
      </button>
      <button
        on:pointerdown={() => (game.pl.movey = +1)}
        on:pointerup={() => (game.pl.movey = 0)}
      >
        ↑
      </button>
      <button
        on:pointerdown={() => (game.pl.movey = -1)}
        on:pointerup={() => (game.pl.movey = 0)}
      >
        ↓
      </button>
      <div>
        {#if game.pl.start}
          {((new Date().getTime() - game.pl.start) / 1000).toFixed(1)}s
        {/if}
      </div>
    </div>
  {:else if death_elapesed}
    <div class="buttons bg-red">
      <button class="r" on:click={handleRestart}> restart </button>
    </div>
  {/if}
</div>
