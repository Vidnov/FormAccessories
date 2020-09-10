<template>
  <div class="ui comments block_comments">
    <h3 class="ui dividing header">Comments</h3>
    {{ReqId}}
   
    <div class="comment"  v-for="(Comment,index) in Comments" v-bind:key='index'>
      <a class="avatar">
        <img src />
      </a>
      <div class="content">
        <a class="author">Comment</a>
        <div class="metadata">
          <span class="date">{{Comment.Date_Comments}}</span>
        </div>
        <div class="text">{{Comment.Text_Comments}}</div>
        <div class="actions">
          <a class="reply">Reply</a>
           <a target="_blank" :href="'http://localhost:3000/'+Comment.Image_Name_Comments" v-if= Comment.Image_Name_Comments class="reply">img</a>
        </div>
      </div>
    </div>
    <form class="ui reply form">
      <div class="field">
        <textarea v-model="Text_Comments"></textarea>
      </div>
      <div v-on:click='senderCommit(ReqId)' class="ui blue labeled submit icon button">
        <i class="icon edit"></i> Add Reply
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "commentsBlock",
  computed: {},

  data() {
    return {
      Text_Comments:''
    };
  },
  methods: {
    senderCommit:function(ReqId){
     axios
        .post("http://localhost:3000/request/comments", {
          Id:ReqId,
          Comment: this.Text_Comments,
          Sender:localStorage.HelpDeskMail
        })
        .then((res) => {
          this.Result_Status ="true";
          this.Result = res.data;

        })
        .catch((e) => {
          this.Error_Status = "true";
          this.Error_ = e;
        });
    }
  },
  mounted() {
  },
  components: {},
  props: { Comments: Array ,
  ReqId:String },
};
</script>

<style scoped>
.block_comments {
  width: auto;
  margin: 0 auto;
}
.comments {
  text-align: left;
}
</style>