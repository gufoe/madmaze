<script lang="ts">
  import type { Circle } from "../../../lib/game";

  export let shape: Circle;
</script>

<div
  class="absolute rounded-full"
  style="
    background: {shape.color ?? '#0f0'};
    left: {shape.x - shape.r}px;
    top: {shape.y - shape.r}px;
    width: {shape.r * 2}px;
    height: {shape.r * 2}px;
    "
/>
