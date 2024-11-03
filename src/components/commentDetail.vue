<template>
  <div class="comment-list">
    <div class="comment-content">
      <div class="comment-item" v-for="item in CommentList" :key="item.comment_id">
        <div class="top">
          <img class="avatar" :src="item.user.avatar_url" alt="avatar">
          <div class="name">{{ item.user.nick_name }}</div>
          <van-rate :size="16" :value="item.score/2" color="#ffd21e" void-icon="star" void-color="#eee"/>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="time">
          {{ item.create_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  props: {
    CommentList: {
      type: Array,
      default: () => [
        // {
        //   comment_id: 1,
        //   user: {
        //     avatar_url: 'https://example.com/avatar1.jpg',
        //     nick_name: 'User1'
        //   },
        //   rating: 4,
        //   content: '这是一条评论。',
        //   create_time: '2024-10-22 12:00'
        // },
        // {
        //   comment_id: 2,
        //   user: {
        //     avatar_url: 'https://example.com/avatar2.jpg',
        //     nick_name: 'User2'
        //   },
        //   rating: 5,
        //   content: '这是另一条评论。',
        //   create_time: '2024-10-22 13:00'
        // }
      ]
    }
  }
}
</script>

<style scoped lang="less">
// .comment-list {
//   background-color: #f5f5f5;
// }

.comment-content {
  padding-left: 15px;
  padding-right: 15px;
}

.comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }
</style>
