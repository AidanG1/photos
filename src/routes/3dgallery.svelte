<script>
	import { onMount, onDestroy } from 'svelte';
	import { Button, ButtonGroup } from 'sveltestrap';
	import * as THREE from 'three';
	import * as SC from 'svelte-cubed';
	import categories from '$lib/categories';
	import { categoryMenuBar } from '$lib/utils';
	let image_textures = [];
	let image_width = '720';
	function get_textures(category) {
		const url = `/api/${category}/${image_width}`;
		fetch(url).then((res) => {
			res.json().then((photos) => {
				for (let photo of photos) {
					photo.src = photo.src.replace('upload/', `upload/bo_${image_width / 20}px_solid_white/`);
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
	let surrounding_length = 200;
	let start_position = 90;
	$: {
		surrounding_length = 200 + x_position;
		start_position = surrounding_length / 2 - 10;
	}
	let category_choice = 'favorites';
	let movement_amount = 8;
	let floor;
	let roof;
	let backwall;
	let walls;
	onMount(() => {
		new THREE.TextureLoader().load(
			'https://res.cloudinary.com/dnmd9zoai/image/upload/c_scale,w_1440/v1641229051/Aidan%27s%20Photos/IMG_1645_zvrlji.webp',
			(loaded) => {
				roof = new THREE.MeshBasicMaterial({
					map: loaded,
					side: THREE.DoubleSide
				});
				roof.wrapS = THREE.RepeatWrapping;
				roof.wrapT = THREE.RepeatWrapping;
			}
		);
		new THREE.TextureLoader().load('/repeatingtile.jpg', (loaded) => {
			floor = new THREE.MeshBasicMaterial({
				map: loaded,
				side: THREE.DoubleSide
			});
			floor.wrapS = THREE.RepeatWrapping;
			floor.wrapT = THREE.RepeatWrapping;
		});
		new THREE.TextureLoader().load('/backwall.jpg', (loaded) => {
			backwall = new THREE.MeshBasicMaterial({
				map: loaded,
				side: THREE.DoubleSide
			});
			backwall.wrapS = THREE.RepeatWrapping;
			backwall.wrapT = THREE.RepeatWrapping;
		});
		new THREE.TextureLoader().load('/left-right-walls.jpg', (loaded) => {
			walls = new THREE.MeshBasicMaterial({
				map: loaded,
				side: THREE.DoubleSide
			});
			walls.wrapS = THREE.RepeatWrapping;
			walls.wrapT = THREE.RepeatWrapping;
		});
	});

	// enable FPS
	let clock = new THREE.Clock();
	let elapsedTime = 0;
	let frameCount = 0;
	let fps = 0;
	function updateFps() {
		elapsedTime += clock.getDelta();
		frameCount++;
		if (elapsedTime >= 1) {
			fps = frameCount;
			frameCount = 0;
			elapsedTime = 0;
		}
	}
	SC.onFrame(() => {
		updateFps();
	});

	function moveBack() {
		x_position >= movement_amount + 1 ? (x_position -= movement_amount) : '';
	}

	function moveForward() {
		x_position += movement_amount;
	}

	function handleKeydown(event) {
		if (['ArrowUp','w','W'].includes(event.key)) {
			moveForward()
		} else if (['ArrowDown','s','S'].includes(event.key)) {
			moveBack()
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<h1>3D Photo Gallery</h1>
<ButtonGroup>
	<Button
		color="warning"
		on:click={() => {
			moveBack();
		}}
	>
		🠔 Back
	</Button>
	<select bind:value={category_choice}>
		{#each [...categories].sort() as category}
			<option background="bg-dark" value={category}>{categoryMenuBar(category)}</option>
		{/each}
	</select>
	<Button
		color="primary"
		on:click={() => {
			get_textures(category_choice);
			x_position = 5 * image_textures.length;
		}}
	>
		More {categoryMenuBar(category_choice.toString())} photos
	</Button>
	<Button
		color="success"
		on:click={() => {
			moveForward();
		}}
	>
		Forward 🠖
	</Button>
</ButtonGroup>
<main class="demo">
	<span id="fps">FPS: {fps}</span>
	<SC.Canvas antialias background={new THREE.Color('lightskyblue')}>
		<SC.Group position={[start_position, 4.5, -10]}>
			<!-- left wall -->
			<SC.Mesh geometry={new THREE.PlaneGeometry(surrounding_length, 10)} material={walls} />
			<!-- <SC.Mesh
				geometry={new THREE.PlaneGeometry(surrounding_length, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'royalblue', side: THREE.DoubleSide })}
			/> -->
		</SC.Group>
		<SC.Group position={[start_position, 4.5, 10]}>
			<!-- right wall -->
			<SC.Mesh geometry={new THREE.PlaneGeometry(surrounding_length, 10)} material={walls} />
			<!-- <SC.Mesh
				geometry={new THREE.PlaneGeometry(surrounding_length, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'maroon', side: THREE.DoubleSide })}
			/> -->
		</SC.Group>
		<SC.Group position={[-10, 5, 0]} rotation={[0, 1.57, 0]}>
			<!-- back wall -->
			<SC.Mesh geometry={new THREE.PlaneGeometry(20, 10)} material={backwall} />
			<!-- <SC.Mesh
				geometry={new THREE.PlaneGeometry(20, 10)}
				material={new THREE.MeshStandardMaterial({ color: 'purple', side: THREE.DoubleSide })}
			/> -->
		</SC.Group>
		<SC.Group position={[start_position, 0, 0]} rotation={[1.57, 0, 0]}>
			<!-- floor -->
			<!-- <SC.Mesh
				geometry={new THREE.PlaneGeometry(200, 20)}
				material={new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide })}
			/> -->
			<SC.Mesh geometry={new THREE.PlaneGeometry(surrounding_length, 20)} material={floor} />
		</SC.Group>
		<SC.Group position={[start_position, 9, 0]} rotation={[1.57, 0, 0]}>
			<!-- roof -->
			<!-- <SC.Mesh
				geometry={new THREE.PlaneGeometry(200, 20)}
				material={new THREE.MeshStandardMaterial({ color: 'black', side: THREE.DoubleSide })}
			/> -->
			<SC.Mesh geometry={new THREE.PlaneGeometry(surrounding_length, 20)} material={roof} />
		</SC.Group>
		{#each image_textures as texture, index}
			{#if texture.map.image.naturalHeight > image_width}
				<SC.Mesh
					geometry={new THREE.PlaneGeometry(
						(8 * texture.map.image.naturalWidth) / texture.map.image.naturalHeight,
						8
					)}
					material={texture}
					position={[Math.trunc(index / 2) * 10, 4.5, index_z(index)]}
					rotation={[0, flip_y(index), 0]}
				/>
			{:else}
				<SC.Mesh
					geometry={new THREE.PlaneGeometry(
						(8 * texture.map.image.naturalWidth) / image_width,
						(8 * texture.map.image.naturalHeight) / image_width
					)}
					material={texture}
					position={[Math.trunc(index / 2) * 10, 4.5, index_z(index)]}
					rotation={[0, flip_y(index), 0]}
				/>
			{/if}
		{/each}
		<!-- <SC.Mesh geometry={new THREE.BoxGeometry()} /> -->
		<SC.PerspectiveCamera position={[x_position, 4, 0]} />
		<SC.AmbientLight intensity={0.6} />
		<SC.OrbitControls
			target={[x_position, 5, 0]}
			enablePan={false}
			enableZoom={false}
			maxPolarAngle={Math.PI * 0.5}
		/>
	</SC.Canvas>
</main>

<style>
	#fps {
		position: absolute;
		top: 3px;
		left: 3px;
		color: rgb(102, 255, 0);
		z-index: 50;
	}

	.demo {
		position: relative;
		width: 105%;
		max-width: 90%;
		height: var(--height, 600px);
		border-radius: 0.5rem;
		overflow: hidden;
		margin: 0 0 1em;
		background: black;
	}
</style>
