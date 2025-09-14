(function(){
  if(document.body.classList.contains('os-shell-mounted')) return;
  document.body.classList.add('os-shell-mounted');
  document.body.insertAdjacentHTML("afterbegin",
    '<div class="os-bg"></div><div class="os-veil"></div>'+
    '<header class="os-header"><div style="color:#ef3c5b;font-weight:bold">MerchantHaus CRM</div>'+
    '<div><button id="osSearch">Search</button></div></header>');
  const toast=document.createElement("div");toast.id="osToast";toast.style="position:fixed;bottom:20px;left:50%;transform:translateX(-50%);padding:6px 12px;background:rgba(0,0,0,.6);color:#fff";document.body.appendChild(toast);
  function notify(msg){toast.textContent=msg;toast.style.opacity=1;setTimeout(()=>toast.style.opacity=0,1200);}
  document.getElementById("osSearch").onclick=()=>notify("Search coming soon…");
  window.OSShell={notify};
})();
