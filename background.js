// const blockBtn = document.querySelector("#block-btn");
// const unblockBtn = document.querySelector("#unblock-btn");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ blocked: false });
});

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return;
  console.log(tabId, frameId);
  chrome.scripting.executeScript({
    target: { tabId },
    function: newPageLoad,
  });
});

const newPageLoad = async () => {
  const { blocked } = await chrome.storage.local.get("blocked");
  if (blocked) {
    const WatchLinkInNavbar = document.querySelector(
      'html body div[role="banner"] div[role="navigation"] ul li:nth-of-type(4)'
    );
    const watchLinkInSidebar = document.querySelector(
      'html body div[role="navigation"] div[data-pagelet="LeftRail"] ul li:nth-of-type(4)'
    );
    const shortCutForWatch = document.querySelector('div[aria-label="Shortcuts within Facebook Watch"]');
    setTimeout(() => {
      if (WatchLinkInNavbar) WatchLinkInNavbar.remove();
      if (shortCutForWatch) shortCutForWatch.remove();
      if (watchLinkInSidebar) watchLinkInSidebar.remove();
    }, 1000);
    if (location.href.includes("/watch")) {
      const watchFeed = document.querySelector("#watch_feed");
      if (watchFeed) watchFeed.remove();
      const mainPage = document.querySelector('div[role="main"]');
      mainPage.innerHTML = `
      <div class="display: grid; place-items: center; text-alighn: center">
        <h1 style="font-size: 2rem; margin-top: 3rem; margin-bottom: 1rem;"> Go away. You have no power here! </h1>
        <img src="https://64.media.tumblr.com/909741db3ec7f39a3bf72cf58e28a463/tumblr_oq8et9qmaf1rpduwho1_500.gifv" alt="Gandalf gif">
      </div>
      `;
    }
  }
};
