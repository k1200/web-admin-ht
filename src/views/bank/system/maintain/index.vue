<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :class="{ is_edit_form: isEdit }"
      :disabled="!isEdit"
    >
      <el-form-item label="银行编号">
        <el-input v-model="form.bankNo" placeholder="请输入银行编号"></el-input>
      </el-form-item>
      <el-form-item label="银行名称">
        <el-input
          v-model="form.bankName"
          placeholder="请输入银行名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台代码">
        <el-input v-model="form.platNo" placeholder="请输入平台代码"></el-input>
      </el-form-item>
      <el-form-item label="平台名称">
        <el-input
          v-model="form.platName"
          placeholder="请输入平台名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="监管账户">
        <el-input
          v-model="form.platAcct"
          placeholder="请输入监管账户"
        ></el-input>
      </el-form-item>
      <el-form-item label="户名">
        <el-input v-model="form.openName" placeholder="请输入户名"></el-input>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-input
          v-model="form.bankCard"
          placeholder="请输入银行卡号"
        ></el-input>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="form.openBank" placeholder="请输入开户行"></el-input>
      </el-form-item>
      <el-form-item label="签到时间">
        <el-input v-model="form.signTime"></el-input>
      </el-form-item>
      <el-form-item label="签退时间">
        <el-input v-model="form.unsignTime"></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-input v-model="form.outStartTime"></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input v-model="form.outOverTime"></el-input>
      </el-form-item>
      <el-form-item label="出金限额">
        <el-input v-model="form.outCheckLimit"></el-input>
      </el-form-item>
    </el-form>
    <div class="form_btns" :class="{ 'is-edit': isEdit }">
      <el-button
        v-if="!isEdit"
        type="primary"
        size="small"
        @click="isEdit = true"
        >修改银行信息</el-button
      >
      <template v-else>
        <el-button type="warning" size="small" @click="fn_click__submit"
          >提交修改</el-button
        >
        <el-button type="info" size="small" @click="fn_click__reset"
          >取消</el-button
        >
      </template>
    </div>
  </div>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
.app-container {
  padding: 32px 0;
}
/deep/ .el-input.is-disabled .el-input__inner {
  background-color: unset;
  border-color: transparent;
  color: unset;
  cursor: default;
}
.form_btns.is-edit {
  margin-left: 180px;
}
.el-form-item {
  margin-bottom: 0;
}
.is_edit_form .el-form-item {
  margin-bottom: 20px;
}
.is_edit_form {
  max-width: 500px;
}
</style>
