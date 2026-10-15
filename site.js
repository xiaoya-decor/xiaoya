const $=(s,r=document)=>r.querySelector(s);
function el(t,txt,a){const e=document.createElement(t);if(txt)e.textContent=txt;if(a)Object.assign(e,a);return e}
const url=p=>encodeURI(String(p).replace(/^\/+/,''));
const paras=(host,s)=>String(s||'').split(/\n\s*\n/).filter(x=>x.trim()).forEach(x=>host.append(el('p',x.trim())));
const nid=n=>{let h=5381;const s=(n.date||'')+'|'+(n.title||'');for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36)};
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
  const t=el('div');t.className='tx';t.append(el('h3',title));if(desc)t.append(el('p',desc));c.append(t);host.append(c)}
function newsCard(n){
  const has=n.body||n.image||(n.gallery||[]).length;
  const c=el(has?'a':'div');c.className='nc';if(has)c.href='news.html?id='+nid(n);
  if(n.image)c.append(el('img','',{className:'th',src:url(n.image),alt:'',loading:'lazy'}));
  const t=el('div');t.className='tx';t.append(el('time',n.date),el('h3',n.title));
  const s=n.summary||String(n.body||'').replace(/\s+/g,' ').slice(0,80);if(s)t.append(el('p',s));
  if(has)t.append(el('span','閱讀全文 →',{className:'go'}));c.append(t);return c}
const FB='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.2" fill="#fff"/><path fill="#1877f2" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>';
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
  fetch('site.json?'+Date.now()).then(r=>r.json()).then(d=>{
    const f=el('footer');f.className='site';f.id='contact';
    f.innerHTML='<div class="wrap ft"><div><img class="fl" src="logo-wide.jpg" alt="小雅家飾概念"></div><div><h4>聯絡我們</h4><ul id="fi"></ul></div><div class="soc" id="fs"></div></div><div class="wrap bar"><span>版權所有 © '+new Date().getFullYear()+' 小雅家飾概念 Xiaoya.furniture</span><span><a href="privacy.html">版權及隱私政策</a><a href="#top" aria-label="回到頁面頂端">↑ TOP</a></span></div>';
    const li=(k,node)=>{const x=el('li');x.append(k+':',node);$('#fi',f).append(x)};
    const sp=t=>{const s=el('span',' '+t);return s};
    if(d.email)li('E-Mail',el('a',' '+d.email,{href:'mailto:'+d.email}));
    if(d.phone)li('TEL',el('a',' '+d.phone,{href:'tel:'+d.phone.replace(/[^\d+]/g,'').replace(/^0/,'+886')}));
    if(d.address)li('地址',el('a',' '+d.address,{href:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(d.address),target:'_blank',rel:'noopener'}));
    if(d.hours)li('營業時間',sp(d.hours));
    if(d.facebook){const a=el('a','',{href:d.facebook,target:'_blank',rel:'noopener'});a.setAttribute('aria-label','小雅家飾 Facebook 專頁');a.innerHTML=FB;$('#fs',f).append(a)}
    document.body.append(f);cb&&cb(d)
  }).catch(()=>{cb&&cb({})});
}
