import { createMemoryHistory, createRouter } from 'vue-router'
import Dashboard from '../components/dashboard/Index.vue';
import Client from '../components/client/List.vue';
import AddClient from '../components/client/Add.vue';
import EditClient from '../components/client/Edit.vue';

import Agent from '../components/agent/List.vue';
import AddAgent from '../components/agent/Add.vue';
import EditAgent from '../components/agent/Edit.vue';

const routes = [
 
  { path: '/', component: Dashboard },
 
  /*Rotas de clientes */
  { path: '/client', component: Client },
  { path: '/client/add', component: AddClient },
  { path: '/client/:id', component: EditClient, name: "client_edit" },

  /*Rotas de representantes */
 
  { path: '/agent', component: Agent },
  { path: '/agent/add', component: AddAgent },
  { path: '/agent/:id', component: EditAgent, name: "agent_edit"  }

];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;