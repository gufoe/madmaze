<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	$page.route;
	goto('room/home');
</script>

{$page.route.id}
