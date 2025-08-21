export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});
const browserAPI = (typeof browser !== 'undefined' ? browser : chrome);

// 根据用户偏好切换点击扩展图标时的打开行为（sidepanel 或 popup）
const CLICK_BEHAVIOR_KEY = 'clickOpenTarget'; // 'sidepanel' | 'popup'

async function applyClickBehavior(target) {
  const isSidePanel = target === 'sidepanel';
  try {
    if (browserAPI.sidePanel && browserAPI.sidePanel.setPanelBehavior) {
      await browserAPI.sidePanel.setPanelBehavior({ openPanelOnActionClick: isSidePanel });
    }
  } catch (err) {
    console.warn('sidePanel.setPanelBehavior not available', err);
  }

  try {
    // 当选择 sidepanel 时，清空 action 的 popup；选择 popup 时，设置为 popup.html
    if (browserAPI.action && browserAPI.action.setPopup) {
      await browserAPI.action.setPopup({ popup: isSidePanel ? '' : 'popup.html' });
    }
  } catch (err) {
    console.warn('action.setPopup not available', err);
  }
}

// 初始化：读取存储并应用行为；默认 sidepanel
browserAPI.storage?.local.get([CLICK_BEHAVIOR_KEY], (res) => {
  const target = res?.[CLICK_BEHAVIOR_KEY] || 'sidepanel';
  applyClickBehavior(target);
});

// 监听存储变化，动态应用
browserAPI.storage?.onChanged?.addListener((changes, area) => {
  if (area !== 'local') return;
  if (CLICK_BEHAVIOR_KEY in changes) {
    const newValue = changes[CLICK_BEHAVIOR_KEY]?.newValue || 'sidepanel';
    applyClickBehavior(newValue);
  }
});

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendData') {
    // 查询所有打开的标签页
    browserAPI.tabs.query({ url: '*://linux.do/*' }, (tabs) => {
      tabs.forEach((tab) => {
        browserAPI.tabs.sendMessage(tab.id, {
          action: 'setData',
          data: request.data
        });
      });
    });
  }
});

// 进入 bookmark 收藏夹
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'open_bookmark_page') {
    const bookmarkPageURL = browserAPI.runtime.getURL('bookmark.html');
    browserAPI.tabs.create({ url: bookmarkPageURL });
  }
});

// 进入 share 分享页面
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'open_share_page') {
    const extensionURL = browserAPI.runtime.getURL('share.html');
    browserAPI.tabs.create({ url: extensionURL });
  }
});

browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'webdav') {
    const { method, url, headers, data } = request;
    
    fetch(url, {
      method: method,
      headers: headers,
      body: data || undefined
    })
    .then(async response => {
      const text = await response.text();
      sendResponse({
        status: response.status,
        statusText: response.statusText,
        data: text
      });
    })
    .catch(error => {
      sendResponse({
        error: error.message
      });
    });
    
    return true; // 保持消息通道打开
  }
});