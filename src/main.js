import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 全局前置守卫
router.beforeEach((to, form, next) => {
  console.log("to----", to); // 即将进入的路由信息
  console.log("form----", form); // 当前离开的路由信息
  next();
  //   if (to.name == "history") {
  //     next(false); // 拦截
  //   } else {
  //     next(); // 继续
  //   }

  // http://localhost:8080/
});

const app = createApp(App);
app.use(router);
app.mount("#app");
