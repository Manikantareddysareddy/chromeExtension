chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'download') {
      request.urls.forEach((url) => {
        chrome.downloads.download({
          url: url,
          filename: request.filename
        });
      });
    }
  });