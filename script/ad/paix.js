/*******************************
  * Paix Ad Script
  * hostname: *.51hchc.com
  * version: V1.0.0
  * update: 2025-11-20
*******************************/

// request url: https://stat.51hchc.com/app-config-new/15441?timestamp=20251119172546

var data = JSON.parse($request.body),
const INDEXTOPPOPUP = data.INDEXTOPPOPUP || [];

INDEXTOPPOPUP.forEach(item => {
  item.enabled = false;
});

$done({ body: JSON.stringify(data) });
