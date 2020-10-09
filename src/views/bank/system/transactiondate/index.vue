<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="form"
      :rules="rules"
      ref="form"
      class="demo-form-inline"
    >
      <el-form-item label="交易日期">
        <el-date-picker
          type="date"
          placeholder="请选择交易日期"
          v-model="form.date"
          clearable
          size="small"
          value-format="yyyyMMdd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="form.status"
          placeholder="请选择状态"
          size="small"
          clearable
        >
          <el-option label="初始" value="0"></el-option>
          <el-option label="结算" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fn_click__submit" size="small"
          >提交设置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fn_api__bank_updateTranDate } from '@/api/bank';
export default {
  name: 'BankTransactionDate',
  data() {
    return {
      form: {
        date: '',
        status: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      rules: {
        date: [
          { required: true, message: '请选择交易日期', trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      }
    };
  },
  methods: {
    fn_click__submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm(
            `确定要将${this.form.date}设置为新的交易日期, 是否继续?`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            fn_api__bank_updateTranDate(this.form)
              .then(res => {
                if (res.code === 0) {
                  this.$message.success('设置成功！');
                }
              })
              .catch(() => {
                this.$message.info('取消设置!');
              });
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 32px;
}
</style>
