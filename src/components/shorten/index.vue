<template>
  <div class="page page-shorten">
    <section class="page_section">
      <h1 class="shorten_title">
        Shorten URL
      </h1>
      <div class="row direction-row align-items-center">
        <div class="col-10">
          <ModuleInput placeholder="Let's shorten the URL!"/>
        </div>
        <div class="col">
          <ModuleButton fullSize>Shorten</ModuleButton>
        </div>
      </div>
    </section>
    <section class="page_section">
      <h2 class="shorten_subtitle">Here is The latest %count URL you shortened</h2>
      <ModuleTimeline>
        <div :slot="1">1</div>
        <div :slot="2">2</div>
        <div :slot="3">3</div>
        <div :slot="4">4</div>
        <div :slot="5">5</div>
        <div :slot="6">6</div>
        <div :slot="7">7</div>
        <div :slot="8">8</div>
        <div :slot="9">9</div>
      </ModuleTimeline>
    </section>
  </div>
</template>

<script>
// import {mapState} from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.page-shorten {
  width: 60%;
  margin: auto;

  .shorten_title {
    @include font-5xl-l;
    @include padding-y(1rem);
    margin: 0;
    color: $color-white;
    text-align: center;
  }
  .shorten_subtitle {
    @include font-2xl-l;
    color: $color-white;
  }
}
</style>