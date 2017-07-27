<template lang="html">
  <div tabindex="1" @blur="toggleActive" class="note-inner note-create" style="overflow:hidden;" v-if="createActive">
    <div>
      <form @submit.prevent="submit">
        <input id="title" type="text" v-model="title" placeholder="Title..." autocomplete="off"><br>
        <textarea @keyup="resize" id="body" v-model="body" placeholder="New notes..."></textarea><br>
        <button type="submit" style="float:right; background-color: #ffbb00; border:none; padding: 10px;">Submit</button>
      </form>
    </div>
  </div>
  <div class="note-inner note-create" style="cursor: pointer" @click="toggleActive" v-else>
    <h3>Take a note</h3>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: null,
      body: null,
      createActive: false
    }
  },
  methods: {
    submit () {
      var me = this
      var onSuccess = function () {
        me.$store.dispatch('getNotesFromAPI')
        me.title = null
        me.body = null
        me.$store.commit('showSnackBar', {
          message: 'Note created :)'
        })

        me.toggleActive()
      }

      this.$store.dispatch('insert', {
        title: this.title,
        body: this.body,
        onSuccess: onSuccess
      })
    },
    resize (e) {
      let caller = e.target || e.srcElement
      caller.style.height = 'auto'
      caller.style.height = caller.scrollHeight + 'px'
    },
    toggleActive () {
      this.createActive = !this.createActive
    }
  }
}
</script>

<style lang="css">
#title, input[type=text] {
  width: 99%;
  border: none;
  padding: 0 0 10px 0;
}
#body, textarea {
  width: 99%;
  overflow-y: hidden;
  margin: 0 0 10px 0;
  border: none;
}

.note-create {
  padding: 10px 10px 10px 10px;
  width: 500px;
  margin: auto;
  background-color: #fff;
  margin-bottom: 30px;
}
</style>
