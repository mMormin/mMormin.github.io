<template>
  <div class="container-fluid bg-log-in">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <LogInForm />
    </div>
  </div>
</template>

<script>
import LogInForm from "@/components/Form/LogInForm.vue";

export default {
  name: "LogIn",
  components: {
    LogInForm,
  },
};
</script>

<style scoped>
.bg-log-in {
  background: url(../assets/bg.jpg) no-repeat center center fixed;
  background-size: cover;
}
</style>
