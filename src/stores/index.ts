import { createPinia } from "pinia";
import piniaPluginPersist from 'pinia-plugin-persist'



// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia;








