<template>
  <div class="echat-attend">
    <!-- 图形统计 -->

    <div class="container" ref="container">
      <div class="none" v-if="ifShow">您没有执教任何课程……</div>
      <MyEcharts
        v-for="(item,index) in classes"
        :key="index"
        :x_data="item.times.length|xDataFilter"
        :theClass="item"
      ></MyEcharts>
      <div v-show="ifContinue">加载中</div>
      <div v-show="ifEnd">——已到底——</div>
    </div>
  </div>
</template>

<script>
import MyEcharts from "../components/MyEcharts";
export default {
  name: "echatAttend",
  data() {
    return {
      classes: new Array(), //该老师所有课程的总体考勤情况
      ifShow: false,
      classes1: {},
      ifContinue: true,
      ifEnd: false,
      curPage: 1,
      totalPages: -1,
      ifFrist: true,
      ifGetScroll: true //控制滚动时函数的执行频率
    };
  },
  computed: {
    container: function() {
      return this.$refs.container;
    }
  },
  methods: {
    //首屏的数据
    getDatasInit() {
      this.$http.get("/courseTotal/1.json").then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.totalPages = res.data.totalPages;
          this.classes = res.data.classes;
          if (this.classes.length == 0) {
            //当没有课程时，显示提示语
            this.ifContinue = false;
            this.ifShow = true;
            return;
          }
          this.getDatasFrist();
        }
      });
    },

    //当没有滚动条时，判断是否继续加载表格
    getDatasFrist() {
      //需要等到页面渲染完成，才能计算高度。
      this.$nextTick(function() {
        if (
          //判断第一次请求的界面是否已经出现了滚动条
          //如果出现了，则使用滚动方法
          this.container.scrollHeight > this.container.clientHeight
        ) {
          console.log("停止请求了");
          this.ifFrist == false;
          return;
        }

        //，如果没出现滚动条，则判断是否还有请求
        if (this.curPage < this.totalPages) {
          //如果还有请求，页面显示加载中……
          this.ifContinue = true;
          console.log("还有");
          //如果还有，则继续请求
          this.axiosRequest();
        }
      });
    },

    //发送axios请求获取数据
    axiosRequest() {
      this.$http.get(`/courseTotal/${++this.curPage}.json`).then(res => {
        console.log(this.curPage, "this.curPage");
        if (res.data.code == 200) {
          this.totalPages = res.data.totalPages;
          this.classes.push(...res.data.classes);
          if (this.curPage >= this.totalPages) {
            this.ifEnd = true;
            this.ifContinue = false;
          }
          //判断是不是首屏渲染
          if (this.ifFrist) {
            this.getDatasFrist();
          }
          console.log(this.classes, "this.classes");
        }
      });
    }
  },

  filters: {
    //返回图形的x轴长度
    xDataFilter: length => {
      return new Array(length).fill(0).map((v, i) => i + 1);
    }
  },
  components: {
    MyEcharts
  },
  created() {
    this.getDatasInit();
  },
  mounted() {
    this.container.style.height =
      document.documentElement.clientHeight - 150 + "px";
    window.onresize = () => {
      //动态改变包裹echart图形的容器长度
      this.container.style.height =
        document.documentElement.clientHeight - 150 + "px";
    };

    this.container.onscroll = () => {
      if (this.ifGetScroll == true) {
        //为了防止一直触发滚动函数，实行了控制执行频率
        this.ifGetScroll = false;
        setTimeout(() => {
          this.ifGetScroll = true;
        }, 400);

        //再用一个定时器，设置和限流函数一样的时间，
        //这样才可以保证，计算滚动高度是在滚到最后的时候计算的。
        setTimeout(() => {
          if (
            this.container.scrollHeight <=
            this.container.scrollTop + this.container.clientHeight + 100
          ) {
            console.log("到底了");
            if (this.curPage < this.totalPages) {
              this.axiosRequest();
            }
          }
        }, 400);
      }
    };
  }
};
</script>

<style stope>
.container {
  width: 100%;
  height: 0;
  overflow: auto;
  padding-top: 10px;
}
</style>
