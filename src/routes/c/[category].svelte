<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const image_width = 400;
		const url = `/api/${params.category}/${image_width}`;
		const res = await fetch(url);
		const photos = await res.json();
		if (res.ok) {
			return {
				props: {
					image_width: image_width,
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
	import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'sveltestrap';
	let activeIndex = 0;
	import { MasonryGrid } from '@egjs/svelte-grid';
	export let image_width, photo_srcs;
</script>

<Gallery gap="10" maxColumnWidth={image_width}>
	{#each photo_srcs as src}
		<img {src} alt="" />
	{/each}
</Gallery>

<!-- <MasonryGrid class="container" {gap}>
	{#each photo_srcs as src}
		<img {src} alt="" />
	{/each}
</MasonryGrid> -->
<!-- <Carousel {photo_srcs} bind:activeIndex>
	<CarouselIndicators bind:activeIndex {photo_srcs} />

	<div class="carousel-inner">
		{#each photo_srcs as photo, index}
			<CarouselItem bind:activeIndex itemIndex={index}>
				<img src={photo} class="d-block w-100" alt={`Photo ${index + 1}`} />
			</CarouselItem>
		{/each}
	</div>

	<CarouselControl direction="prev" bind:activeIndex {photo_srcs} />
	<CarouselControl direction="next" bind:activeIndex {photo_srcs} />
</Carousel> -->
