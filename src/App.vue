<template>
  <div id="app">
    <!-- <router-link to="/">Index</router-link> -->
    <!-- <router-link to="/">Home</router-link> -->

    <app-header />

    <div class="main-wrap">
      <div class="nav-side-wrap">
        <NavSide />
      </div>
      <div class="main-container">
        <div class="container2">
          <div class="nav">
            <curNav>{{navText}}</curNav>
          </div>
          <div class="content">
            <keep-alive>
              <router-view />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import NavSide from "./components/NavSide";
import curNav from "./components/curNav";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    "app-header": Header,
    NavSide,
    curNav
  },
  methods: {
    getNavName(path) {
      if (path.search("table-attend") != -1) {
        return "列表统计";
      }
      if (path.search("echat-attend") != -1) {
        return "图形统计";
      }
      if (path.search("apply-disposed") != -1) {
        return "已处理";
      }
      if (path.search("apply-undispose") != -1) {
        return "未处理";
      }
    }
  },
  computed: {
    navText: function() {
      //将当前导航的名字存储在state里，
      //当刷新界面时，则state的数据会恢复成原始的数据
      //这时就需要手动获取路径做判断了
      return this.$store.state.curNav || this.getNavName(window.location.pathname);
    }
  },

};
</script>

<style>
.main-wrap {
  position: relative;
  display: flex;
  width: 100%;
}
.main-wrap .nav-side-wrap {
  padding-top: 15px;
  width: 220px;
}
.main-wrap .main-container {
  position: relative;
  flex: 1 1 auto;
}
/* 解决element-ul 的table组件 因为放置在 flex上 width一直增加的Bug
  设置父容器 为relative
  再加一层子元素包裹内容，position:absolute; width:100%;继承父级宽度
*/
.main-wrap .container2 {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
}

.main-wrap .main-container .content {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
}
.main-wrap .main-container .nav {
  margin-top: 15px;
}
</style>
