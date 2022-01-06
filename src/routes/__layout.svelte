<script>
	import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'sveltestrap';
	import categories from '$lib/categories';
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
	<NavbarBrand href="/" class="me-auto">Aidan's Photos</NavbarBrand>
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
