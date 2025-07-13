<template>
    <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12">
        <div class="accordion mb-5" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left" @click="enableAccordion()" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <i class="fa fa-filter"></i> Filtrar representantes
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse" :class="accordion?'show':''" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
         <form @submit.prevent="filterForm">
           <div class="row">
            <div class="col-lg-4">
                <label for="itemDocument">CPF*</label>
                <input class="form-control" v-mask="['###.###.###-##']"  type="text" id="itemDocument" v-model="agent.document" placeholder="xxx.xxx.xxx-xx" required />
            </div>
            <div class="col-lg-8">
              <label for="itemName">Nome*</label>
              <input class="form-control" type="text" id="itemName" v-model="agent.name" placeholder="Ex: José da Silva" required />
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-6">
                <label for="itemBirthday">Data de aniversário*</label>
                <input class="form-control"  type="date" id="itemBirthday" v-model="agent.birthday" required />
            </div>
            <div class="col-lg-6">
                <label for="itemGender">Sexo*</label>
                <select class="form-control" v-model="agent.gender" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="m">Masculino</option>
                  <option value="f">Feminino</option>
                </select>
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-6">
                <label for="itemAddress">Endereço*</label>
                <input class="form-control" type="text" id="itemAddress" v-model="agent.address" placeholder="Ex: Av. Paulista, nº 90" required />
            </div>
            <div class="col-lg-3">
                <label for="itemGender">Estado*</label>
                <select class="form-control" v-model="agent.uf" required>
                    <option value="" disabled>Selecione uma opção</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>
            </div>
            <div class="col-lg-3">
                <label for="itemGender">Cidade*</label>
                <select class="form-control" v-model="agent.city">
                  <option value="" disabled>Selecione uma opção</option>
                </select>
            </div>
           </div>
           <div class="float-right mt-4">
              <button class="btn btn-danger" type="button" @click="clearForm()"><i class="fa fa-trash"></i> Limpar</button>
              <button class="btn btn-success ml-3" type="button" @click="searchAgent()"><i class="fa fa-search"></i> Pesquisar</button>
           </div>
        </form>
      </div>
    </div>
  </div>
</div>  
</div>
    </div>
    <h3 v-if="items.length <= 0">Carregando itens</h3>
    <h3 v-if="items.length > 0">Representantes cadastrados <router-link class="btn btn-primary float-right" to="/agent/add"><i class="fa fa-check"></i> Novo representante</router-link></h3>
    <div class="row">
      <div class="col-lg-12">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Data Nasc.</th>
                <th scope="col" class="center">Estado</th>
                <th scope="col" class="center">Cidade</th>
                <th scope="col" class="center">Sexo</th>
                
              </tr>
            </thead>
        <tbody>
          <tr v-if="items.length <= 0">
              <td colspan="8" class="center">Nenhum item encontrado</td>
          </tr>
          <tr v-for="item in items" :key="item.id">
            <td><button class="btn btn-warning" @click="editItem(item)">Editar</button></td>
            <td><button class="btn btn-danger" @click="deleteItem(item.id)">Apagar</button></td>
            <td>{{ item.name }}</td>
            <td></td>
            <td></td>
            <td class="center"></td>
            <td class="center"></td>
            <td class="center"></td>           
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios';
import {mask} from 'vue-the-mask'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
  directives: {mask},
  components: {Loading},
  data() {
    return {
      isLoading: true,
      fullPage: true,
      items: [],
      loading:"Aguarde",
      agent: {document:'',name:'',birthday:'',gender:'',address:'',uf:'',city:''},
      accordion: false
    };
  },
  methods: {
    onCancel() {},
    filterForm(){},
    clearForm(){
      this.agent = {document:'',name:'',birthday:'',gender:'',address:'',uf:'',city:''}
    },
    searchAgent(){

    },
    enableAccordion(){
     if(this.accordion){
       this.accordion = false;
     }else{
      this.accordion = true;
     }
    }
  },

  mounted() {
    axios.get('https://api.sampleapis.com/simpsons/characters').then((response) => {
      this.items = response.data;
       this.isLoading = false;
    });
  },
};
</script>
<style>
.center{text-align: center}
.float-right{float: right;}
</style>