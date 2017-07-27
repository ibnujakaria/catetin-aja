import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3333/api/v1'

const state = {
  keyword: null,
  noteBeingDragged: false,
  notes: []
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
    note.body = note.body ? note.body.replace(new RegExp('\\n', 'g'), '<br>') : null
    note.pinned = false
    state.notes.splice(0, 1, note)
    note.order = lastNote ? (lastNote.order + 1) : 1
  },
  update (state, payload) {
    let index = getNoteIndexInNotes(payload.oldNote)
    state.notes.splice(index, 1, {
      id: payload.oldNote.id,
      title: payload.newNote.title,
      body: payload.newNote.body ? payload.newNote.body.replace(new RegExp('\\n', 'g'), '<br>') : null,
      pinned: payload.oldNote.pinned
    })
  },
  delete (state, note) {
    let index = getNoteIndexInNotes(note)
    state.notes.splice(index, 1)
    orderNotes()
  },
  togglePin (state, note) {
    let index = getNoteIndexInNotes(note)
    note.pinned = !note.pinned
    state.notes.splice(index, 1, note)
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
  },
  showSnackBar (state, payload) {
    var x = document.getElementById('snackbar')
    x.className = 'show'
    x.innerHTML = payload.message
    setTimeout(function () {
      x.className = x.className.replace('show', '')
    }, 3000)
  },
  setNotes (state, payload) {
    state.notes = payload.notes
  }
}

const actions = {
  getNotesFromAPI (context) {
    Vue.http.get('notes').then((response) => {
      context.commit('setNotes', response.body)
    })
  },
  togglePin (context, payload) {
    Vue.http.get('notes/' + payload.id + '/toggle-pin').then((response) => {
      console.log('success')
    }, (response) => {
      context.commit('togglePin', payload)
    })
  },
  update (context, payload) {
    let data = {
      title: payload.newNote.title,
      body: payload.newNote.body
    }
    Vue.http.put('notes/' + payload.oldNote.id, data).then((response) => {
      payload.onSuccess()
    })
  },
  insert (context, payload) {
    let data = {
      title: payload.title,
      body: payload.body
    }
    Vue.http.post('notes', data).then((response) => {
      payload.onSuccess()
    })
  },
  delete (context, payload) {
    Vue.http.delete('notes/' + payload.note.id).then((response) => {
      console.log('oke')
      payload.onSuccess()
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
