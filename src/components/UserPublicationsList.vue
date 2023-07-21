<template>
  <div class="container-fluid bg">
    <div class="container d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-around align-content-around flex-wrap">
        <div
          v-for="publicationDatas in publicationsDatas"
          :key="publicationDatas.id"
          class="card"
        >
          <div class="box">
            <img
              :src="rootImg + publicationDatas.imageUrl"
              class="card-img-top img-fluid"
              alt="..."
            />
          </div>
          <div class="card-body">
            <p class="title">{{ publicationDatas.title }}</p>
          </div>
          <div
            class="card-footer d-flex justify-content-between align-items-center"
          >
            <small>
              <p v-if="publicationDatas.commentariesNbr === 0">
                Aucun commentaire
              </p>
              <p v-else>
                {{ publicationDatas.commentariesNbr }} Commentaires
              </p></small
            >
            <div class="btn-container">
              <button
                @click="showPublication(publicationDatas.id)"
                class="btn btn-info"
              >
                <v-tooltip location="top" text="Voir la publication">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="material-icons icon"
                      >visibility</span
                    >
                  </template>
                </v-tooltip>
              </button>
              <button
                @click="deletePublication(publicationDatas.id)"
                class="btn btn-danger"
              >
                <v-tooltip location="top" text="Supprimer la publication">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props" class="material-icons icon"
                      >delete</span
                    >
                  </template>
                </v-tooltip>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPublicationsList",
  data() {
    return {
      publicationsDatas: [],
      title: "",
      rootImg: "http://localhost:3000/images/publications/",
      imgName: "",
      commentsNb: "",
    };
  },
  methods: {
    async deletePublication(publicationId) {
      try {
        await this.axios
          .delete(
            `http://localhost:3000/api/auth/profil/publication/${publicationId}`
          )
          .then(() => {
            this.$router.go();
          });
      } catch (e) {
        console.log(e);
      }
    },
    async showPublication(publicationId) {
      try {
        await this.$router.push(`/publication/${publicationId}`);
      } catch (e) {
        console.log(e);
      }
    },
  },
  async mounted() {
    try {
      await this.axios
        .get("http://localhost:3000/api/auth/profil/publications")
        .then((publications) => {
          this.publicationsDatas = publications.data;
        });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.img-wrapper {
  width: 150px;
  height: 150px;
}
.card {
  width: 30%;
  margin-bottom: 3%;
}
.card-footer {
  padding: 1.25rem;
}
.title {
  margin: 0;
  font-size: 13px;
  font-weight: bold;
}
p {
  margin: 0;
}
.icon {
  position: relative;
  top: 3px;
}
.btn-container .btn:last-child {
  margin-left: 10px;
}
.btn-container .btn {
  padding: 0 6px;
}
.box {
  height: 300px;
  overflow: hidden;
}
</style>
