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
	import Gallery from 'svelte-image-gallery';
	import { Button, Image, Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';

	let modal_open = false;
	const modalToggle = () => (modal_open = !modal_open);
	let modal_src = '';
	function HandleClick(e) {
        console.log(e)
		modal_open = !modal_open;
		modal_src = e.detail.src.replace(`w_${image_width}`, `w_${image_width * 2}`);
		console.log(modal_src);
	}
	export let image_width, maxColumnWidth, photo_srcs;
</script>

<Modal isOpen={modal_open} {modalToggle}>
	<ModalBody>
		<Image {modal_src} alt="Zoomed Image" />
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={modalToggle}>Close</Button>
	</ModalFooter>
</Modal>
<Gallery gap="10" {maxColumnWidth} on:click={HandleClick}>
	{#each photo_srcs as src, index}
		<Image {src} alt="Image {index}" />
	{/each}
</Gallery>
