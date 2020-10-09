<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <el-form-item label="交易日期">
          <el-date-picker
            v-model="query_params.date"
            type="date"
            value-format="yyyyMMdd"
            placeholder="选择交易日期"
            size="small"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="query_params.status"
            size="small"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in status_dict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="差异类型">
          <el-select
            v-model="query_params.diffFlag"
            size="small"
            placeholder="请选择差异类型"
          >
            <el-option
              v-for="item in diffFlag_dict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
        <el-table-column align="center" prop="flowId" label="流水ID">
        </el-table-column>
        <el-table-column align="center" prop="bankNo" label="银行编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="tranDate"
          label="交易日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="diffLogNo"
          label="差异流水号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="diffFlag"
          label="差异类型"
          :formatter="fn_formatter__diffFlag"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          :formatter="fn_formatter__status"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankLogNo"
          label="	银行流水号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankAccountNo"
          label="银行-账户编号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankInoutFlag"
          label="银行-出金/入金"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankInoutMoney"
          label="银行-出入金额"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankOutFee"
          label="银行-出金手续费"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="platLogNo"
          label="交易流水号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="platAccountNo"
          label="平台-账户编号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="platInoutFlag"
          label="平台-出金/入金"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="platInoutMoney"
          label="平台-出入金额"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="platOutFee"
          label="平台-出金手续费"
        >
        </el-table-column>
        <el-table-column prop="operMsg" label="操作信息" width="200">
          <template #default="{row}">
            <div class="operMsg">
              <p>时间：{{ row.operTime }}</p>
              <p>操作员：{{ row.operUser }}</p>
              <p>信息：{{ row.operMsg }}</p>
            </div>
          </template>
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center" width="140">
          <template #default="{ row, $index }">
            <el-button
              type="text"
              size="mini"
              :disabled="row.status === '0'"
              @click="fn_click__resolve(row, $index)"
              >审核通过</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="row.status === '0'"
              @click="fn_click__reject(row, $index)"
              >驳回请求</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页栏 -->
      <pagesbar :page="page" @current-change="fn_change__current"></pagesbar>
    </el-row>
  </div>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
.operMsg {
  white-space: nowrap;
  font-size: 12px;
}
</style>
