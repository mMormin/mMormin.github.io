<template>
  <div class="container-fluid d-flex justify-content-center bg">
    <div
      v-if="publicationsDatas.length === 0"
      class="container empty-publications d-flex align-items-center flex-column justify-content-center"
    >
      <p>Il semblerait qu'il n'y ai aucune publication ...</p>
      <p>:/</p>
      <router-link class="default" to="/nouvelle-publication">
        <v-btn color="green">publier la première !</v-btn>
      </router-link>
    </div>
    <div
      v-else
      class="container publications d-flex align-items-center flex-column"
    >
      <div
        v-for="publicationData in publicationsDatas"
        :key="publicationData.id"
        class="publication d-flex align-items-center flex-column"
        @click="selectPublication(publicationData.id)"
      >
        <div class="header">
          <h3 class="title">{{ publicationData.title }}</h3>
        </div>
        <div class="img-wrapper">
          <img
            :src="rootImg + publicationData.imageUrl"
            class="img-fluid"
            alt=""
          />
        </div>
        <div class="author">
          <p v-if="publicationData.user.pseudo">
            Publié par <b>{{ publicationData.user.pseudo }}</b>
          </p>
          <p v-else>
            Publié par <b>{{ publicationData.user.email }}</b>
          </p>
        </div>
        <div class="footer">
          <div class="comments-nb">
            <p
              v-if="publicationData.commentariesNbr === 0"
              class="comments-none"
            >
              Aucun commentaire
            </p>
            <p v-else>
              <b>{{ publicationData.commentariesNbr }}</b> Commentaires
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicationsList",
  data() {
    return {
      email: "",
      publicationsDatas: [],
      commentariesDatas: [],
      rootImg: "http://localhost:3000/images/publications/",
      publicationId: null,
    };
  },
  methods: {
    async selectPublication(publicationId) {
      try {
        await this.$router.push(`/publication/${publicationId}`);
      } catch (e) {
        console.log(e);
      }
    },
  },
  async mounted() {
    try {
      let paramsCheck = this.$route.query;

      await this.axios
        .get("http://localhost:3000/api/auth/publications")
        .then((publications) => {
          this.publicationsDatas = publications.data;
        });

      if (paramsCheck.emailVerified) {
        await this.axios
          .put("http://localhost:3000/api/auth/profil/validation", {
            email: this.email,
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.empty-publications p {
  font-size: 20px;
  margin: 0;
}
.empty-publications p:first-child {
  font-weight: bold;
}
.empty-publications button {
  margin-top: 2em;
}
.publications {
  padding-top: 160px;
}
.publication {
  background-color: white;
  border-radius: 5px;
  padding: 0.5em 0.5em 0.5em 0.5em;
  margin-bottom: 5em;
  cursor: pointer;
  width: 60%;
  height: 500px;
  transition: all 0.5s;
  border: 1px solid #ffffff;
  box-shadow: none;
}
.publication:hover {
  border: 1px solid rgba(141, 141, 151, 0.1);
  box-shadow: 0 50px 100px rgba(141, 141, 151, 0.1),
    0 15px 35px rgba(92, 92, 99, 0.15), 0 5px 15px rgba(175, 168, 168, 0.1);
}
.header,
.footer,
img,
.author,
.img-wrapper {
  width: 100%;
}
.header {
  padding: 0.5em 0 0 0;
  text-align: left;
}
.footer {
  padding: 0.5em 1em 0;
  text-align: left;
  text-align: right;
  font-size: 15px;
  border-top: 1px solid rgba(221, 221, 221, 0.596);
}
h3 {
  font-size: 19px;
  font-weight: bold;
  color: #525252;
}
.author {
  text-align: right;
  margin-bottom: 5px;
}
.author p {
  font-size: 11px;
  color: #383838;
  margin: 0;
}
.oneTitle,
.oneAuthor,
.OneComments {
  margin: 0;
}
.img-wrapper {
  overflow: hidden;
}
.comments-nb p {
  font-size: 12px;
  margin: 0;
}
.comments-none {
  text-align: center;
}
p.comments-none {
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
