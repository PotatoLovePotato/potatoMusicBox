<template>
    <div class="song" @touchstart="start" @touchmove="move" @touchend="end">
        <ul class="song_list">
            <li class="del_wrap">
                <i>
                    清空播放历史
                </i>
                <span class="del" @click="delAll">
                    &#xe614;
                </span>
            </li>
            <li v-for="(i, inx) in songList" >
                <span class="number" @click="delItem(inx)">{{inx + 1}}</span>
                <div @click="song(i)">
                    <span>
                        {{i.title}}
                    </span>
                    <p>
                        {{i.author}} <i>专辑:{{i.album_title}}</i>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                oldx: 0,
                newx: 0
            }
        },
        props:['togCom'],
        computed:{
            songList(){
                return this.$store.state.songList
            }
        },
        methods:{
            song(data){
                this.$store.commit('current', data);
            },
            start(e){
                this.oldx = e.touches[0].clientX
            },
            move(e){
                this.newx = e.touches[0].clientX
            },
            end(e){
                if(this.newx > this.oldx && Math.abs( this.newx - this.oldx ) > 60){
                    this.togCom();
                    this.newx = this.oldx = 0;
                    this.$store.state.zIndex = 3
                }
            },
            delAll(){
                this.$store.commit('removeSongList');
                localStorage.songList = JSON.stringify([]);
            },
            delItem(id){
                const list = JSON.parse(localStorage.songList);
                list.splice(id, 1)
                localStorage.songList = JSON.stringify(list)
                this.$store.commit('removeSongListItem', id);
            }
        }
    }
</script>

<style lang="scss" type="text/css">

$height: 100px;
$width: 80px;

$padding: 100px 0 120px;
.song{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    box-sizing: border-box;
    padding: $padding;
    position: fixed;
    left: 0;top: 0;
    z-index: 9;
    
    .del_wrap{
        border: 0;
        text-align: right;
        font-size: 28px;
        height: 80px;
        line-height: 80px;
        padding: 0 30px;
        box-shadow: 0 0 10px 0 #ccc;
        .del{
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            margin-top: 10px;
            border-radius: 50%;
            background: #ccc;
            margin-left: 12px;
            color: #777;
            float: right;
            font-family: 'iconfont';
            font-size: 36px;
        }
    }
    
    
    &_list{
        width: 80%;
        height: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0;right: 0;
        background: #fff;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            width: 0;
        }

        li{
            height: $height;
            border-bottom: 1px solid #0be;
            .number{
                float: left;
                width: $width;
                height: $height;
                line-height: $height;
                text-align: center;
                font-size: 24px;
                color: #137;
            }
            div{
                width: 13em;
                line-height: $height / 2;
                font-size: 36px;
                margin-left: $width + 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                p{
                    font-size: 28px;
                }
                i{
                    font-size: 24px;
                }
            }
        }

    }

}

</style>
