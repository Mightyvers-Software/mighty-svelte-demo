<script lang="ts">
	import type { TodoStatus } from '@lib/types/todos';

	interface Props {
		status?: TodoStatus | null;
	}

	let { status }: Props = $props();
</script>

<form method="GET">
	<select name="status">
		<option value="" selected={!status}> All </option>

		<option value="TODO" selected={status === 'TODO'}> Todo </option>

		<option value="SCHEDULED" selected={status === 'SCHEDULED'}> Scheduled </option>

		<option value="DONE" selected={status === 'DONE'}> Done </option>
	</select>

	<button type="submit"> Filter </button>
</form>
