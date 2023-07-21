<template>
  <div class="modal-backdrop">
    <div class="publication" v-click-outside="onClickOutside">
      <div class="publication-header">
        <h3 class="oneTitle">
          {{ publicationDatas.title }}
        </h3>
      </div>

      <div
        v-if="publicationDatas.imageUrl && publicationDatas.imageUrl.length"
        class="publication-body"
      >
        <img
          :src="rootImg + publicationDatas.imageUrl"
          class="img-fluid"
          alt=""
        />
        <p v-if="publicationDatas.user.pseudo" class="oneAuthor">
          Publié par <b>{{ publicationDatas.user.pseudo }}</b>
        </p>
        <p v-else class="oneAuthor">
          Publié par <b>{{ publicationDatas.user.email }}</b>
        </p>
      </div>
      <div class="publication-footer">
        <div class="commantaries-section">
          <p class="title">Commentaires :</p>
          <div class="commentaries">
            <div
              class="commentary"
              v-for="commentaryData in commentariesDatas"
              :key="commentaryData.id"
            >
              <p v-if="publicationDatas.user.pseudo" class="author">
                <i>{{ commentaryData.user.pseudo }}</i> - le
                {{ commentaryData.updatedAt }}
              </p>
              <p class="author">
                <i>{{ commentaryData.user.email }}</i> - le
                {{ commentaryData.updatedAt }}
              </p>

              <p>
                {{ commentaryData.content }}
              </p>
            </div>
          </div>
        </div>
        <NewCommentaryForm v-if="userLogged" :publicationId="publicationId" />
      </div>
    </div>
  </div>
</template>

<script>
import NewCommentaryForm from "@/components/Form/NewCommentaryForm.vue";
export default {
  name: "OnePublication",
  components: {
    NewCommentaryForm,
  },
  data() {
    return {
      publicationDatas: [],
      title: "",
      pseudo: "",
      rootImg: "http://localhost:3000/images/publications/",
      imgName: "",
      commentsNb: "",
      commentariesDatas: [],
      publicationId: "",
      userLogged: false,
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ["dblclick", "click"],
        isActive: true,
        detectIFrame: true,
        capture: false,
      },
    };
  },
  async mounted() {
    try {
      const isLogged = this.$store.state.authenticated;
      const publicationId = this.$route.params.id;
      await this.axios
        .get(`http://localhost:3000/api/auth/publication/${publicationId}`)
        .then((publication) => {
          this.publicationDatas = publication.data;
        })
      await this.axios
        .get(`http://localhost:3000/api/auth/publication/${publicationId}/commentaries`)
        .then((commentaries) => {
          this.commentariesDatas = commentaries.data;
        })
        if(isLogged) {
          this.userLogged = true;
        }
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    onClickOutside() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  padding-bottom: 1em;
}
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
}
.publication {
  background: #ffffff;
  padding: 2em 2em;
  box-shadow: 1px 1px 10px 1px #727272;
  overflow: scroll;
  overflow-x: hidden;
  height: auto;
  width: 70%;
  max-height: 95vh;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin: 1em auto 0 auto;
  border-radius: 4px;
  align-content: space-between;
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.publication-header,
.publication-footer {
  display: flex;
  border: 0;
}
.publication-header {
  position: relative;
  justify-content: space-between;
}
.publication-footer {
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
}
.publication-footer .commentary {
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.publication-footer .commantaries-section {
  width: 100%;
}
.publication-footer p {
  margin: 0;
  text-align: left;
  font-size: 15px;
}
.publication-footer .title {
  font-size: 20px;
  margin: 0;
  padding-bottom: 0.5em;
}
.publication-footer .author {
  padding-bottom: 1em;
}
.publication-body {
  position: relative;
  padding: 0;
  flex: 0;
}
.publication-body .oneAuthor {
  text-align: right;
  margin: 2em 1em 1em 1em;
  font-size: 13px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.publication-enter {
  opacity: 0;
}
.publication-leave-active {
  opacity: 0;
}
.publication-enter .publication-container,
.publication-leave-active .publication-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
