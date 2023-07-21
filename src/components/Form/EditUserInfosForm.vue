<template>
  <div class="container-fluid bg">
    <div class="container d-flex flex-column justify-content-center">
      <v-form @submit.prevent="onSubmit">
        <div class="form-wrapper">
          <h2 class="mb-5">Informations du profil</h2>
          <div class="d-flex mb-5 align-items-center">
            <div class="col-2"><p class="label">Email :</p></div>
            <div class="dataContainer">
              <v-text-field
                hide-details="auto"
                type="email"
                disabled
                autocomplete="email"
                :label="userDatas.email"
              >
              </v-text-field>
            </div>
          </div>

          <div class="d-flex mb-5 def-h align-items-center">
            <div class="col-2"><p class="label">Mot de passe :</p></div>
            <div class="dataContainer">
              <v-text-field
                hide-details="auto"
                type="password"
                label="* * * * * * * *"
                disabled
                autocomplete="current-password"
                v-bind:class="{ 'hide-update': activeEdit }"
              >
              </v-text-field>
              <v-btn
                color="yellow"
                @click="showPasswordModal"
                v-bind:class="{ 'show-update': activeEdit }"
                class="hide-update"
                >modifier mon mot de passe</v-btn
              >
            </div>
          </div>

          <div class="d-flex mb-5 align-items-center">
            <div class="col-2"><p class="label">Pseudo :</p></div>
            <div class="dataContainer">
              <v-text-field
                v-bind:class="{ 'hide-update': activeEdit }"
                hide-details="auto"
                disabled
                :placeholder="userDatas.pseudo"
              >
              </v-text-field>

              <v-text-field
                name="pseudo"
                v-bind:class="{ 'show-update': activeEdit }"
                v-model="pseudo.value.value"
                class="hide-update"
                type="text"
                hide-details="auto"
                :placeholder="userDatas.pseudo"
              >
              </v-text-field>
            </div>
          </div>

          <div class="d-flex mb-5 align-items-center">
            <div class="col-2"><p class="label">Prénom :</p></div>
            <div class="dataContainer">
              <v-text-field
                v-bind:class="{ 'hide-update': activeEdit }"
                hide-details="auto"
                disabled
                autocomplete="given-name"
                :placeholder="userDatas.name"
              >
              </v-text-field>

              <v-text-field
                name="name"
                type="text"
                v-bind:class="{ 'show-update': activeEdit }"
                class="hide-update"
                hide-details="auto"
                autocomplete="given-name"
                v-model="name.value.value"
                :placeholder="userDatas.name"
              >
              </v-text-field>
            </div>
          </div>

          <div class="d-flex mb-5 align-items-center">
            <div class="col-2"><p class="label">Nom :</p></div>
            <div class="dataContainer">
              <v-text-field
                v-bind:class="{ 'hide-update': activeEdit }"
                hide-details="auto"
                disabled
                autocomplete="family-name"
                :placeholder="userDatas.lastName"
              >
              </v-text-field>

              <v-text-field
                name="lastName"
                type="text"
                v-bind:class="{ 'show-update': activeEdit }"
                class="hide-update"
                hide-details="auto"
                autocomplete="family-name"
                v-model="lastName.value.value"
                :placeholder="userDatas.lastName"
              >
              </v-text-field>
            </div>
          </div>

          <div class="d-flex mb-5 align-items-center">
            <div class="col-2"><p class="label">Biographie :</p></div>
            <div class="dataContainer">
              <v-textarea
                v-bind:class="{ 'hide-update': activeEdit }"
                hide-details="auto"
                disabled
                rows="3"
                :placeholder="userDatas.bio"
              >
              </v-textarea>

              <v-textarea
                name="bio"
                v-bind:class="{ 'show-update': activeEdit }"
                class="hide-update"
                hide-details="auto"
                rows="3"
                v-model="bio.value.value"
                :placeholder="userDatas.bio"
              >
              </v-textarea>
            </div>
          </div>
          <div class="btnContainer d-flex justify-content-between">
            <v-btn
              class="hide-btn"
              v-on:click="activeEdit = !activeEdit"
              v-bind:class="{ 'show-btn': activeEdit }"
              color="red"
              >annuler</v-btn
            >

            <v-btn
              @click="showModalConfirm"
              v-bind:class="{ 'hide-btn': activeEdit }"
              color="red"
              >supprimer le compte</v-btn
            >

            <v-btn
              class="editBtn"
              v-on:click="activeEdit = !activeEdit"
              v-bind:class="{ 'hide-btn': activeEdit }"
              color="yellow"
              >modifier les informations</v-btn
            >

            <v-btn
              class="hide-btn"
              type="submit"
              v-on:click="activeEdit = !activeEdit"
              v-bind:class="{ 'show-btn': activeEdit }"
              color="green"
              >Enregistrer les modifications</v-btn
            >
          </div>
        </div>
      </v-form>
    </div>

    <ModalConfirm :isActive="activeModal">
      <template #header>
        <h4>Êtes-vous sûr de vouloir supprimer ce compte ?</h4>
      </template>
      <template #footer>
        <v-btn @click="hideModalConfirm" color="red">non</v-btn>
        <v-btn @click="deleteAccount" color="green">oui</v-btn>
      </template>
    </ModalConfirm>

    <PasswordEditForm
      @close-modal-password="hideModalPassword"
      :isActive="activeModalPassword"
      :loggedUserData="userDatas"
    />
  </div>
