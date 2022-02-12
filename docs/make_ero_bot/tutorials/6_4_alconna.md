# 6.4. Alconna

:::tsukkomi 注
因为是外星来客，所以研究需要久一点也是合理的嘛
:::

<p align="center" style="margin: 0px 0px 0px 0px"><Curtain>这个 Loading 只是在告诉你“在研究了在研究了”</Curtain></p>
<p align="center" style="margin: 0px 0px 0px 0px"><Curtain>除非看到我下次更新，不然是不会加载成功的 desu</Curtain></p>
<p align="center" style="font-size: 2em; margin: 0px 0px 0px 0px">Loading</p>
<div class="loading">  
    <span></span>  
    <span></span>  
    <span></span>  
    <span></span>  
    <span></span>  
</div>

<style>
    .loading{
            width: 150px;
            height: 15px;
            margin: 0 auto;
            position: relative;
        }
        .loading span{
            position: absolute;
            width: 15px;
            height: 100%;
            border-radius: 50%;
            background: var(--c-text);
            -webkit-animation: load 1.04s ease-in infinite alternate;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
                -webkit-transform: translate(0px);
            }
            100%{
                opacity: 0.2;
                -webkit-transform: translate(150px);
            }
        }
        .loading span:nth-child(1){
            -webkit-animation-delay:0.13s;
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.26s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.39s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.52s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.65s;
        }  
</style>
