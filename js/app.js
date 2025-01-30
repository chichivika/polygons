(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,n(o.key),o)}}function n(e){var n=function(e,n){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(n)?n:String(n)}function r(t){var e="function"==typeof Map?new Map:void 0;return r=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(o())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var u=new(t.bind.apply(t,r));return n&&i(u,n.prototype),u}(t,arguments,u(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),i(n,t)},r(t)}function o(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(o=function(){return!!t})()}function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function u(t){return u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},u(t)}const c=function(n){function r(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),e=this,i=arguments,n=u(n=r),function(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e)}(e,o()?Reflect.construct(n,i||[],u(e).constructor):n.apply(e,i));var e,n,i}var c,a,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&i(t,e)}(r,n),c=r,l=[{key:"doAction",value:function(t){"create"===t&&r.doCreateAction()}},{key:"doCreateAction",value:function(){document.querySelector("buffer-area").createPolygons()}}],(a=[{key:"connectedCallback",value:function(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n          <style>\n            :host {   \n                display: flex;\n                justify-content: space-evenly;\n                flex-wrap: wrap;\n                align-items: center;\n                gap: 20px;\n            }\n            button {\n                background-color: var(--button-bg-color);\n                padding: 10px 20px;\n                border: none;\n                border-radius: 3px;\n                cursor: pointer;\n                transition: background-color 0.3s;\n            }\n            button:hover {\n                background-color: var(--button-hover-bg-color);\n            }\n            button:active {\n                background-color: var(--button-active-bg-color);\n            }\n            .app-toolbar-right-cnt {\n                display: flex;\n                gap: 20px;\n                align-items: center;\n            }\n          </style>\n          <button data-action='create'>Создать</button>\n          <div class='app-toolbar-right-cnt'>\n            <button data-action='save'>Сохранить</button>\n            <button data-action='clear'>Сбросить</button>\n          </div>\n        ",this.addActionsListeners()}},{key:"addActionsListeners",value:function(){this.shadowRoot.querySelectorAll("button[data-action]").forEach((function(t){t.addEventListener("click",(function(){r.doAction(t.dataset.action)}))}))}}])&&e(c.prototype,a),l&&e(c,l),Object.defineProperty(c,"prototype",{writable:!1}),r}(r(HTMLElement));function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,f(r.key),r)}}function f(t){var e=function(t,e){if("object"!=a(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=a(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==a(e)?e:String(e)}function s(t){var e="function"==typeof Map?new Map:void 0;return s=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(p())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&y(o,n.prototype),o}(t,arguments,b(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),y(n,t)},s(t)}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function y(t,e){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},y(t,e)}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}const d=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t=this,r=arguments,n=b(n=e),function(t,e){if(e&&("object"===a(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(n,r||[],b(t).constructor):n.apply(t,r));var t,n,r}var n,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&y(t,e)}(e,t),n=e,(r=[{key:"connectedCallback",value:function(){this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML="\n            <style>\n              :host {   \n                    display: grid;\n                    height: 100%;\n                    grid-template-rows: 80px max-content minmax(300px, 1fr);\n                    grid-template-columns: 1fr;\n                    gap: 5px;\n                    background-color: var(--header-color);\n              }\n              ::slotted(*) {\n                background-color: var(--bg-color);\n              }\n              ::slotted(app-toolbar) {\n                grid-row: 1 / span 1;\n              }\n              ::slotted(buffer-area) {\n                grid-row: 2 / span 1;\n                min-height: 240px;\n              }\n              ::slotted(work-area) {\n                grid-row: 3 / span 1;\n                background-color: var(--ruler-bg-color);\n              }\n            </style>\n            <slot name='toolbar'></slot>\n            <slot name='buffer-area'></slot>\n            <slot name='work-area'></slot>\n          "}}])&&l(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}(s(HTMLElement));function h(t,e){var n=Math.random()*(e-t)+t;return Math.floor(n)}function v(t){var e=t.start,n=t.end,r=t.stepsCount,o=t.includeStart,i=void 0!==o&&o,u=t.includeEnd,c=(n-e)/r;return e+h(i?0:1,void 0!==u&&u?r+1:r)*c}function m(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;return[n*t[0]+r*e[0],n*t[1]+r*e[1]]}function w(t,e){return Math.abs(t-e)<1e-6}function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function O(t){var e=t.width,n=t.height,r=function(t){for(var e=t.vertsCount,n=t.width,r=t.height,o=[n/2,r/2],i=2*Math.PI/e,u=[],c=0;c<e;++c){var a=v({start:c*i,end:(c+1)*i-i/3,stepsCount:10,includeStart:!0}),l=[Math.cos(a),Math.sin(a)],f=m(o,l,1,S({vertVector:l,centerPoint:o,width:n,height:r,radiusStepsCount:10}));u.push(f)}return u}(t),o=e,i=0,u=n,c=0;r.forEach((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,c=[],a=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);a=!0);}catch(t){l=!0,o=t}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return c}}(e,n)||function(t,e){if(t){if("string"==typeof t)return g(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=r[0],l=r[1];o=a<o?a:o,i=a>i?a:i,u=l<u?l:u,c=l>c?l:c}));var a=r.reduce((function(t,e){return"".concat(t," ").concat(e[0]-o,",").concat(e[1]-u)}),"");return{width:i-o,height:c-u,points:a}}function S(t){var e,n=t.vertVector,r=t.centerPoint,o=t.width,i=t.height,u=t.radiusStepsCount,c=function(t){var e=t.centerPoint,n=t.lineVector,r=t.width,o=t.height;if(w(n[1],0))return null;var i=c(-e[1]/n[1]);if(i)return i;var u=c((o-e[1])/n[1]);if(u)return u;function c(t){if(t<0)return null;var o=m(e,n,1,t);return o[0]<0||o[0]>r?null:o}return null}(e={lineVector:n,centerPoint:r,width:o,height:i})||function(t){var e=t.centerPoint,n=t.lineVector,r=t.height,o=t.width;if(w(n[0],0))return null;var i=c(-e[0]/n[0]);if(i)return i;var u=c((o-e[0])/n[0]);if(u)return u;function c(t){if(t<0)return null;var o=m(e,n,1,t);return o[1]<0||o[1]>r?null:o}return null}(e);if(!c)throw new Error("error while generating a polygon");var a,l,f,s=(f=(a=r,[(l=c)[0]-a[0],l[1]-a[1]]),Math.sqrt(Math.pow(f[0],2)+Math.pow(f[1],2)));return v({start:s/3,end:s,stepsCount:u,includeEnd:!0})}function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,P(r.key),r)}}function P(t){var e=function(t,e){if("object"!=j(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==j(e)?e:String(e)}function E(t){var e="function"==typeof Map?new Map:void 0;return E=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(T())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&_(o,n.prototype),o}(t,arguments,x(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),_(n,t)},E(t)}function T(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(T=function(){return!!t})()}function _(t,e){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_(t,e)}function x(t){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},x(t)}const C=function(t){function e(){var t,n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=this,r=e,r=x(r),t=function(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(n,T()?Reflect.construct(r,o||[],x(n).constructor):r.apply(n,o))).polygonsData=null,t}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_(t,e)}(e,t),n=e,o=[{key:"renderPolygon",value:function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("width",t.width),e.setAttribute("height",t.height);var n=document.createElementNS(e.namespaceURI,"polygon");return n.setAttribute("points",t.points),e.append(n),e}}],(r=[{key:"connectedCallback",value:function(){this.render()}},{key:"render",value:function(){var t=this,n=this.polygonsData;if(n){this.innerHTML="";try{n.forEach((function(n){t.append(e.renderPolygon(n))}))}catch(t){console.log(t)}}}},{key:"createPolygons",value:function(){this.polygonsData=function(){for(var t=h(5,20),e=[],n=0;n<t;++n)e.push(O({width:h(80,150),height:h(80,120),vertsCount:h(3,10)}));return e}(),this.render()}}])&&k(n.prototype,r),o&&k(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}(E(HTMLElement));function M(t){return M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(t)}function z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,R(r.key),r)}}function R(t){var e=function(t,e){if("object"!=M(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=M(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==M(e)?e:String(e)}function A(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function L(t){var e="function"==typeof Map?new Map:void 0;return L=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(H())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&B(o,n.prototype),o}(t,arguments,N(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),B(n,t)},L(t)}function H(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(H=function(){return!!t})()}function B(t,e){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},B(t,e)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}const D=function(t){function e(){var t,n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=this,r=e,r=N(r),t=function(t,e){if(e&&("object"===M(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return A(t)}(n,H()?Reflect.construct(r,o||[],N(n).constructor):r.apply(n,o))).cellSize=30,t.scrollHandler=function(e){t.resize(e)}.bind(A(t)),t}var n,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&B(t,e)}(e,t),n=e,(r=[{key:"disconnectedCallback",value:function(){this.removeEventListener("wheel",this.scrollHandler)}},{key:"connectedCallback",value:function(){this.addEventListener("wheel",this.scrollHandler),this.attachShadow({mode:"open"}),this.render()}},{key:"render",value:function(){var t=this.cellSize;this.shadowRoot.innerHTML='\n                <style>\n                  :host(work-area) {   \n                        display: grid;\n                        grid-template-rows: 1fr 30px;\n                        grid-template-columns: 30px 1fr;\n                  }\n                  :host > work-ruler[align="vertical"] {\n                    grid-row: 1 / span 1;\n                    grid-column: 1 / span 1;\n                  }\n                  :host > work-ruler[align="horizontal"] {\n                    grid-row: 2 / span 1;\n                    grid-column: 2 / span 1;\n                  }\n                  :host > drag-area {\n                    grid-row: 1 / span 1;\n                    grid-column: 2 / span 1;\n                    background-color: var(--bg-color);\n                  }\n                </style>\n                <work-ruler cell-size="'.concat(t,'" step="').concat(10,'" start-mark="0" align="horizontal"></work-ruler>\n                <work-ruler cell-size="').concat(t,'" step="').concat(10,'" start-mark="0" align="vertical"></work-ruler>\n                <drag-area cell-size="').concat(t,'"></drag-area>\n              ')}},{key:"resize",value:function(t){if(t.ctrlKey){t.preventDefault();var e=t.deltaY<0?1:-1;this.cellSize+=5*e,this.cellSize<25?this.cellSize=25:this.cellSize>70&&(this.cellSize=70),this.render()}}}])&&z(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}(L(HTMLElement));function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,V(r.key),r)}}function V(t){var e=function(t,e){if("object"!=I(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==I(e)?e:String(e)}function q(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function U(t){var e="function"==typeof Map?new Map:void 0;return U=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(K())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&Y(o,n.prototype),o}(t,arguments,$(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),Y(n,t)},U(t)}function K(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(K=function(){return!!t})()}function Y(t,e){return Y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},Y(t,e)}function $(t){return $=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},$(t)}const G=function(t){function e(){var t,n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=this,r=e,r=$(r),t=function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return q(t)}(n,K()?Reflect.construct(r,o||[],$(n).constructor):r.apply(n,o))).resizeCallback=function(){t.render()}.bind(q(t)),t}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Y(t,e)}(e,t),n=e,o=[{key:"observedAttributes",get:function(){return["cell-size","step","start-mark","vertical"]}}],(r=[{key:"connectedCallback",value:function(){window.addEventListener("resize",this.resizeCallback),this.render()}},{key:"disconnectedCallback",value:function(){window.removeEventListener("resize",this.resizeCallback)}},{key:"render",value:function(){this.style="\n        position: relative;\n        font-size: 10px;\n        font-weight: bold;\n    ";var t=parseInt(this.getAttribute("cell-size")),e=parseInt(this.getAttribute("step")),n=parseInt(this.getAttribute("start-mark"));if(!(Number.isNaN(t)||Number.isNaN(e)||Number.isNaN(n))){this.innerHTML="";var r=this.getBoundingClientRect(),o="vertical"===this.getAttribute("align"),i=o?r.height:r.width,u=Math.floor(i/t);this.renderMarks({vertical:o,marksCount:u,step:e,cellSize:t})}}},{key:"renderMarks",value:function(t){for(var e=t.marksCount,n=t.step,r=t.cellSize,o=t.vertical,i=0;i<e;++i){var u=n*i,c=document.createElement("div");c.style.position="absolute";var a="".concat(i*r,"px");o?(c.style.right="3px",c.style.bottom=a):(c.style.top="3px",c.style.left=a),c.innerText="".concat(u),this.append(c)}}},{key:"attributeChangedCallback",value:function(){this.render()}}])&&F(n.prototype,r),o&&F(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}(U(HTMLElement));function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function Q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,W(r.key),r)}}function W(t){var e=function(t,e){if("object"!=J(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=J(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==J(e)?e:String(e)}function X(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Z(t){var e="function"==typeof Map?new Map:void 0;return Z=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(tt())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var o=new(t.bind.apply(t,r));return n&&et(o,n.prototype),o}(t,arguments,nt(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),et(n,t)},Z(t)}function tt(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(tt=function(){return!!t})()}function et(t,e){return et=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},et(t,e)}function nt(t){return nt=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},nt(t)}const rt=function(t){function e(){var t,n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=this,r=e,r=nt(r),t=function(t,e){if(e&&("object"===J(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return X(t)}(n,tt()?Reflect.construct(r,o||[],nt(n).constructor):r.apply(n,o))).resizeCallback=function(){t.render()}.bind(X(t)),t}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&et(t,e)}(e,t),n=e,o=[{key:"drawCells",value:function(t){var e=t.ctx,n=t.cellSize,r=t.width,o=t.height;e.strokeStyle="lightgrey";for(var i=Math.floor(o/n),u=1;u<=i;++u)e.beginPath(),e.moveTo(0,o-u*n),e.lineTo(r,o-u*n),e.stroke();for(var c=Math.floor(r/n),a=1;a<=c;++a)e.beginPath(),e.moveTo(a*n,0),e.lineTo(a*n,o),e.stroke()}},{key:"observedAttributes",get:function(){return["cell-size"]}}],(r=[{key:"connectedCallback",value:function(){window.addEventListener("resize",this.resizeCallback),this.style="\n        position: relative;\n    ",this.render()}},{key:"disconnectedCallback",value:function(){window.removeEventListener("resize",this.resizeCallback)}},{key:"attributeChangedCallback",value:function(){this.render()}},{key:"render",value:function(){this.innerHTML="";var t=document.createElement("canvas"),n=this.getBoundingClientRect();t.setAttribute("width",n.width),t.setAttribute("height",n.height),t.style.position="absolute",t.style.bottom="0px",t.style.left="0px",this.append(t);var r=t.getContext("2d"),o=parseInt(this.getAttribute("cell-size"));null===r||Number.isNaN(o)||e.drawCells({ctx:r,cellSize:o,width:t.width,height:t.height})}}])&&Q(n.prototype,r),o&&Q(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}(Z(HTMLElement));customElements.define("app-toolbar",c),customElements.define("main-grid",d),customElements.define("buffer-area",C),customElements.define("work-area",D),customElements.define("work-ruler",G),customElements.define("drag-area",rt),document.addEventListener("DOMContentLoaded",(function(){}))})();