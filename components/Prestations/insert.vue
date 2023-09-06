<script setup >
import { notifyError, notifyInfo } from './../../src/Notify/notify';
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const title = ref('')
const price = ref('')
const unit_volum = ref('')
const prestations = ref([])

let addPresta = async function () {
  if (title.value != '' && price.value != '') {
    let prestas = []
    prestas.push({
      user: user.value.id,
      title: title.value,
      price: price.value,
      unit_volum: unit_volum.value,
    })
    
    const data = await supabase.from('prestations').insert(prestas)
    if (data.status == 201) {
      notifyInfo('La prestation à bien été enregistré')
      title.value = ''
      price.value = ''
      unit_volum.value = ''
      getPrestations()
    } else {
      notifyError('Une erreur est survenue, veuillez verifier et recommencer')
    }
  } else {
    notifyError('Veuillez remplir le titre et le prix svp')
  }
}

async function getPrestations() {
  const { data } = await supabase.from('prestations').select('*').eq('user', user.value.id)
  prestations.value = data
}

async function deletePrestation(item) {
	const { error } = await supabase.from('prestations').delete().eq('id', item.id)
	if (!error) {
		prestations.value.splice(prestations.value.indexOf(item), 1)
    notifyInfo('La prestation à bien été supprimé')
	}
}

onMounted(() => {
  getPrestations()
})

</script>

<template>
  <div class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
		<div class="flex items-center justify-between mb-4">
				<h5 class="text-xl font-bold leading-none text-gray-900 ">Liste des prestations</h5>
    </div>
    <div class="rounded-lg shadow-xl h-full space-y-3 opacity-90 bg-white">
      <div class="flex justify-between space-x-1">
        <input class="p-1 w-2/4 border shadow-xl" v-model="title" placeholder="titre*" type="text">
        <input class="p-1 w-1/4 border shadow-xl" v-model="price" placeholder="prix*" type="number">
        <input class="p-1 w-1/4 border shadow-xl" v-model="unit_volum" placeholder="unité" type="text">
      </div>
      <button class="w-full p-1 bg-green-500 text-white rounded-lg" @click="addPresta">Ajouter</button>
    </div>
    <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 ">
              <li class="py-3 sm:py-4" v-for="item, index in prestations" :key="index">
                <PrestationsItemInsert :item="item" @supprimer="(n) => deletePrestation(n)"/>
              </li>
          </ul>
    </div>
  </div>

</template>