import { reactive } from "vue";
import axios from "axios";

const state = reactive({
  isLogin: !!sessionStorage.getItem("userId"),
  isAdmin: false,
  userInfo: {
    id: sessionStorage.getItem("userId"),
    name: "",
    email: "",
    wallet: "",
    pet: "",
  },
  petList: [
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_bear_01.png",
      name: "Bear",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_cats_12.png",
      name: "Cat",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_chick_01.png",
      name: "Chick",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/02/omoro_poop_dog_02.png",
      name: "Dog",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_mammoth_02.png",
      name: "Mammoth",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_mouse_01.png",
      name: "Mouse",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_panda_01.png",
      name: "Panda",
    },
    {
      imgUrl:
        "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_pig_01.png",
      name: "Pig",
    },
  ],
});

const getAll = () => {
  return axios.get("/user").then((res) => {
    return res.data;
  });
};

const getById = () => {
  state.userInfo.id = sessionStorage.getItem("userId");
  if (!state.userInfo.id) return "not found";
  checkRoleValid();
  return axios.get(`/user/${state.userInfo.id}`).then((res) => {
    Object.assign(state.userInfo, res.data.message);
    return res.data;
  });
};

const login = (payload) => {
  return axios.post("/login", payload).then((res) => {
    sessionStorage.setItem("userId", res.data.message);
    return res.data;
  });
};

const signup = (payload) => {
  return axios.post("/signup", payload).then((res) => {
    return res.data;
  });
};

const editInfo = (payload) => {
  return axios.put("/editInfo", payload).then((res) => {
    return res.data;
  });
};

const checkRoleValid = async () => {
  return axios.get(`/checkRoleValid/${state.userInfo.id}`).then((res) => {
    state.isAdmin = res.data.message;
    return res.data.message;
  });
};

export default {
  user: state,
  getAll,
  getById,
  login,
  signup,
  editInfo,
  checkRoleValid,
};
