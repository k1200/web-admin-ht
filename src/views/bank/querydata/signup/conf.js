import { fn_api__bank_queryDepQjyFlows } from '@/api/bank';
export default {
  name: 'BankSignup',
  data() {
    return {
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        tranDate: '',
        funcFlag: '',
        status: '',
        idCode: ''
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
          label: '待处理',
          value: '-2'
        },
        {
          label: '成功',
          value: '0'
        }
      ],
      funcFlag_dict: [
        {
          label: '签约',
          value: '1'
        },
        {
          label: '修改',
          value: '2'
        },
        {
          label: '解约',
          value: '3'
        }
      ],
      tranType_dict: [
        {
          label: '本行转账',
          value: '1'
        },
        {
          label: '他行转账',
          value: '3'
        }
      ],
      acctFlag_dict: [
        {
          label: '出金账号',
          value: '3'
        },
        {
          label: '入金账号',
          value: '1'
        }
      ],
      idType_dict: [
        {
          label: '身份证',
          value: '1'
        },
        {
          label: '港澳台居民通行证',
          value: '3'
        },
        {
          label: '统一社会信用代码',
          value: '73'
        },
        {
          label: '组织机构代码证',
          value: '52'
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
      fn_api__bank_queryDepQjyFlows(this.fn_format__reqdata(form))
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
      this.query_params = {
        tranDate: '',
        funcFlag: '',
        status: '',
        idCode: ''
      };
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
    // 格式化状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 格式化功能
    fn_formatter__funcFlag(row, column, cellValue) {
      let funcFlag = this.funcFlag_dict.find(item => item.value === cellValue);
      return funcFlag ? funcFlag.label : cellValue;
    },
    // 格式化转账方式
    fn_formatter__tranType(row, column, cellValue) {
      let tranType = this.tranType_dict.find(item => item.value === cellValue);
      return tranType ? tranType.label : cellValue;
    },
    // 格式化会员证件类型
    fn_formatter__idType(row, column, cellValue) {
      let idType = this.idType_dict.find(item => item.value === cellValue);
      return idType ? idType.label : cellValue;
    },
    // 格式化账号性质
    fn_formatter__acctFlag(row, column, cellValue) {
      let acctFlag = this.acctFlag_dict.find(item => item.value === cellValue);
      return acctFlag ? acctFlag.label : cellValue;
    }
  }
};
