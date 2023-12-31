/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/completed.js":
/*!**************************!*\
  !*** ./src/completed.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _functionality_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functionality.js */ "./src/functionality.js");
// app.js

var taskContainer = document.querySelector('.task-container');
var clearComplitedTask = document.querySelector('#clearCompleted');
taskContainer.addEventListener('change', function (event) {
  event.preventDefault();
  var checkbox = event.target;
  var dataIndex = checkbox.id.split('-')[1];
  var taskIndex = parseInt(dataIndex, 10);
  // eslint-disable-next-line no-use-before-define
  updateCompleted(taskIndex, checkbox.checked);
});
function updateCompleted(index, completed) {
  var task = _functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray.find(function (element) {
    return element.index === index;
  });
  if (task) {
    task.completed = completed;
    localStorage.setItem('todotasks', JSON.stringify(_functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray));
  }
}
clearComplitedTask.addEventListener('click', function (event) {
  event.preventDefault();
  var updatedTask = _functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray.filter(function (task) {
    return !task.completed;
  });
  _functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray.length = 0;
  updatedTask.forEach(function (task, index) {
    task.index = index + 1;
    _functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray.push(task);
  });
  localStorage.setItem('todotasks', JSON.stringify(_functionality_js__WEBPACK_IMPORTED_MODULE_0__.taskArray));
  (0,_functionality_js__WEBPACK_IMPORTED_MODULE_0__.displayTasks)();
});

/***/ }),

/***/ "./src/functionality.js":
/*!******************************!*\
  !*** ./src/functionality.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayTasks: () => (/* binding */ displayTasks),
/* harmony export */   taskArray: () => (/* binding */ taskArray)
/* harmony export */ });
/* eslint-disable no-use-before-define */
var taskContainer = document.querySelector('.task-container');
var addTaskInput = document.querySelector('#addTask');
function Task(index, description, completed) {
  this.index = index;
  this.description = description;
  this.completed = completed;
}
var storedTasks = localStorage.getItem('todotasks');
var taskArray = storedTasks ? JSON.parse(storedTasks) : [];
function addTask() {
  var description = addTaskInput.value;
  var task = new Task(taskArray.length + 1, description, false);
  taskArray.push(task);
  localStorage.setItem('todotasks', JSON.stringify(taskArray));
  addTaskInput.value = '';
}
function displayTasks() {
  taskContainer.innerHTML = '';
  var sortedTasks = taskArray.sort(function (x, y) {
    return x.index - y.index;
  });
  sortedTasks.forEach(function (task) {
    var listItem = document.createElement('li');
    var containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    var taskContentDiv = document.createElement('div');
    taskContentDiv.classList.add('task-content');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "task-".concat(task.index);
    checkbox.checked = task.completed;
    var descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.value = task.description;
    descriptionInput.disabled = task.completed;
    descriptionInput.classList.add('task-description');
    var iconContainerDiv = document.createElement('div');
    iconContainerDiv.classList.add('icon-container');
    var editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-ellipsis-v', 'edit-btn');
    var removeButton = document.createElement('i');
    removeButton.classList.add('fas', 'fa-trash-alt', 'remove-button');
    removeButton.dataset.index = task.index;
    listItem.appendChild(containerDiv);
    containerDiv.appendChild(taskContentDiv);
    taskContentDiv.appendChild(checkbox);
    taskContentDiv.appendChild(descriptionInput);
    containerDiv.appendChild(iconContainerDiv);
    iconContainerDiv.appendChild(editIcon);
    iconContainerDiv.appendChild(removeButton);
    taskContainer.appendChild(listItem);
    editIcon.addEventListener('click', function () {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = false;
      descriptionInput.focus();
      descriptionInput.classList.toggle('selected');
    });
    descriptionInput.addEventListener('focus', function () {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = false;
      descriptionInput.focus();
      descriptionInput.classList.toggle('selected');
    });
    descriptionInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && descriptionInput.value !== '') {
        var taskIndex = parseInt(removeButton.dataset.index, 10);
        updateTask(taskIndex, descriptionInput.value);
        localStorage.setItem('todotasks', JSON.stringify(taskArray));
        descriptionInput.blur();
      }
    });
    descriptionInput.addEventListener('blur', function () {
      removeButton.style.display = 'block';
      editIcon.style.display = 'none';
      descriptionInput.disabled = true;
      var listItem = descriptionInput.closest('li');
      listItem.classList.remove('selected');
      descriptionInput.classList.remove('selected');
    });
    removeButton.addEventListener('click', function (event) {
      var taskIndex = parseInt(event.target.dataset.index, 10); // Retrieve index from dataset
      deleteTask(taskIndex);
    });
  });
}
function deleteTaskArray(index) {
  var deletedTaskIndex = taskArray.findIndex(function (task) {
    return task.index === index;
  });
  if (deletedTaskIndex !== -1) {
    taskArray.splice(deletedTaskIndex, 1);
    localStorage.setItem('todotasks', JSON.stringify(taskArray));
  }
}
function deleteTask(index) {
  var deletedTaskIndex = taskArray.findIndex(function (task) {
    return task.index === index;
  });
  if (deletedTaskIndex !== -1) {
    deleteTaskArray(index);
    for (var i = deletedTaskIndex; i < taskArray.length; i += 1) {
      taskArray[i].index = i + 1;
    }
    displayTasks();
  }
}
function updateTask(index, newDescription) {
  var task = taskArray.find(function (task) {
    return task.index === index;
  });
  if (task) {
    task.description = newDescription;
    localStorage.setItem('todotasks', JSON.stringify(taskArray));
    displayTasks();
  }
}
var formBtn = document.querySelector('.btn');
formBtn.addEventListener('click', function (event) {
  event.preventDefault();
  addTask();
  displayTasks();
});
displayTasks();


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.css ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  background-color: rgb(233, 230, 230);
}

