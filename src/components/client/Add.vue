<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12">
         <h2>Novo cliente</h2>
         <hr>
        <form @submit.prevent="addItem">
           <div class="row">
            <div class="col-lg-4">
                <label for="itemDocument">CPF*</label>
                <input class="form-control" v-mask="['###.###.###-##']"  type="text" id="itemDocument" v-model="client.document" placeholder="xxx.xxx.xxx-xx" required />
            </div>
            <div class="col-lg-8">
              <label for="itemName">Nome*</label>
              <input class="form-control" type="text" id="itemName" v-model="client.name" placeholder="Ex: José da Silva" required />
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-6">
                <label for="itemBirthday">Data de aniversário*</label>
                <input class="form-control"  type="date" id="itemBirthday" v-model="client.birthday" required />
            </div>
            <div class="col-lg-6">
                <label for="itemGender">Sexo*</label>
                <select class="form-control" v-model="client.gender" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-6">
                <label for="itemAddress">Endereço*</label>
                <input class="form-control" type="text" id="itemAddress" v-model="client.address" placeholder="Ex: Av. Paulista, nº 90" required />
            </div>
            <div class="col-lg-3">
                <label for="itemGender">Estado*</label>
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
                <label for="itemGender">Cidade*</label>
                <select  class="form-control" v-model="client.city">
                   <option value="" disabled>Selecione uma opção</option>
                   <option v-for="city in cities" :key="city.id" :value="city.id">
                      {{ city.name }}
                    </option>
                </select>
            </div>
           </div>
           <div class="float-right mt-4">
              <button class="btn btn-danger" type="button" @click="clearForm()"><i class="fa fa-trash"></i> Limpar</button>
              <button class="btn btn-primary ml-3" type="submit"><i class="fa fa-save"></i> Salvar</button>
           </div>
        </form>
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
      isLoading: false,
      fullPage: true,
      client:{
        document:'',
        name:'',
        birthday:'',
        gender:'',
        address:'',
        uf:'',
      },
       cities:[],
       url_api:''
    };
  },
  methods: {
    clearForm(){
      this.client = {document:'',name:'',birthday:'',gender:'',address:'',uf:'',city:''}
      this.cities = []
    },
   addItem() {
      const fetch = async (url) => {
        try {
          this.isLoading = true;
          await axios.post(url,this.client);
           this.clearForm();
           this.$notify({
                title: "Sucesso",
                text: "Cliente cadastrado com sucesso!",
                type:'success'
            });
        } catch (error) {
          this.isLoading = false;
          if (error.response.status === 422) {
             this.$notify({
                title: "Falha",
                text: "Verifique os dados informados ou se o CPF já está cadastrado!",
                type:'error'
            });
          }
        }
      }
      fetch('http://localhost:10090/api/v1/client');
 
    },
     onChange(event) {
       this.isLoading = true;
       let uf = event.target.value;
       axios.get('http://localhost:10090/api/v1/city/'+uf).then((response) => {
          this.cities = response.data.cities;
           this.isLoading = false;
           
        }).catch(function (error) {
           this.isLoading = false;
          console.error(error);
        });
     },
   onCancel() {}
  },
  beforeCreate(){
     this.isLoading = true;
  },
  mounted() {
     this.url_api = process.env.VUE_APP_URL_API
     this.isLoading = false;
  }
};
</script>
<style>
.float-right{
  float:right;
}
</style>