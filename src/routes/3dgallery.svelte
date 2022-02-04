<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	let image_textures = [];
	function get_textures(category) {
		const url = `/api/${category}/720`;
		fetch(url).then((res) => {
			res.json().then((photos) => {
				// image_textures = [];
				let photo_srcs = photos.map((element) => element.src);
				for (let src of photo_srcs) {
					new THREE.TextureLoader().load(src, (img_src) => {
						image_textures = image_textures.concat(
							new THREE.MeshBasicMaterial({
								map: img_src
							})
						);
						console.log(image_textures);
					});
				}
				return 'success';
			});
		});
	}
	function index_z(index) {
		if (index % 2 === 0) {
			return -10;
		} else {
			return 10;
		}
	}
	get_textures('favorites');
	let x_position = 1;
</script>

<h1>Photo Gallery</h1>
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
		{#each image_textures as texture, index}
			<SC.Mesh
				geometry={new THREE.PlaneGeometry()}
				material={texture}
				position={[Math.round(index / 2) * 10, 4, index_z(index)]}
			/>
		{/each}
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
		width: 105%;
		max-width: 90%;
		height: var(--height, 500px);
		border-radius: 0.5rem;
		overflow: hidden;
		margin: 0 0 1em;
		box-shadow: inset 1px 1px 5px #0000001a;
		background: #f4f4f4;
	}
</style>
