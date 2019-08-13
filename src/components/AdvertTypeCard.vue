<template>
    <div class="card-wrapper">
        <div class="card-period">
            {{ `${period} ${$t('adverts.days')}` }}
        </div>
        <div class="card-price">
            {{ price }} &#8364;
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdvertTypeCard",
        props: {
            period: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import "~@/assets/scss/_variables.scss";

    .card-wrapper {
        width: 148px;
        height: 148px;
        background-color: white;
        border: 1px solid transparent;
        border-radius: $border-radius;
        text-align: center;
        font-size: 20px;
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
    }
</style>