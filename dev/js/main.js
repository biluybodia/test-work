'use strict';

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
    };
  }
  return _typeof(obj);
}

!(function(e, t) {
  'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) &&
  'object' == (typeof module === 'undefined' ? 'undefined' : _typeof(module))
      ? (module.exports = t())
      : 'function' == typeof define && define.amd
      ? define('Siema', [], t)
      : 'object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports))
          ? (exports.Siema = t())
          : (e.Siema = t());
})('undefined' != typeof self ? self : void 0, function() {
  return (function(e) {
    function t(r) {
      if (i[r]) return i[r].exports;
      var n = (i[r] = {
        i: r,
        l: !1,
        exports: {}
      });
      return e[r].call(n.exports, n, n.exports, t), (n.l = !0), n.exports;
    }

    var i = {};
    return (
        (t.m = e),
            (t.c = i),
            (t.d = function(e, i, r) {
              t.o(e, i) ||
              Object.defineProperty(e, i, {
                configurable: !1,
                enumerable: !0,
                get: r
              });
            }),
            (t.n = function(e) {
              var i =
                  e && e.__esModule
                      ? function() {
                        return e.default;
                      }
                      : function() {
                        return e;
                      };
              return t.d(i, 'a', i), i;
            }),
            (t.o = function(e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (t.p = ''),
            t((t.s = 0))
    );
  })([
    function(e, t, i) {
      'use strict';

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      }

      Object.defineProperty(t, '__esModule', {
        value: !0
      });

      var n =
              'function' == typeof Symbol && 'symbol' == _typeof(Symbol.iterator)
                  ? function(e) {
                    return _typeof(e);
                  }
                  : function(e) {
                    return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                        ? 'symbol'
                        : _typeof(e);
                  },
          s = (function() {
            function e(e, t) {
              for (var i = 0; i < t.length; i++) {
                var r = t[i];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                'value' in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r);
              }
            }

            return function(t, i, r) {
              return i && e(t.prototype, i), r && e(t, r), t;
            };
          })(),
          l = (function() {
            function e(t) {
              var i = this;
              if (
                  (r(this, e),
                      (this.config = e.mergeSettings(t)),
                      (this.selector =
                          'string' == typeof this.config.selector
                              ? document.querySelector(this.config.selector)
                              : this.config.selector),
                  null === this.selector)
              )
                throw new Error('Something wrong with your selector 😭');
              this.resolveSlidesNumber(),
                  (this.selectorWidth = this.selector.offsetWidth),
                  (this.innerElements = [].slice.call(this.selector.children)),
                  (this.currentSlide = this.config.loop
                      ? this.config.startIndex % this.innerElements.length
                      : Math.max(
                          0,
                          Math.min(this.config.startIndex, this.innerElements.length - this.perPage)
                      )),
                  (this.transformProperty = e.webkitOrNot()),
                  [
                    'resizeHandler',
                    'touchstartHandler',
                    'touchendHandler',
                    'touchmoveHandler',
                    'mousedownHandler',
                    'mouseupHandler',
                    'mouseleaveHandler',
                    'mousemoveHandler',
                    'clickHandler'
                  ].forEach(function(e) {
                    i[e] = i[e].bind(i);
                  }),
                  this.init();
            }

            return (
                s(
                    e,
                    [
                      {
                        key: 'attachEvents',
                        value: function value() {
                          window.addEventListener('resize', this.resizeHandler),
                          this.config.draggable &&
                          ((this.pointerDown = !1),
                              (this.drag = {
                                startX: 0,
                                endX: 0,
                                startY: 0,
                                letItGo: null,
                                preventClick: !1
                              }),
                              this.selector.addEventListener('touchstart', this.touchstartHandler),
                              this.selector.addEventListener('touchend', this.touchendHandler),
                              this.selector.addEventListener('touchmove', this.touchmoveHandler),
                              this.selector.addEventListener('mousedown', this.mousedownHandler),
                              this.selector.addEventListener('mouseup', this.mouseupHandler),
                              this.selector.addEventListener('mouseleave', this.mouseleaveHandler),
                              this.selector.addEventListener('mousemove', this.mousemoveHandler),
                              this.selector.addEventListener('click', this.clickHandler));
                        }
                      },
                      {
                        key: 'detachEvents',
                        value: function value() {
                          window.removeEventListener('resize', this.resizeHandler),
                              this.selector.removeEventListener('touchstart', this.touchstartHandler),
                              this.selector.removeEventListener('touchend', this.touchendHandler),
                              this.selector.removeEventListener('touchmove', this.touchmoveHandler),
                              this.selector.removeEventListener('mousedown', this.mousedownHandler),
                              this.selector.removeEventListener('mouseup', this.mouseupHandler),
                              this.selector.removeEventListener('mouseleave', this.mouseleaveHandler),
                              this.selector.removeEventListener('mousemove', this.mousemoveHandler),
                              this.selector.removeEventListener('click', this.clickHandler);
                        }
                      },
                      {
                        key: 'init',
                        value: function value() {
                          this.attachEvents(),
                              (this.selector.style.overflow = 'hidden'),
                              (this.selector.style.direction = this.config.rtl ? 'rtl' : 'ltr'),
                              this.buildSliderFrame(),
                              this.config.onInit.call(this);
                        }
                      },
                      {
                        key: 'buildSliderFrame',
                        value: function value() {
                          var e = this.selectorWidth / this.perPage,
                              t = this.config.loop
                                  ? this.innerElements.length + 2 * this.perPage
                                  : this.innerElements.length;
                          (this.sliderFrame = document.createElement('div')),
                              (this.sliderFrame.style.width = e * t + 'px'),
                              this.enableTransition(),
                          this.config.draggable && (this.selector.style.cursor = '-webkit-grab');
                          var i = document.createDocumentFragment();
                          if (this.config.loop)
                            for (
                                var r = this.innerElements.length - this.perPage;
                                r < this.innerElements.length;
                                r++
                            ) {
                              var n = this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));
                              i.appendChild(n);
                            }

                          for (var s = 0; s < this.innerElements.length; s++) {
                            var l = this.buildSliderFrameItem(this.innerElements[s]);
                            i.appendChild(l);
                          }

                          if (this.config.loop)
                            for (var o = 0; o < this.perPage; o++) {
                              var a = this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));
                              i.appendChild(a);
                            }
                          this.sliderFrame.appendChild(i),
                              (this.selector.innerHTML = ''),
                              this.selector.appendChild(this.sliderFrame),
                              this.slideToCurrent();
                        }
                      },
                      {
                        key: 'buildSliderFrameItem',
                        value: function value(e) {
                          var t = document.createElement('div');
                          return (
                              (t.style.cssFloat = this.config.rtl ? 'right' : 'left'),
                                  (t.style.float = this.config.rtl ? 'right' : 'left'),
                                  (t.style.width =
                                      (this.config.loop
                                          ? 100 / (this.innerElements.length + 2 * this.perPage)
                                          : 100 / this.innerElements.length) + '%'),
                                  t.appendChild(e),
                                  t
                          );
                        }
                      },
                      {
                        key: 'resolveSlidesNumber',
                        value: function value() {
                          if ('number' == typeof this.config.perPage) this.perPage = this.config.perPage;
                          else if ('object' === n(this.config.perPage)) {
                            this.perPage = 1;

                            for (var e in this.config.perPage) {
                              window.innerWidth >= e && (this.perPage = this.config.perPage[e]);
                            }
                          }
                        }
                      },
                      {
                        key: 'prev',
                        value: function value() {
                          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                              t = arguments[1];

                          if (!(this.innerElements.length <= this.perPage)) {
                            var i = this.currentSlide;

                            if (this.config.loop) {
                              if (this.currentSlide - e < 0) {
                                this.disableTransition();
                                var r = this.currentSlide + this.innerElements.length,
                                    n = this.perPage,
                                    s = r + n,
                                    l =
                                        (this.config.rtl ? 1 : -1) *
                                        s *
                                        (this.selectorWidth / this.perPage),
                                    o = this.config.draggable
                                        ? this.drag.endX - this.drag.startX
                                        : 0;
                                (this.sliderFrame.style[this.transformProperty] =
                                    'translate3d(' + (l + o) + 'px, 0, 0)'),
                                    (this.currentSlide = r - e);
                              } else this.currentSlide = this.currentSlide - e;
                            } else this.currentSlide = Math.max(this.currentSlide - e, 0);

                            i !== this.currentSlide &&
                            (this.slideToCurrent(this.config.loop),
                                this.config.onChange.call(this),
                            t && t.call(this));
                          }
                        }
                      },
                      {
                        key: 'next',
                        value: function value() {
                          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                              t = arguments[1];

                          if (!(this.innerElements.length <= this.perPage)) {
                            var i = this.currentSlide;

                            if (this.config.loop) {
                              if (this.currentSlide + e > this.innerElements.length - this.perPage) {
                                this.disableTransition();
                                var r = this.currentSlide - this.innerElements.length,
                                    n = this.perPage,
                                    s = r + n,
                                    l =
                                        (this.config.rtl ? 1 : -1) *
                                        s *
                                        (this.selectorWidth / this.perPage),
                                    o = this.config.draggable
                                        ? this.drag.endX - this.drag.startX
                                        : 0;
                                (this.sliderFrame.style[this.transformProperty] =
                                    'translate3d(' + (l + o) + 'px, 0, 0)'),
                                    (this.currentSlide = r + e);
                              } else this.currentSlide = this.currentSlide + e;
                            } else
                              this.currentSlide = Math.min(
                                  this.currentSlide + e,
                                  this.innerElements.length - this.perPage
                              );

                            i !== this.currentSlide &&
                            (this.slideToCurrent(this.config.loop),
                                this.config.onChange.call(this),
                            t && t.call(this));
                          }
                        }
                      },
                      {
                        key: 'disableTransition',
                        value: function value() {
                          (this.sliderFrame.style.webkitTransition = 'all 0ms ' + this.config.easing),
                              (this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing);
                        }
                      },
                      {
                        key: 'enableTransition',
                        value: function value() {
                          (this.sliderFrame.style.webkitTransition =
                              'all ' + this.config.duration + 'ms ' + this.config.easing),
                              (this.sliderFrame.style.transition =
                                  'all ' + this.config.duration + 'ms ' + this.config.easing);
                        }
                      },
                      {
                        key: 'goTo',
                        value: function value(e, t) {
                          if (!(this.innerElements.length <= this.perPage)) {
                            var i = this.currentSlide;
                            (this.currentSlide = this.config.loop
                                ? e % this.innerElements.length
                                : Math.min(Math.max(e, 0), this.innerElements.length - this.perPage)),
                            i !== this.currentSlide &&
                            (this.slideToCurrent(),
                                this.config.onChange.call(this),
                            t && t.call(this));
                          }
                        }
                      },
                      {
                        key: 'slideToCurrent',
                        value: function value(e) {
                          var t = this,
                              i = this.config.loop ? this.currentSlide + this.perPage : this.currentSlide,
                              r = (this.config.rtl ? 1 : -1) * i * (this.selectorWidth / this.perPage);
                          e
                              ? requestAnimationFrame(function() {
                                requestAnimationFrame(function() {
                                  t.enableTransition(),
                                      (t.sliderFrame.style[t.transformProperty] =
                                          'translate3d(' + r + 'px, 0, 0)');
                                });
                              })
                              : (this.sliderFrame.style[this.transformProperty] =
                              'translate3d(' + r + 'px, 0, 0)');
                        }
                      },
                      {
                        key: 'updateAfterDrag',
                        value: function value() {
                          var e = (this.config.rtl ? -1 : 1) * (this.drag.endX - this.drag.startX),
                              t = Math.abs(e),
                              i = this.config.multipleDrag
                                  ? Math.ceil(t / (this.selectorWidth / this.perPage))
                                  : 1,
                              r = e > 0 && this.currentSlide - i < 0,
                              n =
                                  e < 0 &&
                                  this.currentSlide + i > this.innerElements.length - this.perPage;
                          e > 0 && t > this.config.threshold && this.innerElements.length > this.perPage
                              ? this.prev(i)
                              : e < 0 &&
                              t > this.config.threshold &&
                              this.innerElements.length > this.perPage &&
                              this.next(i),
                              this.slideToCurrent(r || n);
                        }
                      },
                      {
                        key: 'resizeHandler',
                        value: function value() {
                          this.resolveSlidesNumber(),
                          this.currentSlide + this.perPage > this.innerElements.length &&
                          (this.currentSlide =
                              this.innerElements.length <= this.perPage
                                  ? 0
                                  : this.innerElements.length - this.perPage),
                              (this.selectorWidth = this.selector.offsetWidth),
                              this.buildSliderFrame();
                        }
                      },
                      {
                        key: 'clearDrag',
                        value: function value() {
                          this.drag = {
                            startX: 0,
                            endX: 0,
                            startY: 0,
                            letItGo: null,
                            preventClick: this.drag.preventClick
                          };
                        }
                      },
                      {
                        key: 'touchstartHandler',
                        value: function value(e) {
                          -1 !== ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) ||
                          (e.stopPropagation(),
                              (this.pointerDown = !0),
                              (this.drag.startX = e.touches[0].pageX),
                              (this.drag.startY = e.touches[0].pageY));
                        }
                      },
                      {
                        key: 'touchendHandler',
                        value: function value(e) {
                          e.stopPropagation(),
                              (this.pointerDown = !1),
                              this.enableTransition(),
                          this.drag.endX && this.updateAfterDrag(),
                              this.clearDrag();
                        }
                      },
                      {
                        key: 'touchmoveHandler',
                        value: function value(e) {
                          if (
                              (e.stopPropagation(),
                              null === this.drag.letItGo &&
                              (this.drag.letItGo =
                                  Math.abs(this.drag.startY - e.touches[0].pageY) <
                                  Math.abs(this.drag.startX - e.touches[0].pageX)),
                              this.pointerDown && this.drag.letItGo)
                          ) {
                            e.preventDefault(),
                                (this.drag.endX = e.touches[0].pageX),
                                (this.sliderFrame.style.webkitTransition =
                                    'all 0ms ' + this.config.easing),
                                (this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing);
                            var t = this.config.loop
                                ? this.currentSlide + this.perPage
                                : this.currentSlide,
                                i = t * (this.selectorWidth / this.perPage),
                                r = this.drag.endX - this.drag.startX,
                                n = this.config.rtl ? i + r : i - r;
                            this.sliderFrame.style[this.transformProperty] =
                                'translate3d(' + (this.config.rtl ? 1 : -1) * n + 'px, 0, 0)';
                          }
                        }
                      },
                      {
                        key: 'mousedownHandler',
                        value: function value(e) {
                          -1 !== ['TEXTAREA', 'OPTION', 'INPUT', 'SELECT'].indexOf(e.target.nodeName) ||
                          (e.preventDefault(),
                              e.stopPropagation(),
                              (this.pointerDown = !0),
                              (this.drag.startX = e.pageX));
                        }
                      },
                      {
                        key: 'mouseupHandler',
                        value: function value(e) {
                          e.stopPropagation(),
                              (this.pointerDown = !1),
                              (this.selector.style.cursor = '-webkit-grab'),
                              this.enableTransition(),
                          this.drag.endX && this.updateAfterDrag(),
                              this.clearDrag();
                        }
                      },
                      {
                        key: 'mousemoveHandler',
                        value: function value(e) {
                          if ((e.preventDefault(), this.pointerDown)) {
                            'A' === e.target.nodeName && (this.drag.preventClick = !0),
                                (this.drag.endX = e.pageX),
                                (this.selector.style.cursor = '-webkit-grabbing'),
                                (this.sliderFrame.style.webkitTransition =
                                    'all 0ms ' + this.config.easing),
                                (this.sliderFrame.style.transition = 'all 0ms ' + this.config.easing);
                            var t = this.config.loop
                                ? this.currentSlide + this.perPage
                                : this.currentSlide,
                                i = t * (this.selectorWidth / this.perPage),
                                r = this.drag.endX - this.drag.startX,
                                n = this.config.rtl ? i + r : i - r;
                            this.sliderFrame.style[this.transformProperty] =
                                'translate3d(' + (this.config.rtl ? 1 : -1) * n + 'px, 0, 0)';
                          }
                        }
                      },
                      {
                        key: 'mouseleaveHandler',
                        value: function value(e) {
                          this.pointerDown &&
                          ((this.pointerDown = !1),
                              (this.selector.style.cursor = '-webkit-grab'),
                              (this.drag.endX = e.pageX),
                              (this.drag.preventClick = !1),
                              this.enableTransition(),
                              this.updateAfterDrag(),
                              this.clearDrag());
                        }
                      },
                      {
                        key: 'clickHandler',
                        value: function value(e) {
                          this.drag.preventClick && e.preventDefault(), (this.drag.preventClick = !1);
                        }
                      },
                      {
                        key: 'remove',
                        value: function value(e, t) {
                          if (e < 0 || e >= this.innerElements.length)
                            throw new Error("Item to remove doesn't exist 😭");
                          var i = e < this.currentSlide,
                              r = this.currentSlide + this.perPage - 1 === e;
                          (i || r) && this.currentSlide--,
                              this.innerElements.splice(e, 1),
                              this.buildSliderFrame(),
                          t && t.call(this);
                        }
                      },
                      {
                        key: 'insert',
                        value: function value(e, t, i) {
                          if (t < 0 || t > this.innerElements.length + 1)
                            throw new Error('Unable to inset it at this index 😭');
                          if (-1 !== this.innerElements.indexOf(e))
                            throw new Error('The same item in a carousel? Really? Nope 😭');
                          var r = t <= this.currentSlide > 0 && this.innerElements.length;
                          (this.currentSlide = r ? this.currentSlide + 1 : this.currentSlide),
                              this.innerElements.splice(t, 0, e),
                              this.buildSliderFrame(),
                          i && i.call(this);
                        }
                      },
                      {
                        key: 'prepend',
                        value: function value(e, t) {
                          this.insert(e, 0), t && t.call(this);
                        }
                      },
                      {
                        key: 'append',
                        value: function value(e, t) {
                          this.insert(e, this.innerElements.length + 1), t && t.call(this);
                        }
                      },
                      {
                        key: 'destroy',
                        value: function value() {
                          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                              t = arguments[1];

                          if ((this.detachEvents(), (this.selector.style.cursor = 'auto'), e)) {
                            for (
                                var i = document.createDocumentFragment(), r = 0;
                                r < this.innerElements.length;
                                r++
                            ) {
                              i.appendChild(this.innerElements[r]);
                            }

                            (this.selector.innerHTML = ''),
                                this.selector.appendChild(i),
                                this.selector.removeAttribute('style');
                          }

                          t && t.call(this);
                        }
                      }
                    ],
                    [
                      {
                        key: 'mergeSettings',
                        value: function value(e) {
                          var t = {
                                selector: '.siema',
                                duration: 200,
                                easing: 'ease-out',
                                perPage: 1,
                                startIndex: 0,
                                draggable: !0,
                                multipleDrag: !0,
                                threshold: 20,
                                loop: !1,
                                rtl: !1,
                                onInit: function onInit() {},
                                onChange: function onChange() {}
                              },
                              i = e;

                          for (var r in i) {
                            t[r] = i[r];
                          }

                          return t;
                        }
                      },
                      {
                        key: 'webkitOrNot',
                        value: function value() {
                          return 'string' == typeof document.documentElement.style.transform
                              ? 'transform'
                              : 'WebkitTransform';
                        }
                      }
                    ]
                ),
                    e
            );
          })();

      (t.default = l), (e.exports = t.default);
    }
  ]);
});
('use strict');

