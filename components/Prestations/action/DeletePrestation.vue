<script setup>
  const emit = defineEmits(['supprimer', 'annuler'])
</script>

<template>
  <div class="relative bg-gray-200 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div class="mx-auto max-w-md">
      <p class="text-center">Voulez vous vraiment supprimer la prestation ci-dessus ?</p>
      <div class="flex justify-evenly pt-5">
        <button @click="$emit('supprimer')" class="bg-red-500 p-2 text-center text-white rounded-xl">Supprimer</button>
        <button @click="$emit('annuler')" class="bg-green-500 p-2 text-center text-white rounded-xl">Annuler</button>
      </div>
    </div>
  </div>
</template>