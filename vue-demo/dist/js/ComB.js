(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['ComB'],
  {
    /***/ '82e1': /***/ function(module, exports, __webpack_require__) {
      // extracted by mini-css-extract-plugin
      module.exports = { container: 'index-container-W5xec' };

      /***/
    },

    /***/ eee3: /***/ function(module, __webpack_exports__, __webpack_require__) {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      /* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('82e1');
      /* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
        _index_less__WEBPACK_IMPORTED_MODULE_0__
      );

      /* harmony default export */ __webpack_exports__['default'] = {
        name: 'ComB',
        props: {
          prop1: {
            type: String,
          },
        },
        methods: {
          handleClick: function handleClick() {
            this.$emit('click', '组件自定义事件触发了');
          },
        },
        render: function render() {
          var h = arguments[0];
          console.log('插槽', this, this.$scopedSlots);
          return h(
            'div',
            {
              class: _index_less__WEBPACK_IMPORTED_MODULE_0___default.a.container,
            },
            [
              h('header', ['jsx\u7EC4\u4EF6']),
              h(
                'button',
                {
                  on: {
                    click: this.handleClick,
                  },
                },
                ['\u6D4B\u8BD5\u4E8B\u4EF6']
              ),
              this.$scopedSlots.scopeA &&
                this.$scopedSlots.scopeA({
                  name: 'scopeA params value: test',
                }),
            ]
          );
        },
      };

      /***/
    },
  },
]);