document.addEventListener('DOMContentLoaded', init);

window.onscroll = function() {
  if (!isCookieAllowed() && !window.localStorage.getItem('COOKIE_DECLINE_DATE')) {
    cookieTurnOn(COOKIE_ACCEPTING_TYPES_MAP.SCROLL);
  }
};

var SEARCH_STRING = window.location.search;
var COOKIE_LOCALE = 'COOKIE_LOCALE';
var COOKIE_SETTINGS = 'cookiesettings';
var ACCEPTED_COOKIE_AGE = 365;
var LOCALE_COOKIE_AGE = 30;
var NOT_ACCEPTED_COOKIE_AGE = 36;
var COOKIE_ACCEPTING_TYPES_MAP = {
  CLICK: 'click',
  SCROLL: 'scroll'
};
var IGNORED_COOKIES = ['PHPSESSID'];
var LOCAL_STORAGE = {
  COOKIE_ACCEPTING_STEP: 'COOKIE_ACCEPTING_STEP',
  COOKIE_ACCEPTING_DATE: 'COOKIE_ACCEPTING_DATE',
  COOKIE_DECLINE_DATE: 'COOKIE_DECLINE_DATE',
  COOKIE_ACCEPTING_TYPE: 'COOKIE_ACCEPTING_TYPE',
  COOKIE_ACCEPTING_AGREEMENT_TEXT: 'COOKIE_ACCEPTING_AGREEMENT_TEXT'
};
var LOCALES = {
  en: 'en',
  ru: 'ru',
  pl: 'pl',
  es: 'es',
  de: 'de',
  uk: 'uk',
  fr: 'fr'
};
var DEFAULT_LOCALE = LOCALES.en;

