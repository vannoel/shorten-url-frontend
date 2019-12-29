<template>
  <div class="page page-shorten">
    <section class="page_section">
      <h1 class="shorten_title">
        {{ $btbLang.translate('shorten.title') }}
      </h1>
      <div class="row direction-row align-items-center">
        <div class="col-10">
          <ModuleInput size="md" v-model="form.long_url" :placeholder="$btbLang.translate('shorten.url.placeholder')"/>
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
        <input id="copier" class="history_copier">
        <ModuleTimeline class="shorten_history" position="right">
          <template v-for="url in urls">
            <div :key="url.shortenAt" :slot="url.shortenAt">
              <div class="history_topBar">
                <div class="history_datetime"> 
                  {{ reviseISOString(url.shortenAt) }}
                </div>
                <ModuleButton class="history_remove" color="red" @click="removeHistory(url.shortenAt)">
                  <FAI :icon="['fas', 'trash-alt']" fixed-width/>
                </ModuleButton>
              </div>
              <div class="history_URL">
                <div class="history_label">{{ $btbLang.translate('shorten.history.longURL.title') }}</div>
                <div class="row align-items-center">
                  <div class="col">
                    <ModuleInput size="sm" :value="url.longURL" readonly/>
                  </div>
                  <ModuleButton class="history_copy" size="sm" color="grey" @click="copyURL(url.longURL)">
                    {{ $btbLang.translate('shorten.history.copy') }}
                  </ModuleButton>
                </div>
                
                <div class="history_label">{{ $btbLang.translate('shorten.history.shortenURL.title') }}</div>
                <div class="row align-items-center">
                  <div class="col">
                    <ModuleInput size="sm" :value="url.shortenURL" readonly/>
                  </div>
                  <ModuleButton class="history_copy" size="sm" color="grey" @click="copyURL(url.shortenURL)">
                    {{ $btbLang.translate('shorten.history.copy') }}
                  </ModuleButton>
                </div>
              </div>
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

import _reviseISOString from '@/assets/utils/reviseISOString.js';

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
    reviseISOString: function(timestamp) {
      let obj = _reviseISOString(new Date(timestamp).toISOString())
      return `${obj.date} ${obj.time}`
    },
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
    },
    copyURL: function(url) {
      let copyText = document.querySelector(`#copier`);
      copyText.value = url;
      copyText.select();
      document.execCommand("copy");
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

  .history_topBar {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .history_datetime {
    @include font-lg-b;
    color: $color-grey-ddd;
    flex-grow: 1;
  }
  .history_remove {
    flex-shrink: 0;
    padding: 0.25rem;
  }
  .history_URL {
    margin-top: 0.5rem;
  }
  .history_label {
    @include margin-y(0.25rem);
  }
  .history_copy {
    flex-shrink: 0;
    margin-right: 0.5rem;
  }

  .history_copier {
    opacity: 0;
    height: 0;
  }
}
</style>