///左侧菜单
import { defineStore } from "pinia";
import { MenuState } from "../interface";
import piniaPersistConfig from "../../config/piniaPersist";

// MenuStore
const MenuStore = defineStore({
	id: "MenuState",
	state: (): MenuState => ({
		isCollapse: false,
		menuList: [],
	}),
	getters:{},
	actions:{
		async setCollapse(){
			this.isCollapse=!this.isCollapse;

		},
		async setMenuList(menuList: Menu.MenuOptions[]) {
			this.menuList = menuList;
		}
	},
	persist: piniaPersistConfig("MenuState")
})
export  default MenuStore;