

function add() {

//Create an input type dynamically.
var element = document.createElement("input");

//Create Labels
var label = document.createElement("Label");
label.innerHTML = "New Label";     

//Assign different attributes to the element.
element.setAttribute("type", "text");
element.setAttribute("value", "");
element.setAttribute("name", "Test Name");
element.setAttribute("style", "width:200px");

label.setAttribute("style", "font-weight:normal");

// 'foobar' is the div id, where new fields are to be added
var foo = document.getElementById("fooBar");

//Append the element in page (in span).
foo.appendChild(label);
foo.appendChild(element);
}
Html part,

<button id="button" value="Add" onClick:"javascript:add();">




this is their javascript:



        function listener(event) {
            //document.getElementById("pxhtsproxy").innerHTML = event.data;
			
            getMmathjax(event.data, document.getElementById("pxhtsproxy"));
        }

        if (window.addEventListener) {
            window.addEventListener("message", listener, false);
        } else {
            window.attachEvent("onmessage", listener);
        }


        function sajax_init_object() {
            var A;
            try {
                // Try the new style before ActiveX so we don't
                // unnecessarily trigger warnings in IE 7 when
                // set to prompt about ActiveX usage
                A = new XMLHttpRequest();
            } catch (e) {
                try {
                    A = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        A = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (oc) {
                        A = null;
                    }
                }
            }
            if (!A)
                alert("Could not create connection object.");

            return A;
        }

        function getMmathjax(value, target) {
            var i, x, n;
            var uri = window.location.href;
            var post_data;
			
			var ind = value.indexOf(":");
			var elid = value.substr(0,ind);
			value = value.substr(ind+1);
			
			
            uri = uri.replace("PxHTSProxy.htm", "") + "GetMathJax.ashx?gettext=" + encodeURIComponent(value);
            x = sajax_init_object();
            if (!x) {
                alert("AJAX not supported");
                return false;
            }

            x.open("GET", uri, true);
            x.setRequestHeader("Pragma", "cache=yes");
            x.setRequestHeader("Cache-Control", "no-transform");
            x.onreadystatechange = function () {
                if (x.readyState != 4)
				{ 
                    return;
				}

                if (typeof (target) == 'function') {
                    target(x);
                }
                else if (typeof (target) == 'object') {

                    if (x.status == 200) {
                        //target.innerHTML = x.responseText;
                        
						var win = window.parent;
		
						win.postMessage( elid + ":"+x.responseText, "*") 

                        //MathJax.Hub.Typeset();
                    }
					else
					{
					//alert("x.status="+x.status);
					}

                }
                else {
                    //alert("bad target for sajax_do_call: not a function or object: " + target);
                }

                return;
            }
            x.send(post_data);
            delete x;

            return true;
        }


plan:

1. find all hts0.step0.EnterFieldN
2. delete all of the hts0.step0.EnterFieldNiframe iframes.
3. delete all of the hts0.step0.EnterFieldNs onClicks.
4. append text boxes to all of them.

dynamic text box:

function addDynamicTextBox(elementID) {

//Create an input type dynamically.
var tBox = document.createElement("input");

var parentElem = document.getElementById("elementID");

//Assign different attributes to the element.
tBox.setAttribute("type", "text");
tBox.setAttribute("value", "");
tBox.setAttribute("name", "Test Name");
tBox.setAttribute("style", "width:100px");
tBox.oninput = function(){
	parentElem.setAttribute("useranswer", tBox.value)
}
tBox.onpropertychange = tBox.oninput;
// 'foobar' is the div id, where new fields are to be added

//Append the element in page (in span).
parentElem.appendChild(tBox);
}

function testCode() {
	address = 'hts0.step0.EnterField'
	for(i = 1; i < 5; i++){
		//try{
		    id = address + i;
		    console.log(id);
		    element = document.getElementById('hts0.step0.EnterField1');
			element.removeAttribute("readonly");
			element.removeAttribute("disabled");
			element.setAttribute('onClick','');
			addDynamicTextBox(element);
			//element.setAttribute('useranswer',i.toString());

			//delete document.getElementById('hts0.step0.EnterField' + i + 'iframe')


			console.log("a");
		//}
		//catch(err){

		//}
		//document.getElementById('hts0.step0.EnterField1').onClick="javascript:foo(bar);";
	    //hts0.step0.EnterField1
	}
	return "worked";
}
testCode();

//to inject into every page: https://developer.chrome.com/extensions/content_scripts#pi