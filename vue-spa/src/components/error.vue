<template>
  <div class="ui warning message">
    <i class="close icon"></i>
    <div class="header">Сервер вернул ошибку</div>
    {{error_message}}
  </div>
</template>
<script>
export default {
  name: "Error",
  data() {
    return {};
  },
  props: {
    error_message: String
  }
};
</script>