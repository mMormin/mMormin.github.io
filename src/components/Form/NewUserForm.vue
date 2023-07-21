<template>
  <v-form @submit.prevent="onSubmit" class="d-flex flex-column col-md-4">
    <div class="form-wrapper">
      <v-text-field
        v-model="email.value.value"
        name="email"
        label="Email *"
        type="email"
        placeholder="Adresse email"
        color="primary"
        :error-messages="errors.email"
        clearable
        required
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="password.value.value"
        name="password"
        :counter="8"
        label="Mot de passe *"
        type="text"
        placeholder="Mot de passe"
        color="primary"
        :error-messages="errors.password"
        clearable
        required
        variant="underlined"
      >
      </v-text-field>

      <v-text-field
        v-model="passwordConfirm.value.value"
        name="passwordConfirm"
        :counter="8"
        label="Confirmation du mot de passe *"
        type="text"
        placeholder="Mot de passe"
        color="primary"
        :error-messages="errors.passwordConfirm"
        clearable
        required
        variant="underlined"
      >
      </v-text-field>
    </div>
    <div class="input-group mb-3 flex-row-reverse">
      <v-btn :disabled="form" color="green" type="submit"
        >Créer mon compte</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "NewUserForm",
  setup() {
    const signInSchema = Yup.object().shape({
      email: Yup.string()
        .email("Adresse email non valide")
        .required("Adresse email requise"),
      password: Yup.string()
        .min(8, "Minimum 8 caractéres")
        .required("Mot de passe requis"),
      passwordConfirm: Yup.string()
        .min(8, "Minimum 8 caractéres")
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Mot de passe requis"),
    });

    const { handleSubmit, validate, values, errors } = useForm({
      validationSchema: signInSchema,
    });

    const email = useField("email");
    const password = useField("password");
    const passwordConfirm = useField("passwordConfirm");

    return {
      signInSchema,
      handleSubmit,
      validate,
      values,
      errors,
      email,
      password,
      passwordConfirm,
    };
  },
  data() {
    return {
      form: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { valid } = await this.validate();

        if (valid) {
          await this.axios
            .post("http://localhost:3000/api/auth/sign-up", this.values)
            .then(this.$router.push("/"));
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1em;
}
</style>
