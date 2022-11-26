
import { createApp } from "vue";
import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw, createRouterMatcher } from 'vue-router'

import NProgress from 'nprogress';
import useTabStore, { GlobalStore } from "../store/index";
import { useUserStore } from '../store/modules/user';
import axios from 'axios'

/**
 * ts的强类型约束下，添加额外属性就会报错，那么我们就需要扩展RouteRecordRaw类型。
 * 联合类型   hidden 是可选属性
 * meta: {
 *        permission: true,   icon: '',
 *        }
 */
//  (property) RouteRecordSingleViewWithChildren.component?: RawRouteComponent | null | undefined

type RouteConfig = RouteRecordRaw & { hidden?: boolean } & { icon?: any };

import Layout from "../Layout/index.vue";



const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login/login.vue'),
    hidden: true,
  },
  // {
  //     path: "/",
  //     // redirect: "/home",
  //     component: Layout,
  //     // name: "首页",
  //     icon: 'HomeFilled',
  //     children: [
  //         {
  //             path: "/",
  //             name: "首页",
  //             meta: {
  //                 permission: true,
  //                 icon: 'HomeFilled',
  //             },
  //             component: () => import("../views/home/Home.vue"),
  //         },
  //     ],
  // },
  // {
  //     path: "/article-submenu",
  //     name: "文章管理",
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-document",
  //     // },
  //     icon: 'Document',
  //     component: Layout,
  //     redirect: "/article",
  //     children: [
  //         {
  //             path: "/article",
  //             name: "发布文章",
  //             meta: {
  //                 permission: true,
  //                 icon: "Edit",
  //             },
  //             component: () => import("../views/article/Article.vue"),
  //         },
  //         {
  //             path: "/article-list",
  //             name: "文章列表",
  //             meta: {
  //                 permission: true,
  //                 icon: "Files",
  //             },
  //             component: () => import("../views/article/ArticleList.vue"),
  //         },
  //         {
  //             path: "/categories",
  //             name: "分类管理",

  //             meta: {
  //                 permission: true,
  //                 icon: 'Menu'
  //             },
  //             component: () => import("../views/category/Category.vue"),
  //         },
  //         {
  //             path: "/tags",
  //             name: "标签管理",
  //             meta: {
  //                 permission: true,
  //                 icon: 'Promotion'
  //             },
  //             component: () => import("../views/tag/Tag.vue"),

  //         }
  //     ]
  // },
  // {
  //     path: "/message-submenu",
  //     name: "消息管理",
  //     icon: "Message",
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-chat-dot-round",
  //     // },
  //     component: Layout,
  //     redirect: "/comments",
  //     children: [
  //         {
  //             path: "/comments",
  //             name: "评论管理",
  //             meta: {
  //                 permission: true,
  //                 icon: "ChatDotRound",
  //             },
  //             component: () => import("../views/comment/Comment.vue"),
  //         }
  //     ]
  // },
  // {
  //     path: "/album-submenu",
  //     name: "相册管理",
  //     icon: 'PictureFilled',
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-upload",
  //     // },
  //     component: Layout,
  //     redirect: "/albums",
  //     children: [
  //         {
  //             path: "/albums",
  //             name: "相册列表",
  //             meta: {
  //                 permission: true,
  //                 icon: "CameraFilled",
  //             },
  //             component: () => import("../views/album/Album.vue"),
  //         }
  //     ]
  // },
  // {
  //     path: "/talk-submenu",
  //     name: "说说管理",
  //     icon: 'ChatDotSquare',
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-chat-dot-square",
  //     // },
  //     component: Layout,
  //     redirect: "/talk-list",
  //     children: [
  //         {
  //             path: "/talk-list",
  //             name: "说说列表",
  //             meta: {
  //                 permission: true,
  //                 icon: "Aim",
  //             },
  //             component: () => import("../views/talk/TalkList.vue"),

  //         },
  //         {
  //             path: "/talks/:talkId",
  //             name: "发布说说",
  //             meta: {
  //                 permission: true,
  //                 icon: "Promotion",
  //             },
  //             component: () => import("../views/talk/Talk.vue"),
  //         },
  //     ]
  // },
  // {
  //     path: "/users-submenu",
  //     name: "用户管理",
  //     icon: "User",
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-user-solid",
  //     // },
  //     component: Layout,
  //     redirect: "/users",
  //     children: [
  //         {
  //             path: "/user",
  //             name: "用户列表",
  //             meta: {
  //                 permission: true,
  //                 icon: "UserFilled",
  //             },
  //             component: () => import("../views/user/User.vue"),
  //         },
  //         {
  //             path: "/online",
  //             name: "在线用户",
  //             meta: {
  //                 permission: true,
  //                 icon: "Avatar",
  //             },
  //             component: () => import("../views/user/Online.vue"),
  //         },
  //     ]
  // },
  // {
  //     path: "/permission-submenu",
  //     name: "权限管理",
  //     icon: 'View',
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-user-solid",
  //     // },
  //     component: Layout,
  //     redirect: "/roles",
  //     children: [
  //         {
  //             path: "/roles",
  //             name: "角色管理",

  //             meta: {
  //                 permission: true,
  //                 icon: "UserFilled",
  //             },
  //             component: () => import("../views/role/Role.vue"),
  //         },
  //         {
  //             path: "/resources",
  //             name: "接口管理",

  //             meta: {
  //                 permission: true,
  //                 icon: "Coin",
  //             },
  //             component: () => import("../views/resource/resource.vue"),
  //         },
  //         {
  //             path: "/menus",
  //             name: "菜单管理",

  //             meta: {
  //                 permission: true,
  //                 icon: "Grid",
  //             },
  //             component: () => import("../views/menu/Menu.vue"),
  //         }
  //     ]
  // },
  // {
  //     path: "/log-submenu",
  //     name: "日志管理",
  //     icon: "MagicStick",
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-s-management",
  //     // },
  //     component: () => import("../Layout/index.vue"),
  //     redirect: "/operation",
  //     children: [
  //         {
  //             path: "/operation/log",
  //             name: "操作日志",
  //             meta: {
  //                 permission: true,
  //                 icon: "CopyDocument",
  //             },
  //             component: () => import("../views/log/Operation.vue"),
  //         },
  //         {
  //             path: "/exception/log",
  //             name: "异常日志",
  //             meta: {
  //                 permission: true,
  //                 icon: "DocumentRemove",
  //             },
  //             component: () => import("../views/log/ExceptionLog.vue"),
  //         },
  //     ]
  // },
  // {
  //     path: "/system-submenu",
  //     name: "系统管理",
  //     icon: 'Setting',
  //     // meta: {
  //     //     permission: true,
  //     //     icon: "el-icon-s-tools",
  //     // },
  //     component: Layout,
  //     redirect: "/website",
  //     children: [
  //         {
  //             path: "/website",
  //             name: "网站管理",
  //             meta: {
  //                 permission: true,
  //                 icon: "Coin",
  //             },
  //             component: () => import("../views/website/Website.vue")
  //         },
  //         {
  //             path: "/quartz",
  //             name: "定时任务",
  //             meta: {
  //                 permission: true,
  //                 icon: "SwitchButton",
  //             },
  //             component: () => import("../views/quartz/Quartz.vue")
  //         },
  //         {
  //             path: "/friend",
  //             name: "友链管理",
  //             meta: {
  //                 permission: true,
  //                 icon: "Paperclip",
  //             },
  //             component: () => import("../views/friendLink/FriendLink.vue")
  //         },
  //         {
  //             path: "/about",
  //             name: "关于我",
  //             meta: {
  //                 permission: true,
  //                 icon: "TrendCharts",
  //             },
  //             component: () => import("../views/friendLink/FriendLink.vue")
  //         }
  //     ]
  // },
  // {
  //     path: "/setting",
  //     icon: 'Avatar',
  //     component: Layout,
  //     children: [
  //         {
  //             path: "/setting",
  //             name: "个人中心",
  //             meta: {
  //                 permission: true,
  //                 icon: 'Avatar',
  //             },
  //             component: () => import("../views/setting/Setting.vue"),
  //         },
  //     ],
  // }
]


const router = createRouter({
  history: createWebHistory(),
  routes
});






export const resetRouter = (routes: any) => {
  // @ts-ignore
  const newRouter = createRouter();
  // @ts-ignore
  router.matcher = newRouter.matcher;
};

// 解决两次访问相同路由地址报错
const originalPush = createRouter.prototype.push;
createRouter.prototype.push = function push(location: any) {
  return originalPush.call(this, location).catch((err: any) => err);
};

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});

//路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  NProgress.start()
  if (to.path == '/login') {
    next();
  } else if (!userStore.userInfo) {
    next({ path: '/login' })
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done()
});






export default router;

