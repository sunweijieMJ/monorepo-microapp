<script lang="ts">
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button on:click="{increment}">Clicks: {count}</button>

<style>
  button {
    font-family: inherit;
    padding: 1em 2em;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    color: #ff3e00;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    font-size: inherit;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
