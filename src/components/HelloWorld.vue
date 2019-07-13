<template>
  <div class="class">
    <h3>{{value}}</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['value'],
  // template: `
  // <input type="text" v-bind:value="value" />
  // `
  // render: function (createElement) {
  //   const self = this;
  //   return createElement('input', {
  //     domProps: {
  //       value: self.value,
  //       type: "text"
  //     },
  //     on: {
  //       input: function (event) {
  //         self.$emit('input', event.target.value)
  //       }
  //     }
  //   })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
