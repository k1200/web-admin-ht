import {
  fn_api__bank_queryDepBanks,
  fn_api__bank_updateDepBanks
} from '@/api/bank';
export default {
  name: 'BankMaintain',
  data() {
    return {
      form: {},
      isEdit: false
    };
  },
  created() {
    this.fn_handle__get_data();
  },
  methods: {
    // 获取数据
    fn_handle__get_data() {
      this.loading = true;
      fn_api__bank_queryDepBanks().then(res => {
        this.form = res.data;
        this.loading = false;
      });
    },
    fn_click__submit() {
      this.$confirm('确定要提交修改过后的银行信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('修改成功!');
          fn_api__bank_updateDepBanks(this.form)
            .then(res => {
              if (res.code === 1) {
                this.isEdit = false;
              }
            })
            .catch(e => console.log(e));
          this.isEdit = false;
        })
        .catch(() => {
          this.$message.info('取消修改!');
        });
    },
    fn_click__reset() {
      this.isEdit = false;
      this.$refs.form.resetFields();
    }
  }
};
