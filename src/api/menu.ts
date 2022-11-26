
import router from '../router/index';
import axios from 'axios';
import Layout from '../layout/index.vue'
import { RouteRecordRaw } from 'vue-router';
import { getFlatArr } from "../utils/util";
import { MenuStore } from '../store/modules/menu';
const layout = import.meta.glob('../layout/*.vue');
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue");
/**
 * 菜单栏
 */
const generaMenu = () => {
    const menuStore = MenuStore();
    axios.get('/api/admin/user/menus').then(({ data }) => {
        if (data.flag) {
            const menuList = data.data;
            // console.log(menuList);
            
            menuList.forEach((item: any) => {
                if (item.icon != null) item.icon = 'iconfont ' + item.icon;
                if (item.component == 'Layout') item.component = Layout;
                if (item.children && item.children.length > 0) {
                    item.children.forEach((item: any) => {
                        item.icon = 'iconfont ' + item.icon
                        item.component = loadView(item.component)
                        // item.component = modules["/src/views" + item.component + ".vue"];
                        // item.component = modules[`../views/${item.component}`];
                    })
                }
            })
            // 添加侧边栏菜单
            menuStore.saveMenuList(menuList);
            // 添加菜单到路由
            menuList.forEach((item: any) => {
                router.addRoute("Layout", item);
            })
        }
    })
}
/* 加载路由组件，两种方式均可 */
export const loadView = (view: any) => { // 路由懒加载
    // return (resolve) => require([`@/views/${view}`], resolve)
    return () => import('../views' + view);
    // return () => Promise.resolve(require(`@/views/${view}`))
    // return () => Promise.resolve(require(`@/views/${view}`).default);
    // return () => require.ensure([], (require: (arg0: string) => any) => require(`@/views/${view}`))
}

export default generaMenu;