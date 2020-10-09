import { fn_api__bank_queryProgress } from '@/api/bank';
export default {
  name: 'BankProgress',
  data() {
    return {
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        date: [],
        funcFlag: ''
      },
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change' }],
        funcFlag: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      tableData: [],
      funcFlag_dict: [
        {
          value: '1',
          label: '清算'
        },
        {
          value: '2',
          label: '余额对账'
        },
        {
          value: '4',
          label: '出入金流水'
        },
        {
          value: '5',
          label: '开销户流水对账'
        }
      ]
    };
  },
  methods: {
    // 获取数据
    fn_handle__get_list() {
      this.loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          fn_api__bank_queryProgress({
            funcFlag: this.query_params.funcFlag,
            beginDate: this.query_params.date[0],
            endDate: this.query_params.date[1]
          })
            .then(res => {
              this.tableData = res.data.array;
              this.loading = false;
            })
            .catch(() => {
              this.tableData = [];
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = { date: [], funcFlag: '' };
      this.tableData = [];
    },
    // 格式化 状态
    fn_formatter__funcFlag(row, column, cellValue) {
      let funcFlag = this.funcFlag_dict.find(item => item.value === cellValue);
      return funcFlag ? funcFlag.label : cellValue;
    }
  }
};
