/*******************************
  * Paix Ad Script
  * hostname: *.51hchc.com
  * version: V1.0.0
  * update: 2025-11-20
*******************************/

/*****************************
[rewrite_local]

^https?:\/\/stat\.51hchc\.com\/app-config-new\/\d+ url script-analyze-echo-response https://raw.githubusercontent.com/Gewara/QXConfig/main/script/ad/paix.js

[mitm]

hostname = stat.51hchc.com
*****************************/

var obj = JSON.parse($request.body),
const INDEXTOPPOPUP = obj.data.INDEXTOPPOPUP || [];

INDEXTOPPOPUP.forEach(item => {
  item.enabled = false;
});

$done({ body: JSON.stringify(obj) });
