<template>
    <div>
        <comment_box :id="id"></comment_box>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id
        }
    }
}
</script>