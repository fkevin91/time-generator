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
      <div class="rounded-lg shadow-xl p-3 bg-slate-300" @click="menu = 'myaccount'">Mon compte</div>
    </div>
    <div v-if="menu" @click="menu = ''">retour</div>
    <DevisInsert v-if="menu === 'newdevis'" />
    <DevisList v-if="menu === 'listdevis'" />
    <Account v-if="menu === 'myaccount'" />

  </div>
</template>