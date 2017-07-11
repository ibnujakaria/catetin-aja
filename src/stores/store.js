import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: loadDataFromLocalStorage()
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

function loadDataFromLocalStorage () {
  return JSON.parse(localStorage.getItem('catetin-aja.notes')) || []
}

function saveDataToLocalStorage () {
  localStorage.setItem('catetin-aja.notes', JSON.stringify(state.notes))
}

const mutations = {
  insert (state, note) {
    let lastNote = state.notes[state.notes.length - 1]
    note.id = lastNote ? (lastNote.id + 1) : 1
    note.pinned = false
    state.notes.push(note)
    saveDataToLocalStorage()
  },
  update (state, payload) {
    let index = getNoteIndexInNotes(payload.oldNote)
    state.notes.splice(index, 1, {
      id: payload.oldNote.id,
      title: payload.newNote.title,
      body: payload.newNote.body,
      pinned: payload.oldNote.pinned
    })
    saveDataToLocalStorage()
  },
  delete (state, note) {
    let index = getNoteIndexInNotes(note)
    state.notes.splice(index, 1)
    saveDataToLocalStorage()
  },
  togglePin (state, note) {
    let index = getNoteIndexInNotes(note)
    note.pinned = !note.pinned
    state.notes.splice(index, 1, note)
    saveDataToLocalStorage()
  }
}

export default new Vuex.Store({
  state,
  mutations
})
