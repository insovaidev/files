import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import { getUserState } from '../utils/firebase'
// import { verifyToken } from "../utils/firebaseServer";

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    // beforeEnter: _next,
    meta: { requiresUnauth: true }
    
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    // beforeEnter: _next,
    meta: { requiresUnauth: true }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // beforeEnter: _next,
    meta: { requiresUnauth: true }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    // beforeEnter: _next,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = JSON.parse(localStorage.getItem("user"))
 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  const isAuth = await getUserState()
  if (requiresAuth && !isAuth) next('/login')
  else if (requiresUnauth && isAuth) next('/')
  else next()
})

export default router;
