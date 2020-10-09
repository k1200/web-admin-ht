import {
  fn_api__bank_queryCheckPendingCashOutFlows,
  fn_api__bank_cashOutVerify
} from '@/api/bank';
export default {
  name: 'BankVerifyPlatformOut',
  data() {
    return {
      ref_table: null,
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        date: '',
        status: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [],
      target_dict: [
        {
          value: '1',
          label: '银行发起'
        },
        {
          value: '2',
          label: '交易网发起' // 平台
        }
      ],
      status_dict: [
        {
          value: '-2',
          label: '待处理'
        },
        {
          value: '-1',
          label: '待审核'
        },
        {
          value: '0',
          label: '成功'
        },
        {
          value: '1',
          label: '驳回'
        },
        {
          value: '2',
          label: '冲正'
        }
      ]
    };
  },
  created() {
    this.fn_handle__get_list();
  },
  methods: {
    // 获取数据
    fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      fn_api__bank_queryCheckPendingCashOutFlows(this.fn_format__reqdata(form))
        .then(res => {
          this.tableData = this.fn_format__resdata(res.data);
          this.loading = false;
        })
        .catch(e => {
          this.tableData = [];
          this.loading = false;
        });
    },
    // 格式化请求参数
    fn_format__reqdata(form) {
      let data = this.util.fn_util__filter_null(form);
      data.target = 2; // 发起方向 1 银行发起 2 交易网发起
      data.pageNum = this.page.currentPage;
      data.pageSize = this.page.pageSize;
      return data;
    },
    // 格式化响应数据
    fn_format__resdata(data) {
      this.page.total = data.total;
      return data.list;
    },
    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = { date: '', target: '1' };
    },

    // 刷新数据
    fn_click__refresh() {
      this.fn_handle__get_list();
    },

    // 更新每页显示条数
    fn_change__size(val) {
      this.page.pageSize = val;
      this.fn_handle__get_list();
    },
    // 更新当前页数
    fn_change__current(val) {
      this.page.currentPage = val;
      this.fn_handle__get_list();
    },
    // 审核通过
    fn_click__resolve(row) {
      this.$confirm(
        `确认对该条记录【流水号：${row.flowId}】通过审核, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning'
        }
      )
        .then(() => {
          let { target, frontLogNo, thirdLogNo, accountNo } = row;
          fn_api__bank_cashOutVerify({
            target,
            frontLogNo,
            thirdLogNo,
            accountNo,
            checkFlag: 0
          }).then(res => {
            if (res.code === '200') {
              this.$message.success(
                '【流水号：${row.flowId}】的记录已通过审核!'
              );
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消审核');
        });
    },
    // 审核通过
    fn_click__reject(row) {
      this.$confirm(
        `确认对该条记录【流水号：${row.flowId}】进行驳回, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning'
        }
      )
        .then(() => {
          let { target, frontLogNo, thirdLogNo, accountNo } = row;
          fn_api__bank_cashOutVerify({
            target,
            frontLogNo,
            thirdLogNo,
            accountNo,
            checkFlag: 1
          }).then(res => {
            if (res.code === '200') {
              this.$message.success('【流水号：${row.flowId}】的记录已驳回!');
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消驳回');
        });
    },
    // 格式化 状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 格式化 发起方
    fn_formatter__target(row, column, cellValue) {
      let target = this.target_dict.find(item => item.value === cellValue);
      return target ? target.label : cellValue;
    }
  }
};
