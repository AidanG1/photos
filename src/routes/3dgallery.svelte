<script>
	import { onMount } from 'svelte';
	import { Button, ButtonGroup } from 'sveltestrap';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	let image_textures = [];
	function get_textures(category) {
		const url = `/api/${category}/720`;
		fetch(url).then((res) => {
			res.json().then((photos) => {
				// image_textures = [];
				for (let photo of photos) {
					new THREE.TextureLoader().load(photo.src, (img_src) => {
						image_textures = image_textures.concat(
							new THREE.MeshBasicMaterial({
								map: img_src,
								side: THREE.DoubleSide
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
			return -9.9;
		} else {
			return 9.9;
		}
	}
	function flip_y(index) {
		if (index % 2 !== 0) {
			return Math.PI;
		} else {
			return 0;
		}
	}
	get_textures('favorites');
	let x_position = 1;
</script>

<h1>
	Photo Gallery <ButtonGroup>
		<Button
			color="warning"
			on:click={() => {
				x_position -= 3;
			}}
		>
			🠔 Back
		</Button>
		<Button
			color="success"
			on:click={() => {
				x_position += 3;
			}}
			>Forward 🠖
		</Button>
	</ButtonGroup>
</h1>
<div class="demo">
	<SC.Canvas antialias background={new THREE.Color('papayawhip')}>
		<SC.Group position={[0, -0 / 2, 0]}>
			<!-- <SC.Primitive
				object={new THREE.GridHelper(20, 20, 0x444444, 0x555555)}
				position={[0, 0.001, 0]}
			/> -->
		</SC.Group>
		<SC.Group position={[90, 4.5, -10]}>
			<!-- left wall -->
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(200, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'royalblue', side: THREE.DoubleSide })}
			/>
		</SC.Group>
		<SC.Group position={[90, 4.5, 10]}>
			<!-- right wall -->
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(200, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'maroon', side: THREE.DoubleSide })}
			/>
		</SC.Group>
		<SC.Group position={[-10, 5, 0]} rotation={[0, 1.57, 0]}>
			<!-- back wall -->
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(20, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'purple', side: THREE.DoubleSide })}
			/>
		</SC.Group>
		<SC.Group position={[90, 0, 0]} rotation={[1.57, 0, 0]}>
			<!-- floor wall -->
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(200, 20)}
				material={new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })}
			/>
		</SC.Group>
		{#each image_textures as texture, index}
			<SC.Mesh
				geometry={new THREE.PlaneGeometry(
					(8 * texture.map.image.naturalWidth) / 720,
					(8 * texture.map.image.naturalHeight) / 720
				)}
				material={texture}
				position={[Math.trunc(index / 2) * 10, 4.5, index_z(index)]}
				rotation={[0, flip_y(index), 0]}
			/>
		{/each}
		<!-- <SC.Mesh geometry={new THREE.BoxGeometry()} /> -->
		<SC.PerspectiveCamera position={[x_position, 4, 0]} />
		<SC.AmbientLight intensity={0.6} />
		<SC.OrbitControls target={[x_position, 5, 0]} enablePan={false} maxPolarAngle={Math.PI * 0.5} />
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
