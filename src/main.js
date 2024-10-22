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

  // Add overlay
  const overlay = document.createElement('div')
  overlay.className = 'overlay'
  overlay.innerHTML = `
    <h1>Jake Hopkins</h1>
    <h2>(AKA "Foot")</h2>
    <p>Indulge in the ultimate relaxation experience with our expert foot massages. Our skilled therapists use a combination of techniques to soothe tired feet, improve circulation, and promote overall well-being. Whether you're looking to unwind after a long day or treat yourself to some pampering, our foot massages will leave you feeling refreshed and rejuvenated.</p>
  `
  document.body.appendChild(overlay)
})
