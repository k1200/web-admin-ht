import { fn_api__bank_queryDepPlatInouts } from '@/api/bank';
export default {
  name: 'BankOut',
  data() {
    return {
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        accountNo: '',
        tranDate: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [],
      inoutFlag_dict: [
        {
          label: '入金',
          value: '1'
        },
        {
          label: '出金',
          value: '2'
        }
      ],
      sourceType_dict: [
        {
          label: '银行入金',
          value: '1'
        },
        {
          label: '银行出金',
          value: '2'
        },
        {
          label: '交易出金',
          value: '3'
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
      fn_api__bank_queryDepPlatInouts(this.fn_format__reqdata(form))
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
      data.pageNum = this.page.currentPage;
      data.pageSize = this.page.pageSize;
      data.inoutFlag = 2;
      data.sourceType = 2;
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
      this.query_params = { tranDate: '', accountNo: '' };
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
    // 格式化出入金
    fn_formatter__inoutFlag(row, column, cellValue) {
      let inoutFlag = this.inoutFlag_dict.find(
        item => item.value === cellValue
      );
      return inoutFlag ? inoutFlag.label : cellValue;
    },
    // 格式化关联类型
    fn_formatter__sourceType(row, column, cellValue) {
      let sourceType = this.sourceType_dict.find(
        item => item.value === cellValue
      );
      return sourceType ? sourceType.label : cellValue;
    }
  }
};
