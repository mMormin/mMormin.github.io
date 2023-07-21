<template>
  <ModalConfirm :isActive="isActive">
    <template #header><h4>Modification du mot de passe</h4></template>
    <template #body>
      <v-form
        @submit.prevent="onSubmit"
        class="password-form d-flex flex-column"
      >
        <v-text-field
          v-model="oldPassword.value.value"
          name="oldPassword"
          :counter="8"
          label="Ancien mot de passe"
          type="text"
          placeholder="Ancien mot de passe"
          color="primary"
          :error-messages="errors.oldPassword"
          autocomplete="current-password"
          clearable
          required
        >
        </v-text-field>

        <v-text-field
          v-model="newPassword.value.value"
          name="newPassword"
          :counter="8"
          label="Nouveau mot de passe"
          :type="showPassword1 ? 'text' : 'password'"
          placeholder="Nouveau mot de passe"
          color="primary"
          :error-messages="errors.newPassword"
          autocomplete="new-password"
          :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword1 = !showPassword1"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="newPasswordConfirm.value.value"
          name="newPasswordConfirm"
          :counter="8"
          label="Confirmation du mot de passe"
          :type="showPassword2 ? 'text' : 'password'"
          placeholder="Confirmation du mot de passe"
          color="primary"
          autocomplete="new-password"
          :error-messages="errors.newPasswordConfirm"
          :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword2 = !showPassword2"
          required
        >
        </v-text-field>
      </v-form>
    </template>
    <template #footer>
      <v-btn @click="onCancel" color="red">annuler</v-btn>
      <v-btn @click="onSubmit" color="green">valider</v-btn>
    </template>
  </ModalConfirm>
</template>

<script>
import ModalConfirm from "@/components/Global/ModalConfirm.vue";
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "PasswordEditForm",
  props: {
    loggedUserData: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    getAuth: {
      type: Function,
    },
  },
  components: {
    ModalConfirm,
  },
  setup() {
    const PasswordSchema = Yup.object().shape({
      oldPassword: Yup.string()
        .min(8, "Mot de passe trop court")
        .required("Mot de passe requis"),
      newPassword: Yup.string()
        .min(8, "Minimum 8 caractéres")
        .notOneOf(
          [Yup.ref("oldPassword")],
          "Votre nouveau mot de passe doit être différent de l'ancien"
        )
        .required("Mot de passe requis"),
      newPasswordConfirm: Yup.string()
        .min(8, "Minimum 8 caractéres")
        .oneOf(
          [Yup.ref("newPassword")],
          "Les mots de passe ne correspondent pas"
        )
        .required("Mot de passe requis"),
    });

    const { handleSubmit, validate, values, errors } = useForm({
      validationSchema: PasswordSchema,
    });

    const oldPassword = useField("oldPassword");
    const newPassword = useField("newPassword");
    const newPasswordConfirm = useField("newPasswordConfirm");

    return {
      PasswordSchema,
      handleSubmit,
      validate,
      values,
      errors,
      oldPassword,
      newPassword,
      newPasswordConfirm,
    };
  },
  data() {
    return {
      showPassword1: false,
      showPassword2: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { valid } = await this.validate();
        if (
          valid ===
          true /*  && this.values.oldPassword PAS HACHED === this.loggedUserData.user.password HACHED */
        ) {
          await this.axios
            .put("http://localhost:3000/api/auth/profil/edit/password", {
              email: this.loggedUserData.email,
              password: this.values.newPassword,
            })
            .then(this.$emit("resetPasswordCompleted"));
          this.$router.push("/login");
        }
      } catch (e) {
        console.log(e);
      }
    },
    onCancel() {
      this.$emit("closeModalPassword", false);
      this.$emit("resetPasswordCompleted");
    },
  },
};
</script>

<style scoped>
.modal-header {
  justify-content: left;
}
.password-form {
  width: 100%;
}
</style>
