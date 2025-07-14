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
          <i class="fa fa-filter"></i> Filtrar clientes
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse" :class="accordion?'show':''" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
         <form @submit.prevent="filterForm">
           <div class="row">
            <div class="col-lg-4">
                <label for="itemDocument">CPF</label>
                <input class="form-control" v-mask="['###.###.###-##']"  type="text" id="itemDocument" v-model="client.document" placeholder="xxx.xxx.xxx-xx" required />
            </div>
            <div class="col-lg-5">
              <label for="itemName">Nome</label>
              <input class="form-control" type="text" id="itemName" v-model="client.name" placeholder="Ex: José da Silva" required />
            </div>
             <div class="col-lg-3">
                <label for="itemGender">Sexo</label>
                <select class="form-control" v-model="client.gender" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="m">Masculino</option>
                  <option value="f">Feminino</option>
                </select>
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-6">
                <label for="itemAddress">Endereço</label>
                <input class="form-control" type="text" id="itemAddress" v-model="client.address" placeholder="Ex: Av. Paulista, nº 90" required />
            </div>
            <div class="col-lg-3">
                <label for="itemGender">Estado</label>
                <select class="form-control" @change="onChange($event)" v-model="client.uf" required>
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
                <label for="itemGender">Cidade</label>
                <select class="form-control" v-model="client.city">
                   <option value="" disabled>Selecione uma opção</option>
                   <option v-for="city in cities" :key="city.id" :value="city.id">
                      {{ city.name }}
                    </option>
                </select>
            </div>
           </div>
           <div class="float-right mt-4">
              <button class="btn btn-danger" type="button" @click="clearForm()"><i class="fa fa-trash"></i> Limpar</button>
              <button class="btn btn-success ml-3" type="button" @click="searchClient()"><i class="fa fa-search"></i> Pesquisar</button>
           </div>
        </form>
      </div>
    </div>
  </div>
</div>  
</div>
    </div>
    <h3>Clientes cadastrados <router-link class="btn btn-primary float-right" to="/client/add"><i class="fa fa-check"></i> Novo cliente</router-link></h3>
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
          <tr v-if="clients.length <= 0">
              <td colspan="8" class="center">Nenhum item encontrado</td>
          </tr>
          <tr v-for="client in clients" :key="client.id">
            <td><router-link class="btn btn-warning" :to="{
                  name: 'client_edit',
                  params: { id: client.id }
          }">Editar</router-link></td>
            <td><button class="btn btn-danger" @click="deleteClient(client.id)">Apagar</button></td>
            <td>{{ client.name }}</td>
            <td>{{ client.document }}</td>
            <td>{{ formatDate(client.birthday) }}</td>
            <td class="center">{{ client.uf }}</td>
            <td class="center">{{ client.city }}</td>
            <td class="center">{{ client.gender }}</td>           
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
      clients: [],
      loading:"Aguarde",
      client: {document:'',name:'',birthday:'',gender:'',address:'',uf:'',city:''},
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
      this.client = {document:'',name:'',birthday:'',gender:'',address:'',uf:'',city:''}
      this.loadListClients();
    },
    searchClient(){
      let filter = [];
      if(this.client.document != ''){
        filter['document'] = this.client.document
      }
      if(this.client.name != ''){
        filter['name'] = this.client.name
      }

      if(this.client.gender != ''){
        filter['gender'] = this.client.gender
      }

      if(this.client.uf != ''){
        filter['uf'] = this.client.uf
      }

      if(this.client.address != ''){
        filter['address'] = this.client.address
      }

      if(this.client.city != ''){
        filter['city'] = this.client.city
      }
       this.accordion = true;
      this.loadListClients(filter);
    },
     onChange(event) {
       this.isLoading = true;
       let uf = event.target.value;
       axios.get(this.url_api+'/city/'+uf).then((response) => {
          this.cities = response.data.cities;
           this.isLoading = false;
        }).catch(function (error) {
           this.isLoading = false;
          console.error(error);
        });
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

    deleteClient(id){
       this.$confirm(
        {
          message: 'Deseja apagar o cliente?',
          button: {
            no: 'Não',
            yes: 'Sim'
          },
         
          callback: confirm => {
            if (confirm) {
               const fetch = async (url) => {
                try {
                    this.isLoading = true;
                    await axios.delete(url,this.client);
                    this.$notify({
                          title: "Sucesso",
                          text: "Cliente apagado com sucesso!",
                          type:'success'
                      });
                        this.isLoading = false;
                        this.loadListClients();
                  }catch (error) {
                      this.isLoading = false;
                      if(error){
                        this.$notify({
                            title: "Falha",
                            text: "Não foi possível apagar o cliente. Por favor, tente novamente mais tarde.",
                            type:'error'
                          });
                      }
                  }
               }
              fetch('http://localhost:10090/api/v1/client/'+id);
                    }
                  }
                }
              )
    },

    loadListClients(filter = []){
       let body = Object.assign({}, filter);
       axios.get(this.url_api+'/client',{params:body}).then((response) => {
       this.clients = response.data.data;
       this.isLoading = false;
    });
    }
  },

  mounted() {
    this.url_api = process.env.VUE_APP_URL_API
    this.loadListClients();
  },
};
</script>
<style>
.center{text-align: center}
.float-right{float: right;}
</style>