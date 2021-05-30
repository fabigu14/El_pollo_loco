class Cloud extends MovableObject{
    y = 50;
    height = 200;
    width = 500;
    constructor(){
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');

        
        this.x =  Math.random() * 500;
        
    }
}