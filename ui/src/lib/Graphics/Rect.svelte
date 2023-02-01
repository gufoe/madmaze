<script lang="ts">
  import type { Rect } from "../../../lib/game";

  export let shape: Rect;
</script>

<div
  class="absolute"
  style="
    background: {shape.color ?? '#0f0'};
    left: {shape.x}px;
    top: {shape.y}px;
    width: {shape.w}px;
    height: {shape.h}px;
    "
/>
