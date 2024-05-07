import Stats from 'stats.js';

export default class GUIView {

	constructor(app) {
		this.app = app;

		this.particlesHitArea = false;
		this.particlesRandom = 2;
		this.particlesDepth = 4;
		this.particlesSize = 1.5;
		
		this.touchRadius = 0.15;

		this.range = [0, 1];
		this.rangeRandom = [1, 10];
		this.rangeSize = [0, 3];
		this.rangeDepth = [1, 10];
		this.rangeRadius = [0, 0.5];

	}

	initStats() {
		this.stats = new Stats();

		document.body.appendChild(this.stats.dom);
	}

	update() {
		if (this.touchCanvas) {
			if (!this.app.webgl) return;
			if (!this.app.webgl.particles) return;
			if (!this.app.webgl.particles.touch) return;
			const source = this.app.webgl.particles.touch.canvas;
			const x = Math.floor((this.touchCanvas.width - source.width) * 0.5);
			this.touchCtx.fillRect(0, 0, this.touchCanvas.width, this.touchCanvas.height);
			this.touchCtx.drawImage(source, x, 0);
		}
	}

	enable() {
		if (this.stats) this.stats.dom.style.display = '';
	}

	disable() {
		if (this.stats) this.stats.dom.style.display = 'none';
	}

	onTouchChange() {
		if (!this.app.webgl) return;
		if (!this.app.webgl.particles) return;

		this.app.webgl.particles.touch.radius = this.touchRadius;
	}
	
	onParticlesChange() {
		if (!this.app.webgl) return;
		if (!this.app.webgl.particles) return;

		this.app.webgl.particles.object3D.material.uniforms.uRandom.value = this.particlesRandom;
		this.app.webgl.particles.object3D.material.uniforms.uDepth.value = this.particlesDepth;
		this.app.webgl.particles.object3D.material.uniforms.uSize.value = this.particlesSize;

		this.app.webgl.particles.hitArea.material.visible = this.particlesHitArea;
	}

	onPostProcessingChange() {
		if (!this.app.webgl.composer) return;
		this.app.webgl.composer.enabled = this.postProcessing;
	}
}
