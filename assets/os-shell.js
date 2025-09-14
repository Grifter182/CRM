(function(){
  let audioReady=false, muted=false; let clickSfx=null, popSfx=null;
  function initAudio(){
    if(audioReady) return; audioReady=true;
    clickSfx=new Audio('../click.mp3'); clickSfx.preload='auto';
    popSfx=new Audio('../pop.mp3'); popSfx.preload='auto';
    [clickSfx,popSfx].forEach(a=>a.volume = muted?0:1);
  }
  function playClick(){ if(audioReady && !muted && clickSfx){clickSfx.currentTime=0; clickSfx.play().catch(()=>{});} }
  function playPop(){ if(audioReady && !muted && popSfx){popSfx.currentTime=0; popSfx.play().catch(()=>{});} }

  const toast=document.querySelector('.toast');
  function notify(msg){ if(!toast) return; toast.textContent=msg; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),1500); }

  document.querySelectorAll('.cta').forEach(btn=>{
    btn.addEventListener('click',()=>{ initAudio(); playPop(); const a=btn.getAttribute('data-action'); notify('Executing '+a+'…'); });
  });

  const radial=document.querySelector('.radial');
  if(radial){
    const actions=[
      {label:'Add Lead', fn:()=>notify('New lead modal…')},
      {label:'Search', fn:()=>notify('Open command palette…')},
      {label:'Toggle Theme', fn:()=>{ document.body.classList.toggle('light'); notify('Theme toggled');}},
      {label:'Settings', fn:()=>notify('Opening settings…')}
    ];
    window.addEventListener('contextmenu',e=>{ e.preventDefault(); initAudio(); playClick(); openRadial(e.clientX,e.clientY); });
    radial.addEventListener('click',e=>{ if(e.target.classList.contains('backdrop')) closeRadial(); });

    function openRadial(x,y){
      radial.innerHTML='<div class="backdrop"></div>'; const R=100;
      actions.forEach((a,i)=>{ const ang=(i/actions.length)*Math.PI*2 - Math.PI/2;
        const nx=x+Math.cos(ang)*R; const ny=y+Math.sin(ang)*R;
        const b=document.createElement('button');
        b.className='node bubble'; b.style.left=nx+'px'; b.style.top=ny+'px';
        b.textContent=a.label;
        b.addEventListener('click',()=>{ a.fn(); playPop(); closeRadial(); });
        radial.appendChild(b);
      });
      radial.classList.add('open');
    }
    function closeRadial(){ radial.classList.remove('open'); }
  }

  const searchBtn=document.getElementById('openSearch');
  if(searchBtn) searchBtn.addEventListener('click',()=>{ initAudio(); playClick(); notify('Search coming soon…'); });
  const muteBtn=document.getElementById('toggleMute');
  if(muteBtn) muteBtn.addEventListener('click',()=>{ initAudio(); muted=!muted; [clickSfx,popSfx].forEach(a=>{ if(a) a.volume = muted?0:1; }); notify(muted?'Sound off':'Sound on'); });

  ['click','keydown','pointerdown','touchstart'].forEach(ev=>window.addEventListener(ev,initAudio,{once:true,passive:true}));
})();
