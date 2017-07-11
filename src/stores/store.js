import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  notes: [
    {id: 1, title: 'Apah', body: 'Enjek'}
  ]
}

function getNoteIndexInNotes (note) {
  let index = -1

  for (let i = 0; i < state.notes.length; i++) {
    if (state.notes[i].id === note.id) {
      index = i
      break
    }
  }

  return index
}

const mutations = {
  insert (state, note) {
    let lastNote = state.notes[state.notes.length - 1]
    note.id = lastNote ? (lastNote.id + 1) : 1
    state.notes.push(note)
  },
  update (state, payload) {
    let index = getNoteIndexInNotes(payload.oldNote)
    state.notes.splice(index, 1, {
      id: payload.oldNote.id,
      title: payload.newNote.title,
      body: payload.newNote.body
    })

    console.log('newNote')
    console.log([payload.newNote.title, payload.newNote.body])
  }
}

export default new Vuex.Store({
  state,
  mutations
})
