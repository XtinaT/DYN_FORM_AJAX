'use strict'

var dataA = [
  ["form1", "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json"],
  ["form2", "https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json"],
];

for (var i = 0; i < dataA.length; i++) {
  loadData(dataA[i][0], dataA[i][1]);
}

function loadData(form, adress) {
  $.ajax(adress, {
    type: "GET",
    dataType: "json",
    success: dataLoaded,
    error: errorHandler,
  });
  function dataLoaded(data) {
    buildForm(form, data);
  }
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + "" + errorStr);
}


function buildForm(formName, def) {
  var form = document.forms[formName];
  for (var elem of def) {
    function createWrap(elem, form) {
      var wrap = document.createElement('label');
      var wrapText = document.createTextNode(elem.label);
      wrap.appendChild(wrapText);
      form.appendChild(wrap);
      return wrap;
    }
    switch (elem.kind) {
      case 'longtext':
      case 'shorttext':
      case 'number':
        if ('label' in elem) {
          var wrap = createWrap(elem, form);
        } else {
          wrap = form;
        }
        var input = document.createElement('input');
        wrap.appendChild(input);
        input.setAttribute('name', elem.name);
        input.setAttribute('type', 'text');
        var linebreak = document.createElement('br');
        form.appendChild(linebreak);
        break;
      case 'combo':
        if ('label' in elem) {
          var wrap = createWrap(elem, form);
        } else {
          wrap = form;
        }
        var select = document.createElement('select');
        wrap.appendChild(select);
        select.setAttribute('name', elem.name);
        for (var variant of elem.variants) {
          var option = document.createElement('option');
          select.appendChild(option);
          option.setAttribute('value', variant.value);
          option.textContent = variant.text;
        }
        var linebreak = document.createElement('br');
        form.appendChild(linebreak);
        break;
      case 'radio':
        if ('label' in elem) {
          var wrap = createWrap(elem, form);
        } else {
          wrap = form;
        }
        for (var variant of elem.variants) {
          var input = document.createElement('input');
          wrap.appendChild(input);
          input.setAttribute('name', elem.name);
          input.setAttribute('type', 'radio');
          input.setAttribute('value', variant.value);
          wrap.innerHTML += variant.text;
        }
        var linebreak = document.createElement('br');
        form.appendChild(linebreak);
        break;
      case 'check':
        if ('label' in elem) {
          var wrap = createWrap(elem, form);
        } else {
          wrap = form;
        }
        var input = document.createElement('input');
        wrap.appendChild(input);
        input.setAttribute('name', elem.name);
        input.setAttribute('type', 'checkbox');
        input.checked = true;
        var linebreak = document.createElement('br');
        form.appendChild(linebreak);
        break;
      case 'memo':
        if ('label' in elem) {
          var wrap = createWrap(elem, form);
        } else {
          wrap = form;
        }
        var linebreak = document.createElement('br');
        wrap.appendChild(linebreak);
        var textarea = document.createElement('textarea');
        wrap.appendChild(textarea);
        textarea.setAttribute('name', elem.name);
        var linebreak = document.createElement('br');
        form.appendChild(linebreak);
        break;
      case 'submit':
        var input = document.createElement('input');
        form.appendChild(input);
        input.setAttribute('type', 'submit');
        input.setAttribute('value', elem.caption);
    }
  }
}

