<template>
  <form class="register" @submit.prevent="submitForm">
    <h3>Register</h3>
    <div class="box p-3 bg-white border rounded">
      <div class="input-box mb-3" :class="{errorBox: name.message}">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" v-model="name.val">
        <div class="error" v-if="name.message">{{ name.message }}</div>
      </div>
      <div class="input-box mb-3" :class="{errorBox: email.message}">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="email.val">
        <div class="error" v-if="email.message">{{ email.message }}</div>
      </div>
      <div class="input-box mb-3" :class="{errorBox: password.message}">
        <label for="password">Password</label>
        <input type="password" id="password" class="form-control" v-model="password.val">
        <div class="error" v-if="password.message">{{ password.message }}</div>
      </div>
      <button v-if="!isLoading" class="btn btn-primary">Register</button>
      <button v-if="isLoading" class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
        <span role="status">Register</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      formIsValid: true,
      name: {
        val: '',
        message: ''
      },
      email: {
        val: '',
        message: ''
      },
      password: {
        val: '',
        message: ''
      },
    }
  },
  methods: {
    validateForm(inputs) {
      this.formIsValid = true

      if(inputs.includes('name')) {
        if(this.name.val == '') {
          this.name.message = "Name Field is Required."
          this.formIsValid = false
        }else {
          this.name.message = ""
        }
      }

      if(inputs.includes('email')) {
        if(this.email.val == '') {
          this.email.message = "Email Field is Required."
          this.formIsValid = false
        }else if(!this.email.val.match( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
          this.email.message = "Enter a Valid Email."
          this.formIsValid = false
        }else {
          this.email.message = ""
        }
      }

      if(inputs.includes('password')) {
        if(this.password.val.length < 8) {
          this.password.message = "Password Field Must Be at least 8 Characters."
          this.formIsValid = false
        }else {
          this.password.message = ""
        }
      }
    },
    async submitForm() {
      this.validateForm(['name', 'email', 'password'])

      if(!this.formIsValid) {
        return;
      }
      
      this.isLoading = true
      await this.$store.dispatch('register', {
        name: this.name.val,
        email: this.email.val,
        password: this.password.val
      })
      if(this.$store.getters.emailExists) {
        this.isLoading = false
        this.email.message = "Email Already Exsits."
      }else {
        await this.$store.dispatch('checkAuth')
        this.isLoading = false
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style scoped>
  form.register {
    width: 700px;
    margin: 200px auto 0;
  }

  .error {
    color: var(--bs-danger);
  }
  .errorBox label {
    color: var(--bs-danger);
  }
  .errorBox input {
    border-color: var(--bs-danger);
  }
</style>