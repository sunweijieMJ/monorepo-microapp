<script>
  import { Router, Route } from 'svelte-routing';
  import Layout from '../layout/index.svelte';

  export const url = '';
</script>
<Router url="{url}">
  <Route path="*" component="{Layout}"></Route>
</Router>
