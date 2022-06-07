<template>
  <a-modal
    v-model:visible="visible"
    class="equipmentModal"
    :title="form.id ? `Edit equipment Id ${form.id}` : 'Create an equipment'"
    :confirm-loading="confirmLoading"
    ok-text="Save"
    @ok="equipmentHandler"
    @cancel="cancel"
  >
    <img
      v-show="form.imgUrl"
      :src="form.imgUrl"
      :alt="form.name"
      @error="errorImage"
    />
    <hr v-show="form.imgUrl" />
    <a-form
      ref="formRef"
      :model="form"
      name="buySell"
      autocomplete="off"
      layout="vertical"
      :rules="rules"
    >
      <a-form-item label="Name" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="Please input the name..."
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Description" name="description">
        <a-input
          v-model:value="form.description"
          placeholder="Please input the description..."
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Price" name="price">
        <a-input
          v-model:value="form.price"
          placeholder="Please input the price..."
          type="number"
          min="1"
          max="1000"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Image Url" name="imgUrl">
        <a-input
          v-model:value="form.imgUrl"
          placeholder="Please input the image url..."
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, reactive, inject } from "vue";
import { notification } from "ant-design-vue";

export default {
  name: "EquipmentModal",
  setup(props, { emit }) {
    const store = inject("store");
    const { user } = store.user;
    const { create, edit } = store.equipment;

    const errorImage = (e) => {
      e.target.src =
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_02.png";
    };

    const visible = ref(false);
    const confirmLoading = ref(false);

    const formRef = ref();
    const form = reactive({
      id: null,
      name: "",
      description: "",
      price: 1,
      imgUrl: "",
    });

    const rules = {
      name: [
        {
          required: true,
          validator: async (_rule, value) => {
            if (value) {
              if (errorMsg.name.data === form.name) {
                return Promise.reject(new Error(errorMsg.name.msg));
              }
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("Please input the name"));
            }
          },
          trigger: "change",
        },
      ],
      description: [
        {
          required: true,
          message: "Please input the description",
          trigger: "change",
          max: 1000,
        },
      ],
      price: [
        {
          type: "number",
          required: true,
          max: 4,
          validator: async (_rule, value) => {
            if (value) {
              if (parseInt(value) > 1000) {
                return Promise.reject(
                  new Error("Price can't greater than 1000")
                );
              }
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("Please input the price"));
            }
          },
          trigger: "change",
        },
      ],
      imgUrl: [
        {
          required: true,
          message: "Please input the image Url",
          trigger: "change",
        },
      ],
    };

    const showModal = (val) => {
      if (val) Object.assign(form, val);
      else {
        Object.assign(form, {
          id: null,
          name: "",
          description: "",
          price: 1,
          imgUrl: "",
        });
      }
      visible.value = true;
    };

    let errorMsg = reactive({
      name: { data: null, msg: null },
    });
    const equipmentHandler = () => {
      formRef?.value
        .validate()
        .then(async () => {
          confirmLoading.value = true;

          const payload = {
            ...form,
            userId: user.userInfo.id,
          };

          let result;
          let option = "Created";
          if (form.id) {
            option = "Edited";
            result = await edit(payload);
          } else result = await create(payload);

          if (result?.status === "success") {
            emit("refresh");
            cancel();
            notification.success({
              message: `${option} successfully`,
              placement: "bottomRight ",
            });
          } else {
            Object.keys(result.message).forEach((key) => {
              errorMsg[key].data = form[key];
              errorMsg[key].msg = result.message[key];
            });
            formRef?.value.validate();
          }

          confirmLoading.value = false;
        })
        .catch(() => {});
    };

    const cancel = () => {
      visible.value = false;
      formRef.value.resetFields();
      confirmLoading.value = false;
    };

    return {
      rules,
      errorImage,
      visible,
      confirmLoading,
      formRef,
      form,
      showModal,
      equipmentHandler,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
.equipmentModal {
  img {
    display: block;
    margin: 0 auto;
    width: 50%;
  }
}
</style>
