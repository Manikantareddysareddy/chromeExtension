document.getElementById('downloadImages').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'downloadImages' }, (response) => {
        if (response && response.images.length > 0) {
          chrome.runtime.sendMessage({
            type: 'download',
            urls: response.images,
            filename: 'images'
          });
        }
      });
    });
  });
});

document.getElementById('downloadTables').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    }, () => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'downloadTables' }, (response) => {
        if (response && response.tables.length > 0) {
          response.tables.forEach((table) => {
            chrome.runtime.sendMessage({
              type: 'download',
              urls: [table.url],
              filename: `table-${table.index}.html`
            });
          });
        }
      });
    });
  });
});
