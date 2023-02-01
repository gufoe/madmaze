<script lang="ts">
  import { onMount } from "svelte";
  import { boundingBox, Game, getRatio, MAPS } from "../../lib/game";
  import Circle from "./Graphics/Circle.svelte";
  import Rect from "./Graphics/Rect.svelte";
  import Text from "./Graphics/Text.svelte";
  let canvas: Element;
  let game: Game = new Game(MAPS.DEFAULT);
  let scale = 1;
  let map_size;
  onMount(() => {
    scale = getRatio(
      {
        w: canvas.clientWidth,
        h: canvas.clientHeight,
      },
      game.map.tiles
    );
    map_size = boundingBox(game.map.tiles);
  });
  let show_restart = false;
  let int: NodeJS.Timeout;
  setInterval(() => {
    game = game.update();
    if (game.pl.status == "dead" && !int) {
      int = setTimeout(() => {
        int = undefined;
        alert("Che scarso!");
        game.initGame();
        // show_restart = true;
      }, 100);
    }
    if (game.pl.status == "victory" && !int) {
      int = setTimeout(() => {
        int = undefined;
        alert(
          "Hai vinto!\n" +
            ((game.pl.end - game.pl.start) / 1000).toFixed(2) +
            " secondi"
        );
        game.initGame();
      }, 100);
    }
  }, 1000 / 30);
  const handleRestart = () => {
    show_restart = false;
    int = undefined;
    game.initGame();
  };
</script>

<div class="relative flex flex-col flex-grow">
  <div bind:this={canvas} class="flex flex-col grow">
    <div
      class="relative flex overflow-hidden m-auto"
      style="width:{map_size?.w * scale}px; height:{map_size?.h * scale}px"
    >
      <div style="scale:{scale}" class="absolute bg-green">
        {#each game.map.tiles as rect}
          <Rect
            shape={Object.assign(
              {
                color: rect.victory ? "#0ff" : "#f00",
              },
              rect
            )}
          />
        {/each}
        {#if game.pl.start}
          <Text
            shape={{
              x: game.map.pl.x,
              y: game.map.pl.y,
              align: "center",
              color: "white",
              w: 50,
              text:
                (
                  ((game.pl.end ?? new Date().getTime()) - game.pl.start) /
                  1000
                ).toFixed(2) + "s",
            }}
          />
        {/if}
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
  </div>
  <div class="h-20 py-3 flex flex-col items-center">
    {#if ["alive", "idle"].includes(game.pl.status)}
      <div class="buttons flex flex-row gap-1">
        <button
          on:mousedown={() => (game.pl.movex = +1)}
          on:touchstart={() => (game.pl.movex = +1)}
          on:mouseup={() => (game.pl.movex = 0)}
          on:touchend={() => (game.pl.movex = 0)}
        >
          →
        </button>
        <button
          on:mousedown={() => (game.pl.movex = -1)}
          on:touchstart={() => (game.pl.movex = -1)}
          on:mouseup={() => (game.pl.movex = 0)}
          on:touchend={() => (game.pl.movex = 0)}
        >
          ←
        </button>
        <button
          on:mousedown={() => (game.pl.movey = +1)}
          on:touchstart={() => (game.pl.movey = +1)}
          on:mouseup={() => (game.pl.movey = 0)}
          on:touchend={() => (game.pl.movey = 0)}
        >
          ↑
        </button>
        <button
          on:mousedown={() => (game.pl.movey = -1)}
          on:touchstart={() => (game.pl.movey = -1)}
          on:mouseup={() => (game.pl.movey = 0)}
          on:touchend={() => (game.pl.movey = 0)}
        >
          ↓
        </button>
      </div>
    {:else if show_restart}{/if}
  </div>
</div>
