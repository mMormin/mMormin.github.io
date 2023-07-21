<template>
  <div class="container-fluid bg">
    <div class="container form-tiny d-flex flex-column justify-content-center">
      <NewPublicationForm />
    </div>
  </div>
</template>

<script>
import NewPublicationForm from "@/components/Form/NewPublicationForm.vue";

export default {
  name: "NewPublication",
  components: {
    NewPublicationForm,
  },
};
</script>
