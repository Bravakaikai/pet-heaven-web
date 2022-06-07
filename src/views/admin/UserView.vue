<template>
  <div class="user">
    <h2 class="text-center mb-3">User List</h2>
    <a-table :columns="columns" :data-source="dataList">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'password'">
          {{ decrypt(text) }}
        </template>
        <template v-if="column.dataIndex === 'createdDate'">
          {{ dateParser(text) }}
        </template>
        <template v-if="column.dataIndex === 'updatedDate'">
          {{ dateParser(text) }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { ref, inject, computed, onMounted } from "vue";
import { decrypt } from "@/util/secret";
export default {
  name: "UserView",
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user, getAll } = store.user;
    const userList = ref([]);

    onMounted(async () => {
      if (!user.isAdmin) router.replace({ name: "profile" });
      const result = await getAll();
      userList.value = result.message;
    });

    const dataList = computed(() => {
      if (!userList.value.length) return [];
      return userList.value.map((item) => ({ ...item, key: item.id }));
    });

    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        sorter: { compare: (a, b) => a.id - b.id },
        align: "center",
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: { compare: (a, b) => a.name.length - b.name.length },
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "email",
        sorter: { compare: (a, b) => a.email.length - b.email.length },
        align: "center",
      },
      {
        title: "Password",
        dataIndex: "password",
        sorter: { compare: (a, b) => a.password.length - b.password.length },
        align: "center",
      },
      {
        title: "Role",
        dataIndex: "role",
        sorter: { compare: (a, b) => a.role.length - b.role.length },
        align: "center",
      },
      {
        title: "Wallet",
        dataIndex: "wallet",
        sorter: { compare: (a, b) => a.wallet - b.wallet },
        align: "center",
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        sorter: {
          compare: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
        },
        align: "center",
      },
      {
        title: "Updated Date",
        dataIndex: "updatedDate",
        sorter: {
          compare: (a, b) => new Date(a.updatedDate) - new Date(b.updatedDate),
        },
        align: "center",
      },
    ];

    const dateParser = (val) => {
      const options = {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Taipei",
        hourCycle: "h23",
      };
      return val ? new Date(val).toLocaleString("zh-TW", options) : "null";
    };

    return {
      columns,
      dataList,
      decrypt,
      dateParser,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 30px 0;
}
</style>
