<!-- <script context="module">
	export async function load() {
		return {
			status: 302,
			redirect: '/c/home-page'
		};
	}
</script> -->
<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
	import * as SC from 'svelte-cubed';
	let background;
	let texts = ['','','','','','','','','','','',''];
    const locations = [-200,-170,-200,-170,-140,-110,-80,-50,-20,10,30,60]
	const colors = ['#bd3735', '#36880a', '#a19c18', '#610569', '#0a8888', '#790338'];

	onMount(() => {
		new FontLoader().load(
			'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
			(loaded_font) => {
				const word = "Aidan'sPhotos";
				let text;
                let i = 0
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
					texts[i]=(text);
                    i += 1
				}
			}
		);

		new THREE.TextureLoader().load('/panorama.jpg', (loaded) => {
			background = loaded;
			background.mapping = THREE.EquirectangularReflectionMapping;
			background.encoding = THREE.sRGBEncoding;
		});
	});
</script>

<div class="three-container">
	<SC.Canvas {background} antialias>
		{#each texts as text, index}
			<SC.Mesh
				geometry={text}
				material={new THREE.MeshStandardMaterial({ color: colors[index % 6] })}
				position={[locations[index], 0, 0]}
                castShadow
			/>
		{/each}
		<SC.PerspectiveCamera position={[0, 40, 40]} />

		<SC.OrbitControls target={[0, 0, 0]} enablePan={false} enableZoom={true} zoomSpeed={5} />

		<SC.AmbientLight intensity={0.5} />
		<SC.DirectionalLight position={[1, 0, 0]} intensity={1} color={'#FFF'} />
		<SC.DirectionalLight position={[0, 1, 0]} intensity={1} color={'#FFF'} />
		<SC.DirectionalLight position={[0, 0, 15]} intensity={0.5} color={'purple'} />
	</SC.Canvas>
</div>

<style>
	.three-container {
		width: 100%;
		height: 100%;
	}
</style>
