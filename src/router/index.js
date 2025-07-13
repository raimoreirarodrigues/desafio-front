import { createMemoryHistory, createRouter } from 'vue-router'
import Dashboard from '../components/dashboard/Index.vue';
import Client from '../components/client/List.vue';
import AddClient from '../components/client/Add.vue';
import EditClient from '../components/client/Edit.vue';
import DeleteClient from '../components/client/Delete.vue';

import Agent from '../components/agent/List.vue';
import AddAgent from '../components/agent/Add.vue';
import EditAgent from '../components/agent/Edit.vue';
import DeleteAgent from '../components/agent/Delete.vue';



const routes = [
 
  { path: '/', component: Dashboard },
 
  /*Rotas de clientes */
  { path: '/client', component: Client },
  { path: '/client/add', component: AddClient },
  { path: '/client/edit/:id', component: EditClient },
  { path: '/client/delete/:id', component: DeleteClient },

  /*Rotas de representantes */
 
  { path: '/agent', component: Agent },
  { path: '/agent/add', component: AddAgent },
  { path: '/agent/edit/:id', component: EditAgent },
  { path: '/agent/delete/:id', component: DeleteAgent },

];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;