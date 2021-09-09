class Sound extends DrawableObject{
    SOUND_MUTED = 'img/instrucciones/mute-2-32.ico';
    SOUND_UNMUTED = 'img/instrucciones/sound.ico';
    x = 670;
    y = 8;
    width = 32;
    height = 32;
 
    constructor(){
        super().loadImage(this.SOUND_UNMUTED);
        this.isSoundMuted();
    }

    isSoundMuted(){
        setInterval(() => {
            if(soundMuted){
                this.loadImage(this.SOUND_MUTED);
            }
            else{
                this.loadImage(this.SOUND_UNMUTED);
            }
        }, 1000 / 60);
    }
}