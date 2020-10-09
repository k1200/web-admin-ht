<template>
  <div class="app-container">
    <data-desc v-model="details" :options="options"></data-desc>
  </div>
</template>
<script>
import { fn_api__bank_queryTotalAmount } from '@/api/bank';
export default {
  name: 'BankTotalAmount',
  data() {
    return {
      details: {},
      options: [
        {
          label: '交易网名称',
          prop: 'tranWebName'
        },
        {
          label: '交易网代码',
          prop: 'tranWebCode'
        },

        {
          label: '户名',
          prop: 'acctName'
        },
        {
          label: '证件类型',
          prop: 'idType'
        },
        {
          label: '证件号码',
          prop: 'idCode'
        },
        {
          label: '资金汇总账号',
          prop: 'acctId'
        },
        {
          label: '网银用户名',
          prop: 'webName'
        },
        {
          label: '网银客户号',
          prop: 'webCustId'
        },
        {
          label: '服务类型',
          prop: 'funcFlag'
        },
        {
          label: '币种',
          prop: 'ccyCode'
        },
        {
          label: '当前账户余额',
          prop: 'curBalance'
        },
        {
          label: '总记录数',
          prop: 'recordNum'
        }
      ]
    };
  },
  created() {
    this.fn_queryTotalAmount();
  },
  methods: {
    fn_queryTotalAmount() {
      fn_api__bank_queryTotalAmount().then(res => {
        this.details = res.data;
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
