<template>
    <div class="pic">
        <div class="pic_phonograph" :class="{'animted': bol}"></div>
        <div class="pic_author" :style="{
            'background-image': `url(${pic})`
        }"></div>
        
    </div>
</template>

<script>
    

    export default {
        props:['pic'],
        computed:{
            bol(){
                return this.$store.state.playState
            }
        }
    }
</script>

<style lang="scss" type="text/css">

$size: 594px;
%position{
    box-sizing: border-box;
    border-radius: 50%;
    position: absolute;
    left: 50%;top: 50%;
}

.pic{

    @extend %position;
    width: $size;
    height: $size;
    border: 12px solid #fff;
    margin-left: -$size / 2;
    margin-top: -$size / 2;

    &_phonograph{
        $phsize: 570px;
        @extend %position;
        width: $phsize;
        height: $phsize;
        margin-left: -$phsize / 2;
        margin-top: -$phsize / 2;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url(../../../assets/img/phonograph.png);
        animation: rotatePic 2s linear 0s infinite;
    }
    .animted{
        animation-play-state: paused;
    }

    @mixin rotate(){
        @for $i from 0 through 10{
            $to: $i * 10%;
            #{$to}{
                transform: rotate( $i * 36deg);
            }
        }
    }
    
    @keyframes rotatePic {
        @include rotate;
    }

    &_author{
        $author: 300px;
        @extend %position;
        width: $author;
        height: $author;
        background-image: linear-gradient(to left, red, green);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-left: -$author / 2;
        margin-top: -$author / 2;
    }

}
    
</style>
