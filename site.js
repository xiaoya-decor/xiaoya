(function(){
  const id='G-45E65L6FHE';
  window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
  gtag('js',new Date());gtag('config',id);
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.append(s);
  document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href')||'';
    let n='';if(h.startsWith('tel:'))n='click_phone';else if(h.startsWith('mailto:'))n='click_email';else if(h.includes('facebook.com'))n='click_facebook';else if(h.includes('instagram.com'))n='click_instagram';else if(h.includes('google.com/maps'))n='click_map';
    if(n)gtag('event',n,{link_url:h})});
})();
const $=(s,r=document)=>r.querySelector(s);
function el(t,txt,a){const e=document.createElement(t);if(txt)e.textContent=txt;if(a)Object.assign(e,a);return e}
const url=p=>encodeURI(String(p).replace(/^\/+/,''));
const paras=(host,s)=>String(s||'').split(/\n\s*\n/).filter(x=>x.trim()).forEach(x=>host.append(el('p',x.trim())));
const nid=n=>{let h=5381;const s=(n.date||'')+'|'+(n.title||'');for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36)};

const hid=s=>{let h=5381;s=String(s||'');for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36)};
const itemsOf=(d,p)=>[...(p.items||[]),...(d.items||[]).filter(x=>x.category===p.name)];

function seo(title,desc,crumbs){
  document.title=title;
  const q=s=>document.querySelector(s),og=(p,v)=>{const e=q('meta[property="'+p+'"]');if(e)e.content=v};
  if(desc){const m=q('meta[name=description]');if(m)m.content=desc;og('og:description',desc)}
  og('og:title',title);
  let c=q('link[rel=canonical]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.append(c)}
  c.href='https://www.xiaoya.com.tw/'+location.pathname.split('/').pop()+location.search;og('og:url',c.href);
  if(crumbs){const s=document.createElement('script');s.type='application/ld+json';
    s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((x,i)=>({'@type':'ListItem',position:i+1,name:x[0],item:'https://www.xiaoya.com.tw/'+x[1]}))});document.head.append(s)}}
const snip=(s,n)=>String(s||'').split(/\n\s*\n/)[0].replace(/\s+/g,' ').slice(0,n);
const param=k=>new URLSearchParams(location.search).get(k);
const NOTICE='所有商品圖片皆為實物拍攝，由於電腦螢幕色差、拍攝光線等因素，照片與實物會略有差別，商品以實物為主。\n備註：因每年會汰換布料樣式，布料樣式需以現場為主。';
function pageHead(en,title,crumb){
  const h=el('div');h.className='pagehead';const w=el('div');w.className='wrap';
  const t=el('div');t.className='ph-t';t.append(el('span',en,{className:'en2'}),el('h1',title));w.append(t);
  if(crumb){const c=el('nav');c.className='crumb';c.setAttribute('aria-label','導覽路徑');
    crumb.forEach(([n,u],i)=>{if(i)c.append(' > ');c.append(u?el('a',n,{href:u}):el('span',n))});w.append(c)}
  h.append(w);return h}
function catCard(host,it,href,title){
  const a=el('a');a.className='cat';a.href=href;const src=it.image||(it.photos||it.gallery||[])[0];
  const f=el('span');f.className='cf'+(src?'':' ph0');
  f.append(el('img','',{src:src?url(src):'logo.png',alt:src?title:'',loading:'lazy'}));a.append(f);
  a.append(el('span',title,{className:'cn'}));host.append(a)}
function photoGrid(list,cap){
  const g=el('div');g.className='pg';const pics=list.filter(Boolean).map(p=>({src:url(p),cap}));
  pics.forEach((p,i)=>{const b=el('button','',{type:'button'});b.setAttribute('aria-label','放大查看第 '+(i+1)+' 張');b.append(el('img','',{src:p.src,alt:cap,loading:'lazy'}));b.onclick=()=>openLb(pics,i);g.append(b)});
  return g}
let L=[],I=0,dlg;
function lbShow(){const it=L[I];$('#lbi').src=it.src;$('#lbi').alt=it.cap||'';$('#lbc').textContent=it.cap||'';dlg.querySelector('.pv').hidden=dlg.querySelector('.nx').hidden=L.length<2}
function lbStep(n){I=(I+n+L.length)%L.length;lbShow()}
function openLb(list,i){
  if(!dlg){dlg=el('dialog');dlg.innerHTML='<div class="lb"><button class="cb x" aria-label="關閉">×</button><button class="cb pv" aria-label="上一張">‹</button><img id="lbi" alt=""><button class="cb nx" aria-label="下一張">›</button><p id="lbc"></p></div>';document.body.append(dlg);
    dlg.querySelector('.x').onclick=()=>dlg.close();dlg.querySelector('.pv').onclick=()=>lbStep(-1);dlg.querySelector('.nx').onclick=()=>lbStep(1);
    dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.classList.contains('lb'))dlg.close()});
    dlg.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')lbStep(-1);if(e.key==='ArrowRight')lbStep(1)})}
  L=list;I=i;lbShow();dlg.showModal()}
