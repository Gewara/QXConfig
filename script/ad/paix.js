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

(() => {
  try {
    const raw = ($response && $response.body) || ($request && $request.body) || '';
    const outer = JSON.parse(raw || '{}');

    // data may be a JSON string or object per template
    let dataObj;
    if (typeof outer.data === 'string') {
      try {
        dataObj = JSON.parse(outer.data || '{}');
      } catch {
        dataObj = {};
      }
    } else if (outer.data && typeof outer.data === 'object') {
      dataObj = outer.data;
    } else {
      dataObj = {};
    }

    // 1) Disable home page top popups
    const popups = Array.isArray(dataObj.INDEXTOPPOPUP) ? dataObj.INDEXTOPPOPUP : [];
    popups.forEach(it => {
      if (it && typeof it === 'object') it.enabled = false;
    });
    dataObj.INDEXTOPPOPUP = popups;

    // 2) Disable floating widget if exists
    if (dataObj.INDEXFLOAT && typeof dataObj.INDEXFLOAT === 'object') {
      dataObj.INDEXFLOAT.enabled = false;
    }

    // 3) Disable homepage carousel images if exist
    if (
      dataObj.HOMEPAGE &&
      dataObj.HOMEPAGE.topImage &&
      Array.isArray(dataObj.HOMEPAGE.topImage.imgList)
    ) {
      dataObj.HOMEPAGE.topImage.imgList.forEach(img => {
        if (img && typeof img === 'object') img.enabled = false;
      });
    }

    // 4) Turn off landing/loading pop images if present
    if ('isOpenLoadingImg' in dataObj) dataObj.isOpenLoadingImg = false;
    if ('isOpenlandingImg' in dataObj) dataObj.isOpenlandingImg = false;
    if ('IsPopUpWxPosition' in dataObj) dataObj.IsPopUpWxPosition = false;

    // Repack per template: outer.data must be a JSON string
    outer.data = JSON.stringify(dataObj);
    $done({ body: JSON.stringify(outer) });
  } catch (e) {
    $done({ body: JSON.parse($request.body) })
  }
})();
