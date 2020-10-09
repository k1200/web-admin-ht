<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="query_params"
      :rules="rules"
      ref="form"
      class="demo-form-inline"
    >
      <el-form-item label="交易日期" prop="date">
        <el-date-picker
          v-model="query_params.date"
          clearable
          size="small"
          value-format="yyyyMMdd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="业务类型" prop="funcFlag">
        <el-select
          v-model="query_params.funcFlag"
          placeholder="请选择业务类型"
          size="small"
          clearable
        >
          <el-option label="清算" value="1"></el-option>
          <el-option label="余额对账" value="2"></el-option>
          <el-option label="出入金流水" value="4"></el-option>
          <el-option label="开销户流水对账" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          :size="size"
          @click="fn_handle__get_list"
          >搜索</el-button
        >
        <el-button
          icon="el-icon-refresh"
          :size="size"
          @click="fn_click__reset_search"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格主体 -->
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      border
      align="center"
      v-loading="loading"
    >
      <el-table-column align="center" prop="tranDate" label="交易日期">
      </el-table-column>
      <el-table-column align="center" prop="tranTime" label="交易时间">
      </el-table-column>
      <el-table-column align="center" prop="batFileName" label="原文件名">
      </el-table-column>
      <el-table-column align="center" prop="failMsg" label="处理失败原因">
      </el-table-column>
      <el-table-column align="center" prop="totalCount" label="总笔数">
      </el-table-column>
      <el-table-column align="center" prop="sucTotal" label="成功笔数">
      </el-table-column>
      <el-table-column align="center" prop="failTotal" label="失败笔数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="failFilesName"
        label="失败结果文件名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="resultFlag"
        label="处理结果"
        :formatter="fn_formatter__funcFlag"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 32px;
}
</style>
