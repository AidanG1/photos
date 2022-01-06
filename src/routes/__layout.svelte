<script context="module">
	export const load = async ({ url }) => ({
		props: {
			key: url
		}
	});
</script>

<script>
	import {
		Collapse,
		Container,
		Navbar,
		NavbarToggler,
		NavbarBrand,
		Nav,
		NavItem,
		NavLink
	} from 'sveltestrap';
	import categories from '$lib/categories';
	import PageTransition from './PageTransition.svelte';
	export let key;
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	function categoryMenuBar(word) {
		word = word.replaceAll('-', ' ');
		word = word.toLowerCase().split(' ');
		for (var i = 0; i < word.length; i++) {
			word[i] = word[i].charAt(0).toUpperCase() + word[i].slice(1);
		}
		return word.join(' ');
	}
</script>

<Navbar color="dark" dark>
	<NavbarBrand href="https://www.tradethisandthat.com" class="me-auto"><em>Aidan's Home</em> <img src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1600885116/android-chrome-512x512_fopcph.png" alt="Aidan's Photos Logo" width="50"></NavbarBrand>
	<NavbarBrand href="/c/home-page" class="me-auto">Aidan's Photos <img src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1641490430/aidansphotoslogo512_zksqkj.png" alt="Aidan's Photos Logo" width="50"></NavbarBrand>
	<NavbarToggler on:click={toggle} class="me-2" />
	<Collapse {isOpen} navbar>
		<Nav navbar>
			{#each [...categories].sort() as category}
				<NavItem>
					<NavLink href="/c/{category}">{categoryMenuBar(category)}</NavLink>
				</NavItem>
			{/each}
		</Nav>
	</Collapse>
</Navbar>
<Container fluid class="bg-dark text-light">
	<PageTransition refresh={key}>
		<slot />
	</PageTransition>
</Container>

<footer class="bg-dark p-2">
	<p class="text-light text-center">
		Created by Aidan Gerber<br>
		2022-{new Date().getFullYear()} <img src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1641490430/aidansphotoslogo512_zksqkj.png" alt="Aidan's Photos Logo" width="30"> Aidan's Photos<br>
		Photos taken between 2018 and {new Date().getFullYear()}
		<a
			aria-label="Open the Main Aidan site"
			href="https://www.tradethisandthat.com"
			target="_blank"
			rel="nofollow noopener noreferrer">Aidan's main website <img src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1600885116/android-chrome-512x512_fopcph.png" alt="Aidan's Photos Logo" width="30"></a
		>
	</p>
</footer>
