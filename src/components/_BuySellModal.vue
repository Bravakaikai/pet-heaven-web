<template>
  <a-modal
    v-model:visible="visible"
    class="buySellModal"
    :title="equipment.name"
    :confirm-loading="confirmLoading"
    :ok-text="option"
    @ok="buySellHandler"
    @cancel="cancel"
  >
    <img :src="equipment.imgUrl" :alt="equipment.name" />
    <hr />
    <p class="text-end">
      <i class="fa-solid fa-wallet text-primary"></i> ${{ userInfo.wallet }}
    </p>
    <a-form
      ref="formRef"
      :model="form"
      name="buySell"
      autocomplete="off"
      layout="vertical"
      :rules="rules"
    >
      <a-form-item label="數量" name="amount">
        <a-input
          v-model:value="form.amount"
          placeholder="Please input amount..."
          type="number"
          min="1"
          max="1000"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <p>小計 ${{ form.amount * equipment.price }}</p>
  </a-modal>
</template>

<script>
import { ref, reactive, inject, toRefs, onMounted } from "vue";
import { notification } from "ant-design-vue";
export default {
  name: "BuySellModal",
  props: {
    option: String,
  },
  setup(props) {
    const store = inject("store");
    const router = inject("router");
    const { user, getById } = store.user;
    const { buy, sell, getBag } = store.equipment;

    const visible = ref(false);
    const confirmLoading = ref(false);
    let errorMsg = reactive({ data: null, msg: null });

    const equipment = reactive({});
    const formRef = ref();
    const form = reactive({
      amount: 1,
    });

    const rules = {
      amount: [
        {
          type: "number",
          required: true,
          max: 4,
          validator: async (_rule, value) => {
            if (value) {
              if (parseInt(value) > 1000) {
                return Promise.reject(
                  new Error("Amount can't greater than 1000")
                );
              }
              if (errorMsg.data === form.amount) {
                return Promise.reject(new Error(errorMsg.msg));
              }
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("Please input amount"));
            }
          },
          trigger: "change",
        },
      ],
    };

    onMounted(async () => {
      if (!user.userInfo.wallet) {
        const result = await getById();
        if (result?.status === "not found") router.replace({ name: "login" });
      }
    });

    const showModal = (val) => {
      Object.assign(equipment, val);
      form.amount = 1;
      visible.value = true;
    };

    const buySellHandler = () => {
      formRef?.value.validate().then(async () => {
        confirmLoading.value = true;

        const payload = {
          id: {
            userId: user.userInfo.id,
            equipmentId: equipment.id,
          },
          amount: form.amount,
        };

        let result;
        if (props.option === "Buy") result = await buy(payload);
        if (props.option === "Sell") result = await sell(payload);

        if (result === "login") router.replace({ name: "login" });
        else if (result?.status === "success") {
          await getById();
          if (props.option === "Sell") await getBag();

          cancel();
          notification.success({
            message: "Purchase was successful",
            placement: "bottomRight ",
          });
        } else {
          if (props.option === "Buy") {
            errorMsg.data = form.amount;
            errorMsg.msg = "餘額不足";
            formRef?.value.validate();
          }
        }

        confirmLoading.value = false;
      });
    };

    const cancel = () => {
      visible.value = false;
      formRef.value.resetFields();
      errorMsg.data = null;
      errorMsg.msg = null;
      confirmLoading.value = false;
    };

    return {
      ...toRefs(user),
      equipment,
      visible,
      confirmLoading,
      formRef,
      form,
      rules,
      showModal,
      buySellHandler,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.buySellModal {
  img {
    display: block;
    margin: 0 auto;
    width: 50%;
  }
}
</style>
