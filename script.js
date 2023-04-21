function getSearchUrl(bst, ast, searchTerm, j, customSearchEngines) {
  if (bst == null || ast == null) {
    return null;
  }

  if (bst == "custom") {
    return customSearchEngines[j].value + searchTerm;
  } else {
    return bst + searchTerm + ast;
  }
}

function getSearchTerm(k, prependText, searchTerms, appendText, i) {
  if (k == 0) {
    searchTerm = prependText + searchTerms[i] + appendText;
  } else {
    searchTerm = prependText + searchTerms[i] + k + appendText;
  }
  return searchTerm;
}

function search() {
  console.log("search");

  var delimiter = document.getElementById("delimiter").value;

  var searchTerms = document
    .getElementById("search-terms")
    .value.split(delimiter);
  var appendText = document.getElementById("append-text").value;
  var prependText = document.getElementById("prepend-text").value;
  var searchEngines = document.querySelectorAll(
    'input[name="search-engine"]:checked'
  );

  console.log(searchEngines);

  var customSearchEngines = document.querySelectorAll(
    ".custom-search-engine-field"
  );

  console.log(customSearchEngines);

  var delay = parseInt(document.getElementById("delay").value);
  var numberOfSearches = parseInt(
    document.getElementById("number-of-searches").value
  );
  var numCustomSearchEngines = parseInt(
    document.getElementById("num-custom-search-engines").value
  );

  for (var i = 0; i < searchTerms.length; i++) {
    total_search_engines = searchEngines.length + numCustomSearchEngines;

    if (searchTerms[i].length > 0) {
      for (var j = 0; j < total_search_engines; j++) {
        if (j < searchEngines.length) {
          var bst = searchEngines[j].getAttribute("data-bst");
          var ast = searchEngines[j].getAttribute("data-ast");
        } else {
          var bst = customSearchEngines[j - searchEngines.length].value;
          var ast = "";
        }

        console.log(bst);

        console.log(ast);

        for (var k = 0; k <= numberOfSearches; k++) {
          searchTerm = getSearchTerm(
            k,
            prependText,
            searchTerms,
            appendText,
            i
          );

          searchUrl = getSearchUrl(bst, ast, searchTerm, j);

          console.log(searchUrl);

          if (searchUrl == null) {
            continue;
          }
          setTimeout(
            function (searchUrl) {
              window.open(searchUrl, "_blank");
            },
            delay,
            searchUrl
          );
        }
      }
    }
  }
}
function generateCustomSearchEngineFields() {
  var count = parseInt(
    document.getElementById("num-custom-search-engines").value
  );
  var customSearchEnginesDiv = document.getElementById("custom-search-engines");
  customSearchEnginesDiv.innerHTML = "";

  for (var i = 1; i <= count; i++) {
    generateCustomSearchEngineField(customSearchEnginesDiv, i);
  }
}

function generateCustomSearchEngineField(customSearchEnginesDiv, i) {
  var inputField = generateCustomSearchEngineInputField(i);
  var datalist = generateCustomSearchEngineDatalist(i);

  customSearchEnginesDiv.appendChild(inputField);
  customSearchEnginesDiv.appendChild(datalist);
}

function generateCustomSearchEngineInputField(i) {
  var inputField = document.createElement("input");
  inputField.type = "text";
  inputField.className = "custom-search-engine-field";
  inputField.name = "custom-search-engine-" + i;
  inputField.placeholder = "Custom search engine " + i;
  inputField.list = "custom-search-engines-to-suggest_" + i;

  return inputField;
}

function generateCustomSearchEngineDatalist(i) {
  var datalist = document.createElement("datalist");
  datalist.id = "custom-search-engines-to-suggest_" + i;

  return datalist;
}

function toggle(source) {
  checkboxes = document.getElementsByName("search-engine");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = source.checked;
  }

    document.getElementById("number-of-searches").value = 0;

}

/*
    make a function that select the bing and disable google and  search a random term 20 times if the search terms box is empty else if the
    search terms box is not empty then search the terms in the search terms box 20 times collectively
    like if the search terms box has 3 terms then search all the terms 20/3 times

    */

function selectBing() {
  if (document.getElementById("bing").checked) {
    document.getElementById("bing").checked = false;
  } else {
    document.getElementById("bing").checked = true;
    document.getElementById("bing").checked = true;

    document.getElementById("bing").checked = true;

    document.getElementById("google").checked = false;

    search_terms_box = document.getElementById("search-terms");
    numberOfSearches = document.getElementById("number-of-searches").value;

    if (numberOfSearches == 0) {
      numberOfSearches = 20;
    }

    if (search_terms_box.value.length == 0) {
      // does js have a random number generator ?

      var r = Math.random().toString(36).substring(7);

      search_terms_box.value = r + " random ";
    } else {
      search_terms = search_terms_box.value.split("\n");

      numberOfSearches = Math.ceil(numberOfSearches / search_terms.length);
    }

    document.getElementById("number-of-searches").value = numberOfSearches;

    setTimeout(function () {
      search();
    }, 1000);
  }
}

customSearchEnginesToSuggest = [
  "https://youtube.com/search?q=",
  "https://twitter.com/search?q=",
  "https://duckduckgo.com/?q=",
  "https://startpage.com/do/search?q=",
  "https://search.brave.com/search?q=",
  "https://www.ecosia.org/search?q=",
  "https://www.qwant.com/?q=",
  "https://www.yandex.com/search/?text=",
  "https://www.naver.com/search.naver?query=",
  "https://www.baidu.com/s?wd=",
  "https://search.yahoo.com/search?p=",
  "https://www.seznam.cz/?q=",
  "https://www.ask.com/web?q=",
  "https://www.aol.com/search/?q=",
  "https://www.wolframalpha.com/input/?i=",
  "https://www.google.com/search?q=",
  "https://www.google.com/search?tbm=isch&q=",
  "https://www.google.com/search?tbm=vid&q=",
  "https://www.google.com/search?tbm=nws&q=",
  "https://www.google.com/search?tbm=shop&q=",
  "https://www.google.com/search?tbm=bks&q=",
];

function setDelimiter() {
  document.getElementById("delimiter").value = "-----";
}
