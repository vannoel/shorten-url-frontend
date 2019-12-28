<template>
  <div class="page page-shorten">
    <section class="page_section">
      <h1 class="shorten_title">
        {{ $btbLang.translate('shorten.title') }}
      </h1>
      <div class="row direction-row align-items-center">
        <div class="col-10">
          <ModuleInput v-model="form.long_url" :placeholder="$btbLang.translate('shorten.url.placeholder')"/>
        </div>
        <div class="col">
          <ModuleButton fullSize @click="shortenURL">
            {{ $btbLang.translate('shorten.url.shorten') }}
          </ModuleButton>
        </div>
      </div>
    </section>
    <section class="page_section">
      <template v-if="urls.length">
        <h2 class="shorten_subtitle">
          {{ $btbLang.translate('shorten.history.title', {'count': urls.length}) }}
        </h2>
        <ModuleTimeline class="shorten_history" position="right">
          <template v-for="url in urls">
            <div :key="url.shortenAt" :slot="url.shortenAt">
              <div class="history_toolbar">
                <ModuleButton class="history_remove" color="red" @click="removeHistory(url.timestamp)">
                  <FAI :icon="['fas', 'trash-alt']" fixed-width/>
                </ModuleButton>
              </div>
              <div>{{ url.longURL }}</div>
              <div>{{ url.shortenURL }}</div>
              <div>{{ url.shortenAt }}</div>
            </div>
          </template>
        </ModuleTimeline>
      </template>
    </section>
  </div>
</template>

<script>
// import API from '@/api'
import {mapState} from 'vuex';

export default {
  data() {
    return {
      form: {
        long_url: ''
      }
    };
  },
  computed: {
    ...mapState('shorten',{
      'urls': 'urls'
    }),
  },
  mounted() {
    // console.log('API',API.shorten({
    //   long_url: 'https://www.facebook.com/'
    // }))
  },
  methods: {
    shortenURL: function() {
      let obj = { 
        longURL: this.form.long_url, 
        shortenURL: `short_${this.form.long_url}`, 
        shortenAt: Date.now(),
        isLocked: false
      };
      this.$store.dispatch('shorten/catch', obj);
      this.form.long_url = '';
    },
    removeHistory: function(timestamp) {
      this.$store.dispatch('shorten/remove', timestamp);
    }
  }
}
</script>

<style lang="scss">
.page-shorten {
  width: 50%;
  margin: auto;

  .shorten_title {
    @include font-5xl-l;
    @include padding-y(1rem);
    margin: 0;
    text-align: center;
  }
  .shorten_subtitle {
    @include font-2xl-l;
  }
  .shorten_history {
    width: 80%;
    margin: auto;
  }

  .history_toolbar {
    text-align: right;
  }
  .history_remove {
    padding: 0.5rem;
  }
}
</style>