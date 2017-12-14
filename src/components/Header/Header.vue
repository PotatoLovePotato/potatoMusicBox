<template>
    <div :class="[ opacity ? 'head_op' : 'head_wrap']">
        <div class="hd_top">
            <slot name="left" class="head_left"></slot>
            <slot name="title" class="head_tit"></slot>
            <slot name="right" class="head_right"></slot>
        </div>
        <div class="hd_bottom">
            <slot name="search"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:['opacity']
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
%wd{
    width: 100px;
    height: 100px;
}

.head{

    $hdHeight: 100px;
    $wrapbg: rgba(0,0,0,.4);
    $opbg: rgba(0,0,0,.4);

    &_wrap{
        @extend %clearfix;
        height: $hdHeight;
        background: $opbg;
    }
    &_op{
        @extend %clearfix;
        height: $hdHeight;
        background: $wrapbg;
    }

}

</style>

