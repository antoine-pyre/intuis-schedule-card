function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,S=t=>t,w=A.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+z,P=`<${k}>`,U=document,O=()=>U.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,I=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,Z=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=U.createTreeWalker(U,129);function G(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===N?"!--"===c[1]?n=R:void 0!==c[1]?n=j:void 0!==c[2]?(Z.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=o??N,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?L:D):n===L||n===D?n=I:n===R||n===j?n=N:(n=I,o=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+P:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+z+h):i+z+(-2===l?e:h)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[r++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(z)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(Z.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),F.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)a.push({type:7,index:o}),t+=z.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),T(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),r||=!T(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(K,X),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ht=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ft={Monday:0,Tuesday:1,Wednesday:2,Thursday:3,Friday:4,Saturday:5,Sunday:6};function _t(t){const e=t%60;return`${Math.floor(t/60).toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}`}function mt(t,e,i){const s=[];for(let o=t;o<=e;o++)for(let t=0;t<60&&!(o===e&&t>0);t+=i)s.push(_t(60*o+t));return s}function $t(t,e,i){if(t!==function(){const t=(new Date).getDay();return gt[0===t?6:t-1]}())return!1;const s=new Date,o=60*s.getHours()+s.getMinutes(),r=function(t){const[e,i]=t.split(":").map(Number);return 60*e+i}(e);return o>=r&&o<r+i}const yt=["#3b82f6","#f97316","#22c55e","#ef4444","#8b5cf6","#06b6d4","#ec4899","#eab308","#14b8a6","#6b7280","#f43f5e","#84cc16"];function vt(t,e,i=0){return e?.[t.name]?e[t.name]:yt[i%yt.length]}function bt(t){const e=t.replace("#","");return(.299*parseInt(e.substring(0,2),16)+.587*parseInt(e.substring(2,4),16)+.114*parseInt(e.substring(4,6),16))/255>.5?"#1f2937":"#ffffff"}const xt={time_step:60,start_hour:0,end_hour:23,show_temperatures:!0,compact:!1};let At=class extends at{constructor(){super(...arguments),this._loading=!1,this._zoneSelector={open:!1,day:null,dayIndex:0,time:""}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config={...xt,...t}}getCardSize(){const t=this._config;if(!t)return 6;const e=mt(t.start_hour??0,t.end_hour??23,t.time_step??60);return Math.ceil(e.length/2)+2}shouldUpdate(t){if(!this._config)return!0;if(t.has("hass")&&this.hass){const e=t.get("hass");if(!e)return!0;const i=this._config.entity;return e.states[i]!==this.hass.states[i]}return!0}_getScheduleAttributes(){if(!this.hass||!this._config)return null;const t=this.hass.states[this._config.entity];return t?t.attributes:(this._error=`Entity ${this._config.entity} not found`,null)}_getZoneForSlot(t,e,i){const s=t.weekly_timetable[e];if(!s||0===s.length)return null;let o=null;const r=this._parseTime(i);for(const t of s){if(!(this._parseTime(t.time)<=r))break;o=t.zone}if(!o){const i=ft[e],s=gt[0===i?6:i-1],r=t.weekly_timetable[s];r&&r.length>0&&(o=r[r.length-1].zone)}return o&&t.zones.find(t=>t.name===o)||null}_parseTime(t){const[e,i]=t.split(":").map(Number);return 60*e+i}_handleCellClick(t,e){this._zoneSelector={open:!0,day:t,dayIndex:ft[t],time:e}}async _handleZoneSelect(t){if(this.hass&&this._zoneSelector.day){this._loading=!0,this._error=void 0;try{await this.hass.callService("intuis_connect","set_schedule_slot",{day:this._zoneSelector.dayIndex,start_time:this._zoneSelector.time,zone_id:t.id}),this._zoneSelector={open:!1,day:null,dayIndex:0,time:""}}catch(t){this._error=t instanceof Error?t.message:"Failed to update schedule"}finally{this._loading=!1}}}_closeZoneSelector(){this._zoneSelector={open:!1,day:null,dayIndex:0,time:""}}render(){if(!this._config)return B`<ha-card><div class="error">Card not configured</div></ha-card>`;const t=this._getScheduleAttributes();if(!t)return B`
        <ha-card>
          <div class="error">${this._error||"Schedule data not available"}</div>
        </ha-card>
      `;const e=mt(this._config.start_hour??0,this._config.end_hour??23,this._config.time_step??60),i=this._config.compact??!1;return B`
      <ha-card>
        <style>
          :host {
            ${s=t.zones,o=this._config.zone_colors,s.map((t,e)=>{const i=vt(t,o,e),s=bt(i);return`\n        --zone-${t.id}-bg: ${i};\n        --zone-${t.id}-text: ${s};\n      `}).join("")}
          }
        </style>

        ${this._renderHeader(t)}
        ${this._renderGrid(t,e,i)}
        ${this._renderLegend(t)}
        ${this._zoneSelector.open?this._renderZoneSelector(t):q}
        ${this._loading?this._renderLoading():q}
        ${this._error?this._renderError():q}
      </ha-card>
    `;var s,o}_renderHeader(t){const e=this._config?.title||"Heating Schedule",i=this.hass?.states[this._config.entity]?.state||"Unknown";return B`
      <div class="card-header">
        <div class="title">${e}</div>
        <div class="schedule-name">${i}</div>
      </div>
    `}_renderGrid(t,e,i){const s=this._config?.time_step??60;return B`
      <div class="grid-container ${i?"compact":""}">
        <div class="grid">
          <!-- Header row -->
          <div class="grid-header">
            <div class="time-label"></div>
            ${gt.map(t=>B`
                <div class="day-header">${i?function(t){return t.substring(0,3)}(t):t}</div>
              `)}
          </div>

          <!-- Time rows -->
          ${e.map(e=>B`
              <div class="grid-row">
                <div class="time-label">${e}</div>
                ${gt.map(i=>{const o=this._getZoneForSlot(t,i,e),r=$t(i,e,s),n=o?vt(o,this._config?.zone_colors,t.zones.indexOf(o)):"#e5e7eb",a=bt(n);return B`
                    <div
                      class="grid-cell ${r?"current":""}"
                      style="background-color: ${n}; color: ${a}"
                      @click=${()=>this._handleCellClick(i,e)}
                      title="${o?.name||"Not set"} - Click to change"
                    >
                    </div>
                  `})}
              </div>
            `)}
        </div>
      </div>
    `}_renderLegend(t){return B`
      <div class="legend">
        ${t.zones.map((t,e)=>{const i=vt(t,this._config?.zone_colors,e),s=bt(i);return B`
            <div
              class="legend-item"
              style="background-color: ${i}; color: ${s}"
            >
              ${t.name}
              ${this._config?.show_temperatures?B`<span class="legend-temp">
                    ${this._getAverageTemp(t)}°
                  </span>`:q}
            </div>
          `})}
      </div>
    `}_getAverageTemp(t){const e=Object.values(t.room_temperatures);return 0===e.length?0:Math.round(e.reduce((t,e)=>t+e,0)/e.length)}_renderZoneSelector(t){return B`
      <div class="zone-selector-overlay" @click=${this._closeZoneSelector}>
        <div class="zone-selector" @click=${t=>t.stopPropagation()}>
          <div class="zone-selector-header">
            <span>Select Zone</span>
            <span class="zone-selector-time">
              ${this._zoneSelector.day} ${this._zoneSelector.time}
            </span>
          </div>
          <div class="zone-selector-options">
            ${t.zones.map((t,e)=>{const i=vt(t,this._config?.zone_colors,e),s=bt(i);return B`
                <button
                  class="zone-option"
                  style="background-color: ${i}; color: ${s}"
                  @click=${()=>this._handleZoneSelect(t)}
                >
                  <span class="zone-option-name">${t.name}</span>
                  <span class="zone-option-temps">
                    ${Object.values(t.room_temperatures).map(t=>`${t}°`).join(" / ")}
                  </span>
                </button>
              `})}
          </div>
          <button class="zone-selector-cancel" @click=${this._closeZoneSelector}>
            Cancel
          </button>
        </div>
      </div>
    `}_renderLoading(){return B`
      <div class="loading-overlay">
        <ha-circular-progress indeterminate></ha-circular-progress>
      </div>
    `}_renderError(){return B`
      <div class="error-toast" @click=${()=>this._error=void 0}>
        ${this._error}
      </div>
    `}};At.styles=n`
    :host {
      display: block;
    }

    ha-card {
      position: relative;
      padding: 16px;
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .title {
      font-size: 1.2em;
      font-weight: 500;
    }

    .schedule-name {
      font-size: 0.9em;
      color: var(--secondary-text-color);
      background: var(--primary-background-color);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .grid-container {
      overflow-x: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: 50px repeat(7, 1fr);
      gap: 2px;
      min-width: 400px;
    }

    .compact .grid {
      grid-template-columns: 40px repeat(7, 1fr);
      min-width: 300px;
    }

    .grid-header {
      display: contents;
    }

    .day-header {
      text-align: center;
      font-weight: 500;
      font-size: 0.85em;
      padding: 8px 4px;
      background: var(--primary-background-color);
    }

    .grid-row {
      display: contents;
    }

    .time-label {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
    }

    .grid-cell {
      min-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7em;
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
      border-radius: 2px;
    }

    .grid-cell:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .grid-cell.current {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .compact .grid-cell {
      min-height: 20px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
      justify-content: center;
    }

    .legend-item {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .legend-temp {
      opacity: 0.8;
      font-size: 0.9em;
    }

    /* Zone Selector Dialog */
    .zone-selector-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }

    .zone-selector {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      min-width: 280px;
      max-width: 90vw;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .zone-selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-weight: 500;
    }

    .zone-selector-time {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }

    .zone-selector-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .zone-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      transition: transform 0.1s;
    }

    .zone-option:hover {
      transform: scale(1.02);
    }

    .zone-option-name {
      font-weight: 500;
    }

    .zone-option-temps {
      font-size: 0.85em;
      opacity: 0.8;
    }

    .zone-selector-cancel {
      width: 100%;
      margin-top: 16px;
      padding: 12px;
      background: var(--primary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      color: var(--primary-text-color);
    }

    .zone-selector-cancel:hover {
      background: var(--secondary-background-color);
    }

    /* Loading and Error states */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(var(--rgb-card-background-color), 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .error {
      padding: 16px;
      text-align: center;
      color: var(--error-color);
    }

    .error-toast {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      padding: 12px;
      background: var(--error-color);
      color: white;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      z-index: 1001;
    }
  `,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),t([ut()],At.prototype,"_loading",void 0),t([ut()],At.prototype,"_error",void 0),t([ut()],At.prototype,"_zoneSelector",void 0),At=t([lt("intuis-schedule-card")],At);let St=class extends at{setConfig(t){this._config=t}_configChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.dataset.config;if(!i)return;let s=e.value;"number"===e.type?s=parseInt(e.value,10):"checkbox"===e.type&&(s=e.checked);const o={...this._config,[i]:s};this._configChanged(o)}render(){if(!this.hass||!this._config)return B`<div>Loading...</div>`;const t=Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.")&&t.includes("schedule")).sort();return B`
      <div class="editor">
        <div class="row">
          <label>Entity</label>
          <select
            data-config="entity"
            .value=${this._config.entity||""}
            @change=${this._valueChanged}
          >
            <option value="">Select entity...</option>
            ${t.map(t=>B`
                <option value=${t} ?selected=${this._config?.entity===t}>
                  ${this.hass.states[t]?.attributes.friendly_name||t}
                </option>
              `)}
          </select>
        </div>

        <div class="row">
          <label>Title (optional)</label>
          <input
            type="text"
            data-config="title"
            .value=${this._config.title||""}
            @input=${this._valueChanged}
            placeholder="Heating Schedule"
          />
        </div>

        <div class="row">
          <label>Time Step</label>
          <select
            data-config="time_step"
            .value=${String(this._config.time_step||60)}
            @change=${this._valueChanged}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div class="row">
          <label>Start Hour</label>
          <input
            type="number"
            data-config="start_hour"
            .value=${String(this._config.start_hour??0)}
            @input=${this._valueChanged}
            min="0"
            max="23"
          />
        </div>

        <div class="row">
          <label>End Hour</label>
          <input
            type="number"
            data-config="end_hour"
            .value=${String(this._config.end_hour??23)}
            @input=${this._valueChanged}
            min="0"
            max="23"
          />
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_temperatures"
              ?checked=${!1!==this._config.show_temperatures}
              @change=${this._valueChanged}
            />
            Show temperatures in legend
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="compact"
              ?checked=${!0===this._config.compact}
              @change=${this._valueChanged}
            />
            Compact mode (for mobile)
          </label>
        </div>
      </div>
    `}};St.styles=n`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row.checkbox {
      flex-direction: row;
      align-items: center;
    }

    .row.checkbox label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    label {
      font-weight: 500;
      font-size: 0.9em;
    }

    input,
    select {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      font-size: 1em;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
    }

    input:focus,
    select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  `,t([pt({attribute:!1})],St.prototype,"hass",void 0),t([ut()],St.prototype,"_config",void 0),St=t([lt("intuis-schedule-card-editor")],St);console.info("%c  INTUIS-SCHEDULE-CARD  %c  Version 1.0.0  ","color: white; font-weight: bold; background: #3b82f6","color: #3b82f6; font-weight: bold; background: white"),customElements.get("intuis-schedule-card")||customElements.define("intuis-schedule-card",At),customElements.get("intuis-schedule-card-editor")||customElements.define("intuis-schedule-card-editor",St),window.customCards=window.customCards||[],window.customCards.push({type:"intuis-schedule-card",name:"Intuis Schedule Card",description:"A visual schedule editor for Intuis Connect heating systems",preview:!0,documentationURL:"https://github.com/pmusic62/intuis-schedule-card"}),At.getConfigElement=function(){return document.createElement("intuis-schedule-card-editor")},At.getStubConfig=function(){return{type:"custom:intuis-schedule-card",entity:"",time_step:60,start_hour:6,end_hour:23,show_temperatures:!0,compact:!1}};export{At as IntuisScheduleCard,St as IntuisScheduleCardEditor};
