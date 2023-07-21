<template>
  <transition name="modal">
    <div
      v-if="isActive !== false"
      data-cy="modal-backdrop"
      class="modal-backdrop"
      @click="close"
    >
      <div data-cy="modal" class="modal">
        <header data-cy="header-slot" class="modal-header">
          <slot name="header"><p>This is the head</p></slot>
        </header>
        <body data-cy="body-slot" class="modal-body">
          <slot name="body"><p>This is the body</p></slot>
        </body>
        <footer data-cy="footer-slot" class="modal-footer">
          <slot name="footer"><p>This is the footer</p></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("activeModal", false);
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.modal {
  background: #ffffff;
  box-shadow: 1px 1px 10px 1px #727272;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 5em auto;
  padding: 1.5em 1em 0 1em;
  border-radius: 4px;
  justify-content: space-around;
  position: relative;
}
.modal-header {
  display: flex;
  border: 0;
  padding: 0;
  margin-bottom: 1em;
}
h4 {
  margin: 0;
}
.modal-header {
  position: relative;
  justify-content: center;
}
.modal-body {
  position: relative;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
}
.modal-footer {
  padding: 1.5em 1em 1.5em 1em;
}
</style>
