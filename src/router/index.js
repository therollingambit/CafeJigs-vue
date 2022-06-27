import { createRouter, createWebHistory } from "vue-router";
// components
import NotFound from "../views/NotFound.vue";
import CafeDetail from "../views/cafes/CafeDetail.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import CreateCafe from "../views/cafes/CreateCafe.vue";
import UserCafes from "../views/cafes/UserCafes.vue";

// route guard
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/cafes/:id",
      name: "CafeDetail",
      component: CafeDetail,
      props: true,
    },
    {
      path: "/cafes/create",
      name: "CreateCafe",
      component: CreateCafe,
      beforeEnter: requireAuth,
    },
    {
      path: "/cafes/user",
      name: "UserCafes",
      component: UserCafes,
      beforeEnter: requireAuth,
    },
    {
      path: "/:notFound(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
