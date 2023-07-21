<template>
  <v-form @submit.prevent="onSubmit">
    <div class="form-wrapper">
      <h2 class="mb-5">Nouvelle publication</h2>
      <v-text-field
        name="title"
        label="Titre"
        type="text"
        v-model="title.value.value"
        :error-messages="errors.title"
        placeholder="Titre de la publication"
        variant="underlined"
        clearable
        required
      >
      </v-text-field>
      <v-file-input
        name="file"
        label="Choisir une image"
        v-model="file.value.value"
        :error-messages="errors.file"
        type="file"
        accept="image/*"
        prepend-icon="mdi-file-find"
        variant="solo"
        clearable
        required
      >
      </v-file-input>

      <div class="input-group flex-row-reverse">
        <v-btn color="green" type="submit">Publier</v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "NewPublicationForm",
  setup() {
    /*   const validImgExtensions = {
      image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
    };

    function isValidFileType(fileName, fileType) {
      return (
        fileName &&
        validImgExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
      );
    } */

    const PublicationSchema = Yup.object().shape({
      title: Yup.string().required("Titre requis"),
      file: Yup.mixed().required("Image requise"),
      /*   .img("OK", "Image non valide", (value) =>
          isValidFileType(value && value.name.toLowerCase(), "image")
        ), */
    });

    const { handleSubmit, validate, values, errors } = useForm({
      validationSchema: PublicationSchema,
    });

    const title = useField("title");
    const file = useField("file");

    return {
      PublicationSchema,
      handleSubmit,
      validate,
      values,
      errors,
      title,
      file,
    };
  },
  methods: {
    // upload(ev) {
    //   const [file] = ev.target.files;
    //   this.validation.form.file.$value = file;
    // },
    // remove (index) {
    //   this.files.splice(index, 1)
    // }
    async onSubmit() {
      try {
        const { valid } = await this.validate();
        if (valid) {
          const formData = new FormData();
          const options = {
            headers: { "Content-Type": "multipart/form-data;" },
          };
          formData.append("title", this.values.title);
          formData.append("image", this.values.file[0]);
          await this.axios.post(
            "http://localhost:3000/api/auth/publication",
            formData,
            options
          );
          this.$router.push("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
}
</style>
