<template>
  <div class="profile form">
    <h2 class="text-center mb-3">Profile</h2>
    <a-button
      type="primary"
      class="mb-4 mx-auto d-block"
      @click="$router.push({ path: '/editProfile' })"
    >
      <template #icon>
        <EditFilled />
      </template>
      Edit
    </a-button>

    <a-row>
      <a-col :span="24">
        <a-row>
          <a-col :span="12" class="title">Username</a-col>
          <a-col :span="12">{{ userInfo.name }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-row>
          <a-col :span="12" class="title">Email</a-col>
          <a-col :span="12">{{ userInfo.email }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-row>
          <a-col :span="12" class="title">Wallet</a-col>
          <a-col :span="12">$ {{ userInfo.wallet }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="24">
        <a-row>
          <a-col :span="12" class="title">Pet</a-col>
          <a-col :span="12">{{ userInfo.pet }}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <img
      class="d-block mt-3 mx-auto"
      :src="getImgUrl(userInfo.pet)"
      :alt="userInfo.pet"
    />
  </div>
</template>

<script>
import { inject, onMounted, toRefs } from "vue";
import { EditFilled } from "@ant-design/icons-vue";
export default {
  name: "ProfileView",
  beforeRouteEnter(to, from, next) {
    if (!sessionStorage.getItem("userId")) {
      next({ name: "login" });
    } else next();
  },
  components: {
    EditFilled,
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user, getById } = store.user;

    onMounted(async () => {
      const result = await getById();
      if (result?.status === "not found") router.replace({ name: "login" });
    });

    const getImgUrl = (val) => {
      return user.petList.find((item) => item.name === val)?.imgUrl || "";
    };

    return {
      ...toRefs(user),
      getImgUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .ant-col .ant-row {
    .title {
      font-weight: bold;
    }
  }
  .ant-col .ant-row {
    padding: 12px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
  .ant-col + .ant-col .ant-row {
    border-top: none;
  }
  img {
    width: 100px;
  }
}
</style>
