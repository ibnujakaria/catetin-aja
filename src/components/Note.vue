<template>
  <div class="note" draggable="true" @dragstart="dragStart" @dragover.prevent @drop="onNoteDropped">
    <template v-if="!isBeingEdited">
      <h3>{{note.id}} - {{note.title}}</h3>
      <p>{{note.body}}</p>
      <div class="">
        <button @click="togglePin" @dragstart.prevent draggable="true">{{!note.pinned ? 'Pin' : 'Unpin'}}</button>
        <button @click="toggleEdit">Edit</button>
        <button @click="deleteNote">Delete</button>
      </div>
    </template>
    <note-form-edit v-on:toggle-edit="toggleEdit" :note="note" v-else/>
  </div>
</template>

<script>
import NoteFormEdit from './note/partials/NoteFormEdit'

export default {
  props: ['note'],
  data: function () {
    return {
      isBeingEdited: false
    }
  },
  methods: {
    toggleEdit () {
      this.isBeingEdited = !this.isBeingEdited
    },
    togglePin () {
      this.$store.commit('togglePin', this.note)
    },
    deleteNote () {
      let sido = confirm('Are you sure you want to delete this?')

      if (sido) {
        this.$store.commit('delete', this.note)
      }
    },
    dragStart (event) {
      console.log('dragStart: ' + this.note.title)
      event.dataTransfer.setData('note', JSON.stringify(this.note))
    },
    onNoteDropped (event) {
      this.$store.commit('changeOrder', {
        note: this.note,
        droppedNote: JSON.parse(event.dataTransfer.getData('note'))
      })
    }
  },
  components: {NoteFormEdit}
}
</script>

<style lang="css" scoped>
  .note {
    border: 1px solid black;
    margin: 5px;
    width: 300px;
    cursor: pointer;
  }
</style>
