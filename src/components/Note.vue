<template>
  <div class="note grid-item" draggable="true" @dragend="dragEnd" @dragstart="dragStart" @dragover.prevent @drop="onNoteDropped" style="float:left;">
    <div class="note-inner" style="padding: 1px 10px 10px 10px;" v-if="noteBeingDragged !== note.id">
      <template v-if="!isBeingEdited">
        <h3>{{note.title}}</h3>
        <p v-if="note.body" :class="fontSizeGroup(note)" v-html="note.body"></p>
        <button v-if="note.pinned" @click="togglePin" @dragstart.prevent draggable="true" style="display: inline">
          <i class="fa fa-thumb-tack" :class="{biruh: note.pinned, celeng: !note.pinned}" aria-hidden="true"></i>
        </button>
        <div class="buttons" style="display: inline">
          <button v-if="!note.pinned" @click="togglePin" @dragstart.prevent draggable="true">
            <i class="fa fa-thumb-tack" :class="{biruh: note.pinned, celeng: !note.pinned}" aria-hidden="true"></i>
          </button>
          <button @click="toggleEdit">
            <i class="fa fa-pencil"></i>
          </button>
          <button @click="deleteNote">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </template>
      <note-form-edit v-on:toggle-edit="toggleEdit" :note="note" v-if="isBeingEdited"/>
    </div>
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
  computed: {
    noteBeingDragged () {
      return this.$store.state.noteBeingDragged
    }
  },
  updated () {
    window.$('#note-list').isotope('reloadItems').isotope()
  },
  methods: {
    toggleEdit () {
      this.isBeingEdited = !this.isBeingEdited
    },
    togglePin () {
      this.$store.dispatch('togglePin', this.note)
      this.$store.commit('togglePin', this.note)
      this.$store.commit('showSnackBar', {
        message: this.note.pinned ? 'Note pinned :)' : 'Note unpinned :)'
      })
    },
    deleteNote () {
      let sido = confirm('Are you sure you want to delete this?')

      if (sido) {
        var me = this
        this.$store.dispatch('delete', {
          note: this.note,
          onSuccess () {
            me.$store.commit('showSnackBar', {
              message: 'Note deleted :('
            })
            me.$store.dispatch('getNotesFromAPI')
          }
        })
      }
    },
    dragStart (event) {
      console.log('dragStart: ' + this.note.title)
      event.dataTransfer.setData('note', JSON.stringify(this.note))
      this.$store.state.noteBeingDragged = this.note.id
    },
    dragEnd (event) {
      this.$store.state.noteBeingDragged = false
      console.log('dragEnd')
    },
    onNoteDropped (event) {
      this.$store.commit('changeOrder', {
        note: this.note,
        droppedNote: JSON.parse(event.dataTransfer.getData('note'))
      })
    },
    fontSizeGroup (note) {
      if (note.body.length < 10) {
        return 'big'
      } else if (note.body.length < 30) {
        return 'medium'
      }

      return 'small'
    }
  },
  components: {NoteFormEdit}
}
</script>

<style lang="css">
  /*.note {
    border: 1px solid black;
    margin: 5px;
    width: 300px;
    cursor: pointer;
  }*/
  .note {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  @media screen and (min-width: 560px) {
    .note {
      width: 50%;
    }
  }
  @media screen and (min-width: 816px) {
    .note {
      width: 33.3%;
    }
  }
  @media screen and (min-width: 1072px) {
    .note {
      width: 25%;
    }
  }
  .note-inner {
    background-color: #fff;
    min-height: 4em;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s;
  }
  .note:hover .note-inner {
    cursor: pointer;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  }

  .celleng {
    color: gray;
  }

  .biruh {
    color: #4285f4;
  }

  .buttons {
    transition: 0.7s ease;
    opacity: 0;
  }

  .note-inner:hover > .buttons {
    transition: 0.7s ease;
    opacity: 1;
  }
</style>
