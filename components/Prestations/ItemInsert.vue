<script setup>
  import { notifyError, notifyInfo } from './../../src/Notify/notify';
  const supabase = useSupabaseClient()
  const props = defineProps(['item'])
  const emit = defineEmits(['supprimer', 'annuler', 'modifier'])

  const prestaDelete = ref(false)
  const prestaUpdate = ref(false)
  const mutant = JSON.parse(JSON.stringify(props.item))

  async function updatePresta(mutant) {
    const data = await supabase
      .from('prestations')
      .update(mutant)
      .eq('id', mutant.id)
      .select()
    data.status != 200 ? notifyError('Un problème est survenue, veuillez recommencer') : notifyInfo('Les modifications ont bien été enregistré'), props.item = JSON.parse(JSON.stringify(mutant))
  }
</script>

<template>
  <div  class="space-y-2">
    <div v-if="!prestaUpdate" class="flex items-center">
      <div class="w-4/6">
          {{props.item.title}}
      </div>
      <div class="w-2/6">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{props.item.price + '€/' + props.item.unit_volum }}
          </p>
      </div>
      <div class="flex space-x-2 w-1/6">
        <button @click="prestaUpdate = true" class="">
            <!-- update -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
        </button>
        <button @click="prestaDelete = true" class="">
            <!-- delete -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </button>
      </div>
    </div>
    <div v-if="prestaUpdate" class="flex items-center">
      <div class="w-4/6">
        <input class="p-1 w-2/4 border shadow-xl" v-model="mutant.title" placeholder="titre*" type="text">
      </div>
      <div class="w-2/6 flex space-x-2">
          <input class="p-1 w-1/4 border shadow-xl" v-model="mutant.price" placeholder="prix*" type="number">
          <input class="p-1 w-1/4 border shadow-xl" v-model="mutant.unit_volum" placeholder="unité" type="text">
      </div>
      <div class="flex space-x-2 w-1/6">
        <button @click="prestaUpdate = false" class="">
            <!-- back -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
        </button>
        <button @click="updatePresta(mutant)" class="">
            <!-- valid -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </button>
      </div>
    </div>
    <PrestationsActionDeletePrestation v-if="prestaDelete"  @supprimer="$emit('supprimer', props.item)" @annuler="prestaDelete = false"/>
  </div>
</template>