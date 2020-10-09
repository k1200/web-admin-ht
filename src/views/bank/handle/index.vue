<template>
  <div class="app-container">
    <div class="row_item">
      <span class="row_label">交易日期：</span>
      <span class="row_body">{{ tranDate }}</span>
    </div>
    <div class="handle_step_groups">
      <p class="row_item">
        <span class="row_label">当前进度：</span>
        <span class="row_body">{{
          c__active_step ? c__active_step.label : '今日操作已完成！'
        }}</span>
      </p>
      <div class="step_body">
        <el-steps :active="active" align-center>
          <el-step
            v-for="(item, index) of step_groups"
            :process-status="item.processStatus"
            :key="item.value"
            :title="item.label"
          >
            <template #icon>
              <template v-if="item.children">
                <div>
                  <p
                    class="child_step"
                    v-for="child of item.children"
                    :class="fn__child_process(child.process, index)"
                    :key="child.value"
                  >
                    {{ child.label }}
                  </p>
                </div>
              </template>
              <span v-else>{{ item.label }}</span>
            </template>
            <template #title>
              <el-button-group v-if="item.children">
                <el-button
                  v-for="child of item.children"
                  :key="child.value"
                  size="mini"
                  :type="btn_type(child.process, index)"
                  :disabled="fn_btn__disabled(child.process, index)"
                  @click="
                    fn_click__command(item.command, {
                      ...child.params,
                      beginDate: tranDate,
                      endDate: tranDate
                    })
                  "
                  >{{ child.label }}</el-button
                >
              </el-button-group>
              <el-button
                v-else
                size="mini"
                :type="btn_type(item.process, index)"
                :disabled="fn_btn__disabled(item.process, index)"
                @click="fn_click__command(item.command)"
                >{{ fn_btn__label(item) }}</el-button
              >
            </template>
            <template #description>
              <el-alert
                v-if="+item.process === 2"
                type="warning"
                :closable="false"
              >
                <span>出入金对账存在差异</span>
                <span class="el_alert__warning" @click="fn_click__to_href()"
                  >【点击此处】</span
                >审核对账差异
              </el-alert>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
