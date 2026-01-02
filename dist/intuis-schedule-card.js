function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,y=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,z=`<${T}>`,P=document,D=()=>P.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,N=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,F=P.createTreeWalker(P,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===H?"!--"===l[1]?n=I:void 0!==l[1]?n=R:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=r??H,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?N:'"'===l[3]?L:j):n===L||n===j?n=N:n===I||n===R?n=H:(n=N,r=void 0);const h=n===N&&t[e+1].startsWith("/>")?" ":"";o+=n===H?i+z:d>=0?(s.push(a),i.slice(0,d)+k+i.slice(d)+C+h):i+C+(-2===d?e:h)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,d]=K(t,e);if(this.el=Y.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=d[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],D()),F.nextNode(),a.push({type:2,index:++r});s.append(t[e],D())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===Z)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);F.currentNode=s;let r=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Y(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=X(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==Z,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=X(this,s[i+n],e,n),a===Z&&(a=this._$AH[n]),o||=!M(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===Z)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(Y,Q),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(D(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ht=(t=ct,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ft={Monday:0,Tuesday:1,Wednesday:2,Thursday:3,Friday:4,Saturday:5,Sunday:6},mt=["#3b82f6","#f97316","#22c55e","#ef4444","#8b5cf6","#06b6d4","#ec4899","#eab308","#14b8a6","#6b7280","#f43f5e","#84cc16"];function _t(t,e,i=0){return e?.[t.name]?e[t.name]:mt[i%mt.length]}function yt(t){const e=t.replace("#","");return(.299*parseInt(e.substring(0,2),16)+.587*parseInt(e.substring(2,4),16)+.114*parseInt(e.substring(4,6),16))/255>.5?"#1f2937":"#ffffff"}const vt={start_hour:0,end_hour:24,show_temperatures:!0};let $t=class extends at{constructor(){super(...arguments),this._loading=!1,this._editor={open:!1,block:null,startDay:null,startDayIndex:0,endDay:null,endDayIndex:0,startTime:"",endTime:"",selectedZoneId:null}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config={...vt,...t}}getCardSize(){return 8}shouldUpdate(t){if(!this._config)return!0;if(t.has("hass")&&this.hass){const e=t.get("hass");if(!e)return!0;const i=this._config.entity;return e.states[i]!==this.hass.states[i]}return!0}_getScheduleAttributes(){if(!this.hass||!this._config)return null;const t=this.hass.states[this._config.entity];return t?t.attributes:(this._error=`Entity ${this._config.entity} not found`,null)}_getDayBlocks(t,e){const i=[],s=t.weekly_timetable[e]||[],r=ft[e],o=gt[0===r?6:r-1],n=t.weekly_timetable[o]||[];let a=null;n.length>0?a=n[n.length-1].zone:s.length>0&&(a=s[0].zone);const l=[];0!==s.length&&"00:00"===s[0].time||a&&l.push({time:"00:00",zoneName:a,minutes:0});for(const t of s){const[e,i]=t.time.split(":").map(Number);l.push({time:t.time,zoneName:t.zone,minutes:60*e+i})}l.sort((t,e)=>t.minutes-e.minutes);for(let e=0;e<l.length;e++){const s=l[e],r=l[e+1]||{time:"24:00",minutes:1440},o=t.zones.find(t=>t.name===s.zoneName);o&&i.push({zone:o,startTime:s.time,endTime:"24:00"===r.time?"00:00":r.time,startMinutes:s.minutes,endMinutes:r.minutes})}return i}_handleBlockClick(t,e){const i=ft[t],s=this._getScheduleAttributes();let r=t,o=i,n=e.startTime,a=t,l=i,d=e.endTime;const c=e.zone.id;if(s){if("00:00"===e.startTime){let t=i;for(let e=0;e<7;e++){const e=(t-1+7)%7,i=gt[e],a=this._getDayBlocks(s,i);if(a.length>0){const s=a[a.length-1];if("00:00"===s.endTime&&s.zone.id===c&&(r=i,o=e,n=s.startTime,"00:00"===s.startTime)){t=e;continue}}break}}if("00:00"===e.endTime){let t=i;for(let e=0;e<7;e++){const e=(t+1)%7,i=gt[e],r=this._getDayBlocks(s,i);if(r.length>0){const s=r[0];if("00:00"===s.startTime&&s.zone.id===c&&(a=i,l=e,d=s.endTime,"00:00"===s.endTime)){t=e;continue}}break}}}this._editor={open:!0,block:e,startDay:r,startDayIndex:o,endDay:a,endDayIndex:l,startTime:n,endTime:"00:00"===d?"24:00":d,selectedZoneId:c}}_handleZoneSelect(t){this._editor={...this._editor,selectedZoneId:t}}_handleTimeChange(t,e){this._editor={...this._editor,[t]:e}}_handleDayChange(t,e){const i=gt[e];this._editor="start"===t?{...this._editor,startDay:i,startDayIndex:e}:{...this._editor,endDay:i,endDayIndex:e}}async _applyEdit(){if(this.hass&&this._editor.startDay&&null!==this._editor.selectedZoneId){this._loading=!0,this._error=void 0;try{const t=this._editor.startDayIndex,e=this._editor.endDayIndex,i=this._editor.selectedZoneId,s=this._getScheduleAttributes(),r=s?.zones.find(t=>t.id===i),o=r?.name||"",n=this._editor.startTime;let a=this._editor.endTime;"24:00"===a&&(a="00:00"),await this.hass.callService("intuis_connect","set_schedule_slot",{start_day:String(t),end_day:String(e),start_time:n,end_time:a,zone_name:o}),this._closeEditor()}catch(t){this._error=t instanceof Error?t.message:"Failed to update schedule"}finally{this._loading=!1}}}_closeEditor(){this._editor={open:!1,block:null,startDay:null,startDayIndex:0,endDay:null,endDayIndex:0,startTime:"",endTime:"",selectedZoneId:null}}render(){if(!this._config)return W`<ha-card><div class="error">Card not configured</div></ha-card>`;const t=this._getScheduleAttributes();return t?W`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderSchedule(t)}
        ${this._renderLegend(t)}
        ${this._editor.open?this._renderEditor(t):V}
        ${this._loading?this._renderLoading():V}
        ${this._error&&!this._editor.open?this._renderError():V}
      </ha-card>
    `:W`
        <ha-card>
          <div class="error">${this._error||"Schedule data not available"}</div>
        </ha-card>
      `}async _handleRefresh(){if(this.hass&&!this._loading){this._loading=!0;try{await this.hass.callService("intuis_connect","refresh_schedules",{})}catch(t){this._error=t instanceof Error?t.message:"Failed to refresh"}finally{this._loading=!1}}}_renderHeader(){const t=this._config?.title,e=this.hass?.states[this._config.entity]?.state||"Unknown";return W`
      <div class="card-header">
        <div class="header-left">
          ${t?W`<div class="title">${t}</div>`:V}
          <div class="schedule-name">${e}</div>
        </div>
        <button class="refresh-btn" @click=${this._handleRefresh} title="Refresh schedules">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
          </svg>
        </button>
      </div>
    `}_renderSchedule(t){const e=this._config?.start_hour??0,i=this._config?.end_hour??24,s=60*(i-e);return W`
      <div class="schedule-container">
        <!-- Time axis -->
        <div class="time-axis">
          <div class="day-label"></div>
          <div class="time-labels">
            ${this._renderTimeLabels(e,i)}
          </div>
        </div>

        <!-- Days -->
        ${gt.map(i=>this._renderDayRow(t,i,e,s))}
      </div>
    `}_renderTimeLabels(t,e){const i=[];for(let s=t;s<=e;s+=2){const r=(s-t)/(e-t)*100;i.push(W`
        <span class="time-label" style="left: ${r}%">${s.toString().padStart(2,"0")}:00</span>
      `)}return W`${i}`}_renderDayRow(t,e,i,s){const r=this._getDayBlocks(t,e),o=60*i,n=e.substring(0,3);return W`
      <div class="day-row">
        <div class="day-label">${n}</div>
        <div class="blocks-container">
          ${r.map(i=>{const r=Math.max(i.startMinutes,o),n=Math.min(i.endMinutes,o+s);if(n<=r)return V;const a=(r-o)/s*100,l=(n-r)/s*100,d=_t(i.zone,this._config?.zone_colors,t.zones.indexOf(i.zone)),c=yt(d),h=l>8;return W`
              <div
                class="block"
                style="left: ${a}%; width: ${l}%; background-color: ${d}; color: ${c}"
                @click=${()=>this._handleBlockClick(e,i)}
                title="${i.zone.name}: ${i.startTime} - ${"00:00"===i.endTime?"24:00":i.endTime}"
              >
                ${h?W`<span class="block-label">${i.zone.name}</span>`:V}
              </div>
            `})}
        </div>
      </div>
    `}_renderLegend(t){return W`
      <div class="legend">
        ${t.zones.map((t,e)=>{const i=_t(t,this._config?.zone_colors,e),s=yt(i);return W`
            <div class="legend-item" style="background-color: ${i}; color: ${s}">
              ${t.name}
              ${this._config?.show_temperatures?W`<span class="legend-temp">${this._getAverageTemp(t)}°</span>`:V}
            </div>
          `})}
      </div>
    `}_getAverageTemp(t){const e=Object.values(t.room_temperatures);return 0===e.length?0:Math.round(e.reduce((t,e)=>t+e,0)/e.length)}_renderEditor(t){const e=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];return W`
      <div class="editor-overlay" @click=${this._closeEditor}>
        <div class="editor" @click=${t=>t.stopPropagation()}>
          <div class="editor-header">
            <span class="editor-title">Edit Schedule</span>
          </div>

          <div class="editor-row">
            <div class="editor-section">
              <label>From</label>
              <div class="day-time-input">
                <select
                  class="day-select"
                  .value=${String(this._editor.startDayIndex)}
                  @change=${t=>this._handleDayChange("start",parseInt(t.target.value))}
                >
                  ${e.map((t,e)=>W`
                    <option value=${e} ?selected=${e===this._editor.startDayIndex}>${t}</option>
                  `)}
                </select>
                <input
                  type="text"
                  class="time-input"
                  placeholder="HH:MM"
                  pattern="[0-2][0-9]:[0-5][0-9]"
                  .value=${this._editor.startTime}
                  @input=${t=>this._handleTimeChange("startTime",t.target.value)}
                />
              </div>
            </div>
            <div class="editor-section">
              <label>To</label>
              <div class="day-time-input">
                <select
                  class="day-select"
                  .value=${String(this._editor.endDayIndex)}
                  @change=${t=>this._handleDayChange("end",parseInt(t.target.value))}
                >
                  ${e.map((t,e)=>W`
                    <option value=${e} ?selected=${e===this._editor.endDayIndex}>${t}</option>
                  `)}
                </select>
                <input
                  type="text"
                  class="time-input"
                  placeholder="HH:MM"
                  pattern="[0-2][0-9]:[0-5][0-9]"
                  .value=${this._editor.endTime}
                  @input=${t=>this._handleTimeChange("endTime",t.target.value)}
                />
              </div>
            </div>
          </div>

          <div class="editor-section">
            <label>Zone</label>
            <div class="zone-options">
              ${t.zones.map((t,e)=>{const i=_t(t,this._config?.zone_colors,e),s=yt(i),r=this._editor.selectedZoneId===t.id;return W`
                  <button
                    class="zone-option ${r?"selected":""}"
                    style="background-color: ${i}; color: ${s}"
                    @click=${()=>this._handleZoneSelect(t.id)}
                  >
                    ${t.name}
                  </button>
                `})}
            </div>
          </div>

          <div class="editor-actions">
            <button class="btn-cancel" @click=${this._closeEditor}>Cancel</button>
            <button class="btn-apply" @click=${this._applyEdit}>Apply</button>
          </div>
        </div>
      </div>
    `}_renderLoading(){return W`
      <div class="loading-overlay">
        <ha-circular-progress indeterminate></ha-circular-progress>
      </div>
    `}_renderError(){return W`
      <div class="error-toast" @click=${()=>this._error=void 0}>
        ${this._error}
      </div>
    `}};$t.styles=n`
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

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
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

    .refresh-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s, color 0.2s;
    }

    .refresh-btn:hover {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }

    .refresh-btn:active {
      background: var(--divider-color);
    }

    .schedule-container {
      margin-bottom: 16px;
    }

    .time-axis {
      display: flex;
      margin-bottom: 4px;
    }

    .time-labels {
      flex: 1;
      position: relative;
      height: 20px;
    }

    .time-label {
      position: absolute;
      font-size: 0.7em;
      color: var(--secondary-text-color);
      transform: translateX(-50%);
    }

    .day-row {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }

    .day-label {
      width: 40px;
      font-size: 0.85em;
      font-weight: 500;
      text-align: right;
      padding-right: 8px;
      flex-shrink: 0;
    }

    .blocks-container {
      flex: 1;
      position: relative;
      height: 32px;
      background: var(--divider-color);
      border-radius: 4px;
      overflow: hidden;
    }

    .block {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
      border-radius: 2px;
      overflow: hidden;
    }

    .block:hover {
      transform: scaleY(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      z-index: 10;
    }

    .block-label {
      font-size: 0.75em;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 4px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
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

    /* Editor Overlay */
    .editor-overlay {
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

    .editor {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 20px;
      min-width: 300px;
      max-width: 90vw;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .editor-title {
      font-size: 1.1em;
      font-weight: 500;
    }

    .editor-day {
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }

    .editor-row {
      display: flex;
      gap: 16px;
    }

    .editor-row .editor-section {
      flex: 1;
    }

    .day-time-input {
      display: flex;
      gap: 8px;
    }

    .day-select {
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 1em;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      min-width: 70px;
    }

    .day-select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .editor-section {
      margin-bottom: 16px;
    }

    .editor-section label {
      display: block;
      font-size: 0.85em;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--secondary-text-color);
    }

    .time-input {
      flex: 1;
      min-width: 70px;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 1.1em;
      font-family: monospace;
      text-align: center;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }

    .time-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .zone-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .zone-option {
      padding: 10px 16px;
      border: 2px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 500;
      transition: transform 0.1s, border-color 0.1s;
    }

    .zone-option:hover {
      transform: scale(1.05);
    }

    .zone-option.selected {
      border-color: var(--primary-text-color);
    }

    .editor-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .btn-cancel, .btn-apply {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      cursor: pointer;
      transition: background-color 0.1s;
    }

    .btn-cancel {
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
    }

    .btn-apply {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-cancel:hover {
      background: var(--secondary-background-color);
    }

    .btn-apply:hover {
      opacity: 0.9;
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
  `,t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([ut()],$t.prototype,"_config",void 0),t([ut()],$t.prototype,"_loading",void 0),t([ut()],$t.prototype,"_error",void 0),t([ut()],$t.prototype,"_editor",void 0),$t=t([dt("intuis-schedule-card")],$t);let bt=class extends at{setConfig(t){this._config=t}_configChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.dataset.config;if(!i)return;let s=e.value;"number"===e.type?s=parseInt(e.value,10):"checkbox"===e.type&&(s=e.checked);const r={...this._config,[i]:s};this._configChanged(r)}render(){if(!this.hass||!this._config)return W`<div>Loading...</div>`;const t=Object.keys(this.hass.states).filter(t=>!!t.startsWith("sensor.")&&(!!t.includes("intuis")&&(!!t.includes("_schedule_")&&(!t.includes("scheduled_")&&(!t.endsWith("_schedule_summary")&&!t.endsWith("_schedule_optimization")))))).sort();return W`
      <div class="editor">
        <div class="row">
          <label>Entity</label>
          <select
            data-config="entity"
            .value=${this._config.entity||""}
            @change=${this._valueChanged}
          >
            <option value="">Select entity...</option>
            ${t.map(t=>W`
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
    `}};bt.styles=n`
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
  `,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"_config",void 0),bt=t([dt("intuis-schedule-card-editor")],bt);console.info("%c  INTUIS-SCHEDULE-CARD  %c  Version 1.3.0  ","color: white; font-weight: bold; background: #3b82f6","color: #3b82f6; font-weight: bold; background: white"),customElements.get("intuis-schedule-card")||customElements.define("intuis-schedule-card",$t),customElements.get("intuis-schedule-card-editor")||customElements.define("intuis-schedule-card-editor",bt),window.customCards=window.customCards||[],window.customCards.push({type:"intuis-schedule-card",name:"Intuis Schedule Card",description:"A visual schedule editor for Intuis Connect heating systems",preview:!0,documentationURL:"https://github.com/pmusic62/intuis-schedule-card"}),$t.getConfigElement=function(){return document.createElement("intuis-schedule-card-editor")},$t.getStubConfig=function(){return{type:"custom:intuis-schedule-card",entity:"",time_step:60,start_hour:6,end_hour:23,show_temperatures:!0,compact:!1}};export{$t as IntuisScheduleCard,bt as IntuisScheduleCardEditor};
