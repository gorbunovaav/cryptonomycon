<template id="modal-template">
    <div class="modal-mask" @click=close v-if="isOpen">
      <div class="modal-wrapper" >
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer" :confirm="confirm">
            <button class="modal-default-button" @click="close">
          Отмена
      </button>
      <button class="modal-default-button" @click="confirm">
            Ок
      </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data(){
      return {
        isOpen: false
      }
    },
    PopupController:null,
    // props:{
    //     isOpen:{
    //         type: Boolean,
    //         required: true,
    //     }
    // },
    // emits:{
    // "ok": null,
    // "close": null
    // },
    mounted(){
        document.addEventListener('keyup', this.handleKeyup)
    },
    beforeUnmount(){
        document.removeEventListener("keyup", this.handleKeyup)
    },

    methods:{
        handleKeyup(e){
            if (this.isOpen && e.key==='Escape'){
                this.$emit('close')
            }
    },
    open(){
      let resolve;
      let reject;
      const popupPromise = new Promise((ok, fail)=>{
        resolve = ok
        reject = fail
      })
      this.$options.PopupController = {resolve, reject}
      this.isOpen = true
      return popupPromise
    },
    close(){
      this.$options.PopupController.resolve(true)
      this.isOpen = false
    },
    confirm(){
      this.$options.PopupController.resolve(false)
      this.isOpen = false
    }
        // close(){
        //     this.$emit('close')
        // },
        // confirm(){
        //     this.$emit('ok')
        // }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>