<template>
  <div :class="['module-input',
                {'input-readonly': readonly},
                {'input-disabled': disabled},
                {'input-active': isActive},
                {'form-group_member': formGroup}]">
    <template v-if="$slots.prepend">
      <div class="input_item item-prepend">
        <slot name="prepend" />
      </div>
    </template>
    <label class="input_item item-body">
      <template v-if="$slots.innerPrepend">
        <div class="body_icon icon-before">
          <slot name="innerPrepend" />
        </div>
      </template>
      <input class="body_content"
            :value="env.formValue"
            v-bind="$attrs"
            v-on="$listeners"
            @input="changeValue"
            @focus="focusInput"
            @blur="blurInput">
      <template v-if="$slots.innerAppend">
        <div class="body_icon icon-after">
          <slot name="innerAppend" />
        </div>
      </template>
    </label>
    <template v-if="$slots.append">
      <div class="input_item item-append">
        <slot name="append" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'oc-input',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    formGroup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      env: {
        formValue: '',
        isFocused: false
      }
    }
  },
  mounted () {
    this.updateValue()
  },
  updated () {
    this.updateValue()
  },
  computed: {
    isActive: function () {
      return (this.env.formValue.toString().length > 0 || this.env.isFocused)
    },
  },
  methods: {
    updateValue: function () {
      if (typeof this.value !== 'undefined') {
        this.env.formValue = this.value
      }
    },
    changeValue: function (event) {
      if (this.env.formValue !== event.target.value) {
        this.env.formValue = event.target.value
        this.$emit('update', event.target.value)
      }
    },
    focusInput: function () {
      this.env.isFocused = (!this.readonly)
    },
    blurInput: function () {
      this.env.isFocused = false
    }
  }
}
</script>

<style lang="scss">
$input-add-color: $color-grey-ddd;
$input-add-bg-color: $color-grey-ll;
$input-add-border-color: $color-grey-l;
$input-add-active-border-color: $color-grey;

$input-bg-color: $color-white;
$input-active-color: $color-grey-dd;
$input-border-color: $color-grey-l;
$input-disabled-color: $color-grey;
$input-disabled-bg-color: $color-default;

$input-insert-icon-color: $color-grey;
$input-insert-icon-active-color: $color-grey-dd;

@mixin addLayout {
  @include border-solid(1px);
  color: $input-add-color;
  border-color: $input-add-border-color;
  background-color: $input-add-bg-color;
}

.module-input {
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;

  .item-body {
    @include border-solid(1px);
    border-color: $input-border-color;
    background-color: $input-bg-color;
    flex-grow: 1;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .item-prepend {
    @include addLayout;
    flex-shrink: 0;
    border-right: none;
  }
  .item-append {
    @include addLayout;
    flex-shrink: 0;
    border-left: none;
  }

  .body_content {
    @include font-md;
    width: 100%;
    flex-grow: 1;
    outline: none;
    border-color: transparent;
    background-color: transparent;
  }
  .body_content:-webkit-autofill {
    -webkit-text-fill-color: $input-bg-color;
  }
  .body_icon {
    color: $input-insert-icon-color;
    flex-shrink: 0;
    &.icon-before {
      padding-left: 1rem;
    }
    &.icon-after {
      padding-right: 1rem;
    }
  }

  &.input-active {
    .item-body{
      color: $input-active-color;
      border-color: $input-add-active-border-color;
    }
    .item-prepend,
    .item-append {
      border-color: $input-add-active-border-color;
    }
    .body_icon {
      color: $input-insert-icon-active-color;
    }
  }

  &.input-readonly {
    .body_content {
      cursor: text;
      color: $input-disabled-color;
    }
    .item-body,
    .item-prepend,
    .item-append{
      color: $input-disabled-color;
      border-color: $input-disabled-color;
      background-color: $input-disabled-bg-color;
    }
  }
  &.input-disabled {
    .body_content {
      cursor: not-allowed;
      color: $input-disabled-color;
    }
    .item-body,
    .item-prepend,
    .item-append{
      color: $input-disabled-color;
      border-color: $input-disabled-color;
      background-color: rgba($input-disabled-bg-color, 0.5);
    }
    * {
      cursor: not-allowed;
    }
  }

  .item-prepend,
  .item-append,
  .body_content {
    @include font-md;
    padding: 0.5rem 1rem;
  }
  .input_item{
    &:first-child {
      @include radius-lg-l;
    }
    &:last-child {
      @include radius-lg-r;
    }
  }
}
</style>
