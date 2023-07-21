<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="content.value.value"
      name="content"
      label="Message"
      type="text"
      append-icon="mdi-send"
      placeholder="Ecrire un commentaire ..."
      color="primary"
      :append-inner-icon="marker ? 'mdi-emoticon' : 'mdi-close'"
      :error-messages="errors.content"
      clear-icon="mdi-close-circle"
      clearable
      hide-details="auto"
      variant="filled"
      @change="onSelectEmoji"
      @click:append="onSubmit"
      @click:append-inner="toggleEmoji"
    >
    </v-text-field>
    <EmojiPicker
      v-show="isEmojiVisible"
      :native="true"
      :hide-search="true"
      @select="onSelectEmoji"
    />
  </v-form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

export default {
  name: "NewCommentaryForm",
  components: {
    EmojiPicker,
  },
  setup() {
    const commentarySchema = Yup.object().shape({
      content: Yup.string().required("Un oublie ?"),
    });

    const { handleSubmit, validate, value, errors } = useForm({
      validationSchema: commentarySchema,
    });

    const content = useField("content");

    return {
      commentarySchema,
      handleSubmit,
      validate,
      value,
      errors,
      content,
    };
  },
  data() {
    return {
      marker: true,
      emoji: "",
      isEmojiVisible: false,
    };
  },
  methods: {
    clearMessage() {
      this.content = "";
    },
    toggleEmoji() {
      this.marker = !this.marker;
      if (this.isEmojiVisible === true) {
        this.isEmojiVisible = false;
      } else {
        this.isEmojiVisible = true;
      }
    },
    onSelectEmoji(emoji) {
      return emoji.i
    },
    async onSubmit() {
      try {
        const publicationId = this.$route.params.id;
        const { valid } = await this.validate();
        if (valid) {
          this.axios
            .post(
              `http://localhost:3000/api/auth/publication/${publicationId}/commentary`,
              {
                content: this.content.value.value,
                publicationId: publicationId,
              }
            )
            .then(() => {
              this.clearMessage();
              window.location.reload();
            });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 0;
  width: 100%;
  position: relative;
}
.v-input {
  margin: 0;
  border-radius: 100px;
}
.v-field {
  border-radius: 0px 16px 0 0;
}
.v3-emoji-picker {
  position: absolute;
  bottom: 58px;
  left: 100px;
}
</style>
