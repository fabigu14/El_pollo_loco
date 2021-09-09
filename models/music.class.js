class Music extends DrawableObject{
    MUSIC_MUTED = 'img/instrucciones/mute-music.png';
    MUSIC_UNMUTED = 'img/instrucciones/music.png';
    y = 8;
    width = 32;
    height = 32;
 
    constructor(){
        super().loadImage(this.MUSIC_UNMUTED);
        this.isMusicMuted();
    }

    isMusicMuted(){
        setInterval(() => {
            if(musicMuted){
                this.x = 625;
                this.loadImage(this.MUSIC_MUTED);
            }
            else{
                this.x = 630;
                this.loadImage(this.MUSIC_UNMUTED);
            }
        }, 1000 / 60);
    }
}