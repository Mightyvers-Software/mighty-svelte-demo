<script lang="ts">
	import TodoItem from './TodoItem.svelte';
	import type { Todo } from '@lib/types/todos';

	interface Props {
		todos: Todo[];
	}

	let { todos = [] }: Props = $props();
</script>

{#if todos.length === 0}
	<p>No todos found.</p>
{:else}
	<section>
		{#each todos as todo (todo.id)}
			<TodoItem {todo} />
		{/each}
	</section>
{/if}
