<script lang="ts">
	import type { Circle } from '../game/game';

	export let shape: Circle;
</script>

<div
	class="absolute rounded-full"
	style="
    background: {shape.color ?? '#0f0'};
    left: {(shape.x - shape.r).toFixed(2)}px;
    top: {(shape.y - shape.r).toFixed(2)}px;
    width: {shape.r * 2}px;
    height: {shape.r * 2}px;
    "
/>