function init() {
  initCookiesPopup();
  initLocale();
  mobileMenuInit();
  mobileDropdownsInit();
  // appButtonInit();
  slidersInit();
  feedbackSliderInit();
  inputResetInit();
  // webFormInit();
  // appFormInit();
}

function appButtonInit() {
  var getAppBtn = document.getElementById('get-app');
  var appsPopup = document.getElementById('appsPopup');
  document.addEventListener(
      'click',
      function(event) {
        var isClickInside = appsPopup.contains(event.target);

        if (!isClickInside && appsPopup.classList.contains('active')) {
          appsPopup.classList.remove('active');
        }
      },
      true
  );
  getAppBtn.addEventListener(
      'click',
      function() {
        var getAppPopup = (document.querySelector('.apps__get-app-link-container').classList += ' active');
      },
      true
  );
}

function initLocale() {
  var currentLocale = (/.+publbox.com\/(\w{2})\/?/.exec(window.location.href) || [])[1] || DEFAULT_LOCALE;
  createCookie(COOKIE_LOCALE, currentLocale, LOCALE_COOKIE_AGE);
  return currentLocale;
}

function slidersInit() {
  var sliderContainers = document.querySelectorAll('.slider');
  Array.prototype.forEach.call(sliderContainers, function(sliderItem) {
    var navList = sliderItem.querySelectorAll('.slider__navigation-list-item');
    var navListMobile = sliderItem.querySelectorAll('.slider__mobile-navigation-item');
    var slider = new Siema({
      selector: sliderItem.querySelector('.slider__container'),
      duration: 300,
      rtl: true,
      multipleDrag: true,
      onInit: function onInit() {
        navList[0].classList += ' active';
        navListMobile[0].classList += ' active';
      },
      onChange: function onChange() {
        setActiveSlidePagination(navList, this.currentSlide);
        setActiveSlidePagination(navListMobile, this.currentSlide);
      }
    }); //Add lisentners on navigation

    Array.prototype.forEach.call(navList, function(nav, index) {
      nav.addEventListener('mouseenter', function() {
        slider.goTo(index);
        setActiveSlidePagination(navList, index);
      });
    });
  });
}

