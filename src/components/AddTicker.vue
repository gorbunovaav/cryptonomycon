<template>
    <section>
      <div class="flex">
        <div class="max-w-xs">
          <label for="wallet" class="block text-sm font-medium text-gray-700"
            >Тикер</label
          >
          <div class="mt-1 relative rounded-md shadow-md">
            <input
              v-model = "ticker"
              v-on:keydown.enter="add"
              @input="showHint(ticker); showError(ticker)"
              type="text"
              name="wallet"
              id="wallet"
              class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          <div
            v-if="showHintVar" 
            class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              DOGE
            </span>
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BCH
            </span>
            <span class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              CHD
            </span>
          </div>
          <div v-if="tickerError" class="text-sm text-red-600">Такой тикер уже добавлен</div>
          <!-- <div v-if = "tickerError" class="text-sm text-red-600">Такой тикер уже добавлен</div> -->
        </div>
      </div>
      <add-button
      :disabled="disabled"
        @click="openPopup"
        type="button"
        class="my-4"/>
    </section>
    <modal-window ref="confirmationPopup">
      <template #header>
        Проверьте!
      </template>
      <template #body>
        Вы уверены, что хотите добавить {{ticker}} ?
      </template>
      <template #footer="{confirm}">
      Напишите
      <input :placeholder="$options.CONFIRMATION_TEXT" v-model="confirmation">
      &nbsp;
      <button @click="confirm" :disabled=!isConfirmationCorrect>OK</button>
      </template>
    </modal-window>
</template>
  defineExpose({open})
<script>
import AddButton from './AddButton.vue'
import ModalWindow from './ModalWindow.vue'



export default{
    components: {
    AddButton,
    ModalWindow
    },
    data(){
        return {
        ticker: '',
        tickerError: false,
        showHintVar: false,
        tickers:[],
        showModal: false,
        confirmation:"",
        }
    },
    // expose: ['open'],
    props:{
        disabled:{
            type: Boolean,
            required: false,
            default: false,
        },
    },
    CONFIRMATION_TEXT:'ПОДТВЕРЖДАЮ',
    emits:{
    "add-ticker":value => typeof value === "string" && value.length > 0,
    },
    computed: {
      isConfirmationCorrect(){
        return this.confirmation===this.$options.CONFIRMATION_TEXT
      }
    },
    methods:{
      async openPopup(){
        this.confirmation=''
        const popupResult = await this.$refs.confirmationPopup.open();
        if (popupResult){
          alert('IT WORKS!')
          // this.add()
        }
        // this.showModal = true
        // this.confirmation=''
      },
        add() {
        if (this.ticker.length === 0) {
            return
        }
        this.showModal = false
        this.$emit("add-ticker", this.ticker)
        this.ticker=''
    },
    showError(newTicker){
        this.tickerError = this.tickers.some(tickers => tickers.name.toLowerCase() === newTicker.toLowerCase())
    },
    showHint(t){
        t.length != 0 ? this.showHintVar = true : this.showHintVar = false
    },
    },
    }
</script>

