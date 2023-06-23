<script setup>
import backgroundUrl from 'assets/image/paul-frenzel.jpg'
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const urlImage = backgroundUrl
async function signOut() {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div class="h-full min-h-screen background-size" :style="{ backgroundImage: `url(${urlImage})` }">
    <div>
      <div class="flex justify-between p-8 text-white">
        <div></div>
        <h1 class="text-4xl font-bold">QUOTE GENIUS</h1>
        <button v-if="user" class="button block" @click="signOut">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
        <div v-if="!user"></div>
      </div>
    </div>
    <div>{{JSON.strigify(user)}}</div>
    <Home v-if="user" />
    <Auth v-else />
  </div>
</template>

<style>
.background-size {
  background-size: cover;
}
</style>
