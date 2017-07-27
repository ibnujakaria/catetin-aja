<template>
  <div class="">
    <!-- <input v-model.trim="$store.state.keyword" placeholder="CARI DISINI" style="border: 5px solid green; padding: 30px; font-size: 17pt"> -->
    <note-create></note-create>
    <div style="overflow: hidden" class="notes">
      <div style="overflow:hidden;">
        <note v-for="note in filteredNotes" :note="note" :key="note.id" v-if="note.pinned"></note>
      </div>
      <div style="overflow:hidden;">
        <div class="grid notes" id="note-list">
          <note v-for="note in filteredNotes" :note="note" :key="note.id" v-if="(!note.pinned)"></note>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCreate from './NoteCreate'
import Note from './Note'

export default {
  computed: {
    notes () {
      return this.$store.state.notes
    },
    filteredNotes () {
      let keyword = this.$store.state.keyword
      let regex = new RegExp(keyword, 'i')

      if (!keyword) {
        return this.notes
      }
      let notes = JSON.parse(JSON.stringify(this.$store.state.notes))
      notes.reverse()
      return notes.filter(function (item) {
        return (item.title && item.title.match(regex)) || (item.body && item.body.match(regex))
      })
    },
    noteBeingDragged () {
      return this.$store.state.noteBeingDragged
    }
  },
  mounted () {
    window.$('#note-list').isotope({
      // options
      itemSelector: '.grid-item',
      layoutMode: 'masonry'
    })

    this.$store.dispatch('getNotesFromAPI')
  },
  components: {NoteCreate, Note}
}
</script>

<style media="screen">
.notes {
  margin: 0 auto;
}
</style>
