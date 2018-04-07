document.addEventListener('DOMContentLoaded', function() {
  var triggerButton = document.getElementById('scriptTrigger');
  triggerButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();

    });
  }, false);
}, false);


https://stackoverflow.com/questions/41225975/access-dom-elements-inside-iframe-from-chrome-extension?rq=1