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
          <el-form-item label="账户号">
            <el-input
              v-model="query_params.accountNo"
              placeholder="请输入账户号"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="账号类型">
            <el-select
              v-model="query_params.selectFlag"
              placeholder="请选择账号类型"
              :size="size"
            >
              <el-option
                v-for="item in selectFlag_dict"
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
        <el-table-column type="index" width="50" align="center" label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="thirdCustId"
          label="交易网会员代码"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custName"
          label="	会员名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custAcctId"
          label="子账户"
          width="140"
        >
        </el-table-column>
        <el-table-column align="center" prop="totalAmount" label="账户总余额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalFreezeAmount"
          label="账户总冻结金额"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalBalance"
          label="账户可用余额"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="mainAcctId"
          label="上级监管账号"
          width="135"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custFlag"
          label="子账户性质"
          :formatter="fn_formatter__custFlag"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custType"
          label="子账户属性"
          :formatter="fn_formatter__custType"
          width="135"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="custStatus"
          label="子账户状态"
          :formatter="fn_formatter__custStatus"
        >
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
<style lang="scss" scoped></style>
