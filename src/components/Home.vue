<template>
  <div class="">
    <form @submit.prevent="submit">
      <input type="text" v-model="title" placeholder="Title">
      <textarea v-model="body" placeholder="New notes..."></textarea>
      <button type="submit">Submit</button>
    </form>
    <div style="overflow: hidden">
      <div style="float: left; width: 400px">
        <h2>Pinned</h2>
        <note v-for="note in notes" :note="note" :key="note.id" v-if="note.pinned"></note>
      </div>
      <div style="float: left; width: 400px">
        <h2>Notes</h2>
        <note v-for="note in notes" :note="note" :key="note.id" v-if="!note.pinned"></note>
      </div>
    </div>
  </div>
</template>

<script>
import Note from './Note'
import {mapState} from 'vuex'

export default {
  data: function () {
    return {
      title: null,
      body: null
    }
  },
  computed: mapState({
    notes: state => state.notes
  }),
  methods: {
    submit () {
      this.$store.commit('insert', {
        title: this.title,
        body: this.body
      })
      this.title = null
      this.body = null
    }
  },
  components: {Note}
}
</script>
