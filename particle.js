class Particle{

    constructor() {
        this.pos = createVector(10, 10,);
        this.rays = [];
        this.fov = 60;
        this.heading = 0;
        for (let a = -30; a < 30; a +=0.3){
            this.rays.push(new Ray(this.pos ,radians(a)));
        }
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 0.3){
            this.rays.push(new Ray(this.pos ,radians(a)+this.heading));
        }
    }
    move(amt) { 
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }

    rotate(angle) {
        this.heading += angle;
        let index=0;
        for (let a = -this.fov/2; a < this.fov/2; a += 0.3){
            this.rays[index].setAngle(radians(a) + this.heading)
            index++;
        }
    }
    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length;i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(255);
                line(this.pos.x,this.pos.y,closest.x,closest.y)
            } 
                scene[i] = record;
        }
        return scene;
    
    }

    update(x, y) {
        this.pos.set(x, y);
    }

    show() {
        fill(255,0,255);
        ellipse(this.pos.x, this.pos.y, 10,);
        for (let ray of this.rays){
            ray.show()
        }
    
    }

}