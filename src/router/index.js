import { createMemoryHistory, createRouter } from 'vue-router'
import Client from '../components/client/List.vue';
import Add from '../components/client/Add.vue';
import Edit from '../components/client/Edit.vue';
import Delete from '../components/client/Delete.vue';


const routes = [
  /*Rotas de clientes */
  { path: '/', component: Client },
  { path: '/client', component: Client },
  { path: '/client/add', component: Add },
  { path: '/client/edit/:id', component: Edit },
  { path: '/client/delete/:id', component: Delete },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router;