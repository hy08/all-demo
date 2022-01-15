(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['ComA'],
  {
    /***/ '42ec': /***/ function(module, exports, __webpack_require__) {
      // extracted by mini-css-extract-plugin
      /***/
    },

    /***/ '4f5f': /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/00-system-demo/02-module-jsx/components/com-a/index.vue?vue&type=script&lang=js&
      /* harmony default export */ var com_avue_type_script_lang_js_ = {
        name: 'ComA',
        methods: {
          handleClick: function handleClick() {
            alert('原生dom事件触发');
            this.$emit('click', '组件自定义事件触发了');
          },
        },
        render: function render() {
          var h = arguments[0];
          return h(
            'div',
            {
              class: 'a-container',
            },
            [
              h(
                'header',
                {
                  style: {
                    color: 'red',
                    textAlign: 'center',
                    fontSize: '20px',
                  },
                },
                ['vue\u7EC4\u4EF6render']
              ),
              h(
                'button',
                {
                  on: {
                    click: this.handleClick,
                  },
                },
                ['\u6D4B\u8BD5\u4E8B\u4EF6']
              ),
            ]
          );
        },
      };
      // CONCATENATED MODULE: ./src/pages/00-system-demo/02-module-jsx/components/com-a/index.vue?vue&type=script&lang=js&
      /* harmony default export */ var components_com_avue_type_script_lang_js_ = com_avue_type_script_lang_js_;
      // EXTERNAL MODULE: ./src/pages/00-system-demo/02-module-jsx/components/com-a/index.less?vue&type=style&index=0&id=a9b4986c&lang=less&scoped=true&
      var com_avue_type_style_index_0_id_a9b4986c_lang_less_scoped_true_ = __webpack_require__('52ed');

      // EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
      var componentNormalizer = __webpack_require__('2877');

      // CONCATENATED MODULE: ./src/pages/00-system-demo/02-module-jsx/components/com-a/index.vue
      var render, staticRenderFns;

      /* normalize component */

      var component = Object(componentNormalizer['a' /* default */])(
        components_com_avue_type_script_lang_js_,
        render,
        staticRenderFns,
        false,
        null,
        'a9b4986c',
        null
      );

      /* harmony default export */ var com_a = (__webpack_exports__['default'] = component.exports);

      /***/
    },

    /***/ '52ed': /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      /* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_index_less_vue_type_style_index_0_id_a9b4986c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        '42ec'
      );
      /* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_index_less_vue_type_style_index_0_id_a9b4986c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_index_less_vue_type_style_index_0_id_a9b4986c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__
      );
      /* unused harmony reexport * */
      /* unused harmony default export */ var _unused_webpack_default_export =
        _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_index_less_vue_type_style_index_0_id_a9b4986c_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a;

      /***/
    },
  },
]);