function setActiveSlidePagination(list, slide) {
  Array.prototype.forEach.call(list, function(element) {
    element.classList.remove('active');
  });
  list[slide].classList += ' active';
}

function feedbackSliderInit() {
  var sliderContainer = document.querySelector('.feedback__slider');
  var navList = sliderContainer.querySelectorAll('.feedback__slider-navigation-item');
  var slider = new Siema({
    selector: sliderContainer.querySelector('.feedback__slider-container'),
    duration: 300,
    rtl: false,
    onInit: function onInit() {
      navList[0].classList += ' active';
    },
    onChange: function onChange() {
      setActiveSlidePagination(navList, this.currentSlide);
    }
  }); //Add lisentners on navigation

  Array.prototype.forEach.call(navList, function(nav, index) {
    nav.addEventListener('mouseenter', function() {
      slider.goTo(index);
      Array.prototype.forEach.call(navList, function(element) {
        element.classList.remove('active');
      });
      navList[index].classList += ' active';
    });
  });
}

function mobileMenuInit() {
  var openButton = document.querySelector('.header__menu-button');
  var closeButton = document.querySelector('.close-button');
  var menu = document.querySelector('.mobile-menu');
  openButton.addEventListener('click', function() {
    menu.classList += ' active';
  });
  closeButton.addEventListener('click', function() {
    menu.classList.remove('active');
  });
}

