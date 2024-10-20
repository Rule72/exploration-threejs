import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export class Scene {
    constructor(canvas) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.setupLights()
        this.setupCube()
        this.setupText()
        this.setupGrid()

        this.camera.position.z = 5

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
    }

    setupCube() {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2,
        })
        this.cube = new THREE.Mesh(geometry, material)
        this.scene.add(this.cube)
    }

    setupText() {
        const loader = new FontLoader()
        loader.load('/fonts/cyberpunk.json', (font) => {
            const textGeometry = new TextGeometry('Jake Hopkins', {
                font: font,
                size: 0.5,
                height: 0.1,
            })
            const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
            this.text = new THREE.Mesh(textGeometry, textMaterial)
            this.text.position.set(-2, 0, -2)
            this.scene.add(this.text)
        })
    }

    setupGrid() {
        const gridHelper = new THREE.GridHelper(10, 10, 0x00ff00, 0x00ff00)
        this.scene.add(gridHelper)
    }

    update() {
        this.cube.rotation.y += 0.01
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
