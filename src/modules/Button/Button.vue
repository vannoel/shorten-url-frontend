<template>
  <button :class="['module-button',
             `button-color-${color}`,
             `button-type-${type}`,
             {'button-fullSize': fullSize}]"
          v-bind="$attrs"
          v-on="$listeners">
    <div class="button_item">
      <slot name="prepend" />
    </div>
    <div class="button_item">
      <slot />
    </div>
    <div class="button_item">
      <slot name="append" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'oc-button',
  props: {
    color: {
      type: String,
      default: 'primary' // refer to Button.scss
    },
    type: {
      type: String,
      default: 'solid' // solid, ghost, border, text, inline
    },
    fullSize: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import "./Button.scss";

.module-button {
  @include transition(all);
  @include border-solid(1px);
  @include font-md;
  @include radius-lg;
  display: inline-flex;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  outline: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &.button-fullSize {
    display: flex;
    width: 100%;
  }
  &:disabled {
    @include opacity-25;
    cursor: not-allowed;
  }

  &.button-type-solid {
    @for $i from 1 through length($color-list-btn-solid) {
      $colorObj: nth($color-list-btn-solid, $i);
      &.button-color-#{map-get($colorObj, index)}
      {
        color: map-get($colorObj, textColor);
        border-color: map-get($colorObj, bgColor);
        background-color: map-get($colorObj, bgColor);
        &:not(:disabled):hover {
          border-color: map-get($colorObj, bgColorHover);
          background-color: map-get($colorObj, bgColorHover);
        }
        &:not(:disabled):active {
          border-color: map-get($colorObj, bgColorActive);
          background-color: map-get($colorObj, bgColorActive);
        }
      }
    }
  }

  &.button-type-text {
    border-color: transparent;
    background-color: transparent;
    @for $i from 1 through length($color-list-btn-text) {
      $colorObj: nth($color-list-btn-text, $i);
      &.button-color-#{map-get($colorObj, index)}
      {
        color: map-get($colorObj, textColor);
        &:not(:disabled):hover{
          color: map-get($colorObj, textColorHover);
        }
        &:not(:disabled):active{
          color: map-get($colorObj, textColorActive);
        }
      }
    }
  }

  &.button-type-inline {
    border-color: transparent;
    background-color: transparent;
    @for $i from 1 through length($color-list-btn-text) {
      $colorObj: nth($color-list-btn-text, $i);
      &.button-color-#{map-get($colorObj, index)}
      {
        color: map-get($colorObj, textColor);
        &:not(:disabled):hover{
          color: map-get($colorObj, textColorHover);
        }
        &:not(:disabled):active{
          color: map-get($colorObj, textColorActive);
        }
      }
    }
    &.button-size-lg,
    &.button-size-md,
    &.button-size-sm  {
      padding: 0;
    }
  }
}
</style>
