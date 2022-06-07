<template>
  <div class="bag">
    <div class="content">
      <img class="pet" :src="getImgUrl(userInfo.pet)" :alt="userInfo.pet" />
      <hr class="mb-4" />
      <h2 class="text-center mb-4">My Bag</h2>
      <p v-if="!bagList.length" class="text-center">Your bag is empty</p>
      <div v-else class="container">
        <div class="row gy-4">
          <div class="col-3" v-for="item in bagList" :key="item.id">
            <div class="p-3 itemBlock">
              <img :src="item.imgUrl" :alt="item.name" />
              <p class="mb-0">{{ item.name }} x {{ item.amount }}</p>
              <a-button
                type="primary"
                class="mt-2"
                :loading="eatLoading"
                @click="eatHandler(item)"
              >
                Eat
              </a-button>
              <a-button type="ghost" @click="sellHandler(item)">Sell</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Modal ref="modal" option="Sell" />
  </div>
</template>

<script>
import { ref, inject, onMounted, toRefs } from "vue";
import { notification } from "ant-design-vue";
import Modal from "@/components/_BuySellModal.vue";
export default {
  name: "BagView",
  components: {
    Modal,
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user, getById } = store.user;
    const { equipment, getBag, eat } = store.equipment;
    const eatLoading = ref(false);
    const modal = ref();

    onMounted(async () => {
      if (!user.userInfo.pet) {
        const result = getById();
        if (result?.status === "not found") router.replace({ name: "login" });
      }

      const result = await getBag();
      if (result === "login") router.replace({ name: "login" });
    });
    const getImgUrl = (val) => {
      return user.petList.find((item) => item.name === val)?.imgUrl || "";
    };

    const eatHandler = async (val) => {
      eatLoading.value = true;
      const result = await eat({
        userId: user.userInfo.id,
        equipmentId: val.id,
      });

      if (result.status === "success") {
        getBag();
        notification.success({
          message: "Mmm...Yummy!",
          placement: "bottomRight ",
        });
      } else {
        notification.error({
          message: "數量不足",
          placement: "bottomRight ",
        });
      }
      eatLoading.value = false;
    };

    const sellHandler = (val) => {
      modal.value.showModal(val);
    };

    return {
      ...toRefs(user),
      ...toRefs(equipment),
      getImgUrl,
      eatLoading,
      eatHandler,
      modal,
      sellHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.bag {
  margin: 30px 0;
  padding: 30px;
  width: 50%;
  background-color: white;
  .content {
    img.pet {
      display: block;
      margin: 0 auto;
      width: 30%;
    }
    .itemBlock {
      border-radius: 15px;
      box-shadow: 3px 3px 5px 6px #cccccc;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
