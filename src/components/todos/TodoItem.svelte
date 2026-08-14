<script lang="ts">
	import TodoStatusBadge from './TodoStatusBadge.svelte';
	import type { Todo } from '@lib/types/todos';

	interface Props {
		todo: Todo;
	}

	let { todo }: Props = $props();

	let editing = $state(false);
</script>

<article>
	{#if editing}
		<form method="POST" action="?/update">
			<input type="hidden" name="id" value={todo.id} />

			<input name="title" value={todo.title} required />

			<select name="status" value={todo.status}>
				<option value="TODO">Todo</option>
				<option value="SCHEDULED">Scheduled</option>
				<option value="DONE">Done</option>
			</select>

			<input name="latitude" type="number" step="any" value={todo.latitude} required />

			<input name="longitude" type="number" step="any" value={todo.longitude} required />

			<input name="address" value={todo.address ?? ''} />

			<button type="submit"> Save </button>

			<button type="button" onclick={() => (editing = false)}> Cancel </button>
		</form>
	{:else}
		<h3>{todo.title}</h3>

		<TodoStatusBadge status={todo.status} />

		<p>
			{todo.address}
		</p>

		<p>
			{todo.latitude}, {todo.longitude}
		</p>

		<button type="button" onclick={() => (editing = true)}> Edit </button>

		<form method="POST" action="?/delete">
			<input type="hidden" name="id" value={todo.id} />

			<button type="submit"> Delete </button>
		</form>
	{/if}
</article>
