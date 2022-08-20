<template>
  <div class="container">
    <el-card
      class="card"
      :body-style="{ padding: '0px' }"
      v-for="article in articleList"
      :key="article.id">
      <div class="content-container">
        <div class="content">
          <h2>{{ article.articleName }}</h2>
          <div class="text">
            {{
              article.articleText.length > 100
                ? article.articleText.slice(0, 100) + '...'
                : article.articleText
            }}
          </div>
          <div class="info">
            <span>{{ article.authorName }}</span>
            <span>{{ article.updateTime }}</span>
          </div>
        </div>
        <el-image :src="article.poster" class="image" />
      </div>
    </el-card>
    <el-pagination
      v-model:currentPage="pageInfo.pageNum"
      v-model:page-size="pageInfo.pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { articleService } from '/services/article'

const articleList = ref([])
let total = ref(0)
const pageInfo = reactive({
  pageSize: 10,
  pageNum: 1
})
async function getList() {
  try {
    const res = await articleService.page(pageInfo)
    articleList.value = res.data.rows
    total.value = res.data.count
  } catch (error) {
    console.log(error)
  }
}
const handleCurrentChange = val => {
  pageInfo.pageNum = val
  getList()
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.container {
  width: 800px;
  margin: 0 auto;
  .card {
    margin: 12px;
    height: 200px;
    .content-container {
      display: flex;
      padding: 24px;
      .content {
        margin-right: 12px;
        flex: 1;
        text-align: left;
        h2 {
          font-size: 16px;
        }
        .text {
          color: #999;
          font-size: 12px;
        }
        .info {
          margin-top: 12px;
          font-size: 12px;
          color: #999;
          span:first-child {
            margin-right: 12px;
          }
        }
      }
      .image {
        width: 240px;
        height: 140px;
      }
    }
  }
}
</style>
