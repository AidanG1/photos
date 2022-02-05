<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
	import * as SC from 'svelte-cubed';

	let background;
	let logo_material;
	let texts = ['', '', '', '', '', '', '', '', '', '', '', '', ''];
	const locations = [-135, -105, -95, -70, -45, -25, -20, 15, 40, 62, 85, 100, 125];
	const colors = ['#bd3735', '#36880a', '#a19c18', '#610569', '#0a8888', '#790338'];
	onMount(() => {
		new FontLoader().load(
			'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
			(loaded_font) => {
				const word = "Aidan'sPhotos";
				let text;
				let i = 0;
				for (let char of word) {
					text = new TextGeometry(char, {
						font: loaded_font,
						size: 25,
						height: 5,
						curveSegments: 12,

						bevelThickness: 1,
						bevelSize: 1,
						bevelEnabled: true
					});
					// text.center();
					texts[i] = text;
					i += 1;
				}
			}
		);

		new THREE.TextureLoader().load('/panorama.jpg', (loaded) => {
			background = loaded;
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
		});

		new THREE.TextureLoader().load('/icon.png', (icon) => {
			logo_material = new THREE.MeshBasicMaterial({
                map: icon,
                color: 'purple'
			});
		});
	});
</script>

<h1>Three Dimensional Logo in Front of a Panorama of Sand Dunes (Beta)</h1>
<div class="outer-container">
	<div class="three-container">
		<SC.Canvas {background} antialias height=500 width=800>
			{#each texts as text, index}
				<SC.Mesh
					geometry={text}
					material={new THREE.MeshStandardMaterial({ color: colors[index % 6], metalness: 0.5 })}
					position={[locations[index], 20, 0]}
				/>
			{/each}
			<SC.Mesh
				geometry={new THREE.TorusGeometry(12, 6, 6, 50).rotateY(135).rotateZ(1.5)}
				material={logo_material}
				position={[0, 0, 0]}
			/>
			<SC.PerspectiveCamera position={[0, 25, 300]} />

			<SC.OrbitControls target={[0, 0, 0]} enablePan={false} enableZoom={true} zoomSpeed={5} />

			<SC.AmbientLight intensity={0.5} />
			<SC.DirectionalLight position={[1, 0, 0]} intensity={1} color={'#FFF'} />
			<SC.DirectionalLight position={[0, 0, 1]} intensity={0.5} color={'#FFF'} />
		</SC.Canvas>
	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}
	.outer-container {
	}
	.three-container {
		position: absolute;
		width: 100%;
		max-width: 100%;
		height: 100%;
		max-height: 70%;
	}
</style>
