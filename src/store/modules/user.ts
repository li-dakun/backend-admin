import { defineStore } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import piniaPersistConfig from "../../config/piniaPersist";
export const useUserStore = defineStore({
    id: "userStore",
    state: () => {
        return {
            avatar: '' as any,
            nickname: '' as any,
            intro: '' as any,
            webSite: '' as any,
            userId: '' as any,
            username: '' as any,
            token: '' as any,
            userInfo: '' as any,
        }
    },
    getters: {
        // authMenuListGet: state => state.menuList,
    },
    actions: {
        // async setCollapse(state: { isCollapse: boolean; }) {
        //     state.isCollapse = !state.isCollapse;
        // },
        // async setMenuList(state: { menuList: any; }, menuList: any) {
        // 	state.menuList = menuList;
        // },
        // login(state: { userInfo: any; }, user: any) {
        //     sessionStorage.setItem('token', user.token)
        //     state.userInfo = user
        // },
        // async logout(state: { userInfo: null; menuList: never[]; }) {
        //     state.userInfo = null;
        //     sessionStorage.removeItem('token');
        //     state.menuList = [];
        // },
        // updateAvatar(state: { userInfo: { avatar: any; }; }, avatar: any) {
        //     state.userInfo.avatar = avatar
        // },
        // updateUserInfo(state: { userInfo: { nickname: any; intro: any; webSite: any; }; }, user: { nickname: any; intro: any; webSite: any; }) {
        //     state.userInfo.nickname = user.nickname
        //     state.userInfo.intro = user.intro
        //     state.userInfo.webSite = user.webSite
        // },

    },
    persist: piniaPersistConfig('userStore'),
    // persist: {
    //     // 这里存储默认使用的是session
    //     enabled: true,
    //     strategies: [
    //         {
    //             //key的名称
    //             // key: 'my_user',
    //             //更改默认存储，我更改为localStorage
    //             // storage: localStorage,
    //             storage: window.sessionStorage,
    //             // 可以选择哪些进入local存储，这样就不用全部都进去存储了
    //             // 默认是全部进去存储
    //             // paths: ['list']
    //         }
    //     ]
    // },

    plugins:[
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})

