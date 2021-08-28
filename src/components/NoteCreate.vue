<template lang="html">
  <div id="note-create" style="overflow:hidden;">
    <form @submit.prevent="submit">
      <input id="title" type="text" v-model="title" placeholder="Title..." autocomplete="off"><br>
      <textarea @keyup="resize" id="body" v-model="body" placeholder="New notes..."></textarea><br>
      <button type="submit" style="float:right; background-color: #ffbb00; border:none; padding: 10px;">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: null,
      body: null
    }
  },
  methods: {
    submit () {
      this.$store.commit('insert', {
        title: this.title,
        body: this.body
      })
      this.title = null
      this.body = null
      this.$store.commit('showSnackBar', {
        message: 'Note created :)'
      })
    },
    resize (e) {
      let caller = e.target || e.srcElement
      caller.style.height = 'auto'
      caller.style.height = caller.scrollHeight + 'px'
    }
  }
}
</script>

<style lang="css">
#title, input[type=text] {
  width: 99%;
  border: none;
  padding: 0 0 10px 0;
}
#body, textarea {
  width: 99%;
  overflow-y: hidden;
  margin: 0 0 10px 0;
  border: none;
}
</style>
