"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-composed-ref";
exports.ids = ["vendor-chunks/use-composed-ref"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar React = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\nvar updateRef = function updateRef(ref, value) {\n  if (typeof ref === 'function') {\n    ref(value);\n    return;\n  }\n  ref.current = value;\n};\n\nvar useComposedRef = function useComposedRef(libRef, userRef) {\n  var prevUserRef = React.useRef();\n  return React.useCallback(function (instance) {\n    libRef.current = instance;\n\n    if (prevUserRef.current) {\n      updateRef(prevUserRef.current, null);\n    }\n\n    prevUserRef.current = userRef;\n\n    if (!userRef) {\n      return;\n    }\n\n    updateRef(userRef, instance);\n  }, [userRef]);\n};\n\nexports[\"default\"] = useComposedRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNvbXBvc2VkLXJlZi9kaXN0L3VzZS1jb21wb3NlZC1yZWYuY2pzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDhDQUE2QyxFQUFFLGFBQWEsRUFBQzs7QUFFN0QsWUFBWSxtQkFBTyxDQUFDLHdHQUFPOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVtby8uL25vZGVfbW9kdWxlcy91c2UtY29tcG9zZWQtcmVmL2Rpc3QvdXNlLWNvbXBvc2VkLXJlZi5janMuanM/MzNjZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciB1cGRhdGVSZWYgPSBmdW5jdGlvbiB1cGRhdGVSZWYocmVmLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlZih2YWx1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlZi5jdXJyZW50ID0gdmFsdWU7XG59O1xuXG52YXIgdXNlQ29tcG9zZWRSZWYgPSBmdW5jdGlvbiB1c2VDb21wb3NlZFJlZihsaWJSZWYsIHVzZXJSZWYpIHtcbiAgdmFyIHByZXZVc2VyUmVmID0gUmVhY3QudXNlUmVmKCk7XG4gIHJldHVybiBSZWFjdC51c2VDYWxsYmFjayhmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICBsaWJSZWYuY3VycmVudCA9IGluc3RhbmNlO1xuXG4gICAgaWYgKHByZXZVc2VyUmVmLmN1cnJlbnQpIHtcbiAgICAgIHVwZGF0ZVJlZihwcmV2VXNlclJlZi5jdXJyZW50LCBudWxsKTtcbiAgICB9XG5cbiAgICBwcmV2VXNlclJlZi5jdXJyZW50ID0gdXNlclJlZjtcblxuICAgIGlmICghdXNlclJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZVJlZih1c2VyUmVmLCBpbnN0YW5jZSk7XG4gIH0sIFt1c2VyUmVmXSk7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSB1c2VDb21wb3NlZFJlZjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js\n");

/***/ })

};
;