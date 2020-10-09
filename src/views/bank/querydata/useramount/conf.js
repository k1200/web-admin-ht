import { fn_api__bank_queryUserAmount } from '@/api/bank';
export default {
  name: 'BankUserAmount',
  data() {
    return {
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        selectFlag: '1',
        accountNo: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      // 查询账号类型
      selectFlag_dict: [
        {
          value: '1',
          label: '全部'
        },
        {
          value: '2',
          label: '普通会员子账号'
        },
        {
          value: '3',
          label: '功能子账号'
        }
      ],
      // 子账户性质
      custFlag_dict: [
        {
          value: '1',
          label: '虚拟账号'
        }
      ],
      // 子账户属性
      custType_dict: [
        {
          value: '1',
          label: '普通会员子账户'
        },
        {
          value: '2',
          label: '挂账子账户'
        },
        {
          value: '3',
          label: '手续费子账户'
        },
        {
          value: '4',
          label: '利息子账户'
        },
        {
          value: '6',
          label: '清收子账户'
        }
      ],
      // 子账户状态
      custStatus_dict: [
        {
          value: '1',
          label: '正常'
        },
        {
          value: '2',
          label: '已销户'
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.fn_handle__get_list();
  },
  methods: {
    // 获取数据
    fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      fn_api__bank_queryUserAmount(this.fn_format__reqdata(form))
        .then(res => {
          this.tableData = this.fn_format__resdata(res.data);
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          this.tableData = [];
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
      this.page.total = +data.totalCount;
      return data.array;
    },
    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        selectFlag: '1',
        accountNo: ''
      };
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
    // 格式化子账户性质
    fn_formatter__custFlag(row, column, cellValue) {
      let custFlag = this.custFlag_dict.find(item => item.value === cellValue);
      return custFlag ? custFlag.label : cellValue;
    },
    // 格式化子账户属性
    fn_formatter__custType(row, column, cellValue) {
      let custType = this.custType_dict.find(item => item.value === cellValue);
      return custType ? custType.label : cellValue;
    },
    // 格式化子账户状态
    fn_formatter__custStatus(row, column, cellValue) {
      let custStatus = this.custStatus_dict.find(
        item => item.value === cellValue
      );
      return custStatus ? custStatus.label : cellValue;
    }
  }
};
