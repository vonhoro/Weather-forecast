(this["webpackJsonpreact-project"]=this["webpackJsonpreact-project"]||[]).push([[0],{11:function(e,t,a){},13:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),s=a.n(r),o=(a(11),a(2)),i=a.n(o),l=a(5),u=a(1);function m(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(""),o=Object(u.a)(s,2),m=o[0],p=o[1],h=Object(n.useState)(),d=Object(u.a)(h,2),f=d[0],b=d[1],j=Object(n.useState)(),S=Object(u.a)(j,2),E=S[0],O=S[1],v=Object(n.useState)(""),g=Object(u.a)(v,2),w=g[0],N=g[1],I=Object(n.useState)(""),y=Object(u.a)(I,2),k=y[0],x=y[1],C=Object(n.useState)(""),W=Object(u.a)(C,2),B=W[0],D=W[1],q=Object(n.useState)(""),H=Object(u.a)(q,2),M=H[0],T=H[1],Z=Object(n.useState)(""),A=Object(u.a)(Z,2),F=A[0],J=A[1],G=Object(n.useState)(""),L=Object(u.a)(G,2),R=L[0],Y=L[1],$=Object(n.useState)(""),_=Object(u.a)($,2),z=_[0],K=_[1],P=Object(n.useState)(!1),Q=Object(u.a)(P,2),U=Q[0],V=Q[1],X=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,c,r,s,o,l,u,m,h,d,f,j;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,fetch("http://api.openweathermap.org/data/2.5/weather?appid=267c33939e7a04fdd9dbf811478f489c&q=".concat(a,"&units=metric&"));case 4:return n=e.sent,e.next=7,n.json();case 7:return c=e.sent,r=new Date(1e3*parseInt(c.sys.sunset)),s=r.getHours().toString().padStart(2,0),o=r.getMinutes().toString().padStart(2,0),l="".concat(s,":").concat(o),u=new Date(1e3*parseInt(c.sys.sunrise)),m=u.getHours().toString().padStart(2,0),h=u.getMinutes().toString().padStart(2,0),d="".concat(m,":").concat(h),p(c.name),b(l),O(d),N(c.weather[0].description),x(c.weather[0].main),D(c.main.temp),T(c.main.humidity),J(c.wind.speed),Y(c.clouds.all),e.next=27,fetch("http://api.giphy.com/v1/gifs/search?api_key=w2cdSfE14rAY6cd4FiBZ17sZEuuI9syL&q=".concat(c.weather[0].main,"-forecast&limit=1"));case 27:return f=e.sent,e.next=30,f.json();case 30:j=e.sent,K(j.data[0].images.original.url),V(!1),e.next=39;break;case 35:e.prev=35,e.t0=e.catch(1),console.log(e.t0),V(!0);case 39:case"end":return e.stop()}}),e,null,[[1,35]])})));return function(t){return e.apply(this,arguments)}}();return c.a.createElement("div",{className:"Container"},c.a.createElement("form",{className:"Za-Formu",onSubmit:X},c.a.createElement("input",{type:"text",required:!0,placeholder:"Rome,Italy",onChange:function(e){return r(e.target.value)}}),c.a.createElement("input",{autofocus:!0,type:"submit",value:"Search"})),c.a.createElement("div",{className:""!==m||U?"":"Invisible"},c.a.createElement("h1",{className:U?"Error":"Not-seen"},"Be more specific!")),c.a.createElement("div",{className:""===m?"Invisible":"Weather-Data"},c.a.createElement("h1",{className:"Info"},"City: ",m),c.a.createElement("h1",{className:"Info"},"Sunrise at: ",E),c.a.createElement("h1",{className:"Info"},"Sunset at: ",f),c.a.createElement("h1",{className:"Info"},"Cloudines: ",R,"%"),c.a.createElement("h1",{className:"Info"},"Weather:",w),c.a.createElement("h1",{className:"Info"},"Temperature:",B," \xbaC"),c.a.createElement("h1",{className:"Info"},"Humidity: ",M,"%"),c.a.createElement("h1",{className:"Info"},"Wind speed: ",F," m/sec")),c.a.createElement("img",{className:""===m?"Invsible":"Gif",src:z,alt:k}))}var p=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("h1",{className:"Title"}," Enter the name of The city and Click on Search"),c.a.createElement(m,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){e.exports=a(13)}},[[6,1,2]]]);
//# sourceMappingURL=main.f3610c83.chunk.js.map