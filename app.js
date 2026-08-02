const LIST_KEY='fanta-conte-list-v1';
const STATE_KEY='fanta-conte-profile-v1';
const META_KEY='fanta-conte-meta-v1';
const SETUP_KEY='fanta-conte-setup-v2';
const BACKUP_VERSION=2;

let players=JSON.parse(localStorage.getItem(LIST_KEY)||'null')||window.DEFAULT_PLAYERS;
let state=JSON.parse(localStorage.getItem(STATE_KEY)||'{}');
let meta=JSON.parse(localStorage.getItem(META_KEY)||'null')||{label:'Listone test 2025/26',date:''};
let setup=JSON.parse(localStorage.getItem(SETUP_KEY)||'null')||{teamName:'Fanta Conte',budget:500,slots:{P:3,D:8,C:8,A:6}};
let activeRole='TUTTI';
let activePlan='';
let activePlayer=null;
let mainView=localStorage.getItem('fanta-conte-main-view-v1')==='mylist'?'mylist':'listone';
let choiceFilter='ALL';

const $=s=>document.querySelector(s);
const list=$('#list');
const q=$('#q');
const dialog=$('#playerDialog');
const blank=()=>({fav:false,tier:'',maxPrice:'',notes:'',priority:'0',target:false,targetLevel:'',never:false,bought:false,isMine:false,buyPrice:'',buyOwner:''});
function profile(id){return {...blank(),...(state[id]||{})}}
function commitProfile(id,x){state[id]=x;saveState()}
function saveState(){localStorage.setItem(STATE_KEY,JSON.stringify(state))}
function saveSetup(){localStorage.setItem(SETUP_KEY,JSON.stringify(setup))}
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function ownerIsMine(x){return !!x.isMine || (!!x.bought && norm(x.buyOwner)===norm(setup.teamName))}
function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
function roleLabel(r){return {P:'Portieri',D:'Difensori',C:'Centrocampisti',A:'Attaccanti'}[r]||r}
function planLabel(level){return {ASSOLUTO:'🔴 Priorità 1',PRIORITA2:'🟡 Priorità 2',PIANOB:'🔵 Piano B'}[level]||''}
function isMyChoice(x){return !!(x.fav||x.target||x.targetLevel||num(x.priority)>0||x.tier||x.maxPrice!==''||x.notes)}
function choiceMatches(x){if(choiceFilter==='ALL')return true;if(choiceFilter==='FAV')return !!x.fav;return x.targetLevel===choiceFilter}

function filtered(){
  const term=norm(q.value);
  const team=$('#teamFilter').value;
  const availability=$('#availabilityFilter').value;
  let rows=players.filter(p=>{
    const x=profile(p.id);
    const text=norm(`${p.n} ${p.t}`).includes(term);
    const role=activeRole==='TUTTI'||p.r===activeRole||(activeRole==='PREFERITI'&&x.fav)||(activeRole==='OBIETTIVI'&&(x.target||x.targetLevel));
    const status=availability==='ALL'||(availability==='AVAILABLE'&&!x.bought)||(availability==='BOUGHT'&&x.bought)||(availability==='MINE'&&ownerIsMine(x));
    const plan=!activePlan||x.targetLevel===activePlan;
    const view=mainView==='listone'||(isMyChoice(x)&&choiceMatches(x));
    return text&&role&&status&&plan&&view&&(!team||p.t===team);
  });
  const sort=$('#sortBy').value;
  rows.sort((a,b)=>{
    if(sort==='name') return a.n.localeCompare(b.n);
    if(sort==='team') return a.t.localeCompare(b.t)||a.n.localeCompare(b.n);
    if(sort==='fvm-desc') return num(b.fvm)-num(a.fvm)||num(b.qa)-num(a.qa);
    if(sort==='priority-desc') return planWeight(profile(b.id))-planWeight(profile(a.id))||num(profile(b.id).priority)-num(profile(a.id).priority)||num(b.qa)-num(a.qa);
    return num(b.qa)-num(a.qa)||num(b.fvm)-num(a.fvm);
  });
  return rows;
}

function planWeight(x){return {ASSOLUTO:30,PRIORITA2:20,PIANOB:10}[x.targetLevel]||0}

function buildTeams(){
  const select=$('#teamFilter');
  const old=select.value;
  select.innerHTML='<option value="">Tutte le squadre</option>'+[...new Set(players.map(p=>p.t).filter(Boolean))].sort().map(t=>`<option>${t}</option>`).join('');
  if([...select.options].some(o=>o.value===old)) select.value=old;
}

