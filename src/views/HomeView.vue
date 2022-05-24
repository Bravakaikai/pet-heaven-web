<template>
  <div class="home">
    <h1 class="text-center">Welcome to Pet Heaven</h1>
    <h2 class="text-center">Let's feed a pet !</h2>
    <a-button
      class="mt-3"
      type="primary"
      size="large"
      block
      @click="$router.push({ name: 'login' })"
    >
      Start
    </a-button>
    <div class="mx-auto">
      <img
        class="pet mt-5"
        v-for="(item, index) in petList"
        :key="index"
        :src="item"
        alt="pet"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  setup() {
    const petList = [
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_07.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_06.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_05.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_04.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_03.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_02.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/omoro_alien_01.png",
      "https://dotown.maeda-design-room.net/wp-content/uploads/2022/01/thing_octopus_01.png",
    ];

    return {
      petList,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  img.pet {
    height: 50px;
  }
}
</style>
