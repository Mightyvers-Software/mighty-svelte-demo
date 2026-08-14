<script lang="ts">
	import type { TodoStatus } from '@/lib/types/todos';

	interface Props {
		status: TodoStatus;
	}

	let { status }: Props = $props();

	const labels = {
		TODO: 'Todo',
		SCHEDULED: 'Scheduled',
		DONE: 'Done'
	};
</script>

<span class={`status ${status.toLowerCase()}`}>
	{labels[status]}
</span>

<style>
	.status {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.todo {
		background: #e5e7eb;
	}

	.scheduled {
		background: #fef3c7;
	}

	.done {
		background: #dcfce7;
	}
</style>
