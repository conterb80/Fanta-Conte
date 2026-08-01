const players = [
  {id:'leao',n:'Leao',r:'A',t:'Milan'},
  {id:'orsolini',n:'Orsolini',r:'C',t:'Bologna'},
  {id:'bastoni',n:'Bastoni',r:'D',t:'Inter'},
  {id:'svilar',n:'Svilar',r:'P',t:'Roma'},
  {id:'dovbyk',n:'Dovbyk',r:'A',t:'Roma'},
  {id:'barella',n:'Barella',r:'C',t:'Inter'},
  {id:'dimarco',n:'Dimarco',r:'D',t:'Inter'},
  {id:'maignan',n:'Maignan',r:'P',t:'Milan'},
  {id:'zaccagni',n:'Zaccagni',r:'C',t:'Lazio'},
  {id:'lucca',n:'Lucca',r:'A',t:'Napoli'}
];

const STORAGE_KEY='fanta-conte-rc2';
let state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
let activeRole='TUTTI';
let activePlayer=null;
const $=s=>document.querySelector(s);
const list=$('#list'), q=$('#q'), dialog=$('#playerDialog');

function saveState(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
function profile(id){ return state[id] || {fav:false,tier:'',maxPrice:'',notes:''}; }
function filtered(){
  const term=q.value.trim().toLowerCase();
  return players.filter(p=>{
    const x=profile(p.id);
    const text=`${p.n} ${p.t}`.toLowerCase().includes(term);
    const role=activeRole==='TUTTI'||p.r===activeRole||(activeRole==='PREFERITI'&&x.fav);
    return text&&role;
  });
}
function render(){
  const rows=filtered();
  list.innerHTML=rows.length?'':'<div class="empty">Nessun giocatore trovato.</div>';
  rows.forEach(p=>{
    const x=profile(p.id), card=document.createElement('article');
    card.className='card';
    card.innerHTML=`<div class="role">${p.r}</div><div class="open-player"><div class="player-name">${p.n}</div><div class="meta">${p.t}</div><div class="tags">${x.tier?`<span class="tag ${x.tier}">${x.tier}</span>`:''}${x.maxPrice!==''?`<span class="tag">Max ${x.maxPrice}</span>`:''}${x.notes?'<span class="tag">📝 Nota</span>':''}</div></div><button class="star ${x.fav?'on':''}" aria-label="Preferito">★</button>`;
    card.querySelector('.star').onclick=e=>{e.stopPropagation();x.fav=!x.fav;state[p.id]=x;saveState();render();};
    card.querySelector('.open-player').onclick=()=>openPlayer(p);
    list.appendChild(card);
  });
  $('#countAll').textContent=players.length;
  $('#countFav').textContent=players.filter(p=>profile(p.id).fav).length;
  $('#countVisible').textContent=rows.length;
}
function openPlayer(p){
  activePlayer=p; const x=profile(p.id);
  $('#dialogName').textContent=p.n;
  $('#dialogMeta').textContent=`${p.t} · ruolo ${p.r}`;
  $('#tier').value=x.tier||''; $('#maxPrice').value=x.maxPrice??''; $('#notes').value=x.notes||'';
  dialog.showModal();
}
$('#playerForm').addEventListener('submit',e=>{
  if(!activePlayer)return;
  const x=profile(activePlayer.id);
  x.tier=$('#tier').value; x.maxPrice=$('#maxPrice').value; x.notes=$('#notes').value.trim();
  state[activePlayer.id]=x; saveState(); render();
});
q.addEventListener('input',render);
$('#roleTabs').addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  activeRole=b.dataset.role; document.querySelectorAll('#roleTabs button').forEach(x=>x.classList.toggle('active',x===b)); render();
});

let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false;});
$('#installBtn').addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true;});
window.addEventListener('appinstalled',()=>{$('#installBtn').hidden=true;});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));}
render();
