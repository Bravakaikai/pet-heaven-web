<template>
  <div class="shop">
    <h2 class="text-center mb-4">Shop</h2>
    <!-- Product -->
    <div class="container">
      <div class="row">
        <div class="col-3" v-for="item in equipmentList" :key="item.id">
          <div class="card">
            <img :src="item.imgUrl" class="card-img-top" :alt="item.name" />
            <hr />
            <div class="card-body">
              <h5 class="card-title fw-bold text-center">{{ item.name }}</h5>
              <p class="card-text mb-0 text-center">{{ item.description }}</p>
              <p class="price text-primary">$ {{ item.price }}</p>
              <a-button type="primary" block @click="buy(item)">
                <template #icon>
                  <ShoppingCartOutlined />
                </template>
                Buy
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <Modal ref="modal" option="Buy" />
  </div>
</template>

<script>
import { ref, inject, onMounted, toRefs } from "vue";
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
import Modal from "@/components/_BuySellModal.vue";
export default {
  name: "ShopView",
  components: {
    ShoppingCartOutlined,
    Modal,
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { equipment, getShop } = store.equipment;

    onMounted(async () => {
      const result = await getShop();
      if (result === "login") router.replace({ name: "login" });
    });

    const modal = ref();

    const buy = (val) => {
      modal.value.showModal(val);
    };

    return {
      ...toRefs(equipment),
      modal,
      buy,
    };
  },
};
</script>

<style lang="scss" scoped>
.shop {
  margin: 30px 0;
  min-width: 50%;
  .card {
    margin-bottom: 16px;
    img {
      margin: 20px auto 0 auto;
      max-width: 100px;
      height: 100px;
    }
    .card-text {
      overflow-y: hidden;
      height: 30px;
    }
    .price {
      text-align: right;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
