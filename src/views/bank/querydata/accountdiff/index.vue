<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__get_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <el-form-item label="会员编号" prop="thirdCustId">
            <el-input
              v-model="query_params.thirdCustId"
              placeholder="请输入会员编号"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
        </template>
      </searchbar>

      <!-- 表格主体 -->
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        border
        align="center"
        v-loading="loading"
      >
        <el-table-column align="center" prop="date" label="日期" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址"
          show-overflow-tooltip
        >
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="fn_click__del(row, $index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页栏 -->
      <pagesbar
        :page="page"
        @size-change="fn_change__size"
        @current-change="fn_change__current"
      ></pagesbar>
    </el-row>
  </div>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped></style>
