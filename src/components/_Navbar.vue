<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img
          src="https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_02.png"
          alt="Pet Heaven"
          width="30"
          height="24"
          class="d-inline-block align-text-top mr-1"
        />
        <h1 class="d-inline-block fs-5 fw-bold ms-2 mb-0">Pet Heaven</h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="!isLogin" class="nav-item">
            <router-link
              :class="`nav-link ${currentPath === '/login' ? 'active' : ''}`"
              :to="{ name: 'login' }"
            >
              Login
            </router-link>
          </li>
          <li v-if="!isLogin" class="nav-item">
            <router-link
              :class="`nav-link ${currentPath === '/signup' ? 'active' : ''}`"
              :to="{ name: 'signup' }"
            >
              Sign up
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link
              :class="`nav-link ${currentPath === '/profile' ? 'active' : ''}`"
              :to="{ name: 'profile' }"
            >
              Profile
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link
              :class="`nav-link ${currentPath === '/shop' ? 'active' : ''}`"
              :to="{ name: 'shop' }"
            >
              Shop
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <router-link
              :class="`nav-link ${currentPath === '/bag' ? 'active' : ''}`"
              :to="{ name: 'bag' }"
            >
              Bag
            </router-link>
          </li>
          <li v-if="isLogin && isAdmin" class="nav-item">
            <router-link
              :class="`nav-link text-danger ${
                currentPath === '/admin/user' ? 'active' : ''
              }`"
              :to="{ name: 'userList' }"
            >
              User
            </router-link>
          </li>
          <li v-if="isLogin && isAdmin" class="nav-item">
            <router-link
              :class="`nav-link text-danger ${
                currentPath === '/admin/equipment' ? 'active' : ''
              }`"
              :to="{ name: 'equipmentList' }"
            >
              Equipment
            </router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, inject } from "vue";
export default {
  name: "_Navbar",
  setup() {
    const router = inject("router");
    const store = inject("store");
    const { user } = store.user;

    const currentPath = computed(() => {
      return router.currentRoute.value.path;
    });

    const isLogin = computed(() => {
      return user.isLogin;
    });

    const isAdmin = computed(() => {
      return user.isAdmin;
    });

    const logout = () => {
      user.isLogin = false;
      sessionStorage.removeItem("userId");
      router.replace({ name: "home" });
    };

    return {
      currentPath,
      isLogin,
      isAdmin,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-item a {
  font-weight: bold;
}
</style>
