
<script setup>
const supabase = useSupabaseClient()
const { testexample } = await useFetch('/api/hello')
console.log(testexample)
const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

let { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
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
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) throw error
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
      <Avatar v-model:path="avatar_path" @upload="updateProfile" />
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="email" id="email" :value="user.email" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
        <input type="username" id="username" v-model="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div class="mb-6">
        <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
        <input type="website" id="website" v-model="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
      </div>
      <div>
        <Signature />
      </div>
      <pre>{{ testexample }}</pre>
  
      <div>
        <input
          type="submit"
          class="button primary block"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>