window.addEventListener('load', init);
 
function init() {
    // マウス座標管理用のベクトルを作成
    const mouse = new THREE.Vector2();

    // canvas 要素の参照を取得する
    const canvas = document.querySelector('#canvas');

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    // シーンを作成
    const scene = new THREE.Scene();
 
    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, 1);
    camera.fov = 60;
    camera.position.set(0, 0, 1000);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
 
    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = 'lemon.glb';
 
    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            model.scale.set(100.0, 100.0, 100.0);
            model.position.set(0, -100, 0);
            //回転の調整
            //model.rotation.y = THREE.Math.DEG2RAD * -45;
            scene.add(model);
        },
        function (error) {
            console.log('An error happened');
        }
    );
    //テクスチャをガンマ補正
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
 
 
    // ライト追加
    hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x4169e1, 1.8);
    scene.add(hemisphereLight);
 
    // 初回実行
    tick();
    onResize();

    
 
    // リサイズイベント発生で実行
    window.addEventListener('resize', onResize);
 
    function onResize() {
        // サイズを取得
        const w = window.innerWidth;
        const h = window.innerHeight;
        // 描画サイズ
        renderer.setSize(w, h);
        // ピクセル比
        renderer.setPixelRatio(window.devicePixelRatio);
        // 空間の背景色　//0xから始まる16進数の色コード
        renderer.setClearColor(0xe4f8ec);
 
        // カメラのアスペクト比を正す
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        console.log('h' + h + 'h' + h);
 
        // レンダリング
        renderer.render(scene, camera);
    }
 
    function tick() {
        controls.update();
        requestAnimationFrame(tick);
        //回転
        if (model) {
            model.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
    }
 
}