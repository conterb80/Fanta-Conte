
const LIST_KEY='fanta-conte-list-v1', STATE_KEY='fanta-conte-profile-v1', META_KEY='fanta-conte-meta-v1', BUDGET_KEY='fanta-conte-budget-v1';
let players=JSON.parse(localStorage.getItem(LIST_KEY)||'null')||window.DEFAULT_PLAYERS;
let state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}');
let meta=JSON.parse(localStorage.getItem(META_KEY)||'null')||{label:'Listone test 2025/26',date:''};
let activeRole='TUTTI', activePlayer=null;
const $=s=>document.querySelector(s), list=$('#list'), q=$('#q'), dialog=$('#playerDialog');
const blank=()=>({fav:false,tier:'',maxPrice:'',notes:'',priority:'0',target:false,never:false});
function profile(id){return state[id]||blank()}
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function filtered(){
  const term=norm(q.value), team=$('#teamFilter').value;
  let rows=players.filter(p=>{
    const x=profile(p.id), text=norm(`${p.n} ${p.t}`).includes(term);
    const role=activeRole==='TUTTI'||p.r===activeRole||(activeRole==='PREFERITI'&&x.fav);
    return text&&role&&(!team||p.t===team);
  });
  const sort=$('#sortBy').value;
  rows.sort((a,b)=>sort==='name'?a.n.localeCompare(b.n):sort==='team'?(a.t.localeCompare(b.t)||a.n.localeCompare(b.n)):sort==='fvm-desc'?(b.fvm-a.fvm||b.qa-a.qa):(b.qa-a.qa||b.fvm-a.fvm));
  return rows;
}
function buildTeams(){
  const select=$('#teamFilter'), old=select.value;
  select.innerHTML='<option value="">Tutte le squadre</option>'+[...new Set(players.map(p=>p.t).filter(Boolean))].sort().map(t=>`<option>${t}</option>`).join('');
  if([...select.options].some(o=>o.value===old)) select.value=old;
}
function render(){
  const rows=filtered(); list.innerHTML=rows.length?'':'<div class="empty">Nessun giocatore trovato.</div>';
  const frag=document.createDocumentFragment();
  rows.forEach(p=>{
    const x=profile(p.id), card=document.createElement('article'), diff=p.diff>0?`+${p.diff}`:p.diff;
    card.className='card'; card.innerHTML=`<div class="role">${p.r}</div><div class="open-player"><div class="player-name">${p.n}</div><div class="meta">${p.t} · ${p.rm||p.r}</div><div class="official"><span class="pill">Qt. ${p.qa}</span><span class="pill">FVM ${p.fvm}</span><span class="pill ${p.diff>0?'up':p.diff<0?'down':''}">${diff}</span></div><div class="tags">${x.tier?`<span class="tag ${x.tier}">${x.tier}</span>`:''}${x.target?'<span class="tag TARGET">🎯 Obiettivo</span>':''}${x.never?'<span class="tag EVITA">❌ No</span>':''}${x.maxPrice!==''?`<span class="tag">Max ${x.maxPrice}</span>`:''}${Number(x.priority)>0?`<span class="tag">${'★'.repeat(Number(x.priority))}</span>`:''}${x.notes?'<span class="tag">📝</span>':''}</div></div><button class="star ${x.fav?'on':''}" aria-label="Preferito">★</button>`;
    card.querySelector('.star').onclick=e=>{e.stopPropagation();x.fav=!x.fav;state[p.id]=x;saveState();render()};
    card.querySelector('.open-player').onclick=()=>openPlayer(p); frag.appendChild(card);
  });
  list.appendChild(frag);
  $('#countAll').textContent=players.length;
  $('#countFav').textContent=players.filter(p=>profile(p.id).fav).length;
  $('#countTarget').textContent=players.filter(p=>profile(p.id).target).length;
  $('#countVisible').textContent=rows.length;
  $('#seasonLabel').textContent=meta.label;
  const targetMax=players.reduce((sum,p)=>{const x=profile(p.id);return sum+(x.target?Number(x.maxPrice||0):0)},0);
  const el=document.querySelector('#targetMaxTotal'); if(el) el.textContent=targetMax;
  $('#importInfo').textContent=`${players.length} giocatori caricati${meta.date?' · '+meta.date:''}`;
}
function openPlayer(p){
  activePlayer=p; const x=profile(p.id);
  $('#dialogName').textContent=p.n; $('#dialogMeta').textContent=`${p.t} · ruolo ${p.r}`;
  $('#dialogQa').textContent=p.qa; $('#dialogFvm').textContent=p.fvm; $('#dialogRm').textContent=p.rm||'-';
  $('#tier').value=x.tier||''; $('#maxPrice').value=x.maxPrice??''; $('#notes').value=x.notes||'';
  $('#priority').value=String(x.priority||0); $('#target').checked=!!x.target; $('#never').checked=!!x.never;
  dialog.showModal();
}
$('#playerForm').addEventListener('submit',()=>{
  if(!activePlayer)return; const x=profile(activePlayer.id);
  Object.assign(x,{tier:$('#tier').value,maxPrice:$('#maxPrice').value,notes:$('#notes').value.trim(),priority:$('#priority').value,target:$('#target').checked,never:$('#never').checked});
  state[activePlayer.id]=x; saveState(); render(); toast('Valutazione salvata');
});
q.addEventListener('input',render); $('#teamFilter').addEventListener('change',render); $('#sortBy').addEventListener('change',render);
$('#roleTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;activeRole=b.dataset.role;document.querySelectorAll('#roleTabs button').forEach(x=>x.classList.toggle('active',x===b));render()});
$('#fileInput').addEventListener('change',async e=>{
  const file=e.target.files[0]; if(!file)return;
  try{
    toast('Importazione in corso…'); const imported=await FantaExcel.read(file);
    if(imported.length<50) throw new Error('Il file contiene troppo pochi giocatori');
    players=imported; localStorage.setItem(LIST_KEY,JSON.stringify(players));
    meta={label:file.name.replace(/\.(xlsx|xls|csv)$/i,''),date:new Date().toLocaleDateString('it-IT')};
    localStorage.setItem(META_KEY,JSON.stringify(meta)); buildTeams(); render(); toast(`Importati ${players.length} giocatori`);
  }catch(err){console.error(err);toast('Errore: '+err.message,5000)}
  e.target.value='';
});
function toast(msg,time=2600){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(window._toast);window._toast=setTimeout(()=>t.hidden=true,time)}
let deferredPrompt;
const installBtn=$('#installBtn'), pwaStatus=$('#pwaStatus');
function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true}
function setPwaStatus(text,kind=''){if(!pwaStatus)return;pwaStatus.textContent=text;pwaStatus.className='pwa-status '+kind}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false;setPwaStatus('App pronta: tocca Installa per aggiungerla come vera app.','ok')});
installBtn.addEventListener('click',async()=>{if(!deferredPrompt){setPwaStatus('Apri il menu di Chrome e cerca “Installa app”. Se vedi solo scorciatoia, aggiorna la pagina una volta.','warn');return}deferredPrompt.prompt();const choice=await deferredPrompt.userChoice;if(choice.outcome==='accepted')setPwaStatus('Installazione accettata. Cerca l’icona Fanta Conte.','ok');deferredPrompt=null;installBtn.hidden=true});
window.addEventListener('appinstalled',()=>{installBtn.hidden=true;setPwaStatus('Fanta Conte è installata sul telefono.','ok')});
$('#pwaHelp')?.addEventListener('click',()=>{if(isStandalone())setPwaStatus('Stai già usando Fanta Conte come app installata.','ok');else if(deferredPrompt)installBtn.click();else setPwaStatus('Aggiorna la pagina, poi attendi alcuni secondi. In alternativa: menu Chrome → Installa app.','warn')});
const budgetInput=$('#totalBudget');
if(budgetInput){budgetInput.value=localStorage.getItem(BUDGET_KEY)||'500';const updateBudget=()=>{$('#budgetDisplay').textContent=budgetInput.value||0;localStorage.setItem(BUDGET_KEY,budgetInput.value||0)};budgetInput.addEventListener('input',updateBudget);updateBudget()}
if('serviceWorker'in navigator){window.addEventListener('load',async()=>{try{const reg=await navigator.serviceWorker.register('/Fanta-Conte/sw.js',{scope:'/Fanta-Conte/'});await navigator.serviceWorker.ready;if(isStandalone())setPwaStatus('Fanta Conte è aperta come app installata.','ok');else if(!deferredPrompt)setPwaStatus('PWA attiva. Attendi il pulsante Installa oppure controlla il menu Chrome.','ok');console.log('SW pronto',reg.scope)}catch(err){console.error(err);setPwaStatus('Service worker non attivo: ricarica la pagina.','warn')}})}
buildTeams(); render();
