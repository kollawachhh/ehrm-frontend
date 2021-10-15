import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/user/Home.vue'
import TaskForm from '../views/user/TaskForm.vue'
import BreakForm from '../views/user/BreakForm.vue'
import TaskList from '../views/user/TaskList.vue'
import BreakList from '../views/user/BreakList.vue'
import UserList from '../views/admin/UserList.vue'
import UserForm from '../views/admin/UserForm.vue'
import UserDetail from '../views/admin/UserDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/task',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/taskForm',
    name: 'TaskForm',
    component: TaskForm,
  },
  {
    path: '/break',
    name: 'BreakList',
    component: BreakList,
  },
  {
    path: '/breakForm',
    name: 'BreakForm',
    component: BreakForm,
  },
  {
    path: '/user',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/userForm',
    name: 'UserForm',
    component: UserForm,
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetail,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
