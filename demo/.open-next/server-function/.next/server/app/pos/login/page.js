(()=>{var e={};e.id=750,e.ids=[750],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},64986:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=r(67096),a=r(16132),o=r(37284),n=r.n(o),i=r(32564),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let d=["",{children:["pos",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,58653)),"/Users/rene/Git/smartwaiter/demo/src/app/pos/login/page.tsx"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,51021)),"/Users/rene/Git/smartwaiter/demo/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/Users/rene/Git/smartwaiter/demo/src/app/pos/login/page.tsx"],u="/pos/login/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/pos/login/page",pathname:"/pos/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},93:(e,t,r)=>{Promise.resolve().then(r.bind(r,63417))},63417:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Page});var s=r(30784),a=r(74284),o=r(57114),n=r(9885);function Page(){let e=(0,o.useRouter)(),[t,r]=(0,n.useState)(!1),[i,l]=(0,n.useState)({email:"",password:""}),[d,c]=(0,n.useState)(""),u="/pos/dashboard",onSubmit=async t=>{t.preventDefault();try{r(!0),l({email:"",password:""});let t=await (0,a.signIn)("credentials",{redirect:!1,email:i.email,password:i.password,callbackUrl:u});r(!1),console.log(t),t?.error?c("invalid email or password"):e.push(u)}catch(e){r(!1),c(e)}},handleChange=e=>{let{name:t,value:r}=e.target;l({...i,[t]:r})};return s.jsx(s.Fragment,{children:s.jsx("section",{className:"bg-ct-blue-600 min-h-screen pt-20",children:s.jsx("div",{className:"container mx-auto px-6 py-12 h-full flex justify-center items-center",children:s.jsx("div",{className:"md:w-8/12 lg:w-5/12 bg-white px-8 py-10",children:(0,s.jsxs)("form",{onSubmit:onSubmit,children:[d&&s.jsx("p",{className:"text-center bg-red-300 py-4 mb-6 rounded",children:d}),s.jsx("div",{className:"mb-6",children:s.jsx("input",{required:!0,type:"email",name:"email",value:i.email,onChange:handleChange,placeholder:"Email address",className:"form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"})}),s.jsx("div",{className:"mb-6",children:s.jsx("input",{required:!0,type:"password",name:"password",value:i.password,onChange:handleChange,placeholder:"Password",className:"form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"})}),s.jsx("button",{type:"submit",style:{backgroundColor:`${t?"#ccc":"#3446eb"}`},className:"inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full",disabled:t,children:t?"loading...":"Sign In"})]})})})})})}},58653:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>o,default:()=>l});var s=r(95153);let a=(0,s.createProxy)(String.raw`/Users/rene/Git/smartwaiter/demo/src/app/pos/login/page.tsx`),{__esModule:o,$$typeof:n}=a,i=a.default,l=i},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var s=r(31323);let __WEBPACK_DEFAULT_EXPORT__=e=>{let t=(0,s.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}},57114:(e,t,r)=>{e.exports=r(4979)}};var t=require("../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[657,747,120,323,766],()=>__webpack_exec__(64986));module.exports=r})();