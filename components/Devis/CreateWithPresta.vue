<script setup >
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const emit = defineEmits(['totalttc', 'presta'])
const props = defineProps(['prestation'])

const title = ref('')

let newCat = ref('')
let addCat = ref(false)
let totaux = ref({})
let prestas = ref({
  general: null,
})

if (props.prestation) {
  prestas.value = props.prestation  
}

function prestaComputed(index, n){
  prestas.value[index] = n
}

function addCatPresta(prop){
  prestas.value[prop] = null
  newCat = ''
  addCat.value = false
}

const totalColumn = computed(()=> {
  let total = 0
  for (const key in prestas.value) {
    //total +=totaux.value[key].total
    for (const k in prestas.value[key]) {
        total +=prestas.value[key][k].total
    }
  }
  return total
})

watch(totalColumn, () => {
  emit("totalttc", totalColumn.value) 
  emit("presta", prestas.value)
})

</script>

<template>
  <div class="p-1  space-y-2">
    <div v-for="item, index in prestas" :key="index">
      <p class="font-bold text-lg">{{ index }}</p>
      <PrestationsList @totalttc="(n)=>totaux[index] = n" :item="item" @presta="(n)=>prestaComputed(index, n)"/>
    </div>
  </div>
  <div class="flex justify-end pr-2">
    <div>{{ 'Total : ' + totalColumn + '€' }}</div>

  </div>
  <div v-if="!addCat" @click="addCat = true" class="flex space-x-3 p-3 items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p>Ajouter une categorie</p>
  </div>
  <div v-if="addCat" class="flex p-3 ">
    <div @click="addCat = false" class="rounded-l-lg bg-blue-500 text-white p-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <input type="text" v-model="newCat" class="w-full border-blue-500 border p-2">
    <div @click="addCatPresta(newCat)" class="p-2 bg-blue-500 rounded-r-lg text-white">Ajouter</div>
  </div>
</template>