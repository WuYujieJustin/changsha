import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

export const constantRoutes = [
  // {
  //   path: '/',
  //   redirect: '/pmreport',
  //   hidden: true
  // },
  {
    path: '/',
    component: Home,
    redirect: '/all',
    alwaysShow: true,
    children: [{
        path: 'all',
        name: 'AllAnalysis',
        component: () => import('@/views/AllAnalysis')
      },
      {
        path: 'major',
        name: 'MajorAnalysis',
        component: () => import('@/views/MajorAnalysis')
      }
    ]
  },
  {
    path: '/yearplan',
    name: 'yearplan',
    component: () => import('@/views/yearplan/yearplan'),
  },
  {
    path: '/viewPlan',
    name: 'viewPlan',
    component: () => import('@/views/yearplan/index'),
  },
  {
    path: '/overView',
    name: 'overView',
    component: () => import('@/views/yearplan/overView'),
  },
  {
    path: '/modules',
    component: () => import('@/views/Modules'),
    redirect: '/expert',
    children: [{
        path: 'expert',
        name: 'expert',
        component: () => import('@/views/expert/index.vue')
      },
      {
        path: 'workOrder',
        name: 'workOrder',
        component: () => import('@/views/workOrder/index.vue'),
        // children: [
        //   {
        //     path: 'workorderDetail',
        //     name: 'workorderDetail',
        //     component: () => import('@/views/workOrder/children/detail.vue')
        //   }
        // ]
      },
      {
        path: 'workorderDetail',
        name: 'workorderDetail',
        component: () => import('@/views/workOrder/children/detail.vue')
      },
      {
        path: 'expertlist',
        name: 'expertlist',
        component: () => import('@/views/expert/children/expertList.vue')
      },
      {
        path: 'expertdetail',
        name: 'expertdetail',
        component: () => import('@/views/expert/children/expertDetail.vue')
      },
    ]
  },
  {
    path: '/example',
    component: () => import('@/views/workOrder/example.vue')
  }
]
//
const createRouter = () => new VueRouter({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router