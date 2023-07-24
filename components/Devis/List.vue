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
  
<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Liste des devis</h5>
   </div>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4" v-for="item in devis" :key="item.id">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        {{item.number}}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{item.title}}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {{ item.full_name_client }}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {{ item.total_ttc +"€" }}
                    </div>
                </div>
            </li>
        </ul>
   </div>
</div>

  
</template>