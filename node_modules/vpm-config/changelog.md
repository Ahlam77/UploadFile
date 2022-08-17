v2.1.3
---
* Fixbug 修正环境检查方式，以node优先，解决node-webkit下两个环境叠加冲突的问题

v2.1.2
---
* Fixbug 修正``general``方法对空值的判断为``val === undefined``避免``null, 0, ''``被判断为空值
* 同步nodejs和aimeejs平台版本
