<template>
  <div class="container d-flex flex-column justify-content-center">
    <div class="row">
      <div class="col-lg-6">
        <h2 class="display-4">Mot de passe oublié ?</h2>
        <p class="text-muted">
          Entrez l'adresse e-mail associée à votre compte
        </p>
        <PasswordResetForm @show-modal-confirm="showModalConfirm" />
      </div>
      <div class="empty col-lg-6"></div>
    </div>
    <PasswordEditForm
      @hide-modal-password="hideModalPassword"
      @reset-password-completed="deleteAuthResetPassword"
      :loggedUserData="userDatas"
    />
    <ModalConfirm :isActive="activeModal">
      <template #header><h4>Email envoyé !</h4></template>
      <template #body>
        <p>
          Connectez vous à votre boîte mail et suivez les instructions de
          l'email.
        </p>
      </template>
      <template #footer>
        <v-btn @click="hideModalConfirm" color="green">Got it!</v-btn>
      </template>
    </ModalConfirm>
  </div>
</template>

<script>
import PasswordResetForm from "@/components/Form/PasswordResetForm.vue";
import PasswordEditForm from "@/components/Form/PasswordEditForm.vue";
import ModalConfirm from "@/components/Global/ModalConfirm.vue";

export default {
  name: "ForgottenPassword",
  components: {
    PasswordResetForm,
    PasswordEditForm,
    ModalConfirm,
  },
  data() {
    return {
      userDatas: [],
      email: "",
      activeModalPassword: false,
      activeModal: false,
    };
  },
  methods: {
    showModalPassword() {
      this.activeModalPassword = false;
    },
    hideModalPassword() {
      this.activeModalPassword = false;
    },
    showModalConfirm(payload) {
      this.activeModal = payload;
    },
    hideModalConfirm() {
      this.activeModal = false;
    },
    async setAuthResetPassword() {
      try {
        await this.axios
          .post("http://localhost:3000/api/auth/reset-password/sign-in", {
            email: this.email,
          })
          .then((response) => {
            const { token } = response.data;
            localStorage.setItem("token", token);
            this.axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
            this.$store.commit("setAuth");
            this.axios
              .get("http://localhost:3000/api/auth/profil")
              .then((user) => {
                this.userDatas = user.data;
              });
          });
      } catch (e) {
        console.log(e);
      }
    },
    deleteAuthResetPassword() {
      localStorage.removeItem("token");
      this.$store.commit("deleteAuth");
    },
  },
  mounted() {
    const emailUrlParam = this.$route.query.email;
    if (emailUrlParam) {
      this.showModalPassword;
      this.email = emailUrlParam;
      this.setAuthResetPassword;
    }
  },
};
</script>

<style scoped>
.empty {
  background: url(../assets/bg-pattern.png) no-repeat center center fixed;
  background-size: cover;
  padding: 0;
}
h2 {
  font-size: 2.75rem;
}
</style>