function auctionSnapshot(){
  const bought=players.filter(p=>profile(p.id).bought);
  const mine=players.filter(p=>ownerIsMine(profile(p.id)));
  const spent=mine.reduce((sum,p)=>sum+num(profile(p.id).buyPrice),0);
  const remaining=Math.max(0,num(setup.budget)-spent);
  return {bought,mine,spent,remaining};
}

function dashboard(){
  const {bought,mine,spent,remaining}=auctionSnapshot();
  const available=players.length-bought.length;

  $('#countAvailable').textContent=available;
  $('#countFav').textContent=players.filter(p=>profile(p.id).fav&&!profile(p.id).bought).length;
  $('#countTarget').textContent=players.filter(p=>(profile(p.id).target||profile(p.id).targetLevel)&&!profile(p.id).bought).length;
  $('#countBought').textContent=bought.length;
  const mineCount=players.filter(p=>isMyChoice(profile(p.id))).length;
  const myCountEl=$('#myListCount');if(myCountEl)myCountEl.textContent=mineCount;
  $('#budgetDisplay').textContent=setup.budget;
  $('#spentBudget').textContent=spent;
  $('#remainingBudget').textContent=remaining;
  const openSlots=['P','D','C','A'].reduce((sum,r)=>sum+Math.max(0,num(setup.slots[r])-mine.filter(p=>p.r===r).length),0);
  $('#safeBid').textContent=Math.max(0,remaining-Math.max(0,openSlots-1));

  for(const r of ['P','D','C','A']){
    const have=mine.filter(p=>p.r===r).length;
    $('#mine'+r).textContent=have;
    $('#slot'+r).textContent=setup.slots[r]??0;
    $('#mine'+r).closest('div').classList.toggle('full',have>=num(setup.slots[r]));
  }
  renderRoleAdvice(mine,remaining);
  renderAuctionLog();
  renderIntelligence();
}

function renderRoleAdvice(mine,remaining){
  const box=$('#roleAdvice');
  box.innerHTML=['P','D','C','A'].map(r=>{
    const have=mine.filter(p=>p.r===r).length;
    const total=num(setup.slots[r]);
    const left=Math.max(0,total-have);
    return `<div class="advice ${left===0?'complete':''}"><strong>${r} · ${have}/${total}</strong><span>${left===0?'Reparto completo':`${left} posti da coprire`} · Budget ${remaining}</span></div>`;
  }).join('');
}

function renderIntelligence(){
  const available=players.filter(p=>!profile(p.id).bought);
  $('#countAbsolute').textContent=available.filter(p=>profile(p.id).targetLevel==='ASSOLUTO').length;
  $('#countSecond').textContent=available.filter(p=>profile(p.id).targetLevel==='PRIORITA2').length;
  $('#countPlanB').textContent=available.filter(p=>profile(p.id).targetLevel==='PIANOB').length;
  const box=$('#roleStats');
  box.innerHTML=['P','D','C','A'].map(r=>{
    const bought=players.filter(p=>p.r===r&&profile(p.id).bought);
    const remaining=players.filter(p=>p.r===r&&!profile(p.id).bought).length;
    const avg=bought.length?(bought.reduce((s,p)=>s+num(profile(p.id).buyPrice),0)/bought.length).toFixed(1):'–';
    const targets=players.filter(p=>p.r===r&&!profile(p.id).bought&&(profile(p.id).target||profile(p.id).targetLevel)).length;
    return `<div><b>${r}</b><strong>${remaining}</strong><span>liberi</span><small>Media asta ${avg} · 🎯 ${targets}</small></div>`;
  }).join('');
  document.querySelectorAll('.plan-cards button').forEach(b=>b.classList.toggle('active',b.dataset.plan===activePlan));
}

function boughtPlayers(){
  return players.filter(p=>profile(p.id).bought).sort((a,b)=>num(profile(b.id).buyPrice)-num(profile(a.id).buyPrice)||a.n.localeCompare(b.n));
}
function renderAuctionLog(){
  const box=$('#auctionLog');
  const rows=boughtPlayers();
  box.innerHTML=rows.length?rows.map(p=>{
    const x=profile(p.id);
    return `<div class="log-row"><div><strong>${p.n}</strong><small>${p.r} · ${p.t} · ${x.buyOwner||'Senza proprietario'} · ${x.buyPrice||0} crediti</small></div><button type="button" data-undo="${p.id}">Annulla</button></div>`;
  }).join(''):'<div class="empty">Nessun acquisto registrato.</div>';
}

