///左侧菜单
import { defineStore } from "pinia";
import { MenuState } from "../interface";
import piniaPersistConfig from "../../config/piniaPersist";
import { login } from "@/api/login";
import { stat } from "fs";
import { getKeepAliveRouterName, getShowMenuList, getAllBreadcrumbList } from "../../utils/util";
// MenuStore
export const MenuStore = defineStore({
	id: "MenuState",
	state: () => ({
		isCollapse: false,
		menuList: [],
	}),
	getters: {
		// 后端返回的菜单列表
		authMenuListGet: state => state.menuList,
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.menuList),
		// 面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.menuList),
		// 需要缓存的菜单 name，用作页面 keepAlive
		keepAliveRouterGet: state => getKeepAliveRouterName(state.menuList)
	},
	actions: {
		async setCollapse() {
			this.isCollapse = !this.isCollapse;

		},
		async saveMenuList( menuList: any) {
			this.menuList = menuList;
		},
		// async logout(state: { userInfo: null; menuList: never[]; }) {
		// 	state.userInfo = null;
		// 	sessionStorage.removeItem('token');
		// 	state.menuList = [];
		// },
		// login(state: { userInfo: any; }, user: { token: string; }) {
		// 	sessionStorage.setItem('token', user.token)
		// 	state.userInfo = user
		// },
		// async login(user: any) {
		// 	sessionStorage.setItem('token', user.token)
		// 	this.userInfo = user
		// },
		//  login(state: { userInfo: any; }, user: { token: string; }) {
		// 	sessionStorage.setItem('token', user.token)
		// 	state.userInfo = user
		// },

		// updateAvatar(state: { userInfo: { avatar: any; }; }, avatar: any) {
		// 	state.userInfo.avatar = avatar
		// },
		// updateUserInfo(state: { userInfo: { nickname: any; intro: any; webSite: any; }; }, user: { nickname: any; intro: any; webSite: any; }) {
		// 	state.userInfo.nickname = user.nickname
		// 	state.userInfo.intro = user.intro
		// 	state.userInfo.webSite = user.webSite
		// },
	},
	// persist: piniaPersistConfig("MenuState"),
})