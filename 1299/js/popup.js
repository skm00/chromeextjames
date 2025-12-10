document.getElementById('captureButton').addEventListener('click', function() {
  const x = parseInt(document.getElementById('x').value);
  const y = parseInt(document.getElementById('y').value);
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);

  chrome.runtime.sendMessage({ cmd: 'captureArea', x: x, y: y, width: width, height: height });
});
