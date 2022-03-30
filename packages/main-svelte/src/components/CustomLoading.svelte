<!-- <div
  class="circle"
  style="--size: {size}{unit}; --color: {color}; --duration: {duration}"
></div>
<script lang="ts">
  export type SpinnerTypes = {
    size: string | number;
    color: string;
    unit: string;
    duration: string;
  };

  export let color: SpinnerTypes['color'] = '#FF3E00';
  export let unit: SpinnerTypes['unit'] = 'px';
  export let duration: SpinnerTypes['duration'] = '0.75s';
  export let size: SpinnerTypes['size'] = '60';
</script>
<style lang="scss">
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotate;
  }
</style> -->
