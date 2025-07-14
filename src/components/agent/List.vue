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
                <label for="itemDocument">CPF</label>
                <input class="form-control" v-mask="['###.###.###-##']"  type="text" id="itemDocument" v-model="agent.document" placeholder="xxx.xxx.xxx-xx" required />
            </div>
            <div class="col-lg-5">
              <label for="itemName">Nome</label>
              <input class="form-control" type="text" id="itemName" v-model="agent.name" placeholder="Ex: José da Silva" required />
            </div>
             <div class="col-lg-3">
                <label for="itemGender">Sexo</label>
                <select class="form-control" v-model="agent.gender" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="m">Masculino</option>
                  <option value="f">Feminino</option>
                </select>
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-12">
                <label for="itemAddress">Endereço</label>
                <input class="form-control" type="text" id="itemAddress" v-model="agent.address" placeholder="Ex: Av. Paulista, nº 90" required />
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
    <h3>Representantes cadastrados <router-link class="btn btn-primary float-right" to="/agent/add"><i class="fa fa-check"></i> Novo representante</router-link></h3>
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
                <th scope="col" class="center">Sexo</th>
                
              </tr>
            </thead>
        <tbody>
          <tr v-if="representatives.length <= 0">
              <td colspan="6" class="center">Nenhum item encontrado</td>
          </tr>
          <tr v-for="agent in representatives" :key="agent.id">
            <td><router-link class="btn btn-warning" :to="{
                  name: 'agent_edit',
                  params: { id: agent.id }
          }">Editar</router-link></td>
            <td><button class="btn btn-danger" @click="deleteAgent(agent.id)">Apagar</button></td>
            <td>{{ agent.name }}</td>
            <td>{{ agent.document }}</td>
            <td>{{ formatDate(agent.birthday) }}</td>
            <td class="center">{{ agent.gender }}</td>           
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
import moment from 'moment';

import 'vue-loading-overlay/dist/css/index.css';

export default {
  directives: {mask},
  components: {Loading},
  data() {
    return {
      isLoading: true,
      fullPage: true,
      representatives: [],
      loading:"Aguarde",
      agent: {document:'',name:'',birthday:'',gender:'',address:''},
      cities:[],
      accordion: false,
      url_api:''
    };
  },
  methods: {
    onCancel() {},
    filterForm(){},
    clearForm(){
      this.accordion = true;
      this.agent = {document:'',name:'',birthday:'',gender:'',address:''}
      this.loadListRepresentatives();
    },
    searchAgent(){
      let filter = [];
      if(this.agent.document != ''){
        filter['document'] = this.agent.document
      }
      if(this.agent.name != ''){
        filter['name'] = this.agent.name
      }

      if(this.agent.gender != ''){
        filter['gender'] = this.agent.gender
      }

      if(this.agent.uf != ''){
        filter['uf'] = this.agent.uf
      }

      if(this.agent.address != ''){
        filter['address'] = this.agent.address
      }

       this.accordion = true;
      this.loadListRepresentatives(filter);
    },
     
    enableAccordion(){
     if(this.accordion){
       this.accordion = false;
     }else{
      this.accordion = true;
     }
    },
    formatDate(date) {
        return moment(date).format('DD/MM/YYYY');
    },

    deleteAgent(id){
       this.$confirm(
        {
          message: 'Deseja apagar o representante?',
          button: {
            no: 'Não',
            yes: 'Sim'
          },
         
          callback: confirm => {
            if (confirm) {
               const fetch = async (url) => {
                try {
                    this.isLoading = true;
                    await axios.delete(url,this.agent);
                    this.$notify({
                          title: "Sucesso",
                          text: "Representante apagado com sucesso!",
                          type:'success'
                      });
                        this.isLoading = false;
                        this.loadListRepresentatives();
                  }catch (error) {
                      this.isLoading = false;
                      if(error){
                        this.$notify({
                            title: "Falha",
                            text: "Não foi possível apagar o representante. Por favor, tente novamente mais tarde.",
                            type:'error'
                          });
                      }
                  }
               }
              fetch(this.url_api+'/agent/'+id);
                    }
                  }
                }
              )
    },

    loadListRepresentatives(filter = []){
       let body = Object.assign({}, filter);
       axios.get(this.url_api+'/agent',{params:body}).then((response) => {
       this.representatives = response.data.data;
       this.isLoading = false;
    });
    }
  },

  mounted() {
    this.url_api = process.env.VUE_APP_URL_API
    this.loadListRepresentatives();
  },
};
</script>
<style>
.center{text-align: center}
.float-right{float: right;}
</style>