<template>
  <div class="ui comments block_comments">
    <h3 class="ui dividing header">Comments</h3>
    <div class="comment">
      <a class="avatar">
        <img src="/images/avatar/small/matt.jpg" />
      </a>
      <div class="content">
        <a class="author">Matt</a>
        <div class="metadata">
          <span class="date">Today at 5:42PM</span>
        </div>
        <div class="text">How artistic!</div>
        <div class="actions">
          <a class="reply">Reply</a>
        </div>
      </div>
    </div>
    <div class="comment">
      <a class="avatar">
        <img src="/images/avatar/small/elliot.jpg" />
      </a>
      <div class="content">
        <a class="author">Elliot Fu</a>
        <div class="metadata">
          <span class="date">Yesterday at 12:30AM</span>
        </div>
        <div class="text">
          <p>This has been very useful for my research. Thanks as well!</p>
        </div>
        <div class="actions">
          <a class="reply">Reply</a>
        </div>
      </div>
    </div>
    <div class="comment">
      <a class="avatar">
        <img src="/images/avatar/small/joe.jpg" />
      </a>
      <div class="content">
        <a class="author">Joe Henderson</a>
        <div class="metadata">
          <span class="date">5 days ago</span>
        </div>
        <div class="text">Dude, this is awesome. Thanks so much</div>
        <div class="actions">
          <a class="reply">Reply</a>
        </div>
      </div>
    </div>
    <form class="ui reply form">
      <div class="field">
        <textarea></textarea>
      </div>
      <div class="ui blue labeled submit icon button">
        <i class="icon edit"></i> Add Reply
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "commentsBlock",
  computed: {},
  data() {
    return {};
  },
  methods: {},
  components: {},
  props: {},
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