<template>
  <div class="container-fluid">
    <div class="container d-flex flex-column container justify-content-center">
      <AdminLogs />
      <DebuggView />
    </div>
  </div>
</template>

<script>
import AdminLogs from "@/components/Global/AdminLogs.vue";
import DebuggView from "@/components/Global/DebuggView.vue";

export default {
  name: "Admin",
  components: {
    AdminLogs,
    DebuggView,
  },
};
</script>
