<script setup>
//import { computed } from 'vue'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const emit = defineEmits(['totalttc', 'presta'])
const props = defineProps(['item'])

const prestations = ref([])
if (props.item) {
  prestations.value = props.item
}

let title = ref('')
let price = ref('')
let unit_volum = ref('')
let avertissement = ref('')

async function getPrestations() {
  const { data } = await supabase.from('prestations').select('*').eq('user', user.value.id)
  data.forEach(element => {
    element.quantity = 0
    element.total = 0
  });
  prestations.value = data
}

let totalRow = function (a) {
  a.total = a.price*a.quantity
  return a
}
let lessQuantity = function (a) {
  a.quantity--
  if(a.quantity<0) a.quantity = 0
  totalRow(a)
  return a
}
let moreQuantity = function (a) {
  ++a.quantity
  totalRow(a)
  return a
}

let addPresta = function () {
  if (title.value != '' && price.value != '') {
    avertissement.value = ''
    prestations.value.push({
      id: 'id'+title+price,
      title: title.value,
      price: price.value,
      unit_volum: unit_volum.value,
      quantity: 0,
      total: 0,
    })
    title.value = ''
    price.value = ''
    unit_volum.value = ''
  } else {
    avertissement.value = 'Veuillez remplir le titre et le prix svp'
  }
}

const totalColumn = computed(()=> {
  let total = 0
  for (const key in prestations.value) {
    total +=prestations.value[key].total
  }
  return total
})
watch(totalColumn, () => {
  let result = prestations.value.filter(prestation => prestation.quantity > 0)
  emit("totalttc", totalColumn.value) 
  emit("presta", result)
})



onMounted(() => {
  !props.item ? getPrestations() : false
})
</script>

<template>
  <div class="p-1 space-y-4">
    <div class="flex justify-between flex-wrap">
      <input class="p-1 w-36 border-b-2 shadow-xl" v-model="title" placeholder="title*" type="text">
      <input class="p-1 w-16 border-b-2 shadow-xl" v-model="price" placeholder="price*" type="number">
      <input class="p-1 w-16 border-b-2 shadow-xl" v-model="unit_volum" placeholder="unit" type="text">
      <button class="p-1 bg-green-500 text-white rounded-lg" @click="addPresta">Ajouter</button>
    </div>
    <div>{{ avertissement }}</div>
    <div v-for="item in prestations" :key="item.id">
      <div class="flex justify-between items-center text-base">
        <div class="w-28 text-sm">{{ item.title }}</div>
        <div class="w-16">{{item.price + '€/' + item.unit_volum }}</div>
        <div class="flex items-center space-x-1">
          <div @click="lessQuantity(item)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div><input type="number" v-model="item.quantity" @input="totalRow(item)" class="w-12"></div>
          <div @click="moreQuantity(item)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="w-16 text-end">{{ item.total + '€' }}</div>
      </div>
    </div>
    <div class="text-end ">
      {{'Total catégorie : ' + totalColumn + '€' }}
    </div>
  </div>
  
</template>