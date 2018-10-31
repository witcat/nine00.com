(function(){
  var apps = document.getElementById('apps')
  var backdrop = document.getElementById('backdrop')
  var qr = document.getElementById('qr')

  backdrop.addEventListener("transitionend", function(){
    if(backdrop.style.opacity=='0'){
      backdrop.style.display = 'none'
    }
  });

  function toggleBackdrop(){
    if(backdrop.style.display=='block'){
      backdrop.style.opacity = '0'
    }else{
      backdrop.style.display = 'block'
      backdrop.offsetHeight;
      backdrop.style.opacity = '1'
    }
  }

  backdrop.addEventListener('click',function(){
    toggleBackdrop()
  })

  apps.addEventListener('click',function(ev){
    var target = ev.target;
    var name = target.dataset.name||target.parentElement.dataset.name;
    if(name){
      qr.src='qr-'+name+'.jpg'
      toggleBackdrop()
    }
  })
})()
