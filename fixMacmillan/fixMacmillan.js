document.addEventListener('DOMContentLoaded', function() {
  /*
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
  */
  console.log("test")
}, false);

var importantElements = []
var importantElements2 =[]
var updateElements = function(){
  for(var i = 0; i < importantElements.length; i++){
    var el = importantElements[i]
    var inp = el.getElementById("importantinput")
    console.log(el)
    console.log(inp)
    el.setAttribute('useranswer', inp.getAttribute('value'))
  }
}

console.log("menchine test 1")
function lookForInput(doc){
  var eles = [];
  var inputs = doc.getElementsByTagName("span");
  for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].id.indexOf('hts0.step0.EnterField') == 0) {
          eles.push(inputs[i]);
      }
  }
  console.log("menchine 2: ", eles)
  if (eles.length > 0){
    importantElements = eles
    for(var i = 0; i < eles.length; i++) {
      eles[i].setAttribute("onclick", "") 
      console.log("removing onclick2", eles[i])

      for(var j = 0; j < eles[i].childNodes.length; j++) {
        console.log(eles[i].childNodes[j].getAttribute("class"))
          if(eles[i].childNodes[j].getAttribute("class") == "MathJax") {
              console.log("found one")
              var newInput = doc.createElement("input")
              newInput.setAttribute("id", "importantinput")
              newInput.setAttribute("value", eles[i].getAttribute('useranswer'))
              newInput.setAttribute("onKeyUp", "updateElements()")
              eles[i].appendChild(newInput)
              eles[i].childNodes[j].remove()
          }
      }
    }
  }
}



function loadIframes(doc){
  lookForInput(doc)
  var iframes = doc.getElementsByTagName("iframe");
  console.log(iframes)
  for (var i = 0; i < iframes.length; i++) {
      iframes[i].onload = function(){
        //console.log("menchine loaded iframe")
        loadIframes(iframes[i].contentWindow.document)
      }
      //console.log("loading next iframe")
      loadIframes(iframes[i].contentWindow.document)
  }
}
loadIframes(document)

//https://stackoverflow.com/questions/41225975/access-dom-elements-inside-iframe-from-chrome-extension?rq=1