.main-section {
  background-color: rgb(233, 230, 230);
  width: 70%;
  margin: 10% 20%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.todo-container {
  background-color: white;
  padding: 10px;
}

.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto 10px;
}

.heading {
  color: gray;
  font-size: 30px;
  letter-spacing: 8px;
}

#loading {
  color: gray;
  cursor: pointer;
}

#add-list-form {
  background-color: white;
  display: flex;
}

#add-list-form input {
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 18px;
  outline: none;
}

.btn {
  background-color: white;
  border: none;
  cursor: pointer;
}

.task-container li {
  list-style: none;
}

.container {
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 9px;
}

.task-content {
  width: 100%;
  display: flex;
}

.task-description {
  font-size: 18px;
  outline: none;
  width: 100%;
  padding: 10px;
  border: none;
}

.icon-container {
  color: gray;
}

.selected {
  background-color: rgb(255, 248, 176);
}

.completed {
  background-color: rgb(233, 230, 230);
  text-align: center;
  font-size: 20px;
  padding: 5px;
}

.clear {
  cursor: pointer;
}

.remove-button {
  padding: 10px 0;
  color: rgb(220, 7, 7);
  display: none;
  cursor: pointer;
}

.edit-btn {
  cursor: pointer;
}`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,oCAAA;AACF;;AAEA;EACE,oCAAA;EACA,UAAA;EACA,eAAA;EACA,0CAAA;AACF;;AAEA;EACE,uBAAA;EACA,aAAA;AACF;;AAEA;EACE,aAAA;EACA,8BAAA;EACA,mBAAA;EACA,iBAAA;AACF;;AAEA;EACE,WAAA;EACA,eAAA;EACA,mBAAA;AACF;;AAEA;EACE,WAAA;EACA,eAAA;AACF;;AAEA;EACE,uBAAA;EACA,aAAA;AACF;;AAEA;EACE,WAAA;EACA,aAAA;EACA,YAAA;EACA,eAAA;EACA,aAAA;AACF;;AAEA;EACE,uBAAA;EACA,YAAA;EACA,eAAA;AACF;;AAEA;EACE,gBAAA;AACF;;AAEA;EACE,gBAAA;EACA,aAAA;EACA,8BAAA;EACA,WAAA;AACF;;AAEA;EACE,WAAA;EACA,aAAA;AACF;;AAEA;EACE,eAAA;EACA,aAAA;EACA,WAAA;EACA,aAAA;EACA,YAAA;AACF;;AAEA;EACE,WAAA;AACF;;AAEA;EACE,oCAAA;AACF;;AAEA;EACE,oCAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,eAAA;EACA,qBAAA;EACA,aAAA;EACA,eAAA;AACF;;AAEA;EACE,eAAA;AACF","sourcesContent":["body {\r\n  background-color: rgb(233, 230, 230);\r\n}\r\n\r\n.main-section {\r\n  background-color: rgb(233, 230, 230);\r\n  width: 70%;\r\n  margin: 10% 20%;\r\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\r\n}\r\n\r\n.todo-container {\r\n  background-color: white;\r\n  padding: 10px;\r\n}\r\n\r\n.heading-container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: auto 10px;\r\n}\r\n\r\n.heading {\r\n  color: gray;\r\n  font-size: 30px;\r\n  letter-spacing: 8px;\r\n}\r\n\r\n#loading {\r\n  color: gray;\r\n  cursor: pointer;\r\n}\r\n\r\n#add-list-form {\r\n  background-color: white;\r\n  display: flex;\r\n}\r\n\r\n#add-list-form input {\r\n  width: 100%;\r\n  padding: 10px;\r\n  border: none;\r\n  font-size: 18px;\r\n  outline: none;\r\n}\r\n\r\n.btn {\r\n  background-color: white;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.task-container li {\r\n  list-style: none;\r\n}\r\n\r\n.container {\r\n  list-style: none;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin: 9px;\r\n}\r\n\r\n.task-content {\r\n  width: 100%;\r\n  display: flex;\r\n}\r\n\r\n.task-description {\r\n  font-size: 18px;\r\n  outline: none;\r\n  width: 100%;\r\n  padding: 10px;\r\n  border: none;\r\n}\r\n\r\n.icon-container {\r\n  color: gray;\r\n}\r\n\r\n.selected {\r\n  background-color: rgb(255, 248, 176);\r\n}\r\n\r\n.completed {\r\n  background-color: rgb(233, 230, 230);\r\n  text-align: center;\r\n  font-size: 20px;\r\n  padding: 5px;\r\n}\r\n\r\n.clear {\r\n  cursor: pointer;\r\n}\r\n\r\n.remove-button {\r\n  padding: 10px 0;\r\n  color: rgb(220, 7, 7);\r\n  display: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.edit-btn {\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _functionality_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functionality.js */ "./src/functionality.js");
/* harmony import */ var _completed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./completed.js */ "./src/completed.js");



_functionality_js__WEBPACK_IMPORTED_MODULE_1__();
_completed_js__WEBPACK_IMPORTED_MODULE_2__();
})();

/******/ })()
;
//# sourceMappingURL=bundle64865cb16e1d72c5ffff.js.map