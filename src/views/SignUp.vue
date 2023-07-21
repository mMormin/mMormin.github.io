<template>
  <div class="container-fluid bg">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <h2 class="display-4">Créer un compte</h2>
      <p class="text-muted">en renseignant les champs ci-dessous</p>
      <NewUserForm />
    </div>
  </div>
</template>

<script>
import NewUserForm from "@/components/Form/NewUserForm.vue";

export default {
  name: "SignUp",
  components: {
    NewUserForm,
  },
};
</script>

<style scoped>
.bg {
  background-color: #e5e5f7;
  background-image: url(../assets/bg-pattern.png);
  background-size: 400px 400px;
  background-repeat: repeat;
}
</style>
