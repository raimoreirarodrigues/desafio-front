<template>
  <loading v-model:active="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"/>
  <div class="container mt-3">
    <div class="row">
      <div class="col-lg-12">
         <h2>Novo representante</h2>
         <hr>
        <form @submit.prevent="addItem">
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
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
            </div>
           </div>
           <div class="row mt-3">
             <div class="col-lg-12">
                <label for="itemAddress">Endereço*</label>
                <input class="form-control" type="text" id="itemAddress" v-model="agent.address" placeholder="Ex: Av. Paulista, nº 90" required />
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
      agent:{
        document:'',
        name:'',
        birthday:'',
        gender:'',
        address:''
      },
       url_api:''
    };
  },
  methods: {
    clearForm(){
      this.agent = {document:'',name:'',birthday:'',gender:'',address:''}
    },
   addItem() {
      const fetch = async (url) => {
        try {
          this.isLoading = true;
          await axios.post(url,this.agent);
           this.clearForm();
           this.$notify({
                title: "Sucesso",
                text: "Representante cadastrado com sucesso!",
                type:'success'
            });
              this.isLoading = false;
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
      fetch(this.url_api+'/agent');
 
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