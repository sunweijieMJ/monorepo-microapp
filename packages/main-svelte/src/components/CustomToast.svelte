<div class="toast-wrapper">
    {#each toasts as toast (toast._id)}
        <div
            class="toast-item"
            in:fly="{{
                delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut,
            }}"
            out:fade={{
                duration: 500, opacity: 0,
            }}>
            {toast.msg}
        </div>
    {/each}
</div>
<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    export const duration = 2000;
    let timer = null;
    let toasts = [];
    let toastId = 0;

    const unshiftToast = () => {
        toasts = toasts.filter((a, i) => i > 0);
    };

    const pushToast = (msg = '') => {
        toasts = [...toasts, {
            _id: ++toastId,
            msg,
        }];
        timer = window.setTimeout(() => {
            unshiftToast();
        }, duration);
    };

    onMount(() => {
        window.pushToast = pushToast;
    });
</script>
<style lang="scss">
    .toast-wrapper {
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        text-align: center;
        z-index: 3000;
    }

    .toast-item {
        background: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
        color: #fff;
        margin: 10px auto;
        max-width: 400px;
        padding: 12px 10px;
    }
</style>
