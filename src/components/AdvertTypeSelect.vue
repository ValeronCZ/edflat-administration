<template>
    <div class="cards-wrapper-row">
        <advert-type-card
            v-for="option in advertOptions"
            :key="option.id"
            :class="{'active': value === option.days}"
            :period="option.days"
            :price="option.price"
            @click.native="$emit('input', option.days)"
        />
    </div>
</template>

<script>
    import AdvertTypeCard from "@/components/AdvertTypeCard";

    export default {
        name: "AdvertTypeSelect",
        components: {AdvertTypeCard},
        props: {
            value: {
                type: Number,
                required: true
            },
            advertOptions: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    @import "~@/assets/scss/_variables.scss";

    .cards-wrapper-row {
        display: flex;
        flex-wrap: wrap;

        .card-wrapper {
            margin: 0 0.5*$spacer $spacer 0.5*$spacer;

            &.active {
                border-color: $success-color;
            }
        }
    }
</style>