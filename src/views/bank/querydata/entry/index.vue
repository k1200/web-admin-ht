<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
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
          <el-form-item label="交易日期">
            <el-date-picker
              v-model="query_params.tranDate"
              type="date"
              clearable
              value-format="yyyyMMdd"
              :size="size"
              placeholder="请选择交易日期"
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
        <el-table-column align="center" prop="flowId" label="流水ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="tranDate"
          label="交易日期"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="frontLogNo"
          label="银行前置流水号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="thirdLogNo"
          label="交易网流水号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="supAcctId"
          label="资金汇总账号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custAcctId"
          label="会员子账号"
          width="185"
        >
        </el-table-column>
        <el-table-column align="center" prop="tranAmount" label="入金金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="inAcctId"
          label="入金账号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="inAcctIdName"
          label="入金账户名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column align="center" prop="ccyCode" label="币种">
        </el-table-column>
        <el-table-column
          align="center"
          prop="acctDate"
          label="会计日期"
          width="105"
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
