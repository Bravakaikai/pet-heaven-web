<template>
  <div class="login form">
    <h2 class="text-center mb-3">Login</h2>
    <a-form
      ref="formRef"
      :model="form"
      name="login"
      autocomplete="off"
      layout="vertical"
      @finish="submit"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email' }]"
      >
        <a-input
          v-model:value="form.email"
          placeholder="Please input your email..."
          autocomplete="email"
          allow-clear
        />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password' }]"
      >
        <a-input-password
          v-model:value="form.password"
          placeholder="Please input your password..."
          autocomplete="current-password"
          allow-clear
        />
      </a-form-item>
      <p v-show="showErr" class="text-danger">Incorrect email or password</p>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="mt-4"
          size="large"
          block
        >
          Login
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { ref, reactive, inject } from "vue";
export default {
  name: "LoginView",
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userId")) {
      next({ name: "profile" });
    } else next();
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user, login } = store.user;

    const formRef = ref();
    const form = reactive({
      email: null,
      password: null,
    });

    let showErr = ref(false);

    const submit = () => {
      formRef?.value.validate().then(async () => {
        const result = await login(form);
        if (result?.status === "success") {
          user.userInfo.id = result.message;
          user.userInfo.email = form.email;
          user.isLogin = true;
          router.replace({ name: "profile" });
        } else if (result.status === "not found") {
          router.push({ name: "signup", params: { email: form.email } });
        } else {
          showErr.value = true;
        }
      });
    };

    return {
      formRef,
      form,
      submit,
      showErr,
    };
  },
};
</script>
