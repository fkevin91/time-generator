<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const emailOtp = ref('')
const emailSignUp = ref('')
const emailLogin = ref('')
const passSignUp = ref('')
const passLogin = ref('')
const display = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: emailOtp.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const signUpWithEmail = async () => {
  try {
    loading.value = true 
    const { data, error } = await supabase.auth.signUp({
      email: emailSignUp.value,
      password: passSignUp.value,
    })
    if (error) throw error
    //alert('Vérifiez vos emails pour confirmer l\'inscription')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const loginWithEmail = async () => {
  try {
    loading.value = true 
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailLogin.value,
      password: passLogin.value,
    })
    if (error) throw error
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center mt-10">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-60 h-60 mb-10">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>

    <div class="flex justify-evenly p-10 mt-10" v-if="display === ''">
      <div class="p-3 text-xl text-gray-600 bg-white rounded-lg shadow-xl cursor-pointer" @click="display = 'login'">Se connecter</div>
      <div class="p-3 text-xl text-gray-600 bg-white rounded-lg shadow-xl cursor-pointer" @click="display = 'signup'">S'inscrire</div>
    </div>

    <form v-if="display === 'login' || display === 'signup'" class="flex justify-center mt-10" @submit.prevent="display === 'login' ? loginWithEmail : signUpWithEmail">
      <div class="flex flex-col items-center space-y-3">
        <div class="flex items-center">
          <svg @click="display = ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl ml-2"> {{ display === 'login' ? 'Connexion' : 'Inscription' }}</p>
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg w-64" type="email" placeholder="Votre email" v-model="display === 'login' ? emailLogin : emailSignUp" />
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg w-64" type="password" placeholder="Votre password" v-model="display === 'login' ? passLogin : passSignUp" />
        </div>
        <div>
          <input
            type="submit"
            class="p-3 bg-blue-500 rounded-lg text-white cursor-pointer"
            :value="loading ? 'Loading' : display === 'login' ? 'Se connecter' : 'S\'inscrire'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>
