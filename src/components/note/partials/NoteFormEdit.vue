<template lang="html">
  <form @submit.prevent="update" v-else>
    <div style="margin: 10px 0 0 10px;">
      <input type="text" v-model="newTitle" />
      <textarea @keyup="resize" v-model="newBody"></textarea>
    </div>
    <div class="">
      <button @click.prevent="toggleEdit">
        <i class="fa fa-remove"></i>
      </button>
      <button @click.prevent="update">
        <i class="fa fa-check" style="color: green"></i>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['note'],
  data: function () {
    return {
      newTitle: this.note.title,
      newBody: this.note.body.replace(new RegExp('<br>', 'g'), '\n')
    }
  },
  methods: {
    update () {
      this.$store.commit('update', {
        oldNote: this.note,
        newNote: {
          title: this.newTitle,
          body: this.newBody
        }
      })
      this.toggleEdit()
      this.$store.commit('showSnackBar', {
        message: 'Note updated :)'
      })
    },
    toggleEdit () {
      this.$emit('toggle-edit')
    },
    resize (e) {
      let caller = e.target || e.srcElement
      caller.style.height = 'auto'
      caller.style.height = caller.scrollHeight + 'px'
    }
  }
}
</script>
