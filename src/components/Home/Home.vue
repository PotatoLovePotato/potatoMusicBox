<template>
    <div class="home">
        <VHeader>
            <div slot="left" class="setlistBtn">
                &#xe67a;
            </div>
            <div class="hd_nav" slot="title">
                <ul>
                    <li>Potato Music Box</li> 
                </ul>
            </div>
            <div slot="search" class="hd_search">
                <input type="text" v-model="search" @keyup="searchFn" placeholder="搜索" />
            </div>
        </VHeader>
        <router-view @song="song"></router-view>
    </div>
</template>

<script>
    import VHeader from '../Header'
    import PlayerBar from '../PlayerBar'
    export default {
        data(){
            return {
                search: '',
                inx: 0,
                bgColor: '#0be'
            }
        },
        props:['add'],
        components:{
            VHeader,
            PlayerBar
        },
        methods:{
            song(url){
                this.song_link(url)
            },
            song_link(url){
                this.$emit('song',url)
            },
            searchFn(){
                if(!this.search) return false;
                this.$http.jsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=baidu.ting.search.catalogSug&query=${this.search}`)
                    .then( res => res.json() )
                    .then(data => {
                        console.log(data)
                    })
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss" type="text/css">

%clearfix{
    &:before,
    &:after{
        content: '';
        display: table;
    }
    &:after{
        clear: both;
    }
}
.home{
    .head_wrap{
        height: auto;
        position: relative;
        padding: 12px;
        background: #0BE;
    }
    .hd_top{
        position: relative;
    }
    @at-root{
        .setlistBtn{
            line-height: 60px;
            font-family: 'iconfont';
            float: left;
            font-size: 48px;
            margin-left: 12px;
            color: #fcfcfc;
            position: absolute;
            left: 0;
        }
        .hd_nav{
            ul{
                text-align: center;
                li{
                    padding: 0 24px;
                    height: 60px;
                    line-height: 60px;
                    font-size: 30px;
                    display: inline-block;
                    color: #fcfcfc;
                    opacity: .9;
                }
                .nav_active{
                    font-size: 38px;
                    font-weight: bold;
                    opacity: 1;
                }
            }

        }
        .hd_search{
            
            input{
                width: 90%;
                height: 60px;
                margin: 10px auto 0;
                font-size: 24px;
                padding: 0 14px;
                border-radius: 12px;
                background: rgba(0,0,0,.3);
                color: #fcfcfc;
                display: block;
                &::-webkit-input-placeholder { 
                    color:#fcfcfc;
                    text-align: center; 
                }
                &:focus::-webkit-input-placeholder{
                    text-align: left;
                    color: #ccc;
                }
            }
            
            
        }
    }
}


</style>
