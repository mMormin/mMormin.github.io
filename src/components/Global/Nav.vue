<template>
  <nav data-cy="nav" class="navbar fixed-top d-flex align-items-center navbar-light bg-light">
    <router-link to="/">
      <a class="navbar-brand">
        <img
          src="../../assets/icon-menu.png"
          width="138"
          height="30"
          alt="Logo Groupomania"
        />
      </a>
    </router-link>
    <div v-if="$isMobile()">MOBILE</div>
    <div v-else class="menu">
      <div
        v-if="isLogged"
        data-cy="logged-nav"
        class="d-flex justify-content-end align-items-center"
      >
        <div class="d-flex justify-content-end align-items-center">
          <p class="email">{{ userDatas.email }}</p>
            <router-link data-cy="add-publication" to="/nouvelle-publication" alt="Publier">
              <v-tooltip location="bottom" text="Publier !">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="material-icons add" >add</span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link data-cy="profil-publications" to="/profil-publications">
              <v-tooltip location="bottom" text="Voir mes publications">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="material-icons edit">dashboard</span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link data-cy="profil" class="rst" to="/profil">
              <v-tooltip location="bottom" text="Paramètre du compte">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="material-icons settings">settings</span>
                </template>
              </v-tooltip>
            </router-link>
            <router-link data-cy="disconnect-user" @click="disconnectUser" to="/">
              <v-tooltip location="bottom" text="Se déconnecter">
                <template v-slot:activator="{ props }">
                  <span v-bind="props" class="material-icons disco">power_settings_new</span>
                </template>
              </v-tooltip>
            </router-link>
          </div>
      </div>
      <div
        v-else
        data-cy="unlogged-nav"
        class="d-flex justify-content-end align-items-center"
      >
        <router-link data-cy="sign-up" class="signup" to="/signup">
          <v-btn variant="text" color="black">S'inscrire</v-btn>
        </router-link>
        <router-link data-cy="sign-in" class="login" to="/login">
          <v-btn color="green">Se connecter</v-btn>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      email: "",
      userDatas: [],
    };
  },
  computed: {
    // isPublicRoute() {
    //   const publicRoutes =
    //     this.$route.name === "Login" || this.$route.name === "Signup";
    //   return publicRoutes;
    // },
    isLogged() {
      var user = localStorage.authenticated;
      const logged = user;
      if (user === 'undefined'){user = false;}
      return logged;
    },
  },
  methods: {
    disconnectUser() {
      localStorage.removeItem("token");
      this.$store.commit("deleteAuth");
      window.location.reload();
    },
  },
  beforeUpdate() {
    // console.log(this.$isMobile());
  },
  async mounted() {
    try {
      await this.axios
        .get("http://localhost:3000/api/auth/profil")
        .then((user) => {
          this.userDatas = user.data;
          // if (!user) {
          //   this.userDatas = false;
          // }
        })
        
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
nav {
  border-bottom: 1px solid #e5e5e5;
}
a button {
  font-weight: 600;
}
a {
  margin: 0 1rem 0 0;
}
a:last-child {
  margin: 0;
}
.signup {
  color: black;
}
.login {
  color: green;
  text-decoration: none;
}
.menu {
  width: 50%;
}
.material-icons {
  font-size: 30px;
  top: 3px;
  position: relative;
}
.add, .edit, .settings {
  color: #20948e;
  border-radius: 9px;
}
.add:hover, .edit:hover, .settings:hover {
  background-color: rgb(214, 214, 214);
  border-radius: 9px;
  transition: 0.3s all;
}
.email {
  font-size: 14px;
  margin: 5px 1rem 0 0;
  font-weight: bold;
  letter-spacing: 0.5px;
  color:black;
}
.disco {
  color: rgba(31, 168, 50, 0.568);
}
.disco:hover {
  color: rgb(226, 16, 16);
}
</style>