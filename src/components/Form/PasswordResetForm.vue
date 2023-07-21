<template>
  <v-form @submit.prevent="onSubmit">
    <div>
      <v-text-field
        name="email"
        label="Email *"
        type="email"
        v-model="email.value.value"
        placeholder="johndoe@gmail.com"
        :error-messages="errors.email"
        color="primary"
        clearable
        required
        variant="outlined"
      >
      </v-text-field>
    </div>

    <div class="input-group mb-3 flex-row-reverse">
      <v-btn color="green" type="submit">Continuer</v-btn>
    </div>
  </v-form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "PasswordResetForm",
  setup() {
    const resetPasswordSchema = Yup.object().shape({
      email: Yup.string()
        .email("Adresse email non valide")
        .required("Adresse email requise"),
    });

    const { handleSubmit, validate, value, errors } = useForm({
      validationSchema: resetPasswordSchema,
    });

    const email = useField("email");

    return {
      resetPasswordSchema,
      handleSubmit,
      validate,
      value,
      errors,
      email,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { valid } = await this.validate();
        if (valid) {
          await this.axios
            .post("http://localhost:3000/api/auth/reset-password/email", {
              email: this.email.value.value,
            })
            .then(() => {
              this.$emit("showModalConfirm", true);
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.v-input {
  padding: 0 20%;
}
</style>
