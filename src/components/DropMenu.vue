<template>
  <div class="drop-menu">
    <div class="title" @click="ifShow=!ifShow">
      <span>账户</span>
      <i class="fa fa-angle-down"></i>
    </div>
    <transition name="fade">
      <ul v-show="ifShow">
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dropMenu",
  data() {
    return {
      list: ["切换账号", "退出"],
      ifShow: false
    };
  }
};
</script>

<style stope>
.drop-menu {
  position: relative;
  color: aliceblue;
  cursor: pointer;
  font-size: 12px;
}
.drop-menu .title span {
    padding: 0 10px;
}
.drop-menu ul {
  position: absolute;
  top: 100%;
  background-color: #fff;
  z-index: 999;
  padding: 0 10px;
  top: 48px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
}
.drop-menu ul li{
    height: 38px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
