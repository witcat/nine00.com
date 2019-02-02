(function() {
  var apps = document.getElementById('apps')
  var backdrop = document.getElementById('backdrop')
  var qr = document.getElementById('qr')

  backdrop.addEventListener("transitionend", function() {
    if (backdrop.style.opacity == '0') {
      backdrop.style.display = 'none'
    }
  });

  backdrop.addEventListener('click', function() {
    toggleBackdrop()
  })

  apps.addEventListener('click', function(ev) {
    var target = ev.target;
    var name = target.dataset.name || target.parentElement.dataset.name;
    if (name) {
      qr.src = 'qr-' + name + '.jpg'
      toggleBackdrop()
    }
  })

  var container;
  var camera, scene, renderer;
  var uniforms;

  init();
  animate();

  function init() {
    container = document.getElementById('bg');

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    var imouse = new THREE.Vector2();
    window.addEventListener("touchmove", function(evt) {
      imouse.x = evt["touches"][0].clientX;
      imouse.y = evt["touches"][0].clientY;
    })

    uniforms = {
      resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      iTime: {
        type: "f",
        value: 1.0
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2()
      }
    };

    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.iResolution.value.x = renderer.domElement.width;
    uniforms.iResolution.value.y = renderer.domElement.height;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    uniforms.iTime.value += 0.03;
    renderer.render(scene, camera);
  }


  function toggleBackdrop() {
    if (backdrop.style.display == 'block') {
      backdrop.style.opacity = '0'
    } else {
      backdrop.style.display = 'block'
      backdrop.offsetHeight;
      backdrop.style.opacity = '1'
    }
  }
})()
