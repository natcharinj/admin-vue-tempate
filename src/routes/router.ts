import * as vR from 'vue-router';
import NotFoundPage from '@pages/NotFoundPage.vue';
import Registration from '@pages/Request/Registration.vue';
//Create a router and then export it

const _routes: Array<vR.RouteRecordRaw> = [
  //Path & Component are mandatory.
  {
    path: '/',
    component: Registration,
    name: 'home',
  },
  {
    path: '/request/registration-success',
    component: () => import('@pages/Request/RegistrationSuccess.vue'), // Lazy loading to defer loading only when required
    name: 'request.registration-success', //Use defined. Keep dot notation to have elegant design
  },
  {
    path: '/user-management',
    component: () => import('@pages/Management/User.vue'), // Lazy loading to defer loading only when required
    name: 'user-management', //Use defined. Keep dot notation to have elegant design
  },
  {
    path: '/nf', //Need to change with regex to catch all non-defined
    component: NotFoundPage,
    name: 'home.missing',
  },
];

const router = vR.createRouter({
  history: vR.createWebHistory(), //WebHash history will add hash before every route
  routes: _routes, //Send the routes here.
});

export default router;
