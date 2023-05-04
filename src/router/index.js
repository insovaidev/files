import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import { getUserState } from '../utils/firebase'


const routes = [
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: { requiresUnauth: true }
    
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresUnauth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresUnauth: true }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  const isAuth = await getUserState()

  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router;
