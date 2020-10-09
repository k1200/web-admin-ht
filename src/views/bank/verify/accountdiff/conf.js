import {
  fn_api__bank_queryDiffFlows,
  fn_api__bank_operateDiffFlows
} from '@/api/bank';
export default {
  name: 'BankVerifyAccountDiff',
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
        status: '',
        diffFlag: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [],
      status_dict: [
        {
          value: '-1',
          label: '待审核'
        },
        {
          value: '0',
          label: '已处理'
        },
        {
          value: '1',
          label: '不处理'
        }
      ],
      diffFlag_dict: [
        {
          value: '1',
          label: '银行存在但平台不存在'
        },
        {
          value: '2',
          label: '银行不存在但平台存在'
        },
        {
          value: '3',
          label: '银行与平台交易信息差异'
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
      fn_api__bank_queryDiffFlows(this.fn_format__reqdata(form)).then(res => {
        this.tableData = this.fn_format__resdata(res.data);
        this.loading = false;
      });
    },
    // 格式化请求参数
    fn_format__reqdata(form) {
      let data = this.util.fn_util__filter_null(form);
      data.pageNum = this.page.currentPage;
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
      this.query_params = { date: '', status: '', diffFlag: '' };
      this.page.currentPage = 1;
    },

    // 刷新数据
    fn_click__refresh() {
      this.fn_handle__get_list();
    },
    // 更新当前页数
    fn_change__current(val) {
      this.page.currentPage = val;
      this.fn_handle__get_list();
    },
    // 审核通过
    fn_click__resolve(row) {
      this.$prompt(
        '备注信息（选填）：',
        `确认对该条记录【流水号：${row.flowId}】通过审核`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(({ value }) => {
          fn_api__bank_operateDiffFlows({
            flowId: row.flowId,
            operMsg: value,
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
          this.$message.info('已取消操作');
        });
    },
    // 审核驳回
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
          fn_api__bank_operateDiffFlows({
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
    // 格式化状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 格式化差异类型
    fn_formatter__diffFlag(row, column, cellValue) {
      let diffFlag = this.diffFlag_dict.find(item => item.value === cellValue);
      return diffFlag ? diffFlag.label : cellValue;
    }
  }
};
