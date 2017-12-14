<template>
    <div class="player_bar_wrap" :style="{
        'z-index': zIndex
    }">
        <audio :src="currentPlay.url" ref="player" autoplay></audio>
        <div class="player_nav" :style="{
            'background-color': `${bg}`
        }">
            
            <div class="player_pic" :style="{
                'background-image': `url(${currentPlay.pic})`,
                'border': `${bg ? `5px solid ${bg}`: ''}`
            }">
                <div class="player_toggle" @click="toggleFn">
                    <div :class="{'now': toggle}">
                        &#xe64e;
                    </div>
                    <div :class="{'now': !toggle}">
                        &#xe712;
                    </div>
                </div>
            </div>
            <div class="tools" @click="rPush">
                <div @click="modeFn">
                    <i class="mode" :class="{'active': mode == 0}" >&#xe605;</i>
                    <i class="mode" :class="{'active': mode == 1}" >&#xe6ba;</i>
                    <i class="mode" :class="{'active': mode == 2}" >&#xe62a;</i>
                    <i class="mode" :class="{'active': mode == 3}" >&#xe636;</i>
                </div>
                <div>
                    <i @click="reduce">&#xe600;</i>
                </div>
                <div></div>
                <div>
                    <i @click="plus">&#xe606;</i>
                </div>
                <div>
                    <i>&#xe696;</i>
                </div>
            </div>
        </div>
        <Rang :rangeValue="val" :changeVal="changeVal" :time="time"></Rang>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import Rang from '../Player/Rang'
    
    Vue.use(VueResource)
    export default {
        name: 'player-bar',
        components:{
            Rang
        },
        data(){
            return {
                bgC: '',
                bol: true,
                val: 0,
                time: {}
            }
        },
        props: ['bgColor','current'],
        computed:{
            mode(){
                return this.$store.state.mode
            },
            zIndex(inx){
                return this.$store.state.zIndex
            },
            duration(){
                return this.$refs
            },
            toggle(){
                return this.$store.state.playState
            },
            bg(){
                return this.$store.state.playerBarColor
            },
            currentPlay(){
                return this.$store.state.currentPlay
            }
        },
        methods:{
            modeFn(){
                this.$store.commit('setMode')
            },
            rPush(){
                this.$store.commit('barColor', '')
                this.$store.commit('rangChange', true)
                
                this.$router.push({
                    path: 'player'
                })
            },
            reduce(){
                this.$store.commit('reduce')
            },
            plus(e){
                e.stopPropagation();
                this.$store.commit('plus')
            },
            changeVal(num){
                this.val = num
            },
            toggleFn(){
                if(!this.currentPlay.url) return false;
                this.bol = !this.$store.state.playState
                this.$store.commit('toggle', !this.$store.state.playState);
                !this.$store.state.playState ?  this.$store.commit('play') : this.$store.commit('pause') ;
            }
        },
        mounted(){
            this.$store.state.audio = this.$refs.player;
            this.$store.commit('pause')
            const audio = this.$refs.player
            function timeH(time) {
                const hh = parseInt(time / 3600) < 10 ? '0' + parseInt(time / 3600) : parseInt(time / 3600)
                return hh
            }
            function timeM(time) {
                const mm = parseInt(time % 3600 / 60) < 10 ? '0' + parseInt(time % 3600 / 60) : parseInt(time % 3600 / 60)
                return mm
            }
            function timeS(time){
                const ss = parseInt(time % 3600 % 60) < 10 ? '0' + parseInt(time % 3600 % 60) : parseInt(time % 3600 % 60)
                return ss
            }
            audio.ontimeupdate = () => {
                const allTime = audio.duration
                const curTime = audio.currentTime
                const tim = curTime / allTime
                this.val = parseInt(tim * 100)
                
                const curTimeText = `${timeH(curTime)}:${timeM(curTime)}:${timeS(curTime)}`
                this
                const allTimeText = `${timeH(allTime)}:${timeM(allTime)}:${timeS(allTime)}`
                this
                Vue.set(this.time, 'curTimeText', curTimeText)
                Vue.set(this.time, 'allTimeText', allTimeText)
                
            }
            audio.onended = () => {
                console.log('end')
                this.$store.commit('pause')
            }
        }
    }
</script>

<style lang="scss" type="text/css">

.mode{
    display: none;
}
.active{
    display: inline;
}
.player{
    $picsize: 120px;
    $bgcolor: rgba(0,0,0,.1);
    $toolscolor: #fff;
    &_bar_wrap{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    &_pic{
        width: 80px;
        height: 80px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    &_nav{
        height: 100px;
        background: $bgcolor;
        position: relative;
        font-family: 'iconfont';

        .tools{
            display: flex;
            font-size: 36px;
            div{
                flex: 1;
                text-align: center;
                line-height: 100px;
                color: $toolscolor;

                i{
                    // display: inline-block;
                    padding: 16px;
                }

            }

        }

    }
    &_pic{
        width: $picsize;
        height: $picsize;
        background-origin: border-box;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        left: 50%;top: -20px;
        margin-left: -$picsize / 2;
        border-radius: 50%;
        box-sizing: border-box;
        border: 5px solid $bgcolor;
        overflow: hidden;
        z-index: 3;
    }
    &_toggle{
        border-radius: 50%;
        line-height: 120px;
        text-align: center;
        background: rgba(0,0,0,.4);
        font-size: 42px;
        color: #fff;
        div{
            display: none;
        }
        .now{
            display: block;
        }

    }

}

</style>
