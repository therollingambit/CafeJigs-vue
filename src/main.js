import { createApp } from "vue";
import App from "./App.vue";

import { onAuthStateChanged } from "firebase/auth";
import { projectAuth } from "./firebase/config";
import router from "./router";
import "./index.css";

let app;

onAuthStateChanged(projectAuth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