function verdictFor(p,x){
  if(x.bought)return {cls:'neutral',text:'NON DISPONIBILE'};
  if(x.never||x.tier==='EVITA')return {cls:'red',text:'LASCIA'};
  if(x.targetLevel==='ASSOLUTO'||num(x.priority)>=5)return {cls:'green',text:x.maxPrice!==''?`FINO A ${x.maxPrice}`:'DA PRENDERE'};
  if(x.targetLevel==='PRIORITA2'||x.target||num(x.priority)>=3)return {cls:'amber',text:x.maxPrice!==''?`SOTTO ${x.maxPrice}`:'PREZZO GIUSTO'};
  if(x.targetLevel==='PIANOB'||num(x.priority)>0)return {cls:'blue',text:x.maxPrice!==''?`MAX ${x.maxPrice}`:'PIANO B'};
  if(x.maxPrice!==''&&num(x.maxPrice)<num(p.qa))return {cls:'red',text:'POCO MARGINE'};
  return {cls:'neutral',text:'MONITORA'};
}

function render(){
  const rows=filtered();
  const mine=mainView==='mylist';
  document.body.dataset.mainView=mainView;
  const title=$('#listTitle'),subtitle=$('#listSubtitle'),visible=$('#visibleCount');
  if(title)title.textContent=mine?'La mia lista':'Listone giocatori';
  if(subtitle)subtitle.textContent=mine?'Le tue scelte, ordinate e colorate per priorità':'Tocca una scheda per aggiungerla alle tue scelte';
  if(visible)visible.textContent=rows.length;
  list.innerHTML=rows.length?'':`<div class="empty">${mine?'La tua lista è ancora vuota. Apri un giocatore dal Listone e assegna una priorità, una stella o una valutazione.':'Nessun giocatore trovato con questi filtri.'}</div>`;
  const frag=document.createDocumentFragment();
  rows.forEach(p=>{
    const x=profile(p.id);
    const diff=num(p.diff)>0?`+${p.diff}`:p.diff;
    const verdict=verdictFor(p,x);
    const card=document.createElement('article');
    card.className='card'+(x.bought?' bought':'')+(ownerIsMine(x)?' mine':'')+(x.never?' avoided':'')+(x.targetLevel?' choice-'+x.targetLevel.toLowerCase():'')+(mainView==='mylist'?' personal-card':'');
    card.innerHTML=`
      <div class="role">${p.r}</div>
      <button class="open-player" type="button">
        <div class="player-head"><div class="player-name">${p.n}</div><span class="verdict ${verdict.cls}">${verdict.text}</span></div>
        <div class="meta">${p.t} · ${p.rm||p.r}</div>
        <div class="official"><span class="pill">Qt. ${p.qa}</span><span class="pill">FVM ${p.fvm}</span><span class="pill ${num(p.diff)>0?'up':num(p.diff)<0?'down':''}">${diff}</span></div>
        <div class="tags">
          ${x.targetLevel?`<span class="tag PLAN-${x.targetLevel}">${planLabel(x.targetLevel)}</span>`:''}
          ${x.tier?`<span class="tag ${x.tier}">${x.tier}</span>`:''}
          ${x.target&&!x.targetLevel?'<span class="tag TARGET">🎯 Obiettivo</span>':''}
          ${x.never?'<span class="tag EVITA">❌ Escluso</span>':''}
          ${x.maxPrice!==''?`<span class="tag">Max ${x.maxPrice}</span>`:''}
          ${num(x.priority)>0?`<span class="tag">${'★'.repeat(num(x.priority))}</span>`:''}
          ${x.notes?'<span class="tag">📝</span>':''}
          ${x.bought?`<span class="tag BOUGHT">${ownerIsMine(x)?'🟢 MIO':'✅ Preso'} · ${x.buyPrice||0} · ${x.buyOwner||'Senza nome'}</span>`:''}
        </div>
      </button>
      <button class="star ${x.fav?'on':''}" type="button" aria-label="Preferito">★</button>`;
    card.querySelector('.star').onclick=e=>{e.stopPropagation();x.fav=!x.fav;commitProfile(p.id,x);render()};
    card.querySelector('.open-player').onclick=()=>openPlayer(p);
    frag.appendChild(card);
  });
  list.appendChild(frag);
  dashboard();
  $('#seasonLabel').textContent=meta.label;
  $('#importInfo').textContent=`${players.length} giocatori caricati${meta.date?' · '+meta.date:''}`;
}

