<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand"><img src="../assets/img/logo.png" width="60px"> </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
          <router-link to="/" class="nav-link" aria-current="page">Início</router-link>
         </li>
        <li class="nav-item">
          <router-link to="/client" class="nav-link" aria-current="page">Clientes</router-link>
        </li>
        <li class="nav-item">
           <router-link to="/agent" class="nav-link" aria-current="page">Representantes</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>

export default {
  data() {
    return {};
  },
  methods: {
   
  },
  
};
</script>