function mobileDropdownsInit() {
  var dropdowns = document.querySelectorAll('.mobile-dropdown');
  Array.prototype.forEach.call(dropdowns, function(dropdown) {
    dropdown.addEventListener('click', function() {
      if (!dropdown.classList.contains('active')) {
        dropdown.classList += ' active';
      } else {
        dropdown.classList.remove('active');
      }
    });
  });
}

function inputResetInit() {
  var inputs = document.querySelectorAll('.form__input-wrapper');
  Array.prototype.forEach.call(inputs, function(inputContainer) {
    var input = inputContainer.querySelector('.form__input');
    var closeButton = inputContainer.querySelector('.close');

    input.oninput = function(event) {
      if (event.srcElement.value && !inputContainer.classList.contains('filled')) {
        inputContainer.classList += ' filled';
      } else if (!event.srcElement.value && inputContainer.classList.contains('filled')) {
        inputContainer.classList.remove('filled');
      }
    };
    closeButton.addEventListener('click', function() {
      input.value = '';
      inputContainer.classList.remove('filled');
    });
  });
}

function initExternalServices(param) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    cookie: param
  });
}

function getCookie(cookieName) {
  var name = cookieName + '=';
  var allCookieArray = document.cookie.split(';');

  for (var i = 0; i < allCookieArray.length; i++) {
    var temp = allCookieArray[i].trim();

    if (temp.indexOf(name) === 0) {
      return temp.substring(name.length, temp.length);
    }
  }
  return '';
}

