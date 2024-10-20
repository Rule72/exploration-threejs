import './style.css'
import { Scene } from './components/Scene.js'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('scene')
  if (!canvas) {
    console.error('Canvas element not found')
    return
  }

  const scene = new Scene(canvas)

  function animate() {
    requestAnimationFrame(animate)
    scene.update()
    scene.render()
  }

  animate()
})
