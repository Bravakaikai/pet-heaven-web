import { reactive } from "vue";
import userState from "@/store/modules/user";
import axios from "@/axios-base";

const state = reactive({
  equipmentList: [],
  bagList: [],
});

const getShop = () => {
  if (!userState.user.isLogin) return "login";
  return axios.get("shop").then((res) => {
    Object.assign(state.equipmentList, res.data.message);
    return res.data;
  });
};

const getBag = () => {
  if (!userState.user.isLogin) return "login";

  return axios.get(`bag/${userState.user.userInfo.id}`).then((res) => {
    state.bagList = res.data.message;
    return res.data;
  });
};

const buy = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("buy", payload).then((res) => {
    return res.data;
  });
};

const eat = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("eat", payload).then((res) => {
    return res.data;
  });
};

const sell = (payload) => {
  if (!userState.user.isLogin) return "login";
  return axios.post("sell", payload).then((res) => {
    return res.data;
  });
};

// admin
const getAll = () => {
  return axios.get("shop/equipment").then((res) => {
    Object.assign(state.equipmentList, res.data.message);
    return res.data;
  });
};
const create = (payload) => {
  return axios.post("shop/create", payload).then((res) => {
    return res.data;
  });
};
const edit = (payload) => {
  return axios.put("shop/edit", payload).then((res) => {
    return res.data;
  });
};
const deleteEquipment = (id) => {
  return axios.delete(`shop/delete/${id}`).then((res) => {
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
