<script setup >
import { BLANK_PDF, generate } from '@pdfme/generator';
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const title = ref('')
const price = ref('')
const unit_volum = ref('')
const avertissement = ref('')
const prestations = ref([])


let addPresta = async function () {
  if (title.value != '' && price.value != '') {
    avertissement.value = ''
    let prestas = []
    prestas.push({
      user: user.value.id,
      title: title.value,
      price: price.value,
      unit_volum: unit_volum.value,
    })
    
    const { data, error } = await supabase.from('prestations').insert(prestas)

    title.value = ''
    price.value = ''
    unit_volum.value = ''
  } else {
    avertissement.value = 'Veuillez remplir le titre et le prix svp'
  }
}

async function getPrestations() {
  const { data } = await supabase.from('prestations').select('*').eq('user', user.value.id)
  prestations.value = data
}

onMounted(() => {
  getPrestations()
})

</script>

<template>
  <div class="p-3 rounded-lg shadow-xl h-full space-y-3 opacity-90 bg-white">
    <div class="flex justify-between">
      <input class="p-1 w-36 border-b-2 shadow-xl" v-model="title" placeholder="titre*" type="text">
      <input class="p-1 w-16 border-b-2 shadow-xl" v-model="price" placeholder="prix*" type="number">
      <input class="p-1 w-16 border-b-2 shadow-xl" v-model="unit_volum" placeholder="m2/mL/.." type="text">
      <button class="p-1 bg-green-500 text-white rounded-lg" @click="addPresta">Ajouter</button>
    </div>
    <div class="-mt-1">{{ avertissement }}</div>
    <div class="space-y-2" v-for="item, index in prestations" :key="index">
      <div class="flex justify-between items-center text-base">
        <div class="w-32">{{ item.title }}</div>
        <div class="w-16">{{item.price + '€/' + item.unit_volum }}</div>
      </div>
    </div>
  </div>
</template>