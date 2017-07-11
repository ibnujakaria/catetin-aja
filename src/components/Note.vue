<template>
  <div style="border: 1px solid black; margin: 5px; width: 300px">
    <template v-if="!isBeingEdited">
      <h2>{{note.id}} - {{note.title}}</h2>
      <p>{{note.body}}</p>
    </template>
    <form @submit.prevent="update" v-else>
      <input type="text" v-model="newTitle" />
      <textarea v-model="newBody"></textarea>
    </form>
    <div class="">
      <template v-if="!isBeingEdited">
        <button @click="togglePin">{{!note.pinned ? 'Pin' : 'Unpin'}}</button>
        <button @click="toggleEdit">Edit</button>
        <button @click="deleteNote">Delete</button>
      </template>
      <template v-else>
        <button @click="toggleEdit">Cancel</button>
        <button @click="update">Update</button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['note'],
  data: function () {
    return {
      isBeingEdited: false,
      newTitle: this.note.title,
      newBody: this.note.body
    }
  },
  methods: {
    toggleEdit () {
      this.isBeingEdited = !this.isBeingEdited
    },
    togglePin () {
      this.$store.commit('togglePin', this.note)
    },
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
    deleteNote () {
      let sido = confirm('Are you sure you want to delete this?')

      if (sido) {
        this.$store.commit('delete', this.note)
      }
    }
  }
}
</script>

<style lang="css">
</style>