function createCookie(cookieName, cookieValue, daysToExpire) {
  var date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  document.cookie =
      cookieName + '=' + cookieValue + '; expires=' + date.toGMTString() + '; path=/; domain=.publbox.com';
}

function eraseCookie(cookieName) {
  createCookie(cookieName, '', -1);
}

function removeAllCookies() {
  var allCookieArray = document.cookie.split(';');

  for (var i = 0; i < allCookieArray.length; i++) {
    var temp = allCookieArray[i].trim();
    var cookieName = temp.split('=')[0];

    if (!IGNORED_COOKIES.includes(cookieName)) {
      eraseCookie(cookieName);
    }
  }
}

function isCookieAllowed() {
  return getCookie(COOKIE_SETTINGS) === '1';
}

function cookieTurnOn(acceptingType) {
  localStorage.setItem(LOCAL_STORAGE.COOKIE_ACCEPTING_DATE, new Date().toString());
  localStorage.setItem(LOCAL_STORAGE.COOKIE_ACCEPTING_TYPE, acceptingType);
  localStorage.removeItem(LOCAL_STORAGE.COOKIE_DECLINE_DATE);
  createCookie(COOKIE_SETTINGS, '1', ACCEPTED_COOKIE_AGE);
  initExternalServices('on');
}

function cookieTurnOff() {
  var prevVal = getCookie(COOKIE_SETTINGS);
  localStorage.setItem(LOCAL_STORAGE.COOKIE_DECLINE_DATE, new Date().toString());
  localStorage.removeItem(LOCAL_STORAGE.COOKIE_ACCEPTING_DATE);
  localStorage.removeItem(LOCAL_STORAGE.COOKIE_ACCEPTING_STEP);
  localStorage.removeItem(LOCAL_STORAGE.COOKIE_ACCEPTING_AGREEMENT_TEXT);
  localStorage.removeItem(LOCAL_STORAGE.COOKIE_ACCEPTING_TYPE); // Remove all cookies

  removeAllCookies();
  createCookie(COOKIE_SETTINGS, '0', NOT_ACCEPTED_COOKIE_AGE);
  initExternalServices('off');
}

