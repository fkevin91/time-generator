<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const devis = ref([])


async function getDevis() {
  const { data } = await supabase.from('devis').select('*').eq('owner', user.value.id)
  devis.value = data
}

onMounted(() => {
  getDevis()
})
</script>

<template>
  <div class="p-3 opacity-80 bg-white">
    <div v-for="item in devis" :key="item.id">
      {{item.number + ' => ' + item.title + ' => ' + item.description }}
    </div>
  </div>
  
</template>