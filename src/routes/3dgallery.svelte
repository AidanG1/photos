<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
		const url = `/api/${params.category}/720`;
		const res = await fetch(url);
		const photos = await res.json();
		const photo_srcs = photos.map((element) => element.src);
		if (res.ok) {
			return {
				props: {
					photo_srcs: photo_srcs
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Failed to load ${url}`)
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	export let photo_srcs = photo_srcs;
	let x_position = 1;
	let image_textures = [];
	onMount(() => {
		for (let src of photo_srcs) {
			new THREE.TextureLoader().load(src, (icon) => {
				image_textures.push(
					new THREE.MeshBasicMaterial({
						map: icon,
						color: 'purple'
					})
				);
			});
		}
	});
</script>

<div class="demo">
	<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
		<SC.Group position={[0, -0 / 2, 0]}>
			<SC.Primitive
				object={new THREE.GridHelper(50, 50, 0x444444, 0x555555)}
				position={[0, 0.001, 0]}
			/>
		</SC.Group>
		<SC.Group position={[0, 4.5, -10]}>
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(50, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'whitesmoke' })}
			/>
		</SC.Group>
		<SC.Group position={[0, 4.5, 10]}>
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(50, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'whitesmoke' })}
			/>
		</SC.Group>
		<SC.Group position={[0, 4.5, 0]}>
			{#each image_textures as texture}
				<SC.Mesh geometry={new THREE.BoxGeometry()} material={texture} />
			{/each}
		</SC.Group>
		<!-- <SC.Mesh geometry={new THREE.BoxGeometry()} /> -->
		<SC.PerspectiveCamera position={[x_position, 4, 0]} />
		<SC.AmbientLight intensity={0.6} />
		<SC.OrbitControls
			target={[x_position, 5, 0]}
			enablePan={false}
			enableZoom={true}
			maxPolarAngle={Math.PI * 0.48}
		/>
		​</SC.Canvas
	>
</div>

<style>
	.demo {
		position: relative;
		width: 100%;
		max-width: 80%;
		height: var(--height, 500px);
		border-radius: 0.5rem;
		overflow: hidden;
		margin: 0 0 1em;
		box-shadow: inset 1px 1px 5px #0000001a;
		background: #f4f4f4;
	}
</style>
