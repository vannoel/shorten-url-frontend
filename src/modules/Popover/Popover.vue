<template>
  <div :class="['module-popover',
                `popover-vertical-${env.vertical}`,
                `popover-horizontal-${env.horizontal}`]"
        v-bind="$attrs"
        v-on="$listeners"
        @click="togglePopover">
    <div class="popover_trigger"
          ref="trigger">
      <slot />
    </div>
    <div v-show="env.active"
          class="popover_wrapper"
          @click.stop>
      <div class="popover_container"
            ref="container">
        <slot name="content" :close="togglePopover"/>
      </div>
    </div>
  </div>
</template>

<script>
import popoverStore from './store.js'

export default {
  name: 'module-popover',
  props: {
    index: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: function () {
        return undefined
      }
    },
    auto: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: String,
      default: 'bottom' // top, bottom
    },
    horizontal: {
      type: String,
      default: 'left' // left, center, right
    }
  },
  data () {
    return {
      env: {
        active: false,
        auto: false,
        vertical: 'bottom',
        horizontal: 'left'
      }
    }
  },
  mounted () {
    this.updateValue()
  },
  updated () {
    this.updateValue()
    if (this.env.active && this.env.auto) {
      let tempVertical = this.env.vertical
      let tempHorizontal = this.env.horizontal
      const nodeTrigger = this.$refs.trigger
      const nodeTriggerPosition = this.findWindowPos(nodeTrigger)
      const nodeContainer = this.$refs.container
      if (nodeContainer.offsetWidth > 0) {
        tempVertical = (window.innerHeight > nodeContainer.offsetHeight + nodeTrigger.offsetHeight + nodeTriggerPosition.posTop)
          ? this.vertical : 'top'
        tempHorizontal = (window.innerWidth > nodeContainer.offsetWidth + nodeTriggerPosition.posLeft)
          ? this.horizontal : (window.innerWidth > nodeContainer.offsetWidth * (2 / 3) + nodeTriggerPosition.posLeft)
            ? 'center' : 'right'
        if (this.env.vertical !== tempVertical) {
          this.env.vertical = tempVertical
        }
        if (this.env.horizontal !== tempHorizontal) {
          this.env.horizontal = tempHorizontal
        }
      }
      this.env.auto = !this.env.auto
    }
  },
  methods: {
    updateValue: function () {
      if (typeof this.active !== 'undefined') {
        this.env.active = this.active
        this.env.auto = this.auto
      }
    },
    findWindowPos: function (node) {
      let posLeft = 0
      let posTop = 0
      if (node.offsetParent) {
        do {
          posLeft += node.offsetLeft
          posTop += node.offsetTop
        } while ((node = node.offsetParent))
      }
      return {
        posLeft: posLeft - window.scrollX,
        posTop: posTop - window.scrollY
      }
    },
    togglePopover: function () {
      this.env.active = !this.env.active
      if (this.env.active) {
        this.env.auto = this.auto
        this.addListener()
        popoverStore.set(this.index)
      } else {
        this.removeListener()
        popoverStore.set()
      }
    },
    addListener: function () {
      document.addEventListener('click', this.handleDocumentClick)
    },
    removeListener: function () {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick: function () {
      const index = this.index
      if (popoverStore.get() !== index) {
        this.env.active = false
        this.removeListener()
      } else {
        popoverStore.set()
      }
    }
  }
}
</script>

<style lang="scss">
$popover-color: $color-grey-ddd;
$popover-bg-color: $color-white;
$popover-border-color: $color-primary-d;

$popover-z-index: 1;

.module-popover {
  position: relative;
  display: inline-flex;
  align-items: center;
  .popover_wrapper {
    z-index: $popover-z-index;
    width: 100%;
    position: absolute;
    display: flex;
    margin: 0.5rem 0;
  }
  .popover_container {
    @include radius-sm;
    @include border-solid(1px);
    background-color: $popover-bg-color;
    border-color: $popover-border-color;
    position: relative;
    display: flex;

    &::before,
    &::after {
      content: '';
      @include border-solid(0.5rem);
      position: absolute;
    }
  }
  &.popover-vertical-top {
    .popover_wrapper {
      bottom: 100%
    }
    .popover_container {
      &::before {
        @include border-solid-b(0);
        border-color: $popover-border-color transparent transparent transparent;
        top: 100%;
      }
      &::after {
        @include border-solid-b(0);
        border-color: $color-white transparent transparent transparent;
        top: calc(100% - 1px);
      }
    }
  }
  &.popover-vertical-bottom {
    .popover_wrapper {
      top: 100%;
    }
    .popover_container {
      &::before {
        @include border-solid-t(0);
        border-color: transparent transparent $popover-border-color;
        bottom: 100%;
      }
      &::after {
        @include border-solid-t(0);
        border-color: transparent transparent $color-white;
        bottom: calc(100% - 1px);
      }
    }
  }

  &.popover-horizontal-left {
    .popover_wrapper {
      justify-content: flex-start;
    }
    .popover_container {
      justify-content: flex-start;
      &::before,
      &::after {
        margin-left: 0.25rem;
      }
    }
  }
  &.popover-horizontal-center {
    .popover_wrapper,
    .popover_container {
      justify-content: center;
    }
  }
  &.popover-horizontal-right {
    .popover_wrapper {
      justify-content: flex-end;
    }
    .popover_container {
      justify-content: flex-end;
      &::before,
      &::after {
        margin-left: -0.25rem;
      }
    }
  }
}
</style>