function syncQuickButtons(x){[['#quickFav','fav'],['#quickTarget','target'],['#quickNever','never']].forEach(([sel,key])=>$(sel).classList.toggle('active',!!x[key]))}
function openPlayer(p){
  activePlayer=p;const x=profile(p.id);
  $('#dialogName').textContent=p.n;$('#dialogMeta').textContent=`${p.t} · ruolo ${p.r}`;$('#dialogQa').textContent=p.qa;$('#dialogFvm').textContent=p.fvm;$('#dialogRm').textContent=p.rm||'-';
  $('#tier').value=x.tier||'';$('#targetLevel').value=x.targetLevel||'';$('#maxPrice').value=x.maxPrice??'';$('#notes').value=x.notes||'';$('#priority').value=String(x.priority||0);
  $('#bought').checked=!!x.bought;$('#isMine').checked=ownerIsMine(x);$('#buyPrice').value=x.buyPrice??'';$('#buyOwner').value=x.buyOwner||'';syncQuickButtons(x);dialog.showModal();
}
function toggleProfileFlag(key){if(!activePlayer)return;const x=profile(activePlayer.id);x[key]=!x[key];if(key==='never'&&x.never){x.target=false;x.targetLevel='';x.fav=false}commitProfile(activePlayer.id,x);syncQuickButtons(x)}
$('#quickFav').addEventListener('click',()=>toggleProfileFlag('fav'));
$('#quickTarget').addEventListener('click',()=>toggleProfileFlag('target'));
$('#quickNever').addEventListener('click',()=>toggleProfileFlag('never'));
$('#isMine').addEventListener('change',()=>{if($('#isMine').checked){$('#bought').checked=true;$('#buyOwner').value=setup.teamName||'Fanta Conte'}});
$('#bought').addEventListener('change',()=>{if(!$('#bought').checked)$('#isMine').checked=false});
$('#playerForm').addEventListener('submit',()=>{
  if(!activePlayer)return;const x=profile(activePlayer.id);
  Object.assign(x,{tier:$('#tier').value,targetLevel:$('#targetLevel').value,maxPrice:$('#maxPrice').value,notes:$('#notes').value.trim(),priority:$('#priority').value,bought:$('#bought').checked,isMine:$('#isMine').checked,buyPrice:$('#buyPrice').value,buyOwner:$('#buyOwner').value.trim()});
  if(x.targetLevel)x.target=true;if(x.isMine&&!x.buyOwner)x.buyOwner=setup.teamName;if(!x.bought){x.isMine=false;x.buyPrice='';x.buyOwner=''}commitProfile(activePlayer.id,x);render();toast('Scheda giocatore salvata');
});

