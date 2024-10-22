import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export class Scene {
    constructor(canvas) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0x000000) // Set background color to black

        this.setupLights()
        this.loadFootModel()

        // Update camera position and rotation
        this.camera.position.set(0, 0, 5)
        this.camera.lookAt(0, 0, 0)

        window.addEventListener('resize', () => this.onWindowResize(), false)
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040)
        this.scene.add(ambientLight)

        const pointLight1 = new THREE.PointLight(0xff00ff, 1, 100)
        pointLight1.position.set(5, 5, 5)
        this.scene.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0x00ffff, 1, 100)
        pointLight2.position.set(-5, -5, 5)
        this.scene.add(pointLight2)

        // Add rim lights
        const rimLight1 = new THREE.PointLight(0xffffff, 10, 20)
        rimLight1.position.set(-5, 0, -5)
        this.scene.add(rimLight1)

        const rimLight2 = new THREE.PointLight(0xffffff, 10, 20)
        rimLight2.position.set(5, 0, -5)
        this.scene.add(rimLight2)
    }

    loadFootModel() {
        const loader = new OBJLoader()
        loader.load(
            'src/models/foot.obj',
            (object) => {
                this.foot = object
                // Center the foot and scale it to fit the camera
                this.foot.scale.setScalar(0.5)
                this.foot.position.set(0, -1, 0)
                this.scene.add(this.foot)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened', error)
            }
        )
    }

    update() {
        if (this.foot) {
            this.foot.rotation.y += 0.01
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
