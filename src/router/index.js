import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

// ---------------------------路由学习案例---------------------------------------
// 路由列表既路由规则
const routes = [
  {
    path: "/",
    // alias: "/home",
    alias: ["/index", "/home"], // 定义别名 http://localhost:8080/home
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/login",
    name: "login", // 定义路由名称(导航跳转时可以不传路径，直接传别名)
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/query", // 使用查询字符串传递参数 http://localhost:8080/query?id=100&name=strogt
    name: "query",
    component: () => import("@/views/query.vue"),
  },
  // 可选参数 name?表示该参数可以不传
  {
    path: "/params/:id/name/:name?", // 使用路径传递参数 http://localhost:8080/params/100/name/strogt
    name: "params",
    component: () => import("@/views/params.vue"),
  },
  // 路由跳转方式
  {
    path: "/routerEg", // 使用路径传递参数 http://localhost:8080/routerEg
    name: "routerEg",
    component: () => import("@/views/routerEg.vue"),
  },
  // 嵌套路由
  {
    path: "/vip", // 使用路径传递参数 http://localhost:8080/vip
    name: "vip",
    component: () => import("@/views/vip.vue"),
    children: [
      // 子路由
      {
        path: "", // 使用路径传递参数 http://localhost:8080/vip
        component: () => import("@/views/vip/default.vue"),
      },
      {
        path: "children1", // 使用路径传递参数 http://localhost:8080/vip/children1
        component: () => import("@/views/vip/children1.vue"),
      },
      {
        path: "children2", // 使用路径传递参数 http://localhost:8080/vip/children2
        component: () => import("@/views/vip/children2.vue"),
      },
    ],
  },
  // 重定向
  {
    path: "/svip", // 使用路径传递参数 http://localhost:8080/svip
    name: "svip",
    redirect: "/vip", // 重定向路径
    // redirect: { name: "params", params: { id: 100, name: "strogt" } }, // 编译跳转重定向
  },
];

// 创建路由器
const router = createRouter({
  // 路由模式 createWebHistory-传统浏览器模式，createWebHashHistory-哈希模式
  history: createWebHistory(),
  // 路由规则
  routes,
});

// 将路由器导出
export default router;
