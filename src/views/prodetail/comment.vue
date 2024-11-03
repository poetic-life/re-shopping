<template>
  <div class="comment">
    <van-nav-bar fixed title="全部评论" left-arrow @click-left="$router.go(-1)" />
    <commentDetail :CommentList="CommentList"></commentDetail>
  </div>
</template>

<script>
import commentDetail from '@/components/commentDetail.vue'
import { getCommentData } from '@/api/product'
export default {
  name: 'CommentIndex',
  components: {
    commentDetail
  },
  data () {
    return {
      goodsId: this.$route.params.id,
      CommentList: []
    }
  },
  async created () {
    const { data: { list } } = await getCommentData(this.goodsId, 2)
    console.log(list)
    this.CommentList = list
  }
}
</script>

<style>

</style>
