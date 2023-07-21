<template>
  <v-form @submit.prevent="onSubmit" class="d-flex flex-column col-md-4">
    <div class="form-wrapper">
      <v-text-field
        v-model="email.value.value"
        name="email"
        label="Email *"
        type="email"
        placeholder="johndoe@gmail.com"
        color="primary"
        :error-messages="errors.email"
        clearable
        required
        variant="outlined"
      >
      </v-text-field>

      <v-text-field
        variant="outlined"
        v-model="password.value.value"
        :type="showPassword ? 'text' : 'password'"
        :counter="8"
        color="primary"
        required
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="errors.password"
        @click:append="showPassword = !showPassword"
        placeholder="Entrer votre mot de passe"
        label="Mot de passe"
      >
      </v-text-field>

      <router-link class="reset-link" to="/reset-password"
        ><p>Mot de passe oublié ?</p></router-link
      >
    </div>
    <div class="input-group mb-3 flex-row-reverse">
      <v-btn color="green" type="submit">Se connecter</v-btn>
    </div>
  </v-form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "LogInForm",
  setup() {
    const logInSchema = Yup.object().shape({
      email: Yup.string()
        .email("Adresse email non valide")
        .required("Adresse email requise"),
      password: Yup.string()
        .min(8, "Minimum 8 caractéres")
        .required("Mot de passe requis"),
    });

    const { handleSubmit, validate, values, errors } = useForm({
      validationSchema: logInSchema,
    });

    const email = useField("email");
    const password = useField("password");

    return {
      logInSchema,
      handleSubmit,
      validate,
      values,
      errors,
      email,
      password,
    };
  },
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { valid } = await this.validate();
        if (valid === true) {
          await this.axios
            .post("http://localhost:3000/api/auth/sign-in", this.values)
            .then((response) => {
              const { token } = response.data;
              localStorage.setItem("token", token);
              this.axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${token}`;
              this.$store.commit("setAuth");
              this.$router.go("/");
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
