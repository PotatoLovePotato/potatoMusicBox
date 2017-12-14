<template>
    <ul class="contlist" 
        v-infinite-scroll="getMusic"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="100"
        ref="contlist"
    >
        <li v-for="(i,inx) in musicList">
            <span class="number">{{inx + 1}}</span>
            <div @click="playerActive(i.song_id)">
                <span>
                    {{i.title}}
                </span>
                <p>
                    {{i.author}} <i>专辑:{{i.album_title}}</i>
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
    import Vue from 'vue'
    import { InfiniteScroll, Indicator } from 'mint-ui';
    import 'mint-ui/lib/style.css'
    Vue.use(InfiniteScroll);

    export default {
        data(){
            return {
                musicList:[],
                loading: false,
                num: 0,
                dataState: true,
            }
        },
        methods:{
            playerActive(song){
                this.$http.jsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.song.play&songid=${song}`)
                    .then( res => res.json() )
                    .then(data => {
                        const song = {
                            url: data.bitrate.file_link,
                            pic: data.songinfo.pic_small,
                            pic_huge: data.songinfo.pic_huge,
                            title: data.songinfo.title,
                            author: data.songinfo.author
                        }
                        
                        this.$store.commit('pushSong', song)
                        this.$store.commit('current', song)
                        this.$store.commit('play')
                        localStorage.oldSong = JSON.stringify(song);
                        if(localStorage.songList){
                            const list = JSON.parse(localStorage.songList);
                            console.log(list.find(function (item) {
                                return list.url == item.url
                            }))
                            if(!list.find(function (item) {
                                return list.url == item.url
                            }))list.unshift(song)
                            
                            localStorage.songList = JSON.stringify(list);
                        }else{
                            localStorage.songList = JSON.stringify([song])
                        }
                    })
            },
            getMusic(){
                if(!this.dataState) return false;
                Indicator.open('加载中...');
                this.loading = true;
                console.log(this.loading)
                this.num++
                const start = 12 * (this.num - 1) < 0 ? 0 : 12 * (this.num - 1);
                const type = this.$route.query.type
                this.$http.jsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.billboard.billList&type=${type}&size=12&offset=${start}`)
                    .then( res => res.json() )
                    .then(data => {
                        Indicator.close();
                        this.dataState = Boolean(data.song_list)
                        this.loading = false;
                        if(!this.dataState) return false;
                        this.musicList = this.musicList.concat(data.song_list)
                    })
            }
        },
        mounted(){
            this.getMusic();
            const eleT = this.$refs.contlist.offsetTop,
                winH = window.innerHeight
            this.$refs.contlist.style.height = winH - eleT - 120 + 'px'
        }
    }
</script>

<style lang="scss" type="text/css">

$height: 100px;
$width: 80px;
.contlist{
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
            width: 17em;
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

</style>
