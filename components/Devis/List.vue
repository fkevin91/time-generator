<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const devis = ref([])
const devisDelete = ref(false)


async function getDevis() {
  const { data } = await supabase.from('devis').select('*').eq('owner', user.value.id)
  devis.value = data
}

async function deleteDevis(item) {
	const { error } = await supabase.from('devis').delete().eq('id', item.id)
	console.log(error)
	if (!error) {
		devis.value.splice(devis.value.indexOf(item), 1)
	}
}

onMounted(() => {
  getDevis()
})
</script>

<template>
  <div class="relative w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
		<div class="flex items-center justify-between mb-4">
				<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Liste des devis</h5>
    </div>
    <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="py-3 sm:py-4" v-for="item in devis" :key="item.id">
								<DevisItemList :item="item" @supprimer="(n) => deleteDevis(n)"/>
              </li>
          </ul>
    </div>
  </div>
</template>