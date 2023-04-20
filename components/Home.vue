<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const menu = ref('')

</script>

<template>
  <div class="p-3">
    <div v-if="!menu" class="flex flex-col items-center justify-around space-y-8">
      <div class="rounded-lg shadow-xl p-3 bg-slate-300" @click="menu = 'newdevis'">Nouveau Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-300" @click="menu = 'listdevis'">Liste des Devis</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-300 line-through" @click="menu = 'newinvoice'">Nouvelle Facture</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-300 line-through" @click="menu = 'listinvoices'">Liste des Facture</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-300" @click="menu = 'newprestas'">Ajouter des prestations</div>
      <div class="rounded-lg shadow-xl p-3 bg-slate-300" @click="menu = 'myaccount'">Mon compte</div>
    </div>
    <div v-if="menu" @click="menu = ''">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <DevisInsert v-if="menu === 'newdevis'" />
    <PrestationsInsert v-if="menu === 'newprestas'" />
    <DevisList v-if="menu === 'listdevis'" />
    <Account v-if="menu === 'myaccount'" />

  </div>
</template>