<template>
	<div id="app">
		<router-view @song="song_link" :current="current" :songState="songState"></router-view>
		<PlayerBar :bgColor="bgColor" @playState="playState" :current="current"></PlayerBar>	
	</div>
</template>

<script>
	import Home from './components/Home'
	import PlayerBar from './components/PlayerBar'
	import Vue from 'vue'
    import VueRes from 'vue-resource'
    Vue.use(VueRes)
	export default {
		name: 'app',
		data(){
			return {
				bgColor: '#0be',
				current: {},
				songState: true
			}
		},
		methods:{
			playState(bol){
				this.songState = bol;
			},
			song_link(url){
				console.log(url)
				this.current = url;
			},
			setBgColor(str){
				this.bgColor = str;
			}
		},
		mounted(){
			
		},
		components:{
			Home,
			PlayerBar
		}
	}
</script>