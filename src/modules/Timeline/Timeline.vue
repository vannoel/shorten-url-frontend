<template>
  <div :class="['module-timeline',
    `timeline-layout-${position}`]"
    v-bind="$attrs" 
    v-on="$listeners">
    <div class="timeline_container">
      <template v-for="(entry,index) in $slots">
        <div :key="index" 
          class="timeline_point">
          <div class="point_frame">
            <div class="frame_content">
              <slot :name="index" />
            </div>
          </div>
          <div class="point_dot" />
          <div class="point_offset" 
            v-if="isDualSite"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'horizontal' // horizontal, left, right, vertical, top, bottom,
    }
  },
  computed: {
    isDualSite(){
      return ((this.position === "horizontal") || (this.position === "vertical"));
    }
  },
}
</script>

<style lang="scss">
$point-size: 0.75rem;

.module-timeline {
  width:100%;
  height: 100%;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    background-color: $color-white;
  }
    
  .timeline_container {
    width:100%;
    height: 100%;
    overflow: auto;
    position: relative;
    display: flex;
    padding: 0.5rem;
  }

  .timeline_point {
    padding: 0.5rem;
    display: flex;
    flex-shrink: 0;
  }
  .point_dot {
    position: relative;
    padding: $point-size;
    width: $point-size;
    height: $point-size;
    border-radius: 50%;
    background-color:  $color-white;
    &:after {
      @include transition(background-color);
      content: '';
      position: absolute;
      border-radius: 50%;
      top: $point-size/4;
      bottom: $point-size/4;
      left: $point-size/4;
      right: $point-size/4;
      z-index: 1;
      background-color:  $color-primary-lll;
    }
    &:hover {
      &:after {
        background-color:  $color-primary-ll;
      }
    }
  }
  .point_offset {
    flex-grow: 1;
    flex-basis: calc(50% - #{$point-size});
  }
  .point_frame {
    flex-grow: 1;
    flex-basis: calc(50% - #{$point-size});
    &:hover {
      & ~ .point_dot{
        &:after {
          background-color:  $color-primary-l;
        }
      }
    }
  }
  .frame_content {
    background-color:  $color-white;
    color: $color-grey-d;
    border: 1px solid  $color-white;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    width:100%;
    height:100%;
  }
}

.module-timeline.timeline-layout-horizontal {
  &:after {
    width: $point-size/4;
    left: calc(50% - #{$point-size/8});
    top: 0;
    bottom:0;
  }
  .timeline_container {
    min-width: 300px;
    flex-direction: column;
  }
  .point_frame {
    padding: 0 1rem;
  }
  .timeline_point {
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
    &:nth-child(even){
      flex-direction: row;
    }
  }  
}

.module-timeline.timeline-layout-left {
  &:after {
    width: $point-size/4;
    left: calc(100% - 2rem + #{$point-size/4});
    top: 0;
    bottom:0;
  }
  .timeline_container {
    min-width: 300px;
    flex-direction: column;
  }
  .point_frame {
    padding: 0 1rem;
  }
  .timeline_point {
    flex-direction: row;
  }  
}

.module-timeline.timeline-layout-right {
  &:after {
    width: $point-size/4;
    right: calc(100% - 2rem + #{$point-size/4});
    top: 0;
    bottom:0;
  }
  .timeline_container {
    min-width: 300px;
    flex-direction: column;
  }
  .point_frame {
    padding: 0 1rem;
  }
  .timeline_point {
    flex-direction: row-reverse;
  }  
}

.module-timeline.timeline-layout-vertical {
  &:after {
    height: $point-size/4;
    top: calc(50% - #{$point-size/4});
    left: 0;
    right:0;
  }
  .timeline_container {
    min-height: 300px;
    flex-direction: row;
  }
  .point_frame {
    padding: 1rem 0;
  }
  .timeline_point {
    &:nth-child(odd) {
      flex-direction: column-reverse;
    }
    &:nth-child(even){
      flex-direction: column;
    }
  }  
}

.module-timeline.timeline-layout-top {
  &:after {
    height: $point-size/4;
    top: calc(100% - 1rem - #{$point-size});
    left: 0;
    right:0;
  }
  .timeline_container {
    min-height: 300px;
    flex-direction: row;
  }
  .point_frame {
    padding: 1rem 0;
  }
  .timeline_point {
    flex-direction: column;
  }  
}

.module-timeline.timeline-layout-bottom {
  &:after {
    height: $point-size/4;
    bottom: calc(100% - 1rem - #{$point-size});
    left: 0;
    right:0;
  }
  .timeline_container {
    min-height: 300px;
    flex-direction: row;
  }
  .point_frame {
    padding: 1rem 0;
  }
  .timeline_point {
    flex-direction: column-reverse;
  }  
}
</style>


