<template>
    <div>
        <div class="blur" :style="{
            'background-image': `url(${pic_huge})`
        }"></div>
        <div class="player_wrap">
            <VHeader :opacity="1">
                
                <div slot="left" class="hd_back" @click="rBack">
                    &#xe6e3;
                </div>
                
                <div slot="title" class="hd_title">
                    <h6><em>{{title}}</em></h6>
                    <p>
                        <em>{{author}}</em>
                    </p>
                </div>
                <div slot="right" class="hd_list" @click="list">
                    &#xe60b;
                </div>
            </VHeader>
            <transition name="late">
                <component :is="componentId" :togCom="togCom"></component>
            </transition>
            <music-pic :pic="pic" ></music-pic>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VHeader from '../Header'
    import MusicPic from './MusicPic/' 
    import PlayerBar from '../PlayerBar'
    import SongList from './SongList'
    export default {
        data(){
            return {
                componentId: ''
            }
        },
        computed:{
            pic_huge(){
                return this.$store.state.currentPlay.pic_huge
            },
            title(){
                return this.$store.state.currentPlay.title
            },
            author(){
                return this.$store.state.currentPlay.author
            },
            pic(){
                return this.$store.state.currentPlay.pic
            }
        },
        props:['current','songState'],
        methods:{
            togCom(){
                this.componentId = ''
            },
            list(){
                this.componentId = 'SongList'
                this.$store.state.zIndex = 1
            },
            rBack(){
                this.$router.go(-1)
                this.$store.commit('barColor','#0be')
                this.$store.commit('rangChange', false)
            }
        },
        components:{
            VHeader,
            MusicPic,
            PlayerBar,
            SongList
        }
    }
</script>

<style lang="scss" type="text/css">

%wd{
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-family: 'iconfont';
    color: #fff;
    position: absolute;
    top: 10px;
}
$fSize: 44px;
.blur{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;top: 0;
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    filter: blur(5px);
}
.player_wrap{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;top: 0;
    z-index: 2;

    @at-root {

        .hd_back{
            @extend %wd;
            font-size: $fSize;
            float: left;
            left: 0;

            a{
                color: #fff;
            }

        }

        .hd_title{
            text-align: center;
            line-height: 40px;
            font-size: 36px;
            margin-top: 10px;

            h6,
            p{
                max-width: 8em;
                padding: 0 12px;
                margin: 0 auto;
                color: #fff;
                overflow: hidden;
                font-size: 36px;
                text-align: center;
                em{
                    white-space: nowrap;
                }
            }

            p{
                font-size: 24px;
            }

        }

        .hd_list{
            @extend %wd;
            float: right;
            font-size: $fSize;
            right: 28px;
        }

    }
}

.late{

    &-enter-active, &-leave-active{
        transition: all 0.5s ease
    }
            
    &-enter, &-leave-active{
        opacity: 0;
        transform: translateX(100%)
    }

}

  

</style>
