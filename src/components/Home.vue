<template>
  <div class="">
    <form @submit.prevent="submit">
      <input type="text" v-model="title" placeholder="Title">
      <textarea v-model="body" placeholder="New notes..."></textarea>
      <button type="submit">Submit</button>
    </form>
    <note v-for="note in notes" :note="note"></note>
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
