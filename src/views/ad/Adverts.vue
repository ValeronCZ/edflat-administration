<template>
    <div class="my-adverts-wrapper">
        <el-page-header @back="$router.push('/')" title="" :content="$t('navigation.realEstates')">
        </el-page-header>
        <div class="page-spacer">
            <adverts-list
                    :adverts.sync="realEstates.data"
                    :fetch-adverts="fetchRealEstate"
                    :fetch-filtered-adverts="fetchFilteredRealEstate"
                    :total-adverts="totalAdverts"
                    :pagination="pagination"
                    :initial-pagination-call="initialPaginationCall"
                    show-buttons
                    @prolong="onProlong"
            />
            <el-dialog
                    :title="$t('adverts.prolongAdvert')"
                    :visible.sync="showProlong"
                    width="50%"
            >
                <advert-type-block
                        key="advert-type"
                        :days.sync="prolong.days"
                        :auto-prolong.sync="prolong.auto_prolong"
                        block-title
                />
                <span slot="footer" class="dialog-footer">
                    <div style="margin-bottom: 20px;">
                         <el-alert
                                 v-if="insufficientFunds"
                                 :closable="false"
                                 type="error"
                                 show-icon>
                             <router-link style="color: inherit" slot="title" :to="{name:'account'}">Insufficient Funds - Please top up your account</router-link>
                        </el-alert>
                    </div>
                <el-button @click="showProlong = false">{{ $t('adverts.cancel') }}</el-button>
                <el-button type="primary" @click="prolongRequest">
                    {{ $t('adverts.prolong') }}
                </el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import AdvertsList from "@/components/AdvertsList";
    import AdvertTypeBlock from "@/components/AdvertTypeBlock";
    import RealEstateService from "@/services/RealEstateService";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";

    const baseProlong = {
        id: '',
        days: 7,
        auto_prolong: true
    };

    export default {
        name: "MyAdverts",
        components: {AdvertsList, AdvertTypeBlock},
        data() {
            return {
                realEstates: {
                    data: []
                },
                pagination: {},
                initialPaginationCall: true,
                totalAdverts: 100,
                prolong: baseProlong,
                showProlong: false,
                insufficientFunds: false
            };
        },
        created() {
            this.fetchRealEstate();
        },
        methods: {
            async fetchRealEstate() {
                try {
                    this.realEstates = await RealEstateService.getRealEstate();
                    // Convert from cents to euros
                    this.realEstates.data.forEach(estate => {
                        return estate.price ? estate.price = estate.price / 100 : estate.price;
                    });
                    this.pagination.current_page = this.realEstates.current_page;
                    this.pagination.per_page = this.realEstates.per_page;
                    this.totalAdverts = this.realEstates.total;
                    this.initialPaginationCall = false;
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchFilteredRealEstate(filter) {
                return await RealEstateService.getFilteredRealEstate(filter);
            },
            async prolongRequest() {
                try {
                    await RealEstateService.prolongRealEstate(this.prolong);
                    // Refresh page
                    this.$router.go();
                } catch(e) {
                    this.insufficientFunds = true;
                    this.$notify({
                        title: 'Error',
                        message: 'Insufficient funds',
                        type: 'error'
                    });
                }
            },
            onProlong(emit) {
                this.showProlong = emit.showProlong;
                this.prolong.id = emit.advertId;
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    @import "~@/assets/scss/_variables.scss";
</style>