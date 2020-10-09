import { fn_util__deep_clone } from '@/util/util';
export default {
  name: 'BankTransactionDate',
  data() {
    return {
      ref_table: null,
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        thirdCustId: ''
      },
      // 查询参数（旧）
      old_query_params: null,
      // 分页参数
      page: {
        total: 89,
        currentPage: 1,
        pageSize: 10
      },
      tableData: [
        {
          date: '2016',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  created() {
    this.old_query_params = fn_util__deep_clone(this.query_params);
  },
  mounted() {
    this.ref_table = this.$refs.table;
  },
  methods: {
    // 获取数据
    fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      return (this.loading = false);
      fn_api__xxx_list(this.fn_format__reqdata(form)).then(res => {
        this.tableData = this.fn_format__resdata(res.data);
        this.loading = false;
      });
    },
    // 格式化请求参数
    fn_format__reqdata(form) {
      console.log('格式化搜索数据');
      return this.util.fn_util__filter_null(form);
    },
    // 格式化响应数据
    fn_format__resdata(data) {
      return data;
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = fn_util__deep_clone(this.old_query_params);
      console.log('resetForm');
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
    // 查看数据
    fn_click__view(row, $index) {
      console.log(row, $index);
    },
    // 删除数据
    fn_click__del(row, $index) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      })
        .then(() => {
          return this.$message.success('删除成功!');
          fn_api__system_xxx_del(row).then(res => {
            if (res.code === '200') {
              this.$message.success('删除成功!');
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    }
  }
};
