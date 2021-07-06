import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";
// import Splash from "@/views/Splash.vue";
// import Login from "@/views/Login.vue";
// import Register from "@/views/Register.vue";

// import Home from "@/views/pages/Home.vue";
// import Detail from "@/views/pages/Detail.vue";
// import Cart from "@/views/pages/Cart.vue";
import Profile from "@/views/pages/Profile.vue";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/pemesanan_kurban",
      name: "pemesanan",
      component: () => import("@/views/Pemesanan")
    },
    {
      path: "/splash",
      name: "splash",
      component: () => import("@/views/Splash")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register")
    },
    {
      path: '/',
      name: 'home',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Home"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/detail/:id',
      name: 'detail/',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Detail"),
      }
    },
    {
      path: '/detail/:id/add',
      name: 'detail_add',
      components: {
        default: () => import("@/views/pages/Home/DetailAdd"),
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/payment/:id',
      name: 'payment',
      components: {
        default: () => import("@/views/pages/Home/Payment"),
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activity',
      name: 'activity',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Activity/Index"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Cart/Cart"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/qurban',
      name: 'qurban',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Qurban"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/detail_payment',
      name: 'detail_payment',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/DetailPayment"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/payment_confirmation',
      name: 'payment_confirmation',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/PaymentConfirmation"),
        footer: AppFooter
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/spesial',
      name: 'spesial',
      components: {
        header: AppHeader,
        default: () => import("@/views/pages/Home/Spesial"),
        footer: AppFooter
      },
      // meta: {
      //   requiresAuth: false
      // }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({ name: 'splash' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})


// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router
