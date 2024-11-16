"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./app/Components/HoldingsGraph.jsx":
/*!******************************************!*\
  !*** ./app/Components/HoldingsGraph.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/../node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-chartjs-2 */ \"(app-pages-browser)/../node_modules/react-chartjs-2/dist/index.js\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chart.js */ \"(app-pages-browser)/../node_modules/chart.js/dist/chart.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/../node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nchart_js__WEBPACK_IMPORTED_MODULE_1__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_1__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_1__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_1__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_1__.Title, chart_js__WEBPACK_IMPORTED_MODULE_1__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_1__.Legend);\n\nconst HoldingsGraph = (param)=>{\n    let { stocks, currentPrices } = param;\n    _s();\n    const [viewType, setViewType] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"current\");\n    const colorPalette = [\n        \"#4a66ff\",\n        \"#00caff\",\n        \"#0098ff\",\n        \"#ab23cf\",\n        \"#77369d\",\n        \"#654cda\",\n        \"#04d3ff\"\n    ];\n    const datasets = stocks.map((stock, index)=>({\n            label: stock.name,\n            data: [\n                viewType === \"current\" ? stock.amount : currentPrices.find((currentStock)=>currentStock.symbol === stock.symbol).price * stock.quantity\n            ],\n            backgroundColor: colorPalette[index % colorPalette.length],\n            barPercentage: 0.95,\n            categoryPercentage: 1.0\n        }));\n    const data = {\n        labels: [\n            \"\"\n        ],\n        datasets: datasets\n    };\n    const options = {\n        indexAxis: \"y\",\n        scales: {\n            x: {\n                stacked: true,\n                display: false,\n                grid: {\n                    display: false\n                },\n                min: 0,\n                max: stocks.reduce((acc, stock)=>acc + (viewType === \"current\" ? stock.amount : currentPrices.find((currentStock)=>currentStock.symbol === stock.symbol).price * stock.quantity), 0)\n            },\n            y: {\n                stacked: true,\n                display: false,\n                grid: {\n                    display: false\n                }\n            }\n        },\n        responsive: true,\n        aspectRatio: 20,\n        plugins: {\n            legend: {\n                display: false\n            },\n            tooltip: {\n                displayColors: false,\n                callbacks: {\n                    label: (context)=>{\n                        const value = context.raw;\n                        return \"\".concat(context.dataset.label, \" (₹\").concat(value.toLocaleString(), \")\");\n                    }\n                }\n            }\n        }\n    };\n    if (stocks.length === 0) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full h-full flex justify-center items-center font-bold text-2xl p-5\",\n            children: \"No holdings\"\n        }, void 0, false, {\n            fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n            lineNumber: 109,\n            columnNumber: 13\n        }, undefined);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full h-full\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__.Bar, {\n                data: data,\n                options: options\n            }, void 0, false, {\n                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                lineNumber: 117,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row justify-between items-center my-2\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"text-black text-2xl\",\n                        children: [\n                            \"₹\",\n                            stocks.reduce((acc, stock)=>acc + (viewType === \"investment\" ? stock.amount : currentPrices.find((currentStock)=>currentStock.symbol === stock.symbol).price * stock.quantity), 0).toLocaleString()\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                        lineNumber: 119,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"text-secondary text-sm flex flex-row gap-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"radio\",\n                                name: \"view\",\n                                id: \"investment\",\n                                className: \"bg-gray-100 rounded-md p-1\",\n                                checked: viewType === \"investment\",\n                                onChange: ()=>setViewType(\"investment\")\n                            }, void 0, false, {\n                                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                                lineNumber: 137,\n                                columnNumber: 21\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"investment\",\n                                className: \"text-gray-500\",\n                                children: \"Investment\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                                lineNumber: 145,\n                                columnNumber: 21\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                type: \"radio\",\n                                name: \"view\",\n                                id: \"current\",\n                                className: \"bg-gray-100 rounded-md p-1\",\n                                checked: viewType === \"current\",\n                                onChange: ()=>setViewType(\"current\")\n                            }, void 0, false, {\n                                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                                lineNumber: 148,\n                                columnNumber: 21\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"current\",\n                                className: \"text-gray-500\",\n                                children: \"Current Value\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                                lineNumber: 156,\n                                columnNumber: 21\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                        lineNumber: 136,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n                lineNumber: 118,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\webtech-project\\\\stock-trainer\\\\src\\\\app\\\\Components\\\\HoldingsGraph.jsx\",\n        lineNumber: 116,\n        columnNumber: 9\n    }, undefined);\n};\n_s(HoldingsGraph, \"xcldetbcOlbELEeMfbvgQ49COjM=\");\n_c = HoldingsGraph;\n/* harmony default export */ __webpack_exports__[\"default\"] = (HoldingsGraph);\nvar _c;\n$RefreshReg$(_c, \"HoldingsGraph\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9Db21wb25lbnRzL0hvbGRpbmdzR3JhcGguanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ3NDO0FBU3BCO0FBRWxCRSwyQ0FBT0EsQ0FBQ08sUUFBUSxDQUNaTixtREFBYUEsRUFDYkMsaURBQVdBLEVBQ1hDLGdEQUFVQSxFQUNWQywyQ0FBS0EsRUFDTEMsNkNBQU9BLEVBQ1BDLDRDQUFNQTtBQUd1QjtBQUVqQyxNQUFNRyxnQkFBZ0I7UUFBQyxFQUFFQyxNQUFNLEVBQUVDLGFBQWEsRUFBRTs7SUFFNUMsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdMLCtDQUFRQSxDQUFDO0lBRXpDLE1BQU1NLGVBQWU7UUFDakI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7S0FDSDtJQUVELE1BQU1DLFdBQVdMLE9BQU9NLEdBQUcsQ0FBQyxDQUFDQyxPQUFPQyxRQUFXO1lBQzNDQyxPQUFPRixNQUFNRyxJQUFJO1lBQ2pCQyxNQUFNO2dCQUNGVCxhQUFhLFlBQ1BLLE1BQU1LLE1BQU0sR0FDWlgsY0FBY1ksSUFBSSxDQUNkLENBQUNDLGVBQWlCQSxhQUFhQyxNQUFNLEtBQUtSLE1BQU1RLE1BQU0sRUFDeERDLEtBQUssR0FBR1QsTUFBTVUsUUFBUTthQUNqQztZQUNEQyxpQkFBaUJkLFlBQVksQ0FBQ0ksUUFBUUosYUFBYWUsTUFBTSxDQUFDO1lBQzFEQyxlQUFlO1lBQ2ZDLG9CQUFvQjtRQUN4QjtJQUVBLE1BQU1WLE9BQU87UUFDVFcsUUFBUTtZQUFDO1NBQUc7UUFDWmpCLFVBQVVBO0lBQ2Q7SUFFQSxNQUFNa0IsVUFBVTtRQUNaQyxXQUFXO1FBQ1hDLFFBQVE7WUFDSkMsR0FBRztnQkFDQ0MsU0FBUztnQkFDVEMsU0FBUztnQkFDVEMsTUFBTTtvQkFDRkQsU0FBUztnQkFDYjtnQkFDQUUsS0FBSztnQkFDTEMsS0FBSy9CLE9BQU9nQyxNQUFNLENBQ2QsQ0FBQ0MsS0FBSzFCLFFBQ0YwQixNQUNDL0IsQ0FBQUEsYUFBYSxZQUNSSyxNQUFNSyxNQUFNLEdBQ1pYLGNBQWNZLElBQUksQ0FDZCxDQUFDQyxlQUNHQSxhQUFhQyxNQUFNLEtBQUtSLE1BQU1RLE1BQU0sRUFDMUNDLEtBQUssR0FBR1QsTUFBTVUsUUFBUSxHQUNsQztZQUVSO1lBQ0FpQixHQUFHO2dCQUNDUCxTQUFTO2dCQUNUQyxTQUFTO2dCQUNUQyxNQUFNO29CQUNGRCxTQUFTO2dCQUNiO1lBQ0o7UUFDSjtRQUNBTyxZQUFZO1FBQ1pDLGFBQWE7UUFDYkMsU0FBUztZQUNMQyxRQUFRO2dCQUNKVixTQUFTO1lBQ2I7WUFDQVcsU0FBUztnQkFDTEMsZUFBZTtnQkFDZkMsV0FBVztvQkFDUGhDLE9BQU8sQ0FBQ2lDO3dCQUNKLE1BQU1DLFFBQVFELFFBQVFFLEdBQUc7d0JBQ3pCLE9BQU8sR0FFREQsT0FERkQsUUFBUUcsT0FBTyxDQUFDcEMsS0FBSyxFQUN4QixPQUE0QixPQUF2QmtDLE1BQU1HLGNBQWMsSUFBRztvQkFDakM7Z0JBQ0o7WUFDSjtRQUNKO0lBQ0o7SUFFQSxJQUFJOUMsT0FBT21CLE1BQU0sS0FBSyxHQUFHO1FBQ3JCLHFCQUNJLDhEQUFDNEI7WUFBSUMsV0FBVTtzQkFBd0U7Ozs7OztJQUkvRjtJQUVBLHFCQUNJLDhEQUFDRDtRQUFJQyxXQUFVOzswQkFDWCw4REFBQzVELGdEQUFHQTtnQkFBQ3VCLE1BQU1BO2dCQUFNWSxTQUFTQTs7Ozs7OzBCQUMxQiw4REFBQ3dCO2dCQUFJQyxXQUFVOztrQ0FDWCw4REFBQ0M7d0JBQUtELFdBQVU7OzRCQUFzQjs0QkFFakNoRCxPQUNJZ0MsTUFBTSxDQUNILENBQUNDLEtBQUsxQixRQUNGMEIsTUFDQy9CLENBQUFBLGFBQWEsZUFDUkssTUFBTUssTUFBTSxHQUNaWCxjQUFjWSxJQUFJLENBQ2QsQ0FBQ0MsZUFDR0EsYUFBYUMsTUFBTSxLQUFLUixNQUFNUSxNQUFNLEVBQzFDQyxLQUFLLEdBQUdULE1BQU1VLFFBQVEsR0FFbEMsR0FFSDZCLGNBQWM7Ozs7Ozs7a0NBRXZCLDhEQUFDRzt3QkFBS0QsV0FBVTs7MENBQ1osOERBQUNFO2dDQUNHQyxNQUFLO2dDQUNMekMsTUFBSztnQ0FDTDBDLElBQUc7Z0NBQ0hKLFdBQVU7Z0NBQ1ZLLFNBQVNuRCxhQUFhO2dDQUN0Qm9ELFVBQVUsSUFBTW5ELFlBQVk7Ozs7OzswQ0FFaEMsOERBQUNNO2dDQUFNOEMsU0FBUTtnQ0FBYVAsV0FBVTswQ0FBZ0I7Ozs7OzswQ0FHdEQsOERBQUNFO2dDQUNHQyxNQUFLO2dDQUNMekMsTUFBSztnQ0FDTDBDLElBQUc7Z0NBQ0hKLFdBQVU7Z0NBQ1ZLLFNBQVNuRCxhQUFhO2dDQUN0Qm9ELFVBQVUsSUFBTW5ELFlBQVk7Ozs7OzswQ0FFaEMsOERBQUNNO2dDQUFNOEMsU0FBUTtnQ0FBVVAsV0FBVTswQ0FBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU92RTtHQTNJTWpEO0tBQUFBO0FBNklOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9Db21wb25lbnRzL0hvbGRpbmdzR3JhcGguanN4P2YyZDEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbmltcG9ydCB7IEJhciB9IGZyb20gXCJyZWFjdC1jaGFydGpzLTJcIjtcclxuaW1wb3J0IHtcclxuICAgIENoYXJ0IGFzIENoYXJ0SlMsXHJcbiAgICBDYXRlZ29yeVNjYWxlLFxyXG4gICAgTGluZWFyU2NhbGUsXHJcbiAgICBCYXJFbGVtZW50LFxyXG4gICAgVGl0bGUsXHJcbiAgICBUb29sdGlwLFxyXG4gICAgTGVnZW5kLFxyXG59IGZyb20gXCJjaGFydC5qc1wiO1xyXG5cclxuQ2hhcnRKUy5yZWdpc3RlcihcclxuICAgIENhdGVnb3J5U2NhbGUsXHJcbiAgICBMaW5lYXJTY2FsZSxcclxuICAgIEJhckVsZW1lbnQsXHJcbiAgICBUaXRsZSxcclxuICAgIFRvb2x0aXAsXHJcbiAgICBMZWdlbmRcclxuKTtcclxuXHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBIb2xkaW5nc0dyYXBoID0gKHsgc3RvY2tzLCBjdXJyZW50UHJpY2VzIH0pID0+IHtcclxuXHJcbiAgICBjb25zdCBbdmlld1R5cGUsIHNldFZpZXdUeXBlXSA9IHVzZVN0YXRlKFwiY3VycmVudFwiKTtcclxuXHJcbiAgICBjb25zdCBjb2xvclBhbGV0dGUgPSBbXHJcbiAgICAgICAgXCIjNGE2NmZmXCIsXHJcbiAgICAgICAgXCIjMDBjYWZmXCIsXHJcbiAgICAgICAgXCIjMDA5OGZmXCIsXHJcbiAgICAgICAgXCIjYWIyM2NmXCIsXHJcbiAgICAgICAgXCIjNzczNjlkXCIsXHJcbiAgICAgICAgXCIjNjU0Y2RhXCIsXHJcbiAgICAgICAgXCIjMDRkM2ZmXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IGRhdGFzZXRzID0gc3RvY2tzLm1hcCgoc3RvY2ssIGluZGV4KSA9PiAoe1xyXG4gICAgICAgIGxhYmVsOiBzdG9jay5uYW1lLFxyXG4gICAgICAgIGRhdGE6IFtcclxuICAgICAgICAgICAgdmlld1R5cGUgPT09IFwiY3VycmVudFwiXHJcbiAgICAgICAgICAgICAgICA/IHN0b2NrLmFtb3VudFxyXG4gICAgICAgICAgICAgICAgOiBjdXJyZW50UHJpY2VzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAoY3VycmVudFN0b2NrKSA9PiBjdXJyZW50U3RvY2suc3ltYm9sID09PSBzdG9jay5zeW1ib2xcclxuICAgICAgICAgICAgICAgICAgKS5wcmljZSAqIHN0b2NrLnF1YW50aXR5LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvclBhbGV0dGVbaW5kZXggJSBjb2xvclBhbGV0dGUubGVuZ3RoXSxcclxuICAgICAgICBiYXJQZXJjZW50YWdlOiAwLjk1LFxyXG4gICAgICAgIGNhdGVnb3J5UGVyY2VudGFnZTogMS4wLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgbGFiZWxzOiBbXCJcIl0sXHJcbiAgICAgICAgZGF0YXNldHM6IGRhdGFzZXRzLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGluZGV4QXhpczogXCJ5XCIsXHJcbiAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgIHg6IHtcclxuICAgICAgICAgICAgICAgIHN0YWNrZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHN0b2Nrcy5yZWR1Y2UoXHJcbiAgICAgICAgICAgICAgICAgICAgKGFjYywgc3RvY2spID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjYyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh2aWV3VHlwZSA9PT0gXCJjdXJyZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gc3RvY2suYW1vdW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGN1cnJlbnRQcmljZXMuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjdXJyZW50U3RvY2spID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0b2NrLnN5bWJvbCA9PT0gc3RvY2suc3ltYm9sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkucHJpY2UgKiBzdG9jay5xdWFudGl0eSksXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeToge1xyXG4gICAgICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgYXNwZWN0UmF0aW86IDIwLFxyXG4gICAgICAgIHBsdWdpbnM6IHtcclxuICAgICAgICAgICAgbGVnZW5kOiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUNvbG9yczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogKGNvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb250ZXh0LnJhdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kYXRhc2V0LmxhYmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gKOKCuSR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0pYDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoc3RvY2tzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBmb250LWJvbGQgdGV4dC0yeGwgcC01XCI+XHJcbiAgICAgICAgICAgICAgICBObyBob2xkaW5nc1xyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsXCI+XHJcbiAgICAgICAgICAgIDxCYXIgZGF0YT17ZGF0YX0gb3B0aW9ucz17b3B0aW9uc30gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgbXktMlwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ibGFjayB0ZXh0LTJ4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIOKCuVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdG9ja3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhY2MsIHN0b2NrKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjYyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZpZXdUeXBlID09PSBcImludmVzdG1lbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHN0b2NrLmFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGN1cnJlbnRQcmljZXMuZmluZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGN1cnJlbnRTdG9jaykgPT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9jay5zeW1ib2wgPT09IHN0b2NrLnN5bWJvbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkucHJpY2UgKiBzdG9jay5xdWFudGl0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG9jYWxlU3RyaW5nKCl9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNlY29uZGFyeSB0ZXh0LXNtIGZsZXggZmxleC1yb3cgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cInZpZXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cImludmVzdG1lbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCByb3VuZGVkLW1kIHAtMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3ZpZXdUeXBlID09PSBcImludmVzdG1lbnRcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHNldFZpZXdUeXBlKFwiaW52ZXN0bWVudFwiKX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiaW52ZXN0bWVudFwiIGNsYXNzTmFtZT1cInRleHQtZ3JheS01MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgSW52ZXN0bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ2aWV3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJjdXJyZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JheS0xMDAgcm91bmRlZC1tZCBwLTFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt2aWV3VHlwZSA9PT0gXCJjdXJyZW50XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRWaWV3VHlwZShcImN1cnJlbnRcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImN1cnJlbnRcIiBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1cnJlbnQgVmFsdWVcclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIb2xkaW5nc0dyYXBoO1xyXG4iXSwibmFtZXMiOlsiQmFyIiwiQ2hhcnQiLCJDaGFydEpTIiwiQ2F0ZWdvcnlTY2FsZSIsIkxpbmVhclNjYWxlIiwiQmFyRWxlbWVudCIsIlRpdGxlIiwiVG9vbHRpcCIsIkxlZ2VuZCIsInJlZ2lzdGVyIiwidXNlU3RhdGUiLCJIb2xkaW5nc0dyYXBoIiwic3RvY2tzIiwiY3VycmVudFByaWNlcyIsInZpZXdUeXBlIiwic2V0Vmlld1R5cGUiLCJjb2xvclBhbGV0dGUiLCJkYXRhc2V0cyIsIm1hcCIsInN0b2NrIiwiaW5kZXgiLCJsYWJlbCIsIm5hbWUiLCJkYXRhIiwiYW1vdW50IiwiZmluZCIsImN1cnJlbnRTdG9jayIsInN5bWJvbCIsInByaWNlIiwicXVhbnRpdHkiLCJiYWNrZ3JvdW5kQ29sb3IiLCJsZW5ndGgiLCJiYXJQZXJjZW50YWdlIiwiY2F0ZWdvcnlQZXJjZW50YWdlIiwibGFiZWxzIiwib3B0aW9ucyIsImluZGV4QXhpcyIsInNjYWxlcyIsIngiLCJzdGFja2VkIiwiZGlzcGxheSIsImdyaWQiLCJtaW4iLCJtYXgiLCJyZWR1Y2UiLCJhY2MiLCJ5IiwicmVzcG9uc2l2ZSIsImFzcGVjdFJhdGlvIiwicGx1Z2lucyIsImxlZ2VuZCIsInRvb2x0aXAiLCJkaXNwbGF5Q29sb3JzIiwiY2FsbGJhY2tzIiwiY29udGV4dCIsInZhbHVlIiwicmF3IiwiZGF0YXNldCIsInRvTG9jYWxlU3RyaW5nIiwiZGl2IiwiY2xhc3NOYW1lIiwic3BhbiIsImlucHV0IiwidHlwZSIsImlkIiwiY2hlY2tlZCIsIm9uQ2hhbmdlIiwiaHRtbEZvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/Components/HoldingsGraph.jsx\n"));

/***/ })

});