</template>

<script>
import ModalConfirm from "@/components/Global/ModalConfirm.vue";
import PasswordEditForm from "@/components/Form/PasswordEditForm.vue";
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "UserProfilForm",
  components: {
    ModalConfirm,
    PasswordEditForm,
  },
  setup() {
    const ProfilSchema = Yup.object().shape({
      oldPassword: Yup.string(),
      newPassword: Yup.string(),
      newPasswordConfirm: Yup.string(),
    });

    const { handleSubmit, validate, values, errors } = useForm({
      validationSchema: ProfilSchema,
    });

    const pseudo = useField("pseudo", Yup.string());
    const name = useField("name", Yup.string());
    const lastName = useField("lastName", Yup.string());
    const bio = useField("bio", Yup.string());

    return {
      ProfilSchema,
      handleSubmit,
      validate,
      values,
      errors,
      pseudo,
      name,
      lastName,
      bio,
    };
  },
  data() {
    return {
      userDatas: [],
      activeEdit: false,
      activeModal: false,
      activeModalPassword: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.axios
          .put(
            "http://localhost:3000/api/auth/profil/edit",
            this.values || this.userDatas
          )
          .then(() => {
            this.$router.go();
          });
      } catch (e) {
        console.log(e);
      }
    },
    async deleteAccount() {
      try {
        await this.axios
          .delete("http://localhost:3000/api/auth/profil/delete")
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push("/");
          });
      } catch (e) {
        console.log(e);
      }
    },
    hideModalConfirm() {
      this.activeModal = false;
    },
    showModalConfirm() {
      this.activeModal = true;
    },
    showPasswordModal() {
      this.activeModalPassword = true;
    },
    hideModalPassword(payload) {
      this.activeModalPassword = payload;
    },
  },
  async mounted() {
    try {
      await this.axios
        .get("http://localhost:3000/api/auth/profil")
        .then((user) => {
          this.userDatas = user.data;
        });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.dataContainer {
  width: 100%;
}
.form-wrapper {
  margin-bottom: 0;
}
.v-text-field {
  margin: 0 0 1em 0;
}
.def-h {
  height: 56px;
}
.dataContainer input {
  display: none;
}
.label {
  text-align: left;
}
p {
  margin: 0;
}
h2 {
  text-align: left;
}
.hide-update,
.hide-btn {
  display: none;
}
.show-update,
.show-btn {
  display: block;
}
.dataContainer.show-update {
  padding: 0;
}
.dataContainer.show-update input {
  display: block;
}
.dataContainer.show-update p {
  display: none;
}
.dataContainer.grey {
  background-color: rgba(43, 40, 40, 0.082);
}
.btnContainer.show-update .validateBtn {
  display: block;
}
.btnContainer.show-update .editBtn {
  display: none;
}
</style>
