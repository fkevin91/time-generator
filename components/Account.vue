
<script setup>
import { notifyError, notifyInfo } from './../src/Notify/notify';


const supabase = useSupabaseClient()
const { testexample } = await useFetch('/api/hello')
const loading = ref(true)
const username = ref('')
const name_enterprise = ref('')
const mail_enterprise = ref('')
const full_name = ref('')
const avatar_path = ref('')
const siret_enterprise = ref('')
const adress_enterprise = ref('')
const cp_enterprise = ref('')
const city_enterprise = ref('')
const tel_enterprise = ref('')
const website = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await supabase
  .from('profiles')
  .select(`mail_enterprise, name_enterprise, username, website, avatar_url, full_name, siret_enterprise, adress_enterprise, cp_enterprise, city_enterprise, tel_enterprise`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
  name_enterprise.value = data.name_enterprise
  mail_enterprise.value = data.mail_enterprise
  full_name.value = data.full_name
  siret_enterprise.value = data.siret_enterprise
  adress_enterprise.value = data.adress_enterprise
  cp_enterprise.value = data.cp_enterprise
  city_enterprise.value = data.city_enterprise
  tel_enterprise.value = data.tel_enterprise
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
      name_enterprise: name_enterprise.value,
      mail_enterprise: mail_enterprise.value,
      full_name: full_name.value,
      siret_enterprise: siret_enterprise.value,
      adress_enterprise: adress_enterprise.value,
      cp_enterprise: cp_enterprise.value,
      city_enterprise: city_enterprise.value,
      tel_enterprise: tel_enterprise.value,
    }

    let data = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    data.status != 201 ? notifyError('Un problème est survenue, veuillez verifier vos informations') : notifyInfo('Les modifications ont bien été enregistré')

    if (data.error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-3 opacity-90 bg-white">
    <form class="form-widget" @submit.prevent="updateProfile">
      <Avatar v-model:path="avatar_path" @upload="updateProfile" class="mb-5"/>
      <div class="mb-6">
        <label for="mail" class="block mb-2 text-sm font-medium text-gray-900 ">Email de connexion</label>
        <input type="mail" id="mail" :value="user.email" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="mail" required>
      </div>
      <div class="flex justify-between mb-6">
        <div class="p-1">
          <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 ">Nom*</label>
          <input type="full_name" id="full_name" v-model="full_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="full_name" required>
        </div>
        <div class="p-1">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 ">Prénom*</label>
          <input type="username" id="username" v-model="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username" required>
        </div>
      </div>
      <div class="mb-6">
        <label for="mail_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Email enterprise*</label>
        <input type="mail_enterprise" id="mail_enterprise" v-model="mail_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="mail_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="siret_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Siret enterprise*</label>
        <input type="siret_enterprise" id="siret_enterprise" v-model="siret_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="siret_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="name_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Nom enterprise*</label>
        <input type="name_enterprise" id="name_enterprise" v-model="name_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="adress_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Adresse enterprise*</label>
        <input type="adress_enterprise" id="adress_enterprise" v-model="adress_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="adress_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="cp_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Code postale enterprise*</label>
        <input type="cp_enterprise" id="cp_enterprise" v-model="cp_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="cp_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="city_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">Ville enterprise*</label>
        <input type="city_enterprise" id="city_enterprise" v-model="city_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="city_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="tel_enterprise" class="block mb-2 text-sm font-medium text-gray-900 ">N° tel enterprise*</label>
        <input type="tel_enterprise" id="tel_enterprise" v-model="tel_enterprise" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="tel_enterprise" required>
      </div>
      <div class="mb-6">
        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">Site Web</label>
        <input type="website" id="website" v-model="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="URL web site">
      </div>
      <div>
        <input
          type="submit"
          class="rounded-lg p-3 bg-blue-500 text-white cursor-pointer w-full"
          :value="loading ? 'Chargement ...' : 'Mettre a jour mes infos'"
          :disabled="loading"
        />
      </div>
    </form>
    <!--
      <div>
        <Signature />
      </div>
      <pre>{{ testexample }}</pre>
    -->
  </div>
</template>