function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",_=g.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,z=`<${T}>`,P=document,U=()=>P.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,Z=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,F=P.createTreeWalker(P,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===N?"!--"===l[1]?n=R:void 0!==l[1]?n=I:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=o??N,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?L:D):n===L||n===D?n=j:n===R||n===I?n=N:(n=j,o=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===N?i+z:d>=0?(s.push(a),i.slice(0,d)+k+i.slice(d)+C+h):i+C+(-2===d?e:h)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,d]=K(t,e);if(this.el=Y.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=d[r++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),F.nextNode(),a.push({type:2,index:++o});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=F.nextNode(),r++)}return F.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=X(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=X(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(Y,Q),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=ct,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],ft={Monday:0,Tuesday:1,Wednesday:2,Thursday:3,Friday:4,Saturday:5,Sunday:6},mt=["#3b82f6","#f97316","#22c55e","#ef4444","#8b5cf6","#06b6d4","#ec4899","#eab308","#14b8a6","#6b7280","#f43f5e","#84cc16"];function _t(t,e,i=0){return e?.[t.name]?e[t.name]:mt[i%mt.length]}function $t(t){const e=t.replace("#","");return(.299*parseInt(e.substring(0,2),16)+.587*parseInt(e.substring(2,4),16)+.114*parseInt(e.substring(4,6),16))/255>.5?"#1f2937":"#ffffff"}const vt={start_hour:0,end_hour:24,show_temperatures:!0};let yt=class extends at{constructor(){super(...arguments),this._loading=!1,this._editor={open:!1,day:null,dayIndex:0,block:null,startTime:"",endTime:"",selectedZoneId:null}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this._config={...vt,...t}}getCardSize(){return 8}shouldUpdate(t){if(!this._config)return!0;if(t.has("hass")&&this.hass){const e=t.get("hass");if(!e)return!0;const i=this._config.entity;return e.states[i]!==this.hass.states[i]}return!0}_getScheduleAttributes(){if(!this.hass||!this._config)return null;const t=this.hass.states[this._config.entity];return t?t.attributes:(this._error=`Entity ${this._config.entity} not found`,null)}_getDayBlocks(t,e){const i=[],s=t.weekly_timetable[e]||[],o=ft[e],r=gt[0===o?6:o-1],n=t.weekly_timetable[r]||[];let a=null;n.length>0?a=n[n.length-1].zone:s.length>0&&(a=s[0].zone);const l=[];0!==s.length&&"00:00"===s[0].time||a&&l.push({time:"00:00",zoneName:a,minutes:0});for(const t of s){const[e,i]=t.time.split(":").map(Number);l.push({time:t.time,zoneName:t.zone,minutes:60*e+i})}l.sort((t,e)=>t.minutes-e.minutes);for(let e=0;e<l.length;e++){const s=l[e],o=l[e+1]||{time:"24:00",minutes:1440},r=t.zones.find(t=>t.name===s.zoneName);r&&i.push({zone:r,startTime:s.time,endTime:"24:00"===o.time?"00:00":o.time,startMinutes:s.minutes,endMinutes:o.minutes})}return i}_handleBlockClick(t,e){this._editor={open:!0,day:t,dayIndex:ft[t],block:e,startTime:e.startTime,endTime:"00:00"===e.endTime?"24:00":e.endTime,selectedZoneId:e.zone.id}}_handleZoneSelect(t){this._editor={...this._editor,selectedZoneId:t}}_handleTimeChange(t,e){this._editor={...this._editor,[t]:e}}async _applyEdit(){if(this.hass&&this._editor.day&&null!==this._editor.selectedZoneId){this._loading=!0,this._error=void 0;try{await this.hass.callService("intuis_connect","set_schedule_slot",{day:this._editor.dayIndex,start_time:this._editor.startTime,zone_id:this._editor.selectedZoneId});const t="00:00"===this._editor.block?.endTime?"24:00":this._editor.block?.endTime,e="00:00"===this._editor.endTime?"24:00":this._editor.endTime;t&&e&&e!==t&&"24:00"!==e&&this._editor.block?.zone.id&&await this.hass.callService("intuis_connect","set_schedule_slot",{day:this._editor.dayIndex,start_time:this._editor.endTime,zone_id:this._editor.block.zone.id}),this._closeEditor()}catch(t){this._error=t instanceof Error?t.message:"Failed to update schedule"}finally{this._loading=!1}}}_closeEditor(){this._editor={open:!1,day:null,dayIndex:0,block:null,startTime:"",endTime:"",selectedZoneId:null}}render(){if(!this._config)return Z`<ha-card><div class="error">Card not configured</div></ha-card>`;const t=this._getScheduleAttributes();return t?Z`
      <ha-card>
        ${this._renderHeader(t)}
        ${this._renderSchedule(t)}
        ${this._renderLegend(t)}
        ${this._editor.open?this._renderEditor(t):q}
        ${this._loading?this._renderLoading():q}
        ${this._error&&!this._editor.open?this._renderError():q}
      </ha-card>
    `:Z`
        <ha-card>
          <div class="error">${this._error||"Schedule data not available"}</div>
        </ha-card>
      `}_renderHeader(t){const e=this._config?.title||"Heating Schedule",i=this.hass?.states[this._config.entity]?.state||"Unknown";return Z`
      <div class="card-header">
        <div class="title">${e}</div>
        <div class="schedule-name">${i}</div>
      </div>
    `}_renderSchedule(t){const e=this._config?.start_hour??0,i=this._config?.end_hour??24,s=60*(i-e);return Z`
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
    `}_renderTimeLabels(t,e){const i=[];for(let s=t;s<=e;s+=2){const o=(s-t)/(e-t)*100;i.push(Z`
        <span class="time-label" style="left: ${o}%">${s.toString().padStart(2,"0")}:00</span>
      `)}return Z`${i}`}_renderDayRow(t,e,i,s){const o=this._getDayBlocks(t,e),r=60*i,n=e.substring(0,3);return Z`
      <div class="day-row">
        <div class="day-label">${n}</div>
        <div class="blocks-container">
          ${o.map(i=>{const o=Math.max(i.startMinutes,r),n=Math.min(i.endMinutes,r+s);if(n<=o)return q;const a=(o-r)/s*100,l=(n-o)/s*100,d=_t(i.zone,this._config?.zone_colors,t.zones.indexOf(i.zone)),c=$t(d),h=l>8;return Z`
              <div
                class="block"
                style="left: ${a}%; width: ${l}%; background-color: ${d}; color: ${c}"
                @click=${()=>this._handleBlockClick(e,i)}
                title="${i.zone.name}: ${i.startTime} - ${"00:00"===i.endTime?"24:00":i.endTime}"
              >
                ${h?Z`<span class="block-label">${i.zone.name}</span>`:q}
              </div>
            `})}
        </div>
      </div>
    `}_renderLegend(t){return Z`
      <div class="legend">
        ${t.zones.map((t,e)=>{const i=_t(t,this._config?.zone_colors,e),s=$t(i);return Z`
            <div class="legend-item" style="background-color: ${i}; color: ${s}">
              ${t.name}
              ${this._config?.show_temperatures?Z`<span class="legend-temp">${this._getAverageTemp(t)}°</span>`:q}
            </div>
          `})}
      </div>
    `}_getAverageTemp(t){const e=Object.values(t.room_temperatures);return 0===e.length?0:Math.round(e.reduce((t,e)=>t+e,0)/e.length)}_renderEditor(t){return Z`
      <div class="editor-overlay" @click=${this._closeEditor}>
        <div class="editor" @click=${t=>t.stopPropagation()}>
          <div class="editor-header">
            <span class="editor-title">Edit Schedule</span>
            <span class="editor-day">${this._editor.day}</span>
          </div>

          <div class="editor-times">
            <div class="editor-section">
              <label>Start Time</label>
              <input
                type="text"
                class="time-input"
                placeholder="HH:MM"
                pattern="[0-2][0-9]:[0-5][0-9]"
                .value=${this._editor.startTime}
                @input=${t=>this._handleTimeChange("startTime",t.target.value)}
              />
            </div>
            <div class="editor-section">
              <label>End Time</label>
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

          <div class="editor-section">
            <label>Zone</label>
            <div class="zone-options">
              ${t.zones.map((t,e)=>{const i=_t(t,this._config?.zone_colors,e),s=$t(i),o=this._editor.selectedZoneId===t.id;return Z`
                  <button
                    class="zone-option ${o?"selected":""}"
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
    `}_renderLoading(){return Z`
      <div class="loading-overlay">
        <ha-circular-progress indeterminate></ha-circular-progress>
      </div>
    `}_renderError(){return Z`
      <div class="error-toast" @click=${()=>this._error=void 0}>
        ${this._error}
      </div>
    `}};yt.styles=n`
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

    .editor-times {
      display: flex;
      gap: 16px;
    }

    .editor-times .editor-section {
      flex: 1;
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
      width: 100%;
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
  `,t([pt({attribute:!1})],yt.prototype,"hass",void 0),t([ut()],yt.prototype,"_config",void 0),t([ut()],yt.prototype,"_loading",void 0),t([ut()],yt.prototype,"_error",void 0),t([ut()],yt.prototype,"_editor",void 0),yt=t([dt("intuis-schedule-card")],yt);let bt=class extends at{setConfig(t){this._config=t}_configChanged(t){const e=new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.dataset.config;if(!i)return;let s=e.value;"number"===e.type?s=parseInt(e.value,10):"checkbox"===e.type&&(s=e.checked);const o={...this._config,[i]:s};this._configChanged(o)}render(){if(!this.hass||!this._config)return Z`<div>Loading...</div>`;const t=Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.")&&t.includes("schedule")).sort();return Z`
      <div class="editor">
        <div class="row">
          <label>Entity</label>
          <select
            data-config="entity"
            .value=${this._config.entity||""}
            @change=${this._valueChanged}
          >
            <option value="">Select entity...</option>
            ${t.map(t=>Z`
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
  `,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"_config",void 0),bt=t([dt("intuis-schedule-card-editor")],bt);console.info("%c  INTUIS-SCHEDULE-CARD  %c  Version 1.0.0  ","color: white; font-weight: bold; background: #3b82f6","color: #3b82f6; font-weight: bold; background: white"),customElements.get("intuis-schedule-card")||customElements.define("intuis-schedule-card",yt),customElements.get("intuis-schedule-card-editor")||customElements.define("intuis-schedule-card-editor",bt),window.customCards=window.customCards||[],window.customCards.push({type:"intuis-schedule-card",name:"Intuis Schedule Card",description:"A visual schedule editor for Intuis Connect heating systems",preview:!0,documentationURL:"https://github.com/pmusic62/intuis-schedule-card"}),yt.getConfigElement=function(){return document.createElement("intuis-schedule-card-editor")},yt.getStubConfig=function(){return{type:"custom:intuis-schedule-card",entity:"",time_step:60,start_hour:6,end_hour:23,show_temperatures:!0,compact:!1}};export{yt as IntuisScheduleCard,bt as IntuisScheduleCardEditor};
