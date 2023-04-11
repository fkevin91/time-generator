<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const devis = ref([])


async function getDevis() {
  const { data } = await supabase.from('devis').select('*')
  devis.value = data
}

onMounted(() => {
  getDevis()
})
</script>

<template>
  <div>
    <div v-for="item in devis" :key="item.id">
      {{item.number + ' => ' + item.title + ' => ' + item.description }}
    </div>
  </div>
  
</template>