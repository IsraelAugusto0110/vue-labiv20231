import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNoteStore = defineStore('anotacao', () => {
  const data = ref()
  const erro = ref()

  async function getData() {
    try {
      const res = await axios.get('anotacao')
      data.value = res.data
    } catch (ex) {
      erro.value = (ex as Error).message
      console.log(erro)
    }
  }
  return { data }
})
