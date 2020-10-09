import { fn_api__bank_querySysDepAccounts } from '@/api/bank';
export default {
  name: 'BankAccount',
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
      sclubType_dict: [
        {
          label: '企业',
          value: 'E'
        },
        {
          label: '个人',
          value: 'P'
        }
      ],
      idType_dict: [
        {
          label: '身份证',
          value: '1'
        },
        {
          label: '组织机构代码证',
          value: '52'
        },
        {
          label: '统一社会信用代码',
          value: '73'
        }
      ],
      tranType_dict: [
        {
          label: '本行签约',
          value: '1'
        },
        {
          label: '他行签约',
          value: '3'
        }
      ],
      status_dict: [
        {
          label: '已签约',
          value: '0'
        },
        {
          label: '未签约',
          value: '1'
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
      fn_api__bank_querySysDepAccounts(this.fn_format__reqdata(form))
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
      console.log(data);
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
    // 格式化注册类型
    fn_formatter__sclubType(row, column, cellValue) {
      let sclubType = this.sclubType_dict.find(
        item => item.value === cellValue
      );
      return sclubType ? sclubType.label : cellValue;
    },
    // 格式化证件类型
    fn_formatter__idType(row, column, cellValue) {
      let idType = this.idType_dict.find(item => item.value === cellValue);
      return idType ? idType.label : cellValue;
    },
    // 格式化签解约状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 格式化转账方式
    fn_formatter__tranType(row, column, cellValue) {
      let tranType = this.tranType_dict.find(item => item.value === cellValue);
      return tranType ? tranType.label : cellValue;
    }
  }
};
