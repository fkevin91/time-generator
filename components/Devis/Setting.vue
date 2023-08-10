
<script setup >
const supabase = useSupabaseClient()
const user = useSupabaseUser()
import imageSrc from 'assets/image/example-setting.jpg'

let label_total_1 = ref("Total HT")
let label_total_2 = ref("")
let label_total_3 = ref("Net à payer")
let label_total_4 = ref("TVA non Applicable article 293B du CGI")
let total_1 = ref('')
let total_2 = ref(0)
let total_3 = ref('')
let text_bottom_left_1 = ref("Conditions de règlement :")
let text_bottom_left_2 = ref("30% au démarrage chantier -Acomptes selon avancement des travaux")
let text_bottom_left_3 = ref("« Bon pour accord et commande »")
let sign_1 = ref("Pour l'entreprise")
let sign_2 = ref("Pour le client")
let useTVA = ref(false)
let setting_exist = ref(false)

function toggleTVA() {
  useTVA.value = !useTVA.value;
}

async function getSetting() {
  let { data } = await supabase.from('settingdevis').select('*').eq('user', user.value.id)
  console.log(data)
  if (data[0]) {
    setting_exist.value = true
    label_total_1.value = data[0].label_total_1 
    label_total_2.value = data[0].label_total_2
    label_total_3.value = data[0].label_total_3
    label_total_4.value = data[0].label_total_4
    total_2.value = data[0].total_2
    text_bottom_left_1.value = data[0].text_bottom_left_1
    text_bottom_left_2.value = data[0].text_bottom_left_2
    text_bottom_left_3.value = data[0].text_bottom_left_3
    sign_1.value = data[0].sign_1
    sign_2.value = data[0].sign_2
    useTVA.value = data[0].useTVA
  }
}

async function setSetting() {
  let settings_data = { 
    label_total_1 : label_total_1.value, 
    label_total_2 : label_total_2.value,
    label_total_3 : label_total_3.value,
    label_total_4 : label_total_4.value,
    total_2 : total_2.value,
    text_bottom_left_1 : text_bottom_left_1.value,
    text_bottom_left_2 : text_bottom_left_2.value,
    text_bottom_left_3 : text_bottom_left_3.value,
    sign_1 : sign_1.value,
    sign_2 : sign_2.value,
    useTVA : useTVA.value,
    user : user.value.id
  }
  
  if (setting_exist.value) {
    const { data } = await supabase
    .from('settingdevis')
    .update(settings_data)
    .eq('user', user.value.id)
    .select()
  } else {
    const { data } = await supabase
    .from('settingdevis')
    .insert(settings_data)
    .eq('user', user.value.id)
    .select()
    setting_exist.value = true
  }

}

onMounted(() => {
  getSetting()
})

watch(useTVA, (newValue, oldValue) => {
  if (newValue) {
    label_total_2.value = 'TVA'
    //label_total_4.value = ''
  } else {
    label_total_2.value = ' '
    total_2.value = 0
  }
});

</script>

<template>
  <div class="space-y-2 ">
    <img :src="imageSrc" alt="My Image" />
    <div class="flex justify-between space-x-5 h-20">
      <div class="flex items-center space-x-3">
        <span class="ml-3 text-sm font-medium text-gray-50">TVA applicables</span>
        <label class="relative inline-flex items-center mr-5 cursor-pointer">
          <input type="checkbox" true-value="1" false-value="0" @click="toggleTVA" :checked="useTVA" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      </div>
      <div v-if="useTVA" class="flex space-x-2 text-white flex-wrap items-center">
        <label>Taux de TVA (si applicables)</label>
        <div>
          <input size="3" type="tel" v-model="total_2" class="w-14 text-gray-800 text-center">
        </div>
        <div>%</div>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-2 text-xs opacity-90 bg-white p-3">

      <div class="col-span-6 flex justify-center">
        <p class="italic text-xs text-blue-400">cliquez pour modifier</p>
      </div>
      <div class="bg-green-400 col-span-4">
        <input type="text" class="w-full p-1" v-model="text_bottom_left_1">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" v-model="label_total_1">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" disabled v-model="total_1">
      </div>
      <div class="bg-green-400 col-span-4">
        <input type="text" class="w-full p-1" v-model="text_bottom_left_2">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" :disabled="!useTVA" v-model="label_total_2">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" :disabled="!useTVA" v-model="total_2">
      </div>
      <div class="bg-green-400 col-span-4">
        <input type="text" class="w-full p-1" v-model="text_bottom_left_3">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" v-model="label_total_3">
      </div>
      <div class="bg-blue-400">
        <input type="text" class="w-full p-1" disabled v-model="total_3">
      </div>
      <div class="bg-blue-400 col-span-2">
        <input type="text" class="w-full p-1" v-model="sign_1" placeholder="Pour l'entreprise">
      </div>
      <div class="bg-white col-span-2">
        <input type="text" class="w-full p-1" v-model="sign_2" placeholder="Pour le client">
      </div>
      <div class="bg-red-400 col-span-2">
        <input type="text" class="w-full p-1" v-model="label_total_4" placeholder="TVA non Applicable article 293B du CGI">
      </div>
    </div>
    <div class="flex justify-end">
      <button @click="setSetting" class="rounded-lg p-3 bg-blue-500 text-white cursor-pointer w-full">
        Mettre a jour
      </button>
    </div>
  </div>
</template>