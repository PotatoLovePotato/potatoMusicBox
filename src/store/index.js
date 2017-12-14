import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const ls = localStorage
const song = ls.oldSong ? JSON.parse(ls.oldSong) : {
    url: '',
    pic: '',
    pic_huge: '',
    title: '',
    author: '',
}
const songList = ls.songList ? JSON.parse(ls.songList) : []

export default new Vuex.Store({
    state:{
        playState: true,
        currentPlay: song,
        playerBarColor: '#0be',
        songList: songList,
        play: false,
        audio: null,
        rangeValue: 0,
        rangState: false,
        currentIndex: 0,
        zIndex: 2,
        mode: 0
    },
    mutations:{
        setMode(state){
            state.mode++
            if(state.mode > 3){
                state.mode = 0
            }
            console.log(state.mode)
        },
        reduce(state){
            const cur = state.currentIndex
            if (cur <= 0) {
                state.currentIndex = 0
                return false
            } else {
                state.currentIndex--
            }
            state.currentPlay = songList[state.currentIndex]

        },
        plus(state){
            const len = songList.length - 1
            const cur = state.currentIndex
            if(cur >= len ){
                state.currentIndex = len
                return false
            }else{
                state.currentIndex++
            }
            state.currentPlay = songList[state.currentIndex]
        },
        toggle(state,bol){
            state.playState = bol;
        },
        play(state) {
            state.audio.play();
            state.playState = false;
        },
        pause(state){
            state.audio.pause();
            state.playState = true;
        },
        getAudio(state, ele){
            state.audio = ele
        },
        current(state, data){
            state.currentPlay = data;
        },
        barColor(state, color, bol){
            state.playerBarColor = color;
            
        },
        rangChange(state, bol){
            state.rangState = bol
        },
        pushSong(state, data){
            if (!state.songList.find(function(item) {
                return item.url == data.url
            }))state.songList.unshift(data);
            
        },
        removeSongList(state){
            state.songList = [];
        },
        removeSongListItem(state, id){
            state.songList.splice(id, 1)
        }
    }
});