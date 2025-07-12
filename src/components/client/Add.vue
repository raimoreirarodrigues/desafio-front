<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
         <h2>Novo item</h2>
        <form @submit.prevent="addItem">
          <label for="itemName">Nome*</label>
          <input class="form-control" type="text" id="itemName" v-model="newItemName" placeholder="Ex: José da Silva" required />
          <router-link class="btn btn-danger mt-3" to="/"><i class="fa fa-arrow-left"></i>Voltar para listagem</router-link>
          <button class="btn btn-primary mt-3 ml-3" type="submit"><i class="fa fa-save"></i> item</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItemName: '',
    };
  },
  methods: {
   addItem() {
      console.log(this.newItemName)
    },
  },
};
</script>