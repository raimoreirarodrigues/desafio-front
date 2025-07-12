<template>
  <div class="container mt-3">
    <h3 v-if="items.length <= 0">Carregando itens</h3>
    <h3 v-if="items.length > 0">Clientes cadastrados <router-link class="btn btn-primary float-right" to="/client/add"><i class="fa fa-check"></i> Adicionar item</router-link></h3>
    <div class="row">
      <div class="col-lg-12">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col" colspan="2"></th>
              </tr>
            </thead>
        <tbody>
          <tr v-if="items.length <= 0">
              <td colspan="3" class="center">Nenhum item encontrado</td>
          </tr>
          <tr v-for="item in items" :key="item.id">
            <th scope="row">{{ item.id }}</th>
            <td >{{ item.name }}</td>
            <td><button class="btn btn-warning" @click="editItem(item)">Edit</button></td>
            <td><button class="btn btn-danger" @click="deleteItem(item.id)">Apagar</button></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      loading:"Aguarde"
    };
  },
  methods: {
   
  },
  mounted() {
    axios.get('https://api.sampleapis.com/simpsons/characters').then((response) => {
      this.items = response.data;
    });
  },
};
</script>
<style>
.center{
  text-align: center;
  .float-right{float: right;}
}
</style>