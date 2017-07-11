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

function orderNotes () {
  state.notes.sort(function (prevNote, nextNote) {
    return prevNote.order > nextNote.order
  })

  for (let i = 0; i < state.notes.length; i++) {
    let note = state.notes[i]
    note.order = i + 1
    state.notes.splice(i, 1, note)
  }
}

const mutations = {
  insert (state, note) {
    let lastNote = state.notes[state.notes.length - 1]

    note.id = lastNote ? (lastNote.id + 1) : 1
    note.pinned = false
    note.order = lastNote ? (lastNote.order + 1) : 1
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
    orderNotes()
    saveDataToLocalStorage()
  },
  togglePin (state, note) {
    let index = getNoteIndexInNotes(note)
    note.pinned = !note.pinned
    state.notes.splice(index, 1, note)
    saveDataToLocalStorage()
  },
  changeOrder (state, payload) {
    let selisih = Math.abs(payload.note.order - payload.droppedNote.order)
    let noteIndex = getNoteIndexInNotes(payload.note)
    let droppedNoteIndex = getNoteIndexInNotes(payload.droppedNote)

    console.log('note -> ' + JSON.stringify(payload.note))
    console.log('dropped note -> ' + JSON.stringify(payload.droppedNote))

    if (payload.note.order > payload.droppedNote.order) {
      console.log('kebawah ' + selisih)
      for (let i = noteIndex; i < noteIndex + selisih; i++) {
        let note = state.notes[i]
        note.order--
        state.notes.splice(i, 1, note)
      }

      let note = state.notes[droppedNoteIndex]
      note.order += selisih
      state.notes.splice(droppedNoteIndex, 1, note)
    } else {
      console.log('keatas ' + selisih)
      for (let i = noteIndex; i < noteIndex + selisih; i++) {
        let note = state.notes[i]
        note.order++
        state.notes.splice(i, 1, note)
      }

      let note = state.notes[droppedNoteIndex]
      note.order -= selisih
      state.notes.splice(droppedNoteIndex, 1, note)
    }
    orderNotes()
    saveDataToLocalStorage()
  }
}

export default new Vuex.Store({
  state,
  mutations
})