q.addEventListener('input',render);$('#teamFilter').addEventListener('change',render);$('#sortBy').addEventListener('change',render);$('#availabilityFilter').addEventListener('change',render);
$('#roleTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;activeRole=b.dataset.role;document.querySelectorAll('#roleTabs button').forEach(x=>x.classList.toggle('active',x===b));render()});
$('.plan-cards').addEventListener('click',e=>{const b=e.target.closest('button[data-plan]');if(!b)return;activePlan=activePlan===b.dataset.plan?'':b.dataset.plan;mainView='mylist';choiceFilter=b.dataset.plan;document.querySelectorAll('#choiceTabs button').forEach(x=>x.classList.toggle('active',x.dataset.choice===choiceFilter));setMainView('mylist',{scroll:false});$('#availabilityFilter').value='AVAILABLE';render()});
$('#showAllPlayers').addEventListener('click',()=>{activePlan='';activeRole='TUTTI';choiceFilter='ALL';q.value='';$('#availabilityFilter').value='AVAILABLE';document.querySelectorAll('#roleTabs button').forEach(x=>x.classList.toggle('active',x.dataset.role==='TUTTI'));setMainView('listone',{scroll:false})});

function setMainView(view,{scroll=true}={}){
  mainView=view==='mylist'?'mylist':'listone';
  localStorage.setItem('fanta-conte-main-view-v1',mainView);
  if(mainView==='listone')choiceFilter='ALL';
  $('#listoneView')?.classList.toggle('active',mainView==='listone');
  $('#myListView')?.classList.toggle('active',mainView==='mylist');
  $('#listoneView')?.setAttribute('aria-selected',String(mainView==='listone'));
  $('#myListView')?.setAttribute('aria-selected',String(mainView==='mylist'));
  $('#choiceTabs').hidden=mainView!=='mylist';
  document.querySelectorAll('.bottom-nav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===mainView));
  render();
  if(scroll)setTimeout(()=>document.getElementById('listone')?.scrollIntoView({behavior:'smooth',block:'start'}),40);
}
$('#listoneView')?.addEventListener('click',()=>setMainView('listone'));
$('#myListView')?.addEventListener('click',()=>setMainView('mylist'));
document.querySelectorAll('.bottom-nav [data-view]').forEach(b=>b.addEventListener('click',()=>setMainView(b.dataset.view)));
$('#choiceTabs')?.addEventListener('click',e=>{const b=e.target.closest('button[data-choice]');if(!b)return;choiceFilter=b.dataset.choice;document.querySelectorAll('#choiceTabs button').forEach(x=>x.classList.toggle('active',x===b));render()});

$('#toggleSetup').addEventListener('click',()=>{$('#setupPanel').hidden=!$('#setupPanel').hidden});
function loadSetupForm(){ $('#myTeamName').value=setup.teamName;$('#totalBudget').value=setup.budget;for(const r of ['P','D','C','A'])$('#slots'+r).value=setup.slots[r] }
$('#saveSetup').addEventListener('click',()=>{setup={teamName:$('#myTeamName').value.trim()||'Fanta Conte',budget:Math.max(1,num($('#totalBudget').value)||500),slots:{P:num($('#slotsP').value),D:num($('#slotsD').value),C:num($('#slotsC').value),A:num($('#slotsA').value)}};saveSetup();$('#setupPanel').hidden=true;render();toast('Impostazioni asta salvate')});

$('#fileInput').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{toast('Importazione in corso…');const imported=await FantaExcel.read(file);if(imported.length<50)throw new Error('Il file contiene troppo pochi giocatori');players=imported;localStorage.setItem(LIST_KEY,JSON.stringify(players));meta={label:file.name.replace(/\.(xlsx|xls|csv)$/i,''),date:new Date().toLocaleDateString('it-IT')};localStorage.setItem(META_KEY,JSON.stringify(meta));buildTeams();render();toast(`Importati ${players.length} giocatori`)}catch(err){console.error(err);toast('Errore: '+err.message,5000)}e.target.value=''});
function toast(msg,time=2600){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(window._toast);window._toast=setTimeout(()=>t.hidden=true,time)}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).catch(console.error));
loadSetupForm();buildTeams();render();

