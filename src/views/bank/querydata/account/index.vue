<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <!-- <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <el-form-item label="证件号码">
            <el-input
              v-model="query_params.idCode"
              placeholder="请输入证件号码"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="交易日期">
            <el-date-picker
              v-model="query_params.tranDate"
              type="date"
              clearable
              :size="size"
              placeholder="请选择交易日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="功能">
            <el-select
              v-model="query_params.funcFlag"
              size="small"
              placeholder="请选择功能"
            >
              <el-option
                v-for="item in funcFlag_dict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
        </template>
      </searchbar> -->

      <!-- 表格主体 -->
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        border
        align="center"
        v-loading="loading"
      >
        <el-table-column
          type="index"
          width="55"
          fixed
          align="center"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="accountNo"
          label="账户编号"
          width="145"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="tranDate"
          label="签解约日期"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="签解约状态"
          :formatter="fn_formatter__status"
        >
        </el-table-column>
        <el-table-column align="center" prop="bankNo" label="银行编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="custAcctId"
          label="子账户账号"
          width="185"
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
          prop="idType"
          label="证件类型"
          show-overflow-tooltip
          :formatter="fn_formatter__idType"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="idCode"
          label="证件号码"
          width="165"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="tranType"
          label="转账方式"
          :formatter="fn_formatter__tranType"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="cardNo"
          label="出入金账号"
          width="165"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankName"
          label="开户行名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="acctName"
          label="账号名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankCode"
          label="联行号"
          width="165"
        >
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
