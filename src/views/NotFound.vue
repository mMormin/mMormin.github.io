<template>
  <div class="container-fluid bg-404">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="wrapper">
        <p class="pinky">404</p>
        <h4>Page not Found</h4>
        <p class="catch">La page que vous recherchez semble ne pas exister</p>
        <p class="solong">:(</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.bg-404 {
  background-color: rgb(241, 241, 241);
}
.wrapper {
  text-align: left;
}
.pinky {
  font-size: 15vw;
  line-height: 15vw;
  font-weight: bold;
  color: pink;
  margin: 0;
  transform: rotate(2deg);
}
h4 {
  font-size: 4vw;
  line-height: 4vw;
  font-weight: bold;
  margin: 0;
  letter-spacing: -5px;
  color: rgb(87, 64, 190);
  transform: rotate(-2deg);
}
.catch {
  color: rgb(82, 82, 82);
  font-size: 1.5vw;
  line-height: 1.5vw;
  margin-top: 1em;
}
.solong {
  position: absolute;
  top: 31%;
  transform: rotate(62deg);
  right: 25vw;
  font-size: 15vw;
  line-height: 15vw;
  font-weight: bold;
  color: rgb(247, 209, 154);
  margin: 0;
}
</style>
