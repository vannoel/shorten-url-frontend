<template>
  <div class="page page-shorten">
    <section class="page_section">
      <h1 class="shorten_title">
        {{ $btbLang.translate('shorten.title') }}
      </h1>
      <p class="shorten_description">
        <span class="description_context">{{ $btbLang.translate('shorten.description') }}</span>
        <FAI class="description_link" :icon="['fas', 'external-link-alt']" fixed-width @click="redirectURL('https://tinyurl.com/')"/>
      </p>
      <div class="row direction-row align-items-center">
        <div class="col-xl-10 col-md-8 shorten_input">
          <ModuleInput size="md" v-model="form.long_url" :placeholder="$btbLang.translate('shorten.url.placeholder')"/>
        </div>
        <div class="col-xl-2 col-md-4 shorten_button">
          <ModuleButton fullSize @click="shortenURL" :disabled="form.long_url.length===0">
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
                    <ModuleInput class="history_form" size="sm" :value="url.longURL" @click="redirectURL(url.longURL)" readonly/>
                  </div>
                  <ModuleButton class="history_copy" size="sm" color="grey" @click="copyURL(url.longURL)">
                    {{ $btbLang.translate('shorten.history.copy') }}
                  </ModuleButton>
                </div>
                
                <div class="history_label">{{ $btbLang.translate('shorten.history.shortenURL.title') }}</div>
                <div class="row align-items-center">
                  <div class="col">
                    <ModuleInput class="history_form" size="sm" :value="url.shortenURL" @click="redirectURL(url.shortenURL)" readonly/>
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
import {mapState} from 'vuex'

import API from '@/api'

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
  methods: {
    reviseISOString: function(timestamp) {
      let obj = _reviseISOString(new Date(timestamp).toISOString())
      return `${obj.date} ${obj.time}`
    },
    shortenURL: function() {
      let obj = { 
        longURL: this.form.long_url, 
        shortenURL: '', 
        shortenAt: Date.now(),
        isLocked: false
      };
      API.shorten(this.form.long_url).then(({data})=>{
        switch(data.status)
        {
          case 200:
            this.$swal({
              text: this.$btbLang.translate('shorten.url.submit.success', {url: data.payload.url}),
              buttons: {
                open: {
                  text: this.$btbLang.translate('alert.button.open'),
                  className: "module-button button-color-grey button-type-solid button-size-md",
                },
                copy: {
                  text: this.$btbLang.translate('alert.button.copy'),
                  className: "module-button button-color-grey button-type-solid button-size-md",
                },
                close: {
                  text: this.$btbLang.translate('alert.button.ok'),
                  className: "module-button button-color-primary button-type-solid button-size-md",
                }
              },
              icon: 'success',
              closeOnClickOutside: false
            }).then((value) => {
              switch (value) {
                case "open":
                  this.redirectURL(data.payload.url)
                  break;
                case "copy":
                  this.copyURL(data.payload.url)
                  break;
                default:
                  obj.shortenURL = data.payload.url;
                  this.$store.dispatch('shorten/catch', obj);
                  this.form.long_url = '';
                  break;
              }
            })
            break;
          case 400:
            this.$swal({
              text: this.$btbLang.translate('shorten.url.submit.invalidURL'),
              button: {
                text: this.$btbLang.translate('alert.button.ok'),
                className: "module-button button-color-red button-type-solid button-size-md",
              },
              icon: 'error',
              closeOnClickOutside: false
            })
            break;
        }
      }).catch(()=>{
        this.$swal({
          text: this.$btbLang.translate('shorten.url.submit.unlnowen'),
          button: {
            text: this.$btbLang.translate('alert.button.ok'),
            className: "module-button button-color-red button-type-solid button-size-md",
          },
          icon: 'error',
          closeOnClickOutside: false
        })
      })
    },
    removeHistory: function(timestamp) {
      this.$store.dispatch('shorten/remove', timestamp);
    },
    redirectURL: function(url) {
      window.open(url)
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
  width: 100%;
  margin: auto;
  padding: 1rem;
  @include media-breakpoint-up-md {
    width: 50%;
    padding: 0;
  }

  .shorten_title {
    @include font-5xl-l;
    margin: 1rem 0 0;
    text-align: center;
  }
  .shorten_description {
    @include margin-y(1rem);
    text-align: center;

    .description_link {
      margin-left: 0.5rem;
      color: $color-primary;
      cursor: pointer;
      
      &:hover {
        color: $color-primary-dd;
      }
    }
  }
  .shorten_button {
    margin-top: 1rem;
    @include media-breakpoint-up-md {
      margin: 0;
    }
  }
  .shorten_subtitle {
    @include font-lg-l;
    @include margin-y(0.25rem);
    @include media-breakpoint-up-md {
      @include font-2xl-l;
      @include margin-y(1rem);
    }
  }
  .shorten_history {
    width: 100%;
    margin: 1rem auto;
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
  .history_form {
    .body_content {
      cursor: pointer;
    }
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