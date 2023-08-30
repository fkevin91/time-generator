<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const devis = ref([])
const infoUser = ref('')
const src = ref('')
const logo = ref('')

let { data } = await supabase
  .from('profiles')
  .select(`siret_enterprise, name_enterprise, avatar_url, adress_enterprise, cp_enterprise, city_enterprise, tel_enterprise, mail_enterprise`)
  .eq('id', user.value.id)
  .single()

if (data) {
  infoUser.value = data
}

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(infoUser.value.avatar_url)
    if (error) throw error
    src.value = URL.createObjectURL(data)
    console.log(src)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

async function getDevis() {
  const { data } = await supabase.from('devis').select('*').eq('owner', user.value.id)
  devis.value = data
}

async function deleteDevis(item) {
	const { error } = await supabase.from('devis').delete().eq('id', item.id)
	if (!error) {
		devis.value.splice(devis.value.indexOf(item), 1)
	}
}

document.getElementById('logo')

function getBase64Image(img) {
  console.log(img)
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/jpeg");
  console.log(dataURL)
  
  return dataURL
}

downloadImage()
onMounted(() => {
  getDevis()
})
watch(src, () => {
  if (src) {
    getBase64Image(document.getElementById('logo'))
  }
});
</script>

<template>
  <div class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
    <img :src="src" alt="" id="logo" class="hidden" >
    <div class="flex items-center justify-between mb-4">
				<h5 class="text-xl font-bold leading-none text-gray-900">Liste des devis</h5>
    </div>
    <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200">
              <li class="py-3 sm:py-4" v-for="item in devis" :key="item.id">
								<DevisItemList :item="item" :logo="logo" :infoUser="infoUser" @supprimer="(n) => deleteDevis(n)"/>
              </li>
          </ul>
    </div>
  </div>
</template>