function handleCookiesPopupGotItClick() {
  cookieTurnOn(COOKIE_ACCEPTING_TYPES_MAP.CLICK);
  hideCookiePopup();
}

function handleCookiesPopupCloseClick() {
  cookieTurnOn(COOKIE_ACCEPTING_TYPES_MAP.CLICK);
  hideCookiePopup();
}

function initCookiesPopup() {
  if (!isCookieAllowed()) {
    var popup = document.querySelector('.cookies');
    popup.classList.remove('hidden');

    if (window.localStorage.getItem('COOKIE_DECLINE_DATE')) {
      popup.classList += ' hidden';
    }

    initExternalServices('off');
    var page = document.querySelector('.page-wrapper');
    var gotItButton = document.querySelector('.cookies__button-container');
    var closeButton = document.querySelector('.cookies__close');
    var learnMore = document.querySelector('#learn-more');
    var moreCloseButton = document.querySelector('.cookies__learn-more-close');
    var denyCookiesButton = document.getElementById('cookies-deny-confirm');
    var denyCookiesCheckbox = document.getElementById('cookies');
    page.addEventListener('click', function() {
      return cookieTurnOn(COOKIE_ACCEPTING_TYPES_MAP.CLICK);
    });
    gotItButton.addEventListener('click', handleCookiesPopupGotItClick);
    closeButton.addEventListener('click', handleCookiesPopupCloseClick);
    learnMore.addEventListener('click', toggleCookiesContent);
    moreCloseButton.addEventListener('click', toggleCookiesContent);
    denyCookiesButton.addEventListener('click', function() {
      if (denyCookiesCheckbox.checked) {
        cookieTurnOff();
        hideCookiePopup();
      } else {
        cookieTurnOn(COOKIE_ACCEPTING_TYPES_MAP.CLICK);
        hideCookiePopup();
      }
    });
  }
}

function hideCookiePopup() {
  var cookies = document.querySelector('.cookies');
  cookies.classList += ' hidden';
}

function toggleCookiesContent() {
  var mainContent = document.querySelector('.cookies__main');
  var moreContent = document.querySelector('.cookies__more');

  if (mainContent.classList.contains('hidden')) {
    moreContent.classList += ' hidden';
    mainContent.classList.remove('hidden');
  } else if (moreContent.classList.contains('hidden')) {
    mainContent.classList += ' hidden';
    moreContent.classList.remove('hidden');
  }
}

function webFormInit() {
  var form = document.getElementById('web-form');
  var input = form.querySelector('.form__input');
  var lang = document.querySelector('.lang .dropdown__title span');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(
        'landingData',
        JSON.stringify({
          email: input.value
        })
    );
    window.location.replace(
        'http://publbox.com/'.concat(lang.innerHTML.toLowerCase(), '/authorization').concat(SEARCH_STRING)
    );
  });
}

function appFormInit() {
  var form = document.getElementById('app-form');
  var input = form.querySelector('.form__input');
  var currentLocale = initLocale();
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!input.value) {
      return;
    }

    fetch('https://app.publbox.com/graphql/', {
      body: JSON.stringify({
        query: '\n                       mutation {\n                          sendInviteLetter (email: "'
            .concat(input.value, '", locale: ')
            .concat(
                currentLocale.toUpperCase(),
                ') {\n                            result\n                          }\n                        }\n                    '
            )
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          var appsPopup = document.getElementById('appsPopup');
          appsPopup.classList.remove('active');
        });
  });
}