const blockBtn = document.querySelector("#block-btn");
const unblockBtn = document.querySelector("#unblock-btn");

blockBtn.addEventListener("click", () => {
  chrome.storage.local.set({ blocked: true });
  blockBtn.style.display = "none";
  unblockBtn.style.display = "block";
});

unblockBtn.addEventListener("click", () => {
  chrome.storage.local.set({ blocked: false });
  unblockBtn.style.display = "none";
  blockBtn.style.display = "block";
});

const onBlockClick = async () => {
  const { blocked } = await chrome.storage.local.get("blocked");
  if (blocked) {
    blockBtn.style.display = "none";
    unblockBtn.style.display = "block";
  } else {
    blockBtn.style.display = "block";
    unblockBtn.style.display = "none";
  }
};

onBlockClick();
