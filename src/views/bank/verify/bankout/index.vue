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
            placeholder="请选择发状态"
            clearable
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
        <el-table-column
          align="center"
          prop="target"
          label="发起方"
          :formatter="fn_formatter__target"
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
          prop="tranDate"
          label="交易日期"
          width="100"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="thirdLogNo"
          label="交易网流水号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="frontLogNo"
          label="银行前置流水号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="tranWebName"
          label="交易网名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="thirdCustId"
          label="交易网会员代码"
          width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custAcctId"
          label="子账户账号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custName"
          label="子账户名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="supAcctId"
          label="资金汇总账号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="outAcctId"
          label="出金账号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="outAcctIdName"
          label="出金账号名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="center" prop="ccyCode" label="币种">
        </el-table-column>
        <el-table-column align="center" prop="tranAmount" label="申请出金金额">
        </el-table-column>
        <el-table-column align="center" prop="handFee" label="转账手续费">
        </el-table-column>
        <el-table-column
          align="center"
          prop="feeOutCustId"
          label="支付手续费子账号"
          width="180"
        >
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center" width="140">
          <template #default="{ row, $index }">
            <el-button
              type="text"
              size="mini"
              :disabled="+row.status !== -2 || +row.status !== -1"
              @click="fn_click__resolve(row, $index)"
              >审核通过</el-button
            >
            <el-button
              type="text"
              size="mini"
              :disabled="+row.status !== -2 || +row.status !== -1"
              @click="fn_click__reject(row, $index)"
              >驳回请求</el-button
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
