<template>
  <div class="table-attend">
    <div class="if-empty" v-if="ifEmpty">您暂时无教学班……</div>
    <div class="main-container" v-else>
      <div class="linkage">
        <SecondLinkage :course="course" @getSelectDatas="getSelectDatas" />
      </div>
      <el-table
        :data="curTableData"
        style="width:100%"
        stripe
        size="small"
        border
        header-row-class-name="et-table-header"
        height="450px"
      >
        <el-table-column type="expand" align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="学号" prop="s_id" align="center"></el-table-column>
        <el-table-column label="姓名" prop="s_name" align="center"></el-table-column>
        <el-table-column label="正常" prop="normal" align="center"></el-table-column>
        <el-table-column label="迟到" prop="late" align="center"></el-table-column>
        <el-table-column label="旷课" prop="truant" align="center"></el-table-column>
        <el-table-column label="请假" prop="leave" align="center"></el-table-column>
        <el-table-column label="考勤分" prop="score" align="center"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
          :current-page="curPage"
          ref="pagination"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SecondLinkage from "../components/SecondLinkage";
import Mock from "mockjs";
const PAGESIZE = 10;
export default {
  name: "tableAttend",
  components: {
    SecondLinkage
  },
  data() {
    return {
      tableData: [],
      curTableData: [],
      pager: 1,
      pagerEndLen: -1,
      course: [],
      curPage: 1,
      ifEmpty: false
    };
  },
  methods: {
    // 当前页数对应的对容
    currentChange(val) {
      //当前页数
      const fristIndex = PAGESIZE * (val - 1);
      if (val == this.pager) {
        //如果是最后一页
        this.curTableData = this.tableData.slice(fristIndex);
        return;
      }
      this.curTableData = this.tableData.slice(
        fristIndex,
        fristIndex + PAGESIZE
      );
    },

    //当选好二级联动选择器时
    getSelectDatas(courseI, timeI) {
      console.log("我是第二个");
      this.tableData = this.course[courseI].times[timeI].students; //获取当前课程所有学生的数据
      this.tableDataUpdate();
      // 设置页码默认为1
      this.$nextTick(() => {
        this.$refs.pagination.internalCurrentPage = 1;
      });
    },

    // 将当前选中的课程显示到表格中
    tableDataUpdate() {
      this.curTableData = this.tableData.slice(0, PAGESIZE);
      this.pager = Math.ceil(this.tableData.length / PAGESIZE); //总页码
      console.log(this.pager, " this.pager ");
      this.pagerEndLen = this.tableData.length % PAGESIZE; //最后一页的列表数量
    }
  },
  computed: {
    total: function() {
      return this.tableData.length;
    }
  },
  created() {
    this.$http.get("/courseStuDatas").then(res => {
      console.log(res);
      if (res.data.course.length == 0) {
        this.ifEmpty = true;
        return;
      }
      this.course = res.data.course;
    });
  }
};
</script>

<style stope>
.table-attend {
  width: 100%;
}
.table-attend .linkage {
  padding: 10px;
}
.table-attend .main-container {
  background-color: #fff;
}
.table-attend .et-table-header th {
  font-weight: bold;
}
.table-attend .pagination {
  width: max-content;
  margin: 0 auto;
}

.table-attend .if-empty {
  padding: 50px;
}
</style>
