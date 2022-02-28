# 15. 异步画~~涩~~图

在看了那么多篇文档以及 [其他 bot](../appendix/awesome_bot.md) 的源码，
想必你已经做了一个**带有 Pillow / PIL 的制图**的模组吧~

但是，你有没有发现，随着你制图功能被调用的越来越多，你的 bot 又双叒叕卡了。

可能会吓得你赶紧去寻找问题出现的原因，随着你不断的收集数据及测试，
你最终会发现，原来是你的制图功能用时太久了。
太久也就算了，关键是在制图期间，**任何其他代码都在等待**。

:::warning
以下办法通常情况下并不能帮你解决**制图慢**的问题，  
只是将这个办法从同步变成了异步（即治标不治本）。

假设你真的想要加快制图的速度，
并且愿意牺牲一点点撸码体验，  
那么建议你去试试 `opencv-python` 之类的库。<br/><Curtain type="warning"> opencv-python 虽然使用方法跟 Pillow 完全不同，但就速度而言基本上算得上是降维打击了</Curtain>
:::

## 快速实例



<p align="center" style="font-size: 30px"><strong>Moyuing~</strong></p>

<Loading></Loading>
