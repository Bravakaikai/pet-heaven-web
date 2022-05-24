<template>
  <Navbar />
  <div class="view">
    <router-view />
  </div>
</template>

<script>
import { provide } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import Navbar from "@/components/_Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    provide("store", store);
    provide("router", router);
  },
};
</script>

<style lang="scss" scoped>
.view {
  padding-top: 56px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
}
.form {
  margin: 30px 0;
  background-color: white;
  padding: 50px;
  width: 500px;
}
</style>
