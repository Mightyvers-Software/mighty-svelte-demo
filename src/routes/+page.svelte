<script lang="ts">
	import TodoFilter from '@/components/todos/TodoFilter.svelte';
	import TodoForm from '@/components/todos/TodoForm.svelte';
	import TodoList from '@/components/todos/TodoList.svelte';

	let { data, form } = $props();
</script>

<h1>Todo Location Tracker</h1>

<TodoForm {form} />

<TodoFilter status={data.status} />

<TodoList todos={data.todos} />