$('#toggleLog').addEventListener('click',()=>{const box=$('#auctionLog');box.hidden=!box.hidden;if(!box.hidden)renderAuctionLog()});
$('#auctionLog').addEventListener('click',e=>{const id=e.target?.dataset?.undo;if(!id)return;const x=profile(id);x.bought=false;x.isMine=false;x.buyPrice='';x.buyOwner='';commitProfile(id,x);render();toast('Acquisto annullato')});
$('#exportBackup').addEventListener('click',()=>{const payload={version:BACKUP_VERSION,createdAt:new Date().toISOString(),players,state,meta,setup};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`Fanta-Conte-backup-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);toast('Backup creato')});
$('#backupInput').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!data||!Array.isArray(data.players)||typeof data.state!=='object')throw new Error('Backup non valido');players=data.players;state=data.state||{};meta=data.meta||meta;setup=data.setup||setup;localStorage.setItem(LIST_KEY,JSON.stringify(players));localStorage.setItem(STATE_KEY,JSON.stringify(state));localStorage.setItem(META_KEY,JSON.stringify(meta));saveSetup();loadSetupForm();buildTeams();render();toast('Backup ripristinato')}catch(err){toast('Errore nel backup: '+err.message,5000)}e.target.value=''});

// RC15 · pannelli operativi secondari a comparsa
(()=>{
  const launchers=[...document.querySelectorAll('.panel-launchers [data-panel]')];
  const panels=new Map(launchers.map(button=>[button.dataset.panel,document.getElementById(button.dataset.panel)]));
  const setPanel=(id,open,{scroll=false}={})=>{
    const panel=panels.get(id);if(!panel)return;
    panel.classList.toggle('panel-collapsed',!open);
    panel.setAttribute('aria-hidden',String(!open));
    const button=launchers.find(x=>x.dataset.panel===id);
    if(button){button.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));const arrow=button.querySelector('b');if(arrow)arrow.textContent=open?'⌃':'⌄'}
    if(open&&scroll)setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'start'}),70);
  };
  launchers.forEach(button=>button.addEventListener('click',()=>{
    const panel=panels.get(button.dataset.panel);const open=panel?.classList.contains('panel-collapsed');
    setPanel(button.dataset.panel,open,{scroll:open});
  }));
  document.querySelectorAll('.bottom-nav a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const id=link.getAttribute('href').slice(1);if(!panels.has(id))return;
    event.preventDefault();setPanel(id,true);setTimeout(()=>panels.get(id).scrollIntoView({behavior:'smooth',block:'start'}),60);
  }));
  ['asta','obiettivi','livePanel','strumenti'].forEach(id=>setPanel(id,false));
  setMainView(mainView,{scroll:false});
})();


// RC18 · pannello fogli asta richiudibile e sempre non invasivo
(()=>{
  const toggle=document.getElementById('togglePrintTools');
  const body=document.getElementById('printToolsBody');
  if(!toggle||!body)return;
  const setOpen=(open)=>{
    body.hidden=!open;
    toggle.setAttribute('aria-expanded',String(open));
  };
  setOpen(false);
  toggle.addEventListener('click',()=>setOpen(body.hidden));
  const toolsLauncher=document.querySelector('.panel-launchers [data-panel="strumenti"]');
  if(toolsLauncher)toolsLauncher.addEventListener('click',()=>{
    const tools=document.getElementById('strumenti');
    setTimeout(()=>{if(tools?.classList.contains('panel-collapsed'))setOpen(false)},340);
  });
})();

// RC17 · esportazione Excel/PDF per listone e lista personale
function exportRows(scope='full'){
  const source=scope==='mine'?players.filter(p=>isMyChoice(profile(p.id))):players.slice();
  const roleOrder={P:1,D:2,C:3,A:4};
  return source.sort((a,b)=>(roleOrder[a.r]||9)-(roleOrder[b.r]||9)||planWeight(profile(b.id))-planWeight(profile(a.id))||num(b.qa)-num(a.qa)||a.n.localeCompare(b.n));
}
function xmlEsc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')}
function htmlEsc(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function downloadBlob(content,type,filename){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function makeExcel(scope){
  const mine=scope==='mine', rows=exportRows(scope);
  const headers=mine?['Ruolo','Giocatore','Squadra','Qt.','FVM','Priorità asta','Stelle','Max mio','Valutazione','Note','Acquistato','Prezzo','Proprietario']:['✓','Ruolo','Giocatore','Squadra','Qt.','FVM','Diff.','Acquistato','Prezzo','Proprietario'];
  const table=rows.map(p=>{const x=profile(p.id);return mine?[p.r,p.n,p.t,p.qa,p.fvm,planLabel(x.targetLevel).replace(/^[^ ]+ /,''),num(x.priority),x.maxPrice,x.tier,x.notes,x.bought?'Sì':'',x.buyPrice,x.buyOwner]:['',p.r,p.n,p.t,p.qa,p.fvm,p.diff,x.bought?'Sì':'',x.buyPrice,x.buyOwner]}).map(row=>'<Row>'+row.map((v,i)=>`<Cell><Data ss:Type="${typeof v==='number'?'Number':'String'}">${xmlEsc(v)}</Data></Cell>`).join('')+'</Row>').join('');
  const widths=mine?[45,150,90,45,55,100,45,55,85,220,65,55,110]:[28,42,145,90,45,55,45,65,55,110];
  const cols=widths.map(w=>`<Column ss:Width="${w}"/>`).join('');
  const title=mine?'Fanta Conte - La mia lista':'Fanta Conte - Listone completo';
  const xml=`<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#D9EAD3" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="${mine?'Mia lista':'Listone'}"><Table>${cols}<Row ss:StyleID="Header">${headers.map(h=>`<Cell><Data ss:Type="String">${xmlEsc(h)}</Data></Cell>`).join('')}</Row>${table}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane><Print><ValidPrinterInfo/><HorizontalResolution>600</HorizontalResolution><VerticalResolution>600</VerticalResolution></Print></WorksheetOptions></Worksheet></Workbook>`;
  downloadBlob('\ufeff'+xml,'application/vnd.ms-excel',`Fanta-Conte-${mine?'Mia-Lista':'Listone'}-${new Date().toISOString().slice(0,10)}.xls`);toast(`${title}: file Excel creato`);
}
function priorityText(x){return x.targetLevel?planLabel(x.targetLevel).replace(/^[^ ]+ /,''):x.fav?'Preferito':''}
function printPdf(scope){
  const mine=scope==='mine', rows=exportRows(scope);
  const grouped=['P','D','C','A'].map(role=>({role,rows:rows.filter(p=>p.r===role)})).filter(g=>g.rows.length);
  const sections=grouped.map(g=>`<section><h2>${roleLabel(g.role)} <small>${g.rows.length}</small></h2><table><thead><tr>${mine?'<th>✓</th><th>Giocatore</th><th>Squadra</th><th>Priorità</th><th>Max</th><th>Note</th>':'<th>✓</th><th>Giocatore</th><th>Squadra</th><th>Qt.</th><th>FVM</th><th>Prezzo</th><th>Acquistato da</th>'}</tr></thead><tbody>${g.rows.map(p=>{const x=profile(p.id);return mine?`<tr class="${x.targetLevel||''}"><td class="check">□</td><td><b>${htmlEsc(p.n)}</b>${x.bought?'<br><small>GIÀ ACQUISTATO</small>':''}</td><td>${htmlEsc(p.t)}</td><td>${htmlEsc(priorityText(x))}${x.priority>0?` · ${'★'.repeat(num(x.priority))}`:''}</td><td>${htmlEsc(x.maxPrice||'')}</td><td>${htmlEsc(x.notes||'')}</td></tr>`:`<tr class="${x.bought?'bought':''}"><td class="check">□</td><td><b>${htmlEsc(p.n)}</b></td><td>${htmlEsc(p.t)}</td><td>${htmlEsc(p.qa)}</td><td>${htmlEsc(p.fvm)}</td><td>${htmlEsc(x.buyPrice||'')}</td><td>${htmlEsc(x.buyOwner||'')}</td></tr>`}).join('')}</tbody></table></section>`).join('');
  const title=mine?'LA MIA LISTA - GUIDA ASTA':'LISTONE COMPLETO - FOGLIO ASTA';
  const win=window.open('','_blank');if(!win){toast('Consenti i popup per creare il PDF',4500);return}
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>@page{size:A4 ${mine?'portrait':'landscape'};margin:9mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#111;margin:0;font-size:${mine?'9.5':'8.5'}pt}header{display:flex;justify-content:space-between;align-items:end;border-bottom:2px solid #111;padding-bottom:5px;margin-bottom:7px}h1{font-size:16pt;margin:0}header p{margin:0;font-size:8pt;color:#555}section{break-inside:avoid;margin-bottom:9px}h2{font-size:11pt;margin:6px 0 3px;padding:4px 6px;background:#e9edf2;border-left:5px solid #555}h2 small{font-size:8pt;color:#666}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{border:1px solid #999;padding:3px 4px;vertical-align:top;word-wrap:break-word}th{background:#f0f0f0;text-align:left;font-size:7.5pt}.check{font-size:14pt;text-align:center;width:25px}td small{color:#b00020;font-weight:bold}.ASSOLUTO td{background:#fff0f1}.PRIORITA2 td{background:#fff9e5}.PIANOB td{background:#edf7ff}.bought td{text-decoration:line-through;color:#777}footer{position:fixed;bottom:0;right:0;font-size:7pt;color:#777}@media print{button{display:none}}</style></head><body><header><div><h1>${title}</h1><p>${htmlEsc(meta.label)} · Creato il ${new Date().toLocaleDateString('it-IT')} · ${rows.length} giocatori</p></div><p>Fanta Conte RC17</p></header>${sections}<footer>Fanta Conte · ${setup.teamName}</footer><script>window.onload=()=>setTimeout(()=>window.print(),250)<\/script></body></html>`);win.document.close();
}
$('#excelFull')?.addEventListener('click',()=>makeExcel('full'));
$('#excelMine')?.addEventListener('click',()=>makeExcel('mine'));
$('#pdfFull')?.addEventListener('click',()=>printPdf('full'));
$('#pdfMine')?.addEventListener('click',()=>printPdf('mine'));
