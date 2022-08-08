<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const maxColumnWidth = 400;
		const image_width = maxColumnWidth * 1.8;
		const url = `/api/${params.category}/${image_width}`;
		const res = await fetch(url);
		const photos = await res.json();
		const photo_srcs = photos.map((element) => element.src);
		const modal_srcs = photo_srcs.map((src) => {
			return src.replace(`w_${image_width}`, `w_${image_width * 2}`);
		});
		if (res.ok) {
			return {
				props: {
					image_width: image_width,
					maxColumnWidth: maxColumnWidth,
					photo_srcs: photo_srcs,
					modal_srcs: modal_srcs
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
	import {
		Button,
		Modal,
		ModalBody,
		ModalFooter,
		Carousel,
		CarouselControl,
		CarouselItem
	} from 'sveltestrap/src';
	let pathname = $page.url.pathname;
	pathname = pathname.substring(3, pathname.length);
	pathname = categoryMenuBar(pathname);
	let modal_open = false;
	const modalToggle = () => (modal_open = !modal_open);
	let activeIndex = 0;
	function handleClick(e) {
		activeIndex = parseInt(e.detail.alt);
		modalToggle();
	}
	export let maxColumnWidth, photo_srcs, modal_srcs;
</script>

<svelte:head>
	<title>{pathname}: Aidan's Photos</title>
</svelte:head>

<h1>{pathname}</h1>
<Modal isOpen={modal_open} {modalToggle} fullscreen={true}>
	<ModalBody class="bg-dark text-center">
		<Carousel {modal_srcs} bind:activeIndex class="carousel-fade align-middle" data-interval="false">
			<div class="carousel-inner">
				{#each modal_srcs as item, index}
					<CarouselItem bind:activeIndex itemIndex={index}>
						<img
							src={item}
							alt={`${item} ${index + 1}`}
							class="text-center"
							style="max-height:85vh;max-width:98vw"
                            loading="lazy"
						/>
					</CarouselItem>
				{/each}
			</div>

			<CarouselControl direction="prev" bind:activeIndex {modal_srcs} />
			<CarouselControl direction="next" bind:activeIndex {modal_srcs} />
		</Carousel>
		<!-- <img src={modal_src} alt="Zoomed" class="modal-image align-middle" /> -->
	</ModalBody>
	<ModalFooter class="bg-dark">
		<Button block color="secondary" on:click={modalToggle}>Close</Button>
	</ModalFooter>
</Modal>

<Gallery gap="10" {maxColumnWidth} on:click={handleClick} hover={true}>
	{#each photo_srcs as src, index}
		<img {src} alt={index} />
	{/each}
</Gallery>

<style>
	.modal-image {
		max-width: 98%;
		max-height: 98%;
		display: inline;
	}

	.carousel-inner {
		max-width: 100%;
		max-height: 100%;
	}
</style>
