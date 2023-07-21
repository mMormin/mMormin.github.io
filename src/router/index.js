import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import ForgottenPassword from "../views/ForgottenPassword.vue";
import UserSettings from "../views/UserSettings.vue";
import Main from "../views/Main.vue";
import NewPublication from "../views/NewPublication.vue";
import Publication from "../views/Publication.vue";
import UserPublications from "../views/UserPublications.vue";
import NotFound from "../views/NotFound.vue";
import Admin from "../views/Admin.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == true) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/reset-password",
    name: "ForgottenPassword",
    component: ForgottenPassword,
  },
  {
    path: "/profil",
    name: "UserSettings",
    component: UserSettings,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/profil-publications",
    name: "UserPublications",
    component: UserPublications,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/nouvelle-publication",
    name: "NewPublication",
    component: NewPublication,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/publication/:id",
    name: "Publication",
    component: Publication,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  store.commit("initAuth");
});

export default router;
