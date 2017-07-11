<template lang="html">
  <form @submit.prevent="update" v-else>
    <input type="text" v-model="newTitle" />
    <textarea v-model="newBody"></textarea>
    <div class="">
      <button @click.prevent="toggleEdit">Cancel</button>
      <button @click.prevent="update">Update</button>
    </div>
  </form>
</template>

<script>
export default {
  props: ['note'],
  data: function () {
    return {
      newTitle: this.note.title,
      newBody: this.note.body
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
    },
    toggleEdit () {
      this.$emit('toggle-edit')
    }
  }
}
</script>
