const players=[{n:'Leao',r:'A',t:'Milan'},{n:'Orsolini',r:'C',t:'Bologna'},{n:'Bastoni',r:'D',t:'Inter'}];
const list=document.getElementById('list'),q=document.getElementById('q');
function draw(f=''){list.innerHTML='';players.filter(p=>p.n.toLowerCase().includes(f.toLowerCase())).forEach(p=>{const d=document.createElement('div');d.className='card';d.innerHTML=`<b>${p.n}</b><br>${p.t} - ${p.r}`;list.appendChild(d);});}
q.oninput=e=>draw(e.target.value);draw();