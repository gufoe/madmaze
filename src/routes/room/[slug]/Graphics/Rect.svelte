<script lang="ts">
	import type { Rect } from '../game/game';

	export let shape: Rect;
	const color = ['#f00'].includes(shape.color?.toLowerCase() ?? '') ? '#fff' : '#000';
</script>

<div
	class="absolute text-center flex"
	style="
    background: {shape.color ?? '#0f0'};
    color: {color ?? '#0f0'};
    left: {shape.x}px;
    top: {shape.y}px;
    width: {shape.w}px;
    height: {shape.h}px;
    "
>
	<div class="m-auto">
		{shape.text ?? ''}
	</div>
</div>
