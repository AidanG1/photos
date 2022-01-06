<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script>
	export let status, message;
</script>

<h1>Error {status}<br />{message}</h1>
<h2 class="p-2">
	<a href="/c/home-page">Photos Home</a><br /><a href="https://www.tradethisandthat.com"
		>Aidan's Main Home</a
	>
</h2>
