import GradientDescentView from '@/views/GradientDescentView.vue';
import HomePage from '@/views/HomePage.vue';
import SimulationGravity2View from '@/views/SimulationGravity2View.vue';
import SimulationGravityView from '@/views/SimulationGravityView.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/gravity_simple',
      component: SimulationGravityView
    }, 
    {
      path: '/gravity_bound',
      component: SimulationGravity2View
    }, 
    {
      path: '/gradient_descent', 
      component: GradientDescentView
    }
  ]
});

export default router