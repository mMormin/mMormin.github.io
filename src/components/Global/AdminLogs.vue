<template>
  <div class="list-wrapper">
    <div class="infos-wrapper">
      <h1>Users</h1>
      <ul v-for="user in usersList" :key="user.id">
        <li>
          <p>{{ user.email }}</p>
        </li>
        <!-- <li><v-btn @click="deleteUser" color="red">drop</v-btn></li> -->
      </ul>
      <div class="button-wrapper">
        <v-btn color="red" v-if="usersList != 0" @click="deleteAllUsers">
          DROP ALL USERS
        </v-btn>
      </div>
    </div>

    <div class="infos-wrapper">
      <h1>Publications</h1>
      <ul v-for="publication in publicationsList" :key="publication.id">
        <li>
          <p>Title : {{ publication.title }}</p>
        </li>
        <li>
          <p>ID : {{ publication.id }}</p>
        </li>
        <!-- <li><v-btn @click="deletePublication" color="red">drop</v-btn></li> -->
      </ul>
      <div class="button-wrapper">
        <v-btn
          color="red"
          v-if="publicationsList != 0"
          @click="deleteAllPublications"
        >
          DROP ALL PUBLICATIONS
        </v-btn>
      </div>
    </div>
    <div class="infos-wrapper">
      <h1>Commentaries</h1>
      <ul v-for="commentary in commentariesList" :key="commentary.id">
        <li>
          <p>ID : {{ commentary.id }}</p>
        </li>
        <li>
          <p>Content : {{ commentary.content || "null" }}</p>
        </li>
        <li>
          <p>Assign with publication {{ commentary.publicationId }}</p>
        </li>
        <!-- <li><v-btn @click="deleteCommentary" color="red">drop</v-btn></li> -->
      </ul>
      <div class="button-wrapper">
        <v-btn
          color="red"
          v-if="commentariesList != 0"
          @click="deleteAllCommentaries"
        >
          DROP ALL COMMENTARIES
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogs",
  data() {
    return {
      usersList: [],
      publicationsList: [],
      commentariesList: [],
    };
  },
  methods: {
/*     deleteUser() {
      this.axios
        .delete("http://localhost:3000/api/admin/publication/drop")
        .then(window.location.reload());
    },
    deletePublication() {
      this.axios
        .delete("http://localhost:3000/api/admin/publication/drop")
        .then(window.location.reload());
    },
    deleteCommentary() {
      this.axios
        .delete("http://localhost:3000/api/admin/publication/drop")
        .then(window.location.reload());
    }, */
    deleteAllPublications() {
      this.axios
        .delete("http://localhost:3000/api/admin/publications/drop")
        .then(window.location.reload());
    },
    deleteAllCommentaries() {
      this.axios
        .delete("http://localhost:3000/api/admin/commentaries/drop")
        .then(window.location.reload());
    },
    deleteAllUsers() {
      this.axios
        .delete("http://localhost:3000/api/admin/users/drop")
        .then(window.location.reload());
    },
  },
  mounted() {
    this.axios.get("http://localhost:3000/api/admin/users").then((response) => {
      this.usersList = response.data;
    });
    this.axios
      .get("http://localhost:3000/api/admin/publications")
      .then((response) => {
        this.publicationsList = response.data;
      });
    this.axios
      .get("http://localhost:3000/api/admin/commentaries")
      .then((response) => {
        this.commentariesList = response.data;
      });
  },
};
</script>

<style scoped>
.list-wrapper {
  width: 70%;
  margin: 140px auto 0 auto;
}
h1 {
  text-align: left;
}
.infos-wrapper:not(:first-child) {
  margin-top: 3em;
}
.button-wrapper .v-btn {
  width: 100%;
}
ul {
  list-style-type: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  margin: 0;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
p {
  margin: 0;
}
</style>
