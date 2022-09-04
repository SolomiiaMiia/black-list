function ready(callbackFunc) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

ready(function () {
  let ac = new visicomAutoComplete({
    selector: '#visicom-autocomplete',      // search div selector
    apiKey: '9713c712c6591101dc24dea616d9238a',                 // paste here your private API key
    placeholder: 'Введіть адресу для пошуку...',   // placeholder for search input
    minChars: 3,                            // min chars to start searching
    delay: 150,                             // delay between key pressed for search to start
    suggestsLimit: 5,                       // limit of suggests to display
    includeCategories: [],		     // include features only with this categories
    excludeCategories: [],	  	     // exclude features with this categories
    maxCharsInSuggest: 55,                   // max chars to display in suggest
    lang: 'uk',                          // language for searching
    country:'UA',
    onSuggestSelected: (suggest) => { },//document.getElementById("address").value = suggest.html,
  });
  let input = document.getElementById("visicom-autocomplete").getElementsByTagName('input')[0];
  input.classList.add('form-control');
  input.setAttribute('id', 'address');
  input.setAttribute('formControlName', 'address');
});



