import{c as w,o as F,g as u,u as C,i as r,e,F as v,S as b,t as p,f as c,h as y}from"./web.9ee1b91f.js";import{T as E,u as B,S as T,F as A,a as D}from"./HeaderSecond.4fa7884b.js";import{C as R}from"./TagsConvertor.b3f5406f.js";import{A as G,C as M}from"./index.79db8632.js";import{G as S}from"./GlobalData.4e554cac.js";import{M as k,a as N}from"./MessageHInt.3d0a2276.js";import{G as U}from"./GlobalHeader.98cdf1df.js";import{t as H,U as I}from"./newsReport.002ec313.js";import"./notice.940364ec.js";/* empty css                       */import"./index.c584f020.js";import"./Webview.b36c6241.js";import"./index.4f2c4b12.js";import"./Panel.801c2a10.js";import"./index.b92d985b.js";import"./_commonjsHelpers.edff4021.js";import"./memoize.49269b7f.js";const L=p('<section class="search-results flex h-full flex-wrap content-start  gap-4 overflow-y-auto overflow-x-hidden  pt-4 pb-4"></section>',2),P=p("<div>数据为空</div>",2),j=()=>{const{usersCollection:f,result:t}=S.getApp("tag-control");let l;return w(F(t,s=>{l.scrollTo(0,0)})),t.refetch(),(()=>{const s=u(L),n=l;return typeof n=="function"?C(n,s):l=s,r(s,e(b,{get when(){return t.isReady()||t.loading()},get children(){return e(v,{get each(){return t()},fallback:()=>u(P),children:a=>e(G,{send:i=>i("ADD_BEFORE",a.en),get children(){return e(E,{data:a,onClick:i=>f(o=>[...o,R(i)])})}})})}})),s})()},O=p('<div class="flex flex-none flex-col gap-2 overflow-scroll px-2 pb-4 text-sm"></div>',2),q=p('<section class="flex h-full w-full flex-1 flex-col gap-2 overflow-hidden"><!#><!/><section class="flex flex-1 overflow-auto"><!#><!/><!#><!/></section></section>',10),z=()=>{const{showClassify:f}=S.getApp("data"),{ClassFilterList:t,selectType:l}=B();return[e(T,{}),(()=>{const s=u(q),n=s.firstChild,[a,i]=c(n.nextSibling),o=a.nextSibling,g=o.firstChild,[m,$]=c(g.nextSibling),_=m.nextSibling,[d,h]=c(_.nextSibling);return r(s,e(A,{classifyType:l}),a,i),r(o,e(b,{get when(){return f()},get children(){const x=u(O);return r(x,e(t,{})),x}}),m,$),r(o,e(j,{}),d,h),s})()]},J=p('<section class="  flex  max-w-4xl flex-1 justify-center"><main id="main-panel" class=" flex h-full  w-full max-w-4xl flex-1 flex-col overflow-visible px-2 pt-2 text-gray-400 sm:px-4 sm:pt-4"><!#><!/><!#><!/><!#><!/></main><!#><!/></section>',12),fe=()=>{const{backgroundImage:f}=S.getApp("data");return H(),[e(M,{detect:{PURE_TAGS(){k.success("你可以拖拽魔咒文本到任何编辑器！")}},get children(){const t=u(J),l=t.firstChild,s=l.firstChild,[n,a]=c(s.nextSibling),i=n.nextSibling,[o,g]=c(i.nextSibling),m=o.nextSibling,[$,_]=c(m.nextSibling),d=l.nextSibling,[h,x]=c(d.nextSibling);return r(l,e(U,{}),n,a),r(l,e(I,{}),o,g),r(l,e(z,{}),$,_),r(t,e(N,{}),h,x),y(()=>t.classList.toggle("opacity-90",!!f())),t}}),e(D,{})]};export{fe as Main};
