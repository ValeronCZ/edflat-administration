<template>
    <div class="page-background">
        <h2 class="status">403</h2>
        <h1 class="message">Access denied</h1>
        <router-link to="/">
            <el-button type="primary">Home</el-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Error403Page",
        title: "common.error.403.title"
    };
</script>

<style scoped lang="scss">
    .status {
        margin: 0;
        font-size: 20vw;
        line-height: 20vw;
        color: #595D64;
    }
    .message {
        font-size: 2vw;
        color: #595D64;
    }
</style>
