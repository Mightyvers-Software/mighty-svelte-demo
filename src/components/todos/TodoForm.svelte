<script lang="ts">
	import type { FormActionData } from '@/lib/types/forms';

	interface Props {
		form?: FormActionData | null;
	}

	let { form }: Props = $props();
</script>

<form method="POST" action="?/create">
	<input name="title" placeholder="e.g. Mow front lawn" required />

	<select name="status">
		<option value="TODO">Todo</option>
		<option value="SCHEDULED">Scheduled</option>
		<option value="DONE">Done</option>
	</select>

	<input
		name="latitude"
		type="number"
		step="any"
		min="-90"
		max="90"
		placeholder="e.g. -36.8485"
		required
	/>

	<input
		name="longitude"
		type="number"
		step="any"
		min="-180"
		max="180"
		placeholder="e.g. 174.7633"
		required
	/>

	<input name="address" placeholder="e.g. Auckland, New Zealand" />

	<button type="submit"> Create </button>
</form>

{#if form?.message}
	<p>{form.message}</p>
{/if}

{#if form?.errors}
	<ul>
		{#each Object.entries(form.errors) as [field, messages] (field)}
			{#each messages ?? [] as message (message)}
				<li>
					{field}: {message}
				</li>
			{/each}
		{/each}
	</ul>
{/if}
