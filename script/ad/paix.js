/*******************************
  * Paix Ad Script
  * hostname: *.51hchc.com
  * version: V1.0.0
  * update: 2025-11-20
*******************************/

/*****************************
[rewrite_local]

^https?:\/\/stat\.51hchc\.com\/app-config-new\/\d+ url script-response-body https://raw.githubusercontent.com/Gewara/QXConfig/main/script/ad/paix.js

[mitm]

hostname = stat.51hchc.com
*****************************/

(() => {
  try {
    const raw = ($response && $response.body) || ($request && $request.body) || '';
    const outer = JSON.parse(raw || '{}');

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

    // 首页弹窗广告
    const popups = Array.isArray(dataObj.INDEXTOPPOPUP) ? dataObj.INDEXTOPPOPUP : [];
    popups.forEach(it => {
      if (it && typeof it === 'object') it.enabled = false;
    });
    dataObj.INDEXTOPPOPUP = popups;

    // 首页悬浮广告
    if (dataObj.INDEXFLOAT && typeof dataObj.INDEXFLOAT === 'object') {
      dataObj.INDEXFLOAT.enabled = false;
    }

    if (dataObj.BASIC && typeof dataObj.BASIC === 'object') {
      // 关闭启动页图片
      if ('isOpenlandingImg' in dataObj.BASIC) dataObj.BASIC.isOpenlandingImg = false
      // if ('isOpenLoadingImg' in dataObj.BASIC) dataObj.BASIC.isOpenLoadingImg = false

      // 移除礼品卡 tabbar
      if (dataObj.BASIC.menuIcon && Array.isArray(dataObj.BASIC.menuIcon.menuList)) {
        dataObj.BASIC.menuIcon.menuList = dataObj.BASIC.menuIcon.menuList.filter(
          (item) => item.iconName !== 'public-cup'
        )
      }
      if (dataObj.OTHER && typeof dataObj.OTHER === 'object') {
        dataObj.OTHER.indexLanding = { isOpenLoadingImg: false, landingImg: '' }
        // dataObj.OTHER.indexLoading = { isOpenlandingImg: false, loadingImg: '' }
      }
    }

    outer.data = JSON.stringify(dataObj);
    $done({ body: JSON.stringify(outer) });
  } catch (e) {
    $done({ body: $request.body })
  }
})();
