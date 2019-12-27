<template>
  <div class="component-layout">
    <div class="layout_container">
      <div class="container_head">
        <img class="head_logo"
           src="@/assets/images/BTB_Vue_150_150.png">
        <span class="head_title">
          Black Tool Box Laboratory
        </span>
      </div>
      <div class="container_body">
        <router-view />
      </div>
      <div class="container_foot">
        <div class="foot_item">
          Powered by Black Tool Box Laboratory.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
}
</script>

<style lang="scss">
.component-layout {
  .layout_container {
    width: 100%;
    height:100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .container_head {
    @include font-xl;
    color: $color-grey-ddd;
    flex-shrink: 0;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .head_logo {
      width: 2rem;
      flex-shrink: 0;
      margin-right: 0.5rem;
    }
  }
  .container_body {
    flex-grow: 1;
    overflow: auto;
    background-color: $color-primary-lll;
  }
  .container_foot {
    @include font-sm;
    text-align: right;
    padding: 0.5rem;
    flex-shrink: 0;
    color: $color-grey-ddd;
  }
}
</style>