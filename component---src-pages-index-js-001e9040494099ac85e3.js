(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"8ypT":function(e,t,a){},"9eSz":function(e,t,a){"use strict";var r=a("TqRt");t.__esModule=!0,t.default=void 0;var i,n=r(a("PJYZ")),s=r(a("VbXa")),d=r(a("8OQS")),l=r(a("pVnL")),o=r(a("q1tI")),u=r(a("17x9")),c=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=w([].concat(t.fluid))),t.fixed&&(t.fixed=w([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(b&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,a=e.fixed;return m(t||a).src},m=function(e){if(b&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},p=Object.create({}),h=function(e){var t=c(e),a=g(t);return p[a]||!1},y="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,b="undefined"!=typeof window,S=b&&window.IntersectionObserver,v=new WeakMap;function E(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return o.default.createElement(o.default.Fragment,{key:t},r&&o.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),o.default.createElement("source",{media:i,srcSet:a,sizes:n}))}))}function w(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function I(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return o.default.createElement("source",{key:t,media:a,srcSet:r})}))}function L(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return o.default.createElement("source",{key:t,media:a,srcSet:r})}))}function R(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var x=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(v.has(e.target)){var t=v.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),v.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),v.set(e,t)),function(){a.unobserve(e),v.delete(e)}},O=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",d=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",o=e.loading?'loading="'+e.loading+'" ':"",u=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?R(e,!0):"")+R(e)})).join("")+"<img "+o+s+d+a+r+t+n+i+l+u+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},z=o.default.forwardRef((function(e,t){var a=e.src,r=e.imageVariants,i=e.generateSources,n=e.spreadProps,s=e.ariaHidden,d=o.default.createElement(V,(0,l.default)({ref:t,src:a},n,{ariaHidden:s}));return r.length>1?o.default.createElement("picture",null,i(r),d):d})),V=o.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,u=e.onError,c=e.loading,f=e.draggable,g=e.ariaHidden,m=(0,d.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return o.default.createElement("img",(0,l.default)({"aria-hidden":g,sizes:a,srcSet:r,src:i},m,{onLoad:s,onError:u,ref:t,loading:c,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));V.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var T=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=b&&h(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!y&&S&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||b&&(y||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=o.default.createRef(),a.placeholderRef=t.placeholderRef||o.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=x(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=c(e),a=g(t),p[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=c(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,d=void 0===s?{}:s,u=e.placeholderStyle,f=void 0===u?{}:u,g=e.placeholderClassName,p=e.fluid,h=e.fixed,y=e.backgroundColor,b=e.durationFadeIn,S=e.Tag,v=e.itemProp,w=e.loading,R=e.draggable,x=!1===this.state.fadeIn||this.state.imgLoaded,T=!0===this.state.fadeIn&&!this.state.imgCached,k=(0,l.default)({opacity:x?1:0,transition:T?"opacity "+b+"ms":"none"},d),C="boolean"==typeof y?"lightgray":y,H={transitionDelay:b+"ms"},W=(0,l.default)({opacity:this.state.imgLoaded?0:1},T&&H,d,f),j={title:t,alt:this.state.isVisible?"":a,style:W,className:g,itemProp:v};if(p){var q=p,N=m(p);return o.default.createElement(S,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden",maxWidth:N.maxWidth?N.maxWidth+"px":null,maxHeight:N.maxHeight?N.maxHeight+"px":null},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(N.srcSet)},o.default.createElement(S,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/N.aspectRatio+"%"}}),C&&o.default.createElement(S,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:C,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},T&&H)}),N.base64&&o.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:N.base64,spreadProps:j,imageVariants:q,generateSources:L}),N.tracedSVG&&o.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:N.tracedSVG,spreadProps:j,imageVariants:q,generateSources:I}),this.state.isVisible&&o.default.createElement("picture",null,E(q),o.default.createElement(V,{alt:a,title:t,sizes:N.sizes,src:N.src,crossOrigin:this.props.crossOrigin,srcSet:N.srcSet,style:k,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:w,draggable:R})),this.addNoScript&&o.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:w},N,{imageVariants:q}))}}))}if(h){var P=h,M=m(h),B=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:M.width,height:M.height},n);return"inherit"===n.display&&delete B.display,o.default.createElement(S,{className:(r||"")+" gatsby-image-wrapper",style:B,ref:this.handleRef,key:"fixed-"+JSON.stringify(M.srcSet)},C&&o.default.createElement(S,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:C,width:M.width,opacity:this.state.imgLoaded?0:1,height:M.height},T&&H)}),M.base64&&o.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:j,imageVariants:P,generateSources:L}),M.tracedSVG&&o.default.createElement(z,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:j,imageVariants:P,generateSources:I}),this.state.isVisible&&o.default.createElement("picture",null,E(P),o.default.createElement(V,{alt:a,title:t,width:M.width,height:M.height,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:k,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:w,draggable:R})),this.addNoScript&&o.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:O((0,l.default)({alt:a,title:t,loading:w},M,{imageVariants:P}))}}))}return null},t}(o.default.Component);T.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var k=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string}),C=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string,media:u.default.string,maxWidth:u.default.number,maxHeight:u.default.number});T.propTypes={resolutions:k,sizes:C,fixed:u.default.oneOfType([k,u.default.arrayOf(k)]),fluid:u.default.oneOfType([C,u.default.arrayOf(C)]),fadeIn:u.default.bool,durationFadeIn:u.default.number,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,crossOrigin:u.default.oneOfType([u.default.string,u.default.bool]),style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string,loading:u.default.oneOf(["auto","lazy","eager"]),draggable:u.default.bool};var H=T;t.default=H},Bl7J:function(e,t,a){"use strict";var r=a("q1tI"),i=a.n(r),n=a("Wbzz");a("8ypT");t.a=function(e){var t=e.children;Object(n.useStaticQuery)("3649515864");return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0 1.0875rem 1.45rem"}},i.a.createElement("main",null,t)))}},RXBc:function(e,t,a){"use strict";a.r(t);var r=a("q1tI"),i=a.n(r),n=a("Wbzz"),s=a("Bl7J"),d=a("vrFN"),l=a("9eSz"),o=a.n(l),u=[{image:function(){var e=Object(n.useStaticQuery)("1495294710");return i.a.createElement(o.a,{fluid:e.placeholderImage.childImageSharp.fluid})},title:"Generates MD file with your User Stories.",text:"You do not need to think about formatting your documents, the application will add all the necessary headings and necessary indents automatically."},{image:function(){var e=Object(n.useStaticQuery)("3181992839");return i.a.createElement(o.a,{fluid:e.placeholderImage.childImageSharp.fluid})},title:"Easy editing of your user stories.",text:"The application provides ample opportunities for editing your data. You can add add new and delete and modify old user stories, as well as change their sequence number."},{image:function(){var e=Object(n.useStaticQuery)("3139113836");return i.a.createElement(o.a,{fluid:e.placeholderImage.childImageSharp.fluid})},title:"Saving and loading.",text:"You can save the document when you have finished work to your computer and load an existing document to edit it."}];t.default=function(){return i.a.createElement(s.a,null,i.a.createElement(d.a,{title:"Home"}),i.a.createElement("h1",null,"User Story Creator App."),i.a.createElement("p",null,"Create user stories files quickly and easily."),i.a.createElement("p",null,"The application generates user stories MD markup based on your minimum data."),i.a.createElement(n.Link,{to:"/user-story-creator/"},i.a.createElement("button",null,"Try it for free!")),i.a.createElement("div",{style:{maxWidth:"300px",marginBottom:"1.45rem"}}),u.map((function(e){return i.a.createElement("div",null,i.a.createElement("h3",null,e.title),e.image(),i.a.createElement("p",null,e.text))})),i.a.createElement(n.Link,{to:"/user-story-creator/"},i.a.createElement("button",null,"Try it for free!")))}}}]);
//# sourceMappingURL=component---src-pages-index-js-001e9040494099ac85e3.js.map