<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const image_width = 800;
		const url = `/api/${params.category}/${image_width}`;
		const res = await fetch(url);
		const photos = await res.json();
		if (res.ok) {
			return {
				props: {
					image_width: image_width,
					maxColumnWidth: 400,
					images: photos,
					photo_srcs: photos.map((element) => element.src)
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import { categoryMenuBar } from '$lib/utils';
	import Gallery from '../Gallery.svelte';
	import { page } from '$app/stores';
	import { Button, Image, Modal, ModalBody, ModalFooter, Spinner } from 'sveltestrap';
	let pathname = $page.url.pathname;
	pathname = pathname.substring(3, pathname.length);
	pathname = categoryMenuBar(pathname);
	let modal_open = false;
	const modalToggle = () => (modal_open = !modal_open);
	let modal_src = '';
	function handleClick(e) {
		modalToggle();
		modal_src = e.detail.src.replace(`w_${image_width}`, `w_${image_width * 2}`);
		console.log(modal_src);
	}
	export let image_width, maxColumnWidth, photo_srcs;
</script>

<svelte:head>
	<title>{pathname}: Aidan's Photos</title>
</svelte:head>

<Modal isOpen={modal_open} {modalToggle} fullscreen={true}>
	<ModalBody class="bg-dark text-center">
		<img src={modal_src} alt="Zoomed" class="modal-image align-middle" />
	</ModalBody>
	<ModalFooter class="bg-dark">
		<Button block color="secondary" on:click={modalToggle}>Close</Button>
	</ModalFooter>
</Modal>

<Gallery gap="10" {maxColumnWidth} on:click={handleClick}>
	{#each photo_srcs as src, index}
		<img {src} alt="Image {index}" class="img-hover" />
	{/each}
</Gallery>

<style>
	.modal-image {
		max-width: 98%;
		max-height: 98%;
		display: inline;
	}

	.img-hover {
		opacity: 0.9;
		transition: all 0.2s;
	}
	.img-hover:hover {
		opacity: 1;
		transform: scale(1.04);
	}
</style>
