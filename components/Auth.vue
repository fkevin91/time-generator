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
  <div>
    <div class="flex justify-center mt-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-60 h-60">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div class="flex justify-evenly p-10 mt-10" v-if="display == ''">
      <!--
        <div @click="display = 'magic'">Se connecter par MagicMail</div>
      -->
      <div class="p-3 text-xl text-gray-600 bg-white rounded-lg shadow-xl" @click="display = 'login'">Se connecter</div>
      <div class="p-3 text-xl text-gray-600 bg-white rounded-lg shadow-xl" @click="display = 'signup'">S'inscrire</div>
    </div>

    <!--
      <form v-if="display == 'magic'" class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
          <h1 class="header">App test</h1>
          <p class="description">connectez vous via magic link avec votre email</p>
          <div>
            <input class="inputField" type="email" placeholder="Votre email" v-model="emailOtp" />
          </div>
          <div>
            <input
              type="submit"
              class="button block"
              :value="loading ? 'Loading' : 'Recevoir mon magic link'"
              :disabled="loading"
            />
          </div>
        </div>
      </form>
    -->
    <form v-if="display == 'login'" class="row justify-center flex " @submit.prevent="loginWithEmail">
      <div class="space-y-3 items-center flex flex-col">
        <div class="flex space-x-3 items-center">
          <svg @click="display = ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl">Connexion</p>
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg" type="email" placeholder="Votre email" v-model="emailLogin" />
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg" type="password" placeholder="Votre password" v-model="passLogin" />
        </div>
        <div>
          <input
            type="submit"
            class="p-3 bg-blue-500 rounded-lg"
            :value="loading ? 'Loading' : 'Se connecter'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
    <form v-if="display == 'signup'" class="row justify-center flex" @submit.prevent="signUpWithEmail">
      <div class="space-y-3 items-center flex flex-col">
        <div class="flex space-x-3 items-center">
          <svg @click="display = ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xl">Inscription</p>
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg" type="email" placeholder="Votre email" v-model="emailSignUp" />
        </div>
        <div>
          <input class="p-3 bg-slate-50 rounded-lg" type="password" placeholder="Votre password" v-model="passSignUp" />
        </div>
        <div>
          <input
            type="submit"
            class="p-3 bg-blue-500 rounded-lg"
            :value="loading ? 'Loading' : 'S\'incrire'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>
