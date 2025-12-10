function getBottomHalfOfImage(imageUrl, lastHeight) {
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // 处理跨域问题
  img.onload = function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = lastHeight;

    // 裁剪图片的下半部分
    ctx.drawImage(img, 0, height - lastHeight, width, lastHeight, 0, 0, width, lastHeight);
    const bottomHalfDataUrl = canvas.toDataURL('image/png');
    chrome.runtime.sendMessage({ cmd: 'bottomHalfImage', dataUrl: bottomHalfDataUrl });
  };
  img.src = imageUrl;
}

// 监听来自后台脚本的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'getBottomHalfImage') {
    getBottomHalfOfImage(request.imageUrl, request.lastHeight);
  }
});





