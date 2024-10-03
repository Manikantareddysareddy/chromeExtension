function getImages() {
    const images = Array.from(document.images).map(img => img.src);
    return images;
  }
  
  function getTables() {
    const tables = Array.from(document.querySelectorAll('table'));
    const tableHtmls = tables.map((table, index) => {
      const html = table.outerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      return { url, index };
    });
    return tableHtmls;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadImages') {
      const images = getImages();
      sendResponse({ images });
    }
    if (request.action === 'downloadTables') {
      const tables = getTables();
      sendResponse({ tables });
    }
  });
  