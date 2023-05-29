<template>
  <div class="about">
    <h1>Bem vindo</h1>
    <h2>Gerenciar provas</h2>
    <div>
      <h2>Nova prova</h2>
      <label for="descricao">Descrição: </label>
      <input id="descricao" type="text" v-model="descricao" />
      <label for="peso">Peso: </label>
      <input id="peso" type="number" v-model="peso" />
      <label for="data">Data: </label>
      <input id="data" type="datetime-local" v-model="data" />
      <button @click="cadastrar">Cadastrar</button>
    </div>
    <table>
      <thead>
        <td>Id</td>
        <td>Descrição</td>
        <td>Peso</td>
        <td>Data</td>
      </thead>
      <tr v-for="prova in provas" :key="prova.id">
        <td>{{ prova.id }}</td>
        <td>{{ prova.descricao }}</td>
        <td>{{ prova.peso }}</td>
        <td>{{ prova.dataHora }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProvaStore } from '@/stores/provas'
import axios from 'axios'
import { useLoginStore } from '@/stores/login'
const erro = ref()
const provas = ref()
const descricao = ref('Prova')
const peso = ref(0.5)
const data = ref()
const store = useProvaStore()
const storeLogin = useLoginStore()
const config = {
  headers: {
    authorization: storeLogin.token
  }
}

async function atualizar() {
  try {
    provas.value = (await axios.get('prova', config)).data
  } catch (ex) {
    erro.value = (ex as Error).message
  }
}

async function cadastrar() {
  try {
    await axios.post('prova', {
      descricao: descricao.value,
      peso: peso.value,
      dataHora: data.value
    })
  } catch (ex) {
    erro.value = (ex as Error).message
  }
  atualizar()
}

onMounted(() => {
  atualizar()
})
</script>
