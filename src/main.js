import './style.css'
import { Scene } from './components/Scene.js'

const canvas = document.getElementById('scene')
const scene = new Scene(canvas)

function animate() {
    requestAnimationFrame(animate)
    scene.update()
    scene.render()
}

animate()

