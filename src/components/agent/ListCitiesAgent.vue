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
          <i class="fa fa-plus"></i> Inserir nova cidade
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse" :class="accordion?'show':''" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
         <form @submit.prevent="addCity">
            <div class="row">
               <div class="col-lg-6">
                <label for="itemGender">Estado</label>
                <select class="form-control" @change="onChange($event)" v-model="city.uf" required>
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
            <div class="col-lg-6">
                <label for="itemGender">Cidade</label>
                <select class="form-control" v-model="city.id">
                   <option value="" disabled>Selecione uma opção</option>
                   <option v-for="city in cities_uf" :key="city.id" :value="city.id">
                      {{ city.name }}
                    </option>
                </select>
            </div>
            </div>
           
           <div class="float-right mt-4">
              <button class="btn btn-danger" type="button" @click="clearForm()"><i class="fa fa-trash"></i> Limpar</button>
              <button class="btn btn-success ml-3" type="submit"><i class="fa fa-check"></i> Adicionar</button>
           </div>
        </form>
      </div>
    </div>
  </div>
</div>  
</div>
    </div>
    <h3>Cidades cadastradas</h3>
    <div class="row">
      <div class="col-lg-12">
          <table class="table mt-2">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Nome</th>
                <th scope="col">UF</th>
              </tr>
            </thead>
        <tbody>
          <tr v-if="cities.length <= 0">
              <td colspan="3" class="center">Nenhum item encontrado</td>
          </tr>
          <tr v-for="city in cities" :key="city.id">
          
            <td><button class="btn btn-danger" @click="deleteCity(city.id)">Apagar</button></td>
            <td>{{ city.city.name }}</td>
            <td>{{ city.city.uf }}</td> 
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
      cities: [],
      cities_uf: [],
      loading:"Aguarde",
      city: {uf:'',id:''},
      id_agent:'',
      accordion: false,
      url_api:''
    };
  },
  methods: {
    onCancel() {},
    addCity(){
       const fetch = async (url) => {
        try {
          this.isLoading = true;
          await axios.post(url,this.city);
           this.$notify({
                title: "Sucesso",
                text: "Cidades associada com sucesso ao representante!",
                type:'success'
            });
             this.isLoading = false;
             this.loadListcities();
        }catch (error) {
          this.isLoading = false;
          if(error){
              this.$notify({
                title: "Falha",
                text: "Não foi possível associar a cidade ao representante. Por favor, tente novamente mais tarde.",
                type:'error'
              });
          }
        }
      }
      fetch(this.url_api+'/agent/'+this.id_agent+'/cities');
    },
    clearForm(){
      this.accordion = true;
      this.city = {uf:'',city:''}
      this.loadListcities();
    },
  
     
    enableAccordion(){
     if(this.accordion){
       this.accordion = false;
     }else{
      this.accordion = true;
     }
    },
   
     onChange(event) {
       this.isLoading = true;
       let uf = event.target.value;
       axios.get(this.url_api+'/city/'+uf).then((response) => {
          this.cities_uf = response.data.cities;
           this.isLoading = false;
        }).catch(function (error) {
           this.isLoading = false;
          console.error(error);
        });
     },
    deleteCity(id){
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
                        this.loadListcities();
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

    loadListcities(){
       axios.get(this.url_api+'/agent/'+this.id_agent+'/cities').then((response) => {
       this.cities = response.data.cities;
       this.isLoading = false;
    });
    }
  },

  mounted() {
    this.url_api = process.env.VUE_APP_URL_API
    const id = this.$route.params.id;
    this.id_agent = id;
    this.loadListcities();
  },
};
</script>
<style>
.center{text-align: center}
.float-right{float: right;}
</style>