<template>
  <div id="product">
    <el-button type="primary" @click="handleCreate">
      新增电影
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>

    <div style="width:500px;margin:20px auto">
      <el-input v-model="keyWord" placeholder="请输入您要搜索的关键字" style="width:300px;margin-right:10px"></el-input>
      <el-button type="primary" @click="handleFind">
        搜索
        <i class="el-icon-search el-icon--left"></i>
      </el-button>
    </div>

    <div v-loading="loading" style="width:1200px;margin:0 auto">
      <el-table :data="list" stripe border style="width: 100%">
        <el-table-column prop="name" label="电影名称" align="center" min-width="120"></el-table-column>
        <el-table-column prop="year" label="年份" align="center" min-width="120"></el-table-column>
        <el-table-column prop="desc" label=" 电影描述" align="center" min-width="180"></el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.createAt.substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.updateAt.substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.pageNum"
        :limit.sync="query.pageSize"
        @pagination="getData()"
      />
    </div>
    <div>
      <el-dialog :title="type==='create'?'新增电影':'编辑电影'" :visible.sync="dialogVisible" width="500px">
        <el-form ref="ruleForm" :model="fromData" :rules="rules" label-width="80px">
          <el-form-item label="电影名称" prop="name">
            <el-input v-model="fromData.name" placeholder="请输入电影名称"></el-input>
          </el-form-item>
          <el-form-item label="出品年份" prop="year">
            <el-input v-model="fromData.year" placeholder="请输入电影年份"></el-input>
          </el-form-item>
          <el-form-item label="电影描述" prop="desc">
            <el-input v-model="fromData.desc" placeholder="请输入电影描述"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

const initFromData = {
  name: '',
  year: '',
  desc: ''
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      type: '',
      fromData: {},
      list: [],
      keyWord: '',
      total: 0,
      query: {
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        name: [
          { required: true, message: '请输入电影名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        year: [{ required: true, message: '请输入电影年份', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入产品描述', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      const res = await this.axios({
        url: 'http://127.0.0.1:8081/api/v1/movie',
        method: 'GET',
        params: { ...this.query, name: this.keyWord }
      })
      this.loading = false
      this.list = res.data.data
      this.total = res.data.total
      console.log(res)
    },
    // 模糊搜索
    handleFind() {
      this.query.pageNum = 1
      this.getData()
    },
    // 新增
    handleCreate() {
      this.dialogVisible = true
      this.type = 'create'
      this.fromData = { ...initFromData }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogVisible = true
      this.type = 'edit'
      this.fromData = { ...row, id: row.id }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 确认
    handleSure() {
      this.$refs['ruleForm'].validate(async valid => {
        if (!valid) return
        let res
        if (this.type === 'create') {
          res = await this.axios({
            url: 'http://127.0.0.1:8081/api/v1/movie',
            method: 'POST',
            data: { ...this.fromData }
          })
        } else {
          res = await this.axios({
            url: `http://127.0.0.1:8081/api/v1/movie/${this.fromData.id}`,
            method: 'PUT',
            data: { ...this.fromData }
          })
        }

        if (res.status !== 200) {
          this.$message = {
            type: 'error',
            message: res.data.msg
          }
          return false
        }
        this.dialogVisible = false
        this.getData()

        this.$message({
          type: 'success',
          message: this.type === 'create' ? '创建成功' : '更新成功'
        })
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await this.axios({
            url: `http://127.0.0.1:8081/api/v1/movie/${row.id}`,
            method: 'DELETE'
          })
          if (res.status !== 200) {
            return this.$message.error(res.data.msg || '删除失败')
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
        .catch(() => {
          console.log('取消删除')
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
