# 6.4. Alconna

::: tsukkomi 注
因为是外星来客，所以研究需要久一点也是合理的嘛
:::

<p align="center" style="font-size: 1.6rem; margin: 5px auto">loading...</p>
<p align="center" style="margin: 5px auto"><Curtain>在研究了在研究了</Curtain></p>
<p align="center" style="margin: 5px auto"><Curtain>在我下次更新是不会加载成功的 desu</Curtain></p>
<div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>

<style>
.loading {
    width: 80px;
    height: 30px;
    margin: 0 auto;
    position: relative;
}
.loading span {
    position: absolute;
    width: 10px;
    height: 100%;
    bottom: 0px;
    border-radius: 10px;
    background: var(--c-text-lighter);
    animation: loading 3s infinite ease-in-out;
}
.loading span:nth-child(2) {
    left: 14px;
    animation-delay: 0.2s;
}
.loading span:nth-child(3) {
    left: 28px;
    animation-delay: 0.4s;
}
.loading span:nth-child(4) {
    left: 42px;
    animation-delay: 0.6s;
}
.loading span:nth-child(5) {
    left: 56px;
    animation-delay: 0.8s;
}
.loading span:nth-child(6) {
    left: 70px;
    animation-delay: 1s;
}
@keyframes loading {
    0% {
        height: 5px;
        transform: translateY(0px);
        background: var(--c-text-lighter);
    }
    25% {
        height: 50px;
        transform: translateY(25px);
        background: var(--c-text-lightest);
    }
    50% {
        height: 5px;
        transform: translateY(0px);
        background: var(--c-text-lighter);
    }
    100% {
        height: 5px;
        transform: translateY(0px);
        background: var(--c-text-lighter);
    }
}
</style>
