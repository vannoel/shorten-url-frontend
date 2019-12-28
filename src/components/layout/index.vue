<template>
  <div class="component-layout">
    <div class="layout_container">
      <div class="container_head">
        <div class="head_logo">
          <img src="@/assets/images/BTB_Vue_150_150.png">
        </div>
        <div class="head_title">
          <span>Black Tool Box Laboratory</span>
        </div>
        <div class="hred_toolbar">
          <div class="toolbar_language">
            <ModulePopover index="language" vertical="bottom" horizontal="center" auto>
              <div class="language_opener">
                <FAI :icon="['fas', 'globe']" fixed-width/>
                <span class="language_actived">
                  {{ $btbLang.get().label }}
                </span>
              </div>
              <template #content="slotProps">
                <div class="language_menu">
                  <template v-for="lang in $btbLang.menu()">
                    <div class="language_lang" :key="lang.index" @click="switchLanguage(lang.index); slotProps.close()">
                      {{lang.label}}
                    </div>
                  </template>
                </div>
              </template>
            </ModulePopover>
          </div>
        </div>
      </div>
      <div class="container_body">
        <router-view :key="env.updateTimestamp"/>
      </div>
      <div class="container_foot">
        <div class="foot_item">
          <span>
            {{ $btbLang.translate('powered_by') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      env: {
        updateTimestamp: Date.now()
      }
    };
  },
  computed: {
    ...mapState([
      'language'
    ]),
  },
  mounted() {
    if((this.language.length === 0) && (this.$btbLang.menu()[0]))
    {
      this.switchLanguage(this.$btbLang.menu()[0].index)
      this.$store.commit('SET_LANGUAGE', this.$btbLang.menu()[0].index)
    } else if(this.language !== this.$btbLang.get().index) {
      this.switchLanguage(this.language)
    }
  },
  methods: {
    switchLanguage: function(lang) {
      if (this.$btbLang.get().index !== lang) {
        this.$btbLang.set(lang)
        this.$store.commit('SET_LANGUAGE', lang)
        this.env.updateTimestamp = Date.now()
        this.$forceUpdate()
      }
    }
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
    color: $color-grey-ddd;
    flex-shrink: 0;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .head_logo {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;

      & > img {
        width:100%;
      }
    }
    .head_title {
      @include font-xl;
      @include margin-x(0.5rem);
      flex-grow: 1;
    }
    .hred_toolbar {
      @include radius-full;
      padding: 0.5rem;
      flex-shrink: 0;
    }
    .language_opener {
      @include transition(color);
      cursor: pointer;
      &:hover {
        color: $color-primary-dd;
      }

      .language_actived {
        margin-left: 0.25rem;
      }
    }
    .language_menu {
      .language_lang {
        @include transition((background-color, color));
        margin: 0.5rem;
        padding: 0.25rem;
        text-align: center;
        cursor: pointer;

        &:hover {
          background-color: $color-primary-ll;
          color: $color-white;
        }
      }
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