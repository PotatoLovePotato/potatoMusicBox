<template>
    <div class="content">
        <div class="content_nav">
            <dl>
                <dt>
                    <a href="javascript:;">
                        &#xe601;
                    </a>
                </dt>
                <dd>本地音乐</dd>
            </dl>
            <dl>
                <dt>
                    <a href="javascript:;">
                        &#xe658;
                    </a>
                </dt>
                <dd>下载音乐</dd>
            </dl>
            <dl>
                <dt>
                    <a href="javascript:;">
                        &#xe689;
                    </a>
                </dt>
                <dd>最近播放</dd>
            </dl>
            <dl>
                <dt>
                    <a href="javascript:;">
                        &#xe619;
                    </a>
                </dt>
                <dd>我喜欢</dd>
            </dl>
        </div>
        <div class="content_rank" >
            <div ref="rank" class="content_rank_wrap">
                <div class="content_rank_item" v-for="i in rank" @click="getMusic(i.typeId)">
                    <span :style="{
                        'background-image': `url(${i.pic})`
                    }"></span>
                    <div>
                        <h6>{{i.type}}</h6>
                        <p>
                            {{i.msg}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                rank: [
                    {
                        type: '新歌榜',
                        pic: require('../../../assets/img/newMusic.jpg'),
                        typeId: 1,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '热歌榜',
                        pic: require('../../../assets/img/oldMusic.jpg'),
                        typeId: 2,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '摇滚榜',
                        pic: require('../../../assets/img/rockMusic.jpg'),
                        typeId: 11,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '爵士',
                        pic: require('../../../assets/img/jazzMusic.jpg'),
                        typeId: 12,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '流行',
                        pic: require('../../../assets/img/radioMusic.jpg'),
                        typeId: 16,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '欧美金曲榜',
                        pic: require('../../../assets/img/billMusic.jpg'),
                        typeId: 21,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '经典老歌榜',
                        pic: require('../../../assets/img/oldMusic.jpg'),
                        typeId: 22,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '情歌对唱榜',
                        pic: require('../../../assets/img/loveM.jpg'),
                        typeId: 23,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '影视金曲榜',
                        pic: require('../../../assets/img/videoMusic.jpg'),
                        typeId: 24,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    },
                    {
                        type: '网络歌曲榜',
                        pic: require('../../../assets/img/webMusic.jpg'),
                        typeId: 25,
                        msg: '该榜单是根据百度音乐平台歌曲每日播放量自动生成的数据榜单，统计范围为近期发行的歌曲，每日更新一次'
                    }
                ]
            }
        },
        props:['song'],
        methods:{
            getMusic(type){
                this.$router.push({
                    path: 'contlist',
                    query:{
                        type: type
                    }
                })
            }
            
        },
        mounted(){
            console.log(this.song)
            this.$refs.rank.style.height = window.innerHeight - this.$refs.rank.offsetTop - 120 + 'px'
        }
    }
</script>

<style lang="scss" type="text/css">
    
%clearfix{

    &:after,
    &:before{
        content: '';
        display: table;
    }
    &:after{
        clear: both;
    }

}
body{
    overflow: hidden;
}
.content{
    font-family: 'iconfont';

    &_nav{
        display: flex;
        padding: 30px 0;
        box-shadow: 0 2px 10px 0 #ccfcfc;
        dl{
            flex: 1;
            text-align: center;
            dt{
                font-size: 56px;
                a{
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    color: #0be;
                }
            }
            dd{
                font-size: 28px;
                line-height: 48px;
            }
        }

    }
    &_rank{
        $rankSize: 100px;
        padding: 24px 30px;
        &_wrap{
            overflow-y: scroll;
            &::-webkit-scrollbar{
                width: 0;
            }
        }
        &_item{
            @extend %clearfix;
            padding: 12px 0;
            border-bottom: 1px dashed #fcfcfc;
            span{
                width: $rankSize;
                height: $rankSize;
                float: left;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center; 
            }
            div{
                margin-left: $rankSize + 40px;
                h6{
                    line-height: 36px;
                    font-size: 28px;
                }
                p{
                    height: 60px;
                    font-size: 24px;
                    line-height: 30px;
                    color: #777;
                    overflow: hidden;
                }
            }
        }

    }
    
}

</style>

