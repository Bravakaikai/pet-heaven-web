<template>
  <div class="equipment">
    <h2 class="text-center mb-3">Equipment List</h2>
    <a-button
      class="mb-3 mx-auto d-block"
      type="primary"
      @click="openModal('create')"
    >
      + Create Equipment
    </a-button>
    <a-table :columns="columns" :data-source="dataList">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'operation'">
          <a-button shape="circle" @click="openModal('edit', text)">
            <template #icon>
              <EditFilled />
            </template>
          </a-button>
          <a-button shape="circle" @click="openModal('delete', text)">
            <template #icon>
              <DeleteFilled />
            </template>
          </a-button>
        </template>
        <template v-if="column.dataIndex === 'imgUrl'">
          <img :src="text" alt="equipment" />
        </template>
        <template v-if="column.dataIndex === 'createdDate'">
          {{ dateParser(text) }}
        </template>
        <template v-if="column.dataIndex === 'updatedDate'">
          {{ dateParser(text) }}
        </template>
      </template>
    </a-table>
    <!-- Modal -->
    <EquipmentModal ref="equipmentModal" @refresh="refresh" />
  </div>
</template>

<script>
import { ref, inject, computed, onMounted, createVNode } from "vue";
import {
  EditFilled,
  DeleteFilled,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import EquipmentModal from "@/components/_EquipmentModal.vue";
import { Modal, notification } from "ant-design-vue";

export default {
  name: "EquipmentView",
  components: {
    EditFilled,
    DeleteFilled,
    EquipmentModal,
  },
  setup() {
    const store = inject("store");
    const router = inject("router");
    const { user } = store.user;
    const { getAll, deleteEquipment } = store.equipment;
    const equipmentList = ref([]);
    const confirmLoading = ref(false);

    onMounted(async () => {
      if (!user.isAdmin) router.replace({ name: "profile" });
      await refresh();
    });

    const dataList = computed(() => {
      if (!equipmentList.value?.length) return [];
      return equipmentList.value.map((item) => ({ ...item, key: item.id }));
    });

    const columns = [
      { title: "Actions", key: "operation", align: "center" },
      {
        title: "Image",
        dataIndex: "imgUrl",
        align: "center",
      },
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
        title: "Description",
        dataIndex: "description",
        sorter: {
          compare: (a, b) => a.description.length - b.description.length,
        },
        align: "center",
      },
      {
        title: "Price",
        dataIndex: "price",
        sorter: { compare: (a, b) => a.price - b.price },
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

    const refresh = async () => {
      const result = await getAll();
      equipmentList.value = result.message;
    };

    const equipmentModal = ref();
    const openModal = (option, val) => {
      if (option === "delete") {
        Modal.confirm({
          title: `Do you want to delete "${val.name}" ?`,
          icon: createVNode(DeleteOutlined),
          confirmLoading: confirmLoading,
          okText: "Delete",
          onOk: async () => {
            confirmLoading.value = true;
            const result = await deleteEquipment(val.id);
            if (result?.status === "success") {
              refresh();
              notification.success({
                message: "Deleted successfully",
                placement: "bottomRight ",
              });
            } else {
              notification.error({
                message: "Error to delete",
                placement: "bottomRight ",
              });
            }
            confirmLoading.value = false;
          },
        });
      } else equipmentModal.value.showModal(val);
    };

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
      refresh,
      equipmentModal,
      openModal,
      dateParser,
    };
  },
};
</script>

<style lang="scss" scoped>
.equipment {
  padding: 30px 0;
  img {
    width: 30px;
  }
}
</style>
