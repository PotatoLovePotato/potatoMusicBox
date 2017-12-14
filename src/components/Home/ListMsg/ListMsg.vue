<template>
    <div class="list">
        <h5>
            前端教程
        </h5>
        <div class="list_content">
            <ul>
                <li v-for="i in list">
                    <a :href="i.url">{{i.title}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                list:[
                    
                ]
            }
        },
        mounted(){

        }
    }
</script>
