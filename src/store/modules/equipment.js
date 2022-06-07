import { reactive } from "vue";
import userState from "@/store/modules/user";
import axios from "@/axios-base";

const state = reactive({
  equipmentList: [],
  bagList: [],
});

const getShop = () => {
  if (!userState.user.isLogin) return "login";
  return axios.get("equipment/shop").then((res) => {
    Object.assign(state.equipmentList, res.data.message);
    return res.data;
  });
};

const getBag = () => {
  if (!userState.user.isLogin) return "login";
  return axios
    .get(`userEquipment/${userState.user.userInfo.id}`)
    .then((res) => {
      state.bagList = res.data.message;
      return res.data;
    });
};

const buy = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("userEquipment/buy", payload).then((res) => {
    return res.data;
  });
};

const eat = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("userEquipment/eat", payload).then((res) => {
    return res.data;
  });
};

const sell = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("userEquipment/sell", payload).then((res) => {
    return res.data;
  });
};

// admin
const getAll = () => {
  return axios
    .get(`equipment/admin/${userState.user.userInfo.id}`)
    .then((res) => {
      Object.assign(state.equipmentList, res.data.message);
      return res.data;
    });
};
const create = (payload) => {
  return axios.post("equipment/admin/create", payload).then((res) => {
    return res.data;
  });
};
const edit = (payload) => {
  return axios
    .put(`equipment/admin/edit/${payload.id}`, payload)
    .then((res) => {
      return res.data;
    });
};
const deleteEquipment = (id) => {
  return axios
    .delete(`equipment/admin/delete/${userState.user.userInfo.id}/${id}`)
    .then((res) => {
      return res.data;
    });
};

export default {
  equipment: state,
  getShop,
  getBag,
  buy,
  eat,
  sell,
  getAll,
  create,
  edit,
  deleteEquipment,
};
