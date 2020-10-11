
let walls = [];
let ray;    
let particle;

const sceneW = 800;
const sceneH = 800;
let sliderFOV;




function setup() {
    createCanvas(1600, 800);
    walls.push(new Boundary(100, 0, 100, height * 4 / 5))
    walls.push(new Boundary(width/2, 0, width/2, height))

    for (let i = 0; i < 50; i++) {
        walls.push(new Boundary(400, 200+i*10, 450, 300+i*5))
    }


    
    walls.push(new Boundary(0, 0, width, 0))
    walls.push(new Boundary(width,0,width,height))
    walls.push(new Boundary(width,height,0,height))
    walls.push(new Boundary(0,height,0,0))
    particle = new Particle();
    sliderFOV = createSlider(0, 360, 45);
    sliderFOV.input(changeFOV);
}

function changeFOV() {
    const fov = sliderFOV.value();
    particle.updateFOV(fov);
}

function draw() {
    if (keyIsDown(RIGHT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            particle.move(2)
            particle.rotate(0.05);    
        } else if (keyIsDown(DOWN_ARROW)){
            particle.move(-2)
            particle.rotate(0.05);    
        }else {
            particle.rotate(0.05);
        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if (keyIsDown(UP_ARROW)) {
            particle.move(2)
            particle.rotate(-0.05);    
        } else if (keyIsDown(DOWN_ARROW)){
            particle.move(-2)
            particle.rotate(-0.05);    
        }else {
            particle.rotate(-0.05);
        }
    } else if (keyIsDown(UP_ARROW)) {
        particle.move(2)
    } else if (keyIsDown(DOWN_ARROW)) {
        particle.move(-2)
    }


    background(0);
    for (let wall of walls) {
        wall.show();
    }
    // particle.update(mouseX,mouseY);
    particle.show();


    const scene = particle.look(walls);
    const w = sceneW / scene.length
    push();
    translate(sceneW, 0);
    for (let i = 0; i < scene.length; i++){
        
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = sceneW * sceneW;

        const b = map(sq, 0, wSq, 255, 0)
        const h = map(scene[i],0, sceneW,sceneH,0)
        fill(b);
        rectMode(CENTER);
        rect(i * w + w/2,sceneH/2, w+1, h);
    }
    pop();

    // xoff += 0.005;
    // yoff += 0.005
    // ray.show();
    // ray.lookAt(mouseX, mouseY);
    // let pt = ray.cast(wall);
    // if (pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 8, 8)
    // }
 
}