function card(host,it,title,desc){
  const c=el('div');c.className='item';
  const pics=[it.image,...(it.gallery||[])].filter(Boolean).map(p=>({src:url(p),cap:title}));
  if(pics.length){const b=el('button','',{type:'button'});b.className='ph';b.setAttribute('aria-label','查看 '+title+' 照片');
    b.append(el('img','',{src:pics[0].src,alt:title,loading:'lazy'}));b.onclick=()=>openLb(pics,0);c.append(b)}
  const t=el('div');t.className='tx';t.append(el('h3',title));if(desc)t.append(el('p',desc));
  if(pics.length){t.classList.add('clk');t.tabIndex=0;t.setAttribute('role','button');t.setAttribute('aria-label','查看 '+title+' 照片');
    t.onclick=()=>openLb(pics,0);t.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(pics,0)}}}
  c.append(t);host.append(c)}
function newsCard(n){
  const has=n.body||n.image||(n.gallery||[]).length;
  const c=el(has?'a':'div');c.className='nc';if(has)c.href='news.html?id='+nid(n);
  if(n.image)c.append(el('img','',{className:'th',src:url(n.image),alt:'',loading:'lazy'}));
  const t=el('div');t.className='tx';t.append(el('time',n.date),el('h3',n.title));
  const s=n.summary||String(n.body||'').replace(/\s+/g,' ').slice(0,80);if(s)t.append(el('p',s));
  if(has)t.append(el('span','閱讀全文 →',{className:'go'}));c.append(t);return c}
const FB='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.2" fill="#fff"/><path fill="#1877f2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>';
const IG='<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="igg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".6" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><circle cx="12" cy="12" r="10.2" fill="#fff"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.2" fill="none" stroke="url(#igg)" stroke-width="1.6"/><circle cx="12" cy="12" r="2.7" fill="none" stroke="url(#igg)" stroke-width="1.6"/><circle cx="15.3" cy="8.7" r=".9" fill="url(#igg)"/></svg>';
function boot(cb){
  const here=location.pathname.split('/').pop()||'index.html';
  const nav=[['index.html','首頁'],['about.html','關於我們'],['news.html','最新消息'],['products.html','產品服務'],['#contact','聯絡我們']];
  const h=el('header');h.className='site';
  h.innerHTML='<div class="wrap"><button class="menu" type="button" aria-label="開啟選單" aria-expanded="false" aria-controls="mnav"><span></span><span></span><span></span></button><a class="brand" href="index.html"><img src="logo-wide.jpg" alt="小雅家飾概念 回首頁"></a><nav id="mnav"></nav></div>';
  nav.forEach(([u,t])=>{const a=el('a',t,{href:u});if(here===u)a.className='on';h.querySelector('nav').append(a)});
  const mb=h.querySelector('.menu'),setM=o=>{h.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'關閉選單':'開啟選單')};
  mb.onclick=()=>setM(!h.classList.contains('open'));
  h.querySelector('nav').addEventListener('click',e=>{if(e.target.tagName==='A')setM(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')setM(false)});
  document.body.prepend(h);
  const J=u=>fetch(u+'?'+Date.now()).then(r=>r.ok?r.json():{}).catch(()=>({}));
  Promise.all(['site','about','products','items','projects','news'].map(n=>J(n+'.json'))).then(a=>Object.assign({},...a)).then(d=>{
    const f=el('footer');f.className='site';f.id='contact';
    f.innerHTML='<div class="wrap ft"><div><img class="fl" src="logo-wide.jpg" alt="小雅家飾概念"></div><div><h4>聯絡我們</h4><ul id="fi"></ul></div><div class="soc" id="fs"></div></div><div class="wrap bar"><span>版權所有 © '+new Date().getFullYear()+' 小雅家飾概念 Xiaoya.furniture</span><span><a href="privacy.html">版權及隱私政策</a><a href="#top" aria-label="回到頁面頂端">↑ TOP</a></span></div>';
    const li=(k,node)=>{const x=el('li');x.append(k+':',node);$('#fi',f).append(x)};
    const sp=t=>{const s=el('span',' '+t);return s};
    if(d.email)li('E-Mail',el('a',' '+d.email,{href:'mailto:'+d.email}));
    if(d.phone)li('TEL',el('a',' '+d.phone,{href:'tel:'+d.phone.replace(/[^\d+]/g,'').replace(/^0/,'+886')}));
    if(d.address)li('地址',el('a',' '+d.address,{href:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.address),target:'_blank',rel:'noopener'}));
    if(d.hours)li('營業時間',sp(d.hours));
    if(d.facebook){const a=el('a','',{href:d.facebook,target:'_blank',rel:'noopener'});a.setAttribute('aria-label','小雅家飾 Facebook 專頁');a.innerHTML=FB;$('#fs',f).append(a)}
    const igu=d.instagram===undefined?'https://www.instagram.com/xiaoyadecor38/':d.instagram;
    if(igu){const a=el('a','',{href:igu,target:'_blank',rel:'noopener'});a.setAttribute('aria-label','小雅家飾 Instagram');a.innerHTML=IG;$('#fs',f).append(a)}
    document.body.append(f);cb&&cb(d)
  }).catch(()=>{cb&&cb({})});
}
