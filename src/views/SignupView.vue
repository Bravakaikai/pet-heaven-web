<template>
  <div class="signup form">
    <h2 class="text-center mb-3">
      {{ isEdited ? "Edit Profile" : "Sign Up" }}
    </h2>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      name="signup"
      autocomplete="off"
      layout="vertical"
      @finish="submit"
    >
      <a-form-item label="Username" name="name">
        <a-input
          v-model:value="form.name"
          placeholder="Please input your name..."
          autocomplete="username"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Email" name="email" trigger="change">
        <a-input
          v-model:value="form.email"
          placeholder="Please input your email..."
          autocomplete="email"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Password" name="password">
        <a-input-password
          v-model:value="form.password"
          placeholder="Please input your password..."
          autocomplete="new-password"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Confirm Password" name="confirmPassword">
        <a-input-password
          v-model:value="form.confirmPassword"
          placeholder="Please confirm your password..."
          autocomplete="new-password"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="Pet" name="pet">
        <a-radio-group v-model:value="form.pet">
          <a-radio-button
            v-for="item in petList"
            :key="item.name"
            :value="item.name"
          >
            <img class="pet" :src="item.imgUrl" :alt="item.name" />
            <p class="text-center mb-0">{{ item.name }}</p>
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="mt-4"
          size="large"
          block
        >
          {{ isEdited ? "Edit" : "Sign Up" }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { ref, reactive, inject, onMounted } from "vue";
import { notification } from "ant-design-vue";
export default {
  name: "SignupView",
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userId") && to.path === "/signup") {
      next({ name: "profile" });
    } else next();
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user, signup, editInfo, getById } = store.user;
    const params = router.currentRoute.value.params;
    const isEdited = router.currentRoute.value.path === "/editProfile";

    const formRef = ref();
    const form = reactive({
      name: "",
      email: params?.email,
      password: "",
      confirmPassword: "",
      pet: "",
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
              return Promise.reject(new Error("Please input your username"));
            }
          },
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          validator: async (_rule, value) => {
            if (value) {
              if (
                !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)
              ) {
                return Promise.reject(
                  new Error("Please input valid email address")
                );
              }

              if (errorMsg.email.data === form.email) {
                return Promise.reject(new Error(errorMsg.email.msg));
              }
              return Promise.resolve();
            } else {
              return Promise.reject(new Error("Please input your email"));
            }
          },
          trigger: "change",
        },
      ],
      password: [
        {
          required: !isEdited,
          validator: async (_rule, value) => {
            if (value) {
              if (value.length < 6 || value.length > 12) {
                return Promise.reject(
                  new Error("Password must have at least 6 characters")
                );
              }
              return Promise.resolve();
            } else {
              if (isEdited) return Promise.resolve();
              else
                return Promise.reject(new Error("Please input your password"));
            }
          },
          trigger: "change",
        },
      ],
      confirmPassword: [
        {
          required: !isEdited,
          validator: async (_rule, value) => {
            if (value) {
              if (form.password !== value) {
                return Promise.reject(
                  new Error("Please make sure your passwords match")
                );
              }
              return Promise.resolve();
            } else {
              if (isEdited) return Promise.resolve();
              else
                return Promise.reject(
                  new Error("Please confirm your password")
                );
            }
          },
          trigger: "change",
        },
      ],
      pet: [
        {
          required: true,
          message: "Please pick a pet",
          trigger: "change",
        },
      ],
    };

    onMounted(async () => {
      if (isEdited) {
        if (!user.userInfo.name) {
          const result = await getById();
          if (result?.status === "not found") router.replace({ name: "login" });
        }
        Object.assign(form, user.userInfo);
      }
    });

    let errorMsg = reactive({
      name: { data: null, msg: null },
      email: { data: null, msg: null },
    });

    const submit = () => {
      formRef?.value.validate().then(async () => {
        let payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          pet: form.pet,
        };

        let result;
        if (isEdited) {
          result = await editInfo({
            id: user.userInfo.id,
            ...payload,
          });
        } else {
          result = await signup(payload);
        }

        if (result?.status === "success") {
          Object.assign(user.userInfo, {
            id: result.message,
            email: form.email,
            pet: form.pet,
          });
          user.isLogin = true;
          if (!isEdited) sessionStorage.setItem("userId", result.message);
          else {
            notification.success({
              message: "Edited successfully",
              placement: "bottomRight ",
            });
          }
          router.replace({ name: "profile" });
        } else {
          Object.keys(result.message).forEach((key) => {
            errorMsg[key].data = form[key];
            errorMsg[key].msg = result.message[key];
          });
          formRef?.value.validate();
        }
      });
    };

    return {
      isEdited,
      petList: user.petList,
      formRef,
      form,
      rules,
      submit,
    };
  },
};
</script>

<style lang="scss">
.signup {
  .ant-radio-button-wrapper {
    width: 100px;
    height: 100px;
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  img.pet {
    width: 50px;
    height: 50px;
  }
}
</style>
