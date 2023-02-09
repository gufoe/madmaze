<script lang="ts">
  import type { Text } from "../../../lib/game";

  export let shape: Text;
</script>

<div
  class="absolute rounded-full"
  style="
    color: {shape.color ?? '#fff'};
    text-align: {shape.align};
    left: {shape.x - shape.w / 2}px;
    top: {shape.y}px;
    width: {shape.w}px;
    font-size: {shape.size}px;
    "
>
  {shape.text}
</div>
