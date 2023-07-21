<template>
  <Nav />
  <router-view />
</template>

<script>
import Nav from "./components/Global/Nav.vue";

export default {
  name: "App",
  components: {
    Nav,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container,
.container-fluid {
  min-height: 100vh;
}
.bg {
  background-color: #e5e5f7;
  background-image: url(assets/bg-pattern.png);
  background-size: 400px 400px;
  background-repeat: repeat;
}
p,
h2,
h3 {
  color: #222222;
}
.form, .form-tiny {
  margin: auto;
}
.form {
  width: 60%;
}
.form-tiny {
  width: 40%;
}
.error-box {
  height: 20px;
  margin-bottom: 10px;
}
.error-box p {
  font-size: 12px;
  color: red;
  font-weight: bold;
  margin: 1px 0 0 0;
}
.error {
  border-color: red;
  box-shadow: inset 0 0 0 0.1rem rgb(255 0 0 / 100%);
}
.error:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
}
.v-input__details div {
  font-weight: bold;
  text-align: left;
}
.form-wrapper {
  background-color: white;
  border-radius: 5px;
  padding: 1.5em;
  margin-bottom: 2em;
}
.errorWrapper {
  position: relative;
  display: block;
  text-align: left;
  height: 24px;
}
.v-text-field {
  margin-top: 0.5em;
}
.details {
  margin-top: -21.5px;
}
.details-outlined {
  margin-top: -21px;
}
.errorWrapper span {
  font-size: 11px;
  color: red;
}
button {
  font-weight: 600 !important;
}
.default:hover {
  text-decoration: none;
}
button:focus {
  outline: none;
}
.reset-link {
  text-decoration: underline;
  color: black;
}
.reset-link:hover {
  text-decoration: none;
}
.reset-link p {
  margin-bottom: 0;
  margin-top: 1em;
  text-align: right;
  font-size: 14px;
}
</style>
