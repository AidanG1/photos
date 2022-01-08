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
	import { categoryMenuBar } from '$lib/utils';
	import categories from '$lib/categories';
	import PageTransition from './PageTransition.svelte';
	export let key;
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	function key_change(key) {
		isOpen = false;
	}
	$: {
		key_change(key);
	}
</script>

<Navbar color="dark" dark>
	<NavbarBrand href="https://www.tradethisandthat.com" class="me-auto"
		><em>Aidan's Home</em>
		<img
			src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1600885116/android-chrome-512x512_fopcph.png"
			alt="Aidan's Photos Logo"
			width="50"
		/></NavbarBrand
	>
	<NavbarBrand href="/c/home-page" class="me-auto"
		>Aidan's Photos <img
			src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1641490430/aidansphotoslogo512_zksqkj.png"
			alt="Aidan's Photos Logo"
			width="50"
		/></NavbarBrand
	>
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
	<hr class="bg-secondary border-secondary">
	<p class="text-light text-center">
		Created by Aidan Gerber<br />
		2022-{new Date().getFullYear()}
		<img
			src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1641490430/aidansphotoslogo512_zksqkj.png"
			alt="Aidan's Photos Logo"
			width="30"
		/>
		Aidan's Photos<br />
		Photos taken between 2018 and {new Date().getFullYear()}<br>
		<a
			aria-label="Open the Main Aidan site"
			href="https://www.tradethisandthat.com"
			target="_blank"
			rel="nofollow noopener noreferrer"
			>Aidan's main website <img
				src="https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_100/v1600885116/android-chrome-512x512_fopcph.png"
				alt="Aidan's Photos Logo"
				width="30"
			/></a
		><br>
		<a
			aria-label="View the source code"
			href="https://github.com/AidanG1/photos"
			target="_blank"
			rel="nofollow noopener noreferrer"
			>Source code for this website <img
				src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F09%2FGitHub_logo.png&f=1&nofb=1"
				alt="Github Logo"
				width="30"
			/></a
		>
	</p>
</footer>

<style>
	footer {
		margin-top: 0;
		box-shadow: 0 100vh 0 100vh black;
	}
</style>
