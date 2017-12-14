<template>
    <div class="rang_wrap" :class="{'dis': rangState}">
        <div class="rang">
            <mt-range
                v-model="rangeValue"
                :min="0"
                :max="100"
                :bar-height="20">
            </mt-range>
        </div>
        <div class="time">
            <div class="cur">
                {{time.curTimeText}}
            </div>
            <div class="all">
                {{time.allTimeText}}
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Range } from 'mint-ui';
    Vue.component(Range.name, Range);

    export default {
        props:['rangeValue','changeVal','time'],
        computed:{
            rangState(){
                return this.$store.state.rangState
            }
        },
        watch:{
            rangeValue(newNum){
                this.changeVal(newNum)
            }
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

.rang_wrap{
    width: 90%;
    position: absolute;
    left: 5%;
    top: -140px;
    z-index: -1;
    display: none;
    .rang{
        border-radius: 40px;
        overflow: hidden;
    }
}
.time{
    @extend %clearfix;
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #fff;
    .cur{
        float: left;
    }
    .all{
        float: right;
    }
}
.dis{
    display: block;
}

</style>
