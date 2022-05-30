const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Pet Heaven",
    },
  },
  devServer: {
    host: "localhost",
    port: 8080,
    open: false, // 自動啟動瀏覽器
    proxy: {
      "/api/": {
        target: "http://localhost:8090/api", // 設置調用的接口域名接和端口
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/api/": "", // 重寫路徑
        },
      },
    },
  },
});
