<template>
    <div class="advert-type-block">
        <!--<div v-if="blockTitle" class="advert-block-title">{{ $t('adverts.showFrom') }}</div>
        <el-date-picker
                :value="showFrom"
                type="date"
                :placeholder="$t('adverts.pickDay')"
                format="yyyy.MM.dd"
                :picker-options="{firstDayOfWeek: 1, disabledDate: pastDates}"
                @input="$emit('update:showFrom', $event)"
        />-->
        <div class="public-advert-wrapper">
            <div class="adverts-type-container" v-if="options">
                <advert-type-select :value="days" :advert-options="options" @input="$emit('update:days', $event)"/>
                <div class="public-buttons-wrapper">
                    <el-checkbox :value="autoProlong" @change="$emit('update:autoProlong', $event)">{{
                        $t("adverts.autoProlong") }}
                    </el-checkbox>
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AdvertTypeSelect from "./AdvertTypeSelect";
    import SystemService from "../services/SystemService";

    export default {
        name: "AdvertTypeBlock",
        components: {AdvertTypeSelect},
        props: {
            days: {
                type: Number,
                required: true
            },
            autoProlong: {
                type: Boolean,
                required: true
            },
            /*showFrom: {
                type: [Date, String],
                required: true
            },
            blockTitle: {
                type: Boolean
            }*/
        },
        data() {
            return {
                options: null,
                loading: false,
            }
        },
        created() {
            this.fetch();
        },
        methods: {
            async fetch() {
                try {
                    this.options = await SystemService.servicePrices();
                } catch {
                    this.errors.push(e);
                }
            },
            pastDates(date) {
                let currentDate = new Date();
                // Set time to midnight
                currentDate.setHours(0, 0, 0, 0);
                return date < currentDate;
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    @import "~@/assets/scss/_variables.scss";

    .el-form-item {
        &.is-error {
            .advert-type-block {
                border: 1px solid $error-color;
            }
        }
    }

    .advert-type-block {
        background-color: $grey-primary;
        padding: $spacer 0.5*$spacer;
        border: 1px solid transparent;
        border-radius: $border-radius;

        .advert-block-title {
            display: table;
            margin: 0 auto;
        }

        .el-date-editor {
            &.el-input {
                display: block;
                margin: 0 auto;
            }
        }

        .public-advert-wrapper {
            padding-top: $spacer;

            .adverts-type-container {
                max-width: 666px;
                margin: 0 auto;

                .public-buttons-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;

                    .el-checkbox {
                        margin-left: 0.5*$spacer;
                    }

                    .el-button {
                        margin-right: 0.5*$spacer;
                    }
                }
            }
        }
    }
</style>