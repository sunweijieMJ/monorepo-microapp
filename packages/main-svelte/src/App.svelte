<script lang="ts">
    import Router from './router/index.svelte';
</script>
<!-- 路由 -->
<Router />
<style lang="scss" global>
    /* 重置样式 */
    @use './assets/scss/_reset.scss';

    html,
    body,
    #main-root {
        background-color: #fff;
        min-height: 100vh;
        min-width: 1260px;
    }
</style>
