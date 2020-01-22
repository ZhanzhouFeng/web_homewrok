THREE.PointerLockControls = function (camera) {

    var scope = this;
    var height = 250;
    var best_h = 0;
    var speed = 1;
    var bo=true;
    camera.rotation.set(0, 0, 0);

    var pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add(pitchObject);

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var isOnObject = false;
    var canJump = false;

    var prevTime = performance.now();

    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onMouseMove = function (event) {

        if (scope.enabled === false) return;

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));

    };

    var onKeyDown = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if (canJump === true) velocity.y += height;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function (event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    this.enabled = false;

    this.getObject = function () {

        return yawObject;

    };

    this.isOnObject = function (boolean) {

        isOnObject = boolean;
        canJump = boolean;

    };

    this.getDirection = function () {

        // assumes the camera itself is not rotated

        var direction = new THREE.Vector3(0, 0, -1);
        var rotation = new THREE.Euler(0, 0, 0, "YXZ");

        return function (v) {

            rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

            v.copy(direction).applyEuler(rotation);

            return v;

        }

    }();

    this.update = function () {

        if (scope.enabled === false) return;

        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if (moveForward) velocity.z -= 400.0 * delta * speed;
        if (moveBackward) velocity.z += 400.0 * delta;

        if (moveLeft) velocity.x -= 400.0 * delta;
        if (moveRight) velocity.x += 400.0 * delta;

        if (isOnObject === true) {

            velocity.y = Math.max(0, velocity.y);

        }

        yawObject.translateX(velocity.x * delta);
        yawObject.translateY(velocity.y * delta);
        yawObject.translateZ(velocity.z * delta);

        if (yawObject.position.y < 10) {

            velocity.y = 0;
            yawObject.position.y = 10;

            canJump = true;

        }

        prevTime = time;
        var bs = (update_num(yawObject.position.y) - 10) / 5
        document.getElementById('now_h').innerText = ((yawObject.position.y - 10) / 5).toFixed(2);
        document.getElementById('bs_h').innerText = ((update_num(yawObject.position.y) - 10) / 5).toFixed(2);

        if (((yawObject.position.y - 10) / 5) > 100) {
            document.getElementById('now_h').style.cssText = "color:red"
        }
        else if (((yawObject.position.y - 10) / 5) > 80) {
            document.getElementById('now_h').style.cssText = "color:orangered"
        }
        else if (((yawObject.position.y - 10) / 5) > 40) {
            document.getElementById('now_h').style.cssText = "color:orange"
        }
        else {
            document.getElementById('now_h').style.cssText = "color:white"
        }

        if (bs > 100) {
            document.getElementById('bs_h').style.cssText = "color:red"
        }
        else if (bs > 80) {
            document.getElementById('bs_h').style.cssText = "color:orangered"
        }
        else if (bs > 40) {
            document.getElementById('bs_h').style.cssText = "color:orange"
        }
        else {
            document.getElementById('bs_h').style.cssText = "color:white"
        }

        if(bo){
            change_abili(bs);
            change_fog(bs);
        }

        // console.log(yawObject.position)

        if (yawObject.position.y < 420 & yawObject.position.y > 416) {
            if (yawObject.position.x > -99 & yawObject.position.x < -58) {
                if (yawObject.position.z > 30 & yawObject.position.z < 70) {
                    congratulation()
                }
            }
        }
    };


    function change_fog(bs) {
        if(bs>80){
            scene.fog = new THREE.Fog(scene_color, 0, 1000);
            renderer.render(scene, camera);
        }
        else{
            scene.fog = new THREE.Fog(scene_color, 0, bs*(1000-50)/80+50);
            renderer.render(scene, camera);
        }

    }

    function change_abili(bs) {
        if(bs>80){
           height = 500
        }
        else{
            height = Math.pow(2,bs/10)/256*(500-250)/2+bs*(500-250)/80/2+250
        }

    }

    //闭包：这里要实时更新最高的高度，同时又要保证最高高度不被其他方法所破坏，所以使用
    //      闭包来实现。这里best_h为闭包内的变量。
    // 	update_num();
    var update_num = (function () {
        var best_h = 0;

        return function (h) {
            // alert(best_h)
            return best_h = Math.max(best_h, h)
        }

    })();

    //promise:这里由于为保证玩家在到达最高点后系统能够顺利判断玩家到达，所给的范围较大来保证能够判别
    //        同时，又要防止玩家只是经过而不是停在结束点，我们需要判断玩家是否在结束点待够半秒，
    //        这里使用promise来实现，判断玩家是够待足了半秒
    function congratulation() {
        function sleep(ms) {
            return new Promise(function (resolve, reject) {
                setTimeout(resolve, ms);
            })
        }

        sleep(500).then(() =>  {
            if (yawObject.position.y < 420 & yawObject.position.y > 416) {
            if (yawObject.position.x > -99 & yawObject.position.x < -58) {
                if (yawObject.position.z > 30 & yawObject.position.z < 70) {
                    document.getElementById('zhezhao').style.display = "";
            document.getElementById('tankuang').style.display = "";}
                }
            }
        })

    }



    var datGui = new dat.GUI();
    var gui = {
        jump_height: 250, //方块1 X轴位置s
        speed: 1,
        scene_color: '0x3AA0EA',
        "开发者模式":false,
    }
    //创建一个具有下拉菜单的栏目
    var lightFolder = datGui.addFolder('移动控制');
    //在栏目中添加属性值并侦听改变值得侦听事件 
    lightFolder.add(gui, 'jump_height', 100, 1000).onChange(function (val) {
        //改变对象属性值
        height = val
        // console.log(velocity.y)

    });
    lightFolder.add(gui, 'speed', 0.1, 10).onChange(function (val) {
        //改变对象属性值
        speed = val;
        // console.log(velocity.y)

    });
    lightFolder.add(gui, '开发者模式').onChange(function (val) {
        //改变对象属性值
        if(bo)
            bo=false
        else
            bo=true;
        // console.log(velocity.y)

    });
    // var colorFolder = datGui.addFolder('颜色控制');
    // colorFolder.add(gui,'scene_color').onChange)function(val){
    // 	scene_color=val;
    // }


};
