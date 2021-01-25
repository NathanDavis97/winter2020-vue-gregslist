import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import CarDetailsPage from '../pages/CarDetailsPage.vue'
import HousesDetailsPage from '../pages/HouseDetailsPage.vue'
// @ts-ignore
import CarsPage from '../pages/CarsPage.vue'
import HousesPage from '../pages/HousesPage.vue'

const routes = [
  {
    path: '/cars',
    name: 'Cars',
    component: CarsPage
  }, {
    path: '/cars/:id',
    name: 'CarDetails',
    component: CarDetailsPage
  }, {
    path: '/:catchAll(.*)*',
    redirect: '/cars',
    component: null
  }, {
    path: '/houses',
    name: 'Houses',
    component: HousesPage
  }, {
    path: '/houses/:id',
    name: 'HouseDetails',
    component: HousesDetailsPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
