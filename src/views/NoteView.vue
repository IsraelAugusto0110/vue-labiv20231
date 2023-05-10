<template>
  <div class="about">
    <h1>Bem vindo</h1>
    <h2>Painel de anotações</h2>
    <div>
      <h2>Nova anotação</h2>
      <label for="texto">Texto: </label>
      <input id="texto" type="text" v-model="texto" />
      <label for="usuario">UsuarioId: </label>
      <input id="usuario" type="text" v-model="usuario" />
      <button @click="cadastrar">Cadastrar</button>
    </div>
    <table>
      <thead>
        <td>Id</td>
        <td>Texto</td>
        <td>Usuario</td>
      </thead>
      <tr v-for="anotacao in anotacoes" :key="anotacao.id">
        <td>{{ anotacao.id }}</td>
        <td>{{ anotacao.texto }}</td>
        <td>{{ anotacao.usuario.nome }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNoteStore } from '@/stores/notes'
import axios from 'axios'
import { useLoginStore } from '@/stores/login'
const erro = ref()
const anotacoes = ref()
const texto = ref('Alguma coisa')
const usuario = ref('1')
const store = useNoteStore()
const storeLogin = useLoginStore()
const config = {
  headers: {
    authorization: storeLogin.token
  }
}

async function atualizar() {
  try {
    anotacoes.value = (await axios.get('anotacao', config)).data
  } catch (ex) {
    erro.value = (ex as Error).message
  }
}

async function cadastrar() {
  try {
    await axios.post('anotacao', {
      texto: texto.value,
      usuario: {
        id: usuario.value
      }
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
