<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <el-form-item label="账户编号">
          <el-input
            v-model="query_params.accountNo"
            clearable
            :size="size"
            placeholder="请输入账户编号"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="交易日期">
          <el-date-picker
            v-model="query_params.tranDate"
            type="date"
            value-format="yyyyMMdd"
            clearable
            :size="size"
            placeholder="请选择交易日期"
          >
          </el-date-picker>
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
          prop="tranDate"
          label="交易日期"
          width="105"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="accountNo"
          label="账户编号"
          width="145"
        >
        </el-table-column>
        <el-table-column align="center" prop="bankNo" label="银行编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="inoutFlag"
          label="出金/入金"
          :formatter="fn_formatter__inoutFlag"
        >
        </el-table-column>
        <el-table-column align="center" prop="inoutMoney" label="出入金额">
        </el-table-column>
        <el-table-column align="center" prop="outFee" label="出金手续费">
        </el-table-column>
        <el-table-column
          align="center"
          prop="platLogNo"
          label="交易流水号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="bankLogNo"
          label="银行流水号"
          width="185"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sourceType"
          label="关联类型"
          :formatter="fn_formatter__sourceType"
        >
        </el-table-column>
        <el-table-column align="center" prop="sourceId" label="关联ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sourceNo"
          label="关联单号"
          width="185"
        >
        </el-table-column>
        <el-table-column align="center" prop="remarks" label="备注信息">
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
