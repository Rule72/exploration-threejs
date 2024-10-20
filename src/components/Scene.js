import * as THREE from 'three'

export class Scene {
    constructor(canvas) {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0x000000) // Set background color to black

        this.setupLights()
        this.setupCube()
        this.setupGrid()

        // Update camera position and rotation
        this.camera.position.set(0, 10, 10)
        this.camera.lookAt(0, 0, 0)

        window.addEventListener('resize', () => this.onWindowResize(), false)

        // Load font and set up text asynchronously
        this.loadFontAndSetupText()
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

    async loadFontAndSetupText() {
        try {
            const FontLoaderModule = await import('three/examples/jsm/loaders/FontLoader.js')
            const TextGeometryModule = await import('three/examples/jsm/geometries/TextGeometry.js')
            
            const FontLoader = FontLoaderModule.FontLoader
            const TextGeometry = TextGeometryModule.TextGeometry

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
        } catch (error) {
            console.error('Error loading font:', error)
        }
    }
}
