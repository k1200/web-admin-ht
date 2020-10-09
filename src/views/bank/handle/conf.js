import {
  fn_api__bank_queryBankStatus,
  fn_api__bank_signIn,
  fn_api__bank_signOut,
  fn_api__bank_checkAccount,
  fn_api__bank_settleAccount
} from '@/api/bank';
export default {
  name: 'Handle',
  data() {
    // process -2:未操作; -1:操作中; 0:操作成功; 1:操作失败; 2:操作存疑
    return {
      active: 0, // 活动的tag的小标
      step_groups: [
        {
          label: '签到',
          process_label: '签到中',
          error_label: '签到失败，重新签到',
          success_label: '已签到',
          value: 'signFlag',
          process: '-1',
          command: fn_api__bank_signIn
        },
        {
          label: '签退',
          process_label: '签退中',
          error_label: '签退失败，重新签退',
          success_label: '已签退',
          value: 'unsignFlag',
          process: '-2',
          command: fn_api__bank_signOut
        },
        {
          label: '申请对账',
          value: 'veryFlag',
          process: '-2',
          command: fn_api__bank_checkAccount,
          children: [
            {
              label: '签解约对账',
              process_label: '签解约对账中',
              error_label: '签解约对账失败',
              success_label: '签解约对账完成',
              value: 'qjyrepVeryFlag',
              process: '-2',
              params: { funcFlag: 2 }
            },
            {
              label: '出入金对账',
              process_label: '出入金对账中',
              error_label: '出入金对账失败',
              success_label: '出入金对账完成',
              value: 'crjrepVeryFlag',
              process: '-2',
              params: { funcFlag: 1 }
            }
          ]
        },
        {
          label: '数据清算',
          value: 'sendFlag',
          process: '-2',
          command: fn_api__bank_settleAccount
        }
      ],
      tranDate: ''
    };
  },
  computed: {
    c__active_step() {
      return this.step_groups[this.active];
    }
  },
  created() {
    this.fn_click__query_step();
  },
  methods: {
    // 按钮文本显示
    fn_btn__label(step) {
      if (+step.process === -1) {
        return step.process_label;
      } else if (+step.process === 1) {
        return step.error_label;
      } else if (+step.process === 0) {
        return step.success_label;
      } else {
        return '待' + step.label;
      }
    },
    // 按钮是否可操作
    fn_btn__disabled(process, index) {
      if (this.active === index && +process === -1) return true;
      if (this.active === index && +process === -2) return false;
      let disabledStatus = [-2, -1, 0]; // 未签到，签到中，签到成功
      if (disabledStatus.includes(+process)) {
        return true;
      }
      return false;
    },
    // 状态类型
    btn_type(process, index) {
      if (this.active === index && +process === -2) return 'primary';
      switch (+process) {
        case -2:
          return 'info';
        case -1:
          return 'primary';
        case 0:
          return 'success';
        case 1:
          return 'danger';
        default:
          return 'warning';
      }
    },
    // 获取数据
    fn_click__query_step() {
      fn_api__bank_queryBankStatus().then(res => {
        this.oldRes = res.data;
        this.fn__format_process(res.data);
      });
    },
    // 格式化响应数据
    fn__format_process(data) {
      this.tranDate = data.tranDate;
      let process = this.step_groups.some((item, index) => {
        if (item.children) {
          let is_process = false;
          let process_step = 0;
          item.children.forEach(child => {
            if (+data[child.value] !== 0) {
              is_process = true;
              child.process = data[child.value];
            } else if (+data[child.value] === 0) {
              process_step++;
              child.process = 0;
            } else {
              child.process = data[child.value];
            }
          });
          if (process_step === 2) {
            item.process = 0;
          } else if (is_process) {
            item.process = -1;
          }
          if (is_process) {
            this.active = index;
            return true;
          }
        } else {
          item.process = data[item.value];
          if (+data[item.value] !== 0) {
            this.active = index;
            return true;
          }
        }
        return false;
      });
      if (!process) this.step_groups[0].process = -1;
    },
    fn__child_process(process, index) {
      return {
        'is-process':
          process === '-1' || (this.active === index && process === '0'),
        'is-wait': process === '-2' && this.active !== index,
        'is-finish': process === '0',
        'is-warning': process === '2'
      };
    },
    // 提交指令
    fn_click__command(command, params) {
      this.$confirm(
        `确定进行当前操作【${this.c__active_step.label}】, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          console.log(params);
          command(params).then(res => {
            if (res.code === 0) {
              this.fn_click__query_step();
              this.$message.success(`${this.c__active_step.label}成功!`);
            }
          });
        })
        .catch(() => {
          this.$message(`已取消【${this.c__active_step.label}】`);
        });
    },
    fn_click__to_href() {
      console.log();
      this.$router.push('/bank/accountdiff');
    }
  }
};
