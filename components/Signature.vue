<template>
  <div class="bg-white">
    <div ref=""></div>
    <div class="wrapper">
      <canvas id="signaturePadContainer" class="signature-pad" width=400 height=200></canvas>
    </div>
    <div class="flex justify-evenly p-3">
      <button class=" rounded-lg p-3 bg-red-500 text-white" @click="clearSignature">Effacer</button>
      <button class=" rounded-lg p-3 bg-blue-500 text-white" @click="saveSignature">Enregistrer</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import SignaturePad from 'signature_pad'

export default {
  setup() {
    const signaturePadContainer = ref()
    let signaturePad = null

    onMounted(() => {
      // Initialisation de Signature Pad
      const canvas = document.getElementById('signaturePadContainer')
      signaturePad = new SignaturePad(canvas)
    })

    const clearSignature = () => {
      // Effacer la signature
      signaturePad.clear()
    }

    const saveSignature = () => {
      // Récupérer la signature en SVG
      const signatureSvg = signaturePad.toDataURL('image/svg+xml')

      // Faites ce que vous voulez avec la signature en SVG ici
      console.log('Signature en SVG:', signatureSvg)
    }

    return {
      signaturePadContainer,
      clearSignature,
      saveSignature
    }
  }
}
</script>

<style>
#signaturePadContainer {
  border: 1px solid #000;
  width: 100%;
  height: 200px;
}
</style>
