<template>
    <div>
        <el-page-header @back="$router.push({name:'users'})" title="" content="User profile">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <user-info
                            :user="user"
                            :validate-form="validate"
                            @validate="updateUserInfo"
                    >
                        <el-form-item size="large" slot="submit">
                            <el-button
                                    type="success"
                                    native-type="submit"
                                    icon="el-icon-check"
                                    :loading="loading"
                                    @click="validate = true"
                            >
                                {{ $t('common.save') }}
                            </el-button>
                        </el-form-item>
                    </user-info>
                </el-col>
            </el-row>
            <adverts-list
                    :adverts.sync="adverts.data"
                    :total-adverts="totalAdverts"
                    :pagination="pagination"
                    :initial-pagination-call="initialPaginationCall"
                    :fetch-filtered-adverts="fetchUsersFilteredRealEstate"
                    :userId="userId"
            />
        </div>
    </div>
</template>

<script>
    import AdvertsList from "@/components/AdvertsList";
    import UserInfo from "@/components/UserInfo";
    import RealEstateService from "@/services/RealEstateService";
    import UserService from "@/services/UserService";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";

    export default {
        name: "UserPage",
        components: {AdvertsList, UserInfo},
        data() {
            return {
                adverts: {
                    data: []
                },
                pagination: {},
                initialPaginationCall: true,
                totalAdverts: 100,
                userId: '',
                user: {},
                validate: false,
                loading: false
            }
        },
        created() {
            this.fetchUsersRealEstate();
            this.fetchUserInfo();
        },
        methods: {
            async fetchUsersRealEstate() {
                try {
                    this.userId = this.$route.params.id;
                    this.adverts = await RealEstateService.getUsersRealEstate(this.userId);
                    this.adverts.data.forEach(estate => {
                        // Convert from cents to euros
                        return estate.price ? estate.price = estate.price / 100 : estate.price;
                    });
                    this.pagination.current_page = this.adverts.current_page;
                    this.pagination.per_page = this.adverts.per_page;
                    this.totalAdverts = this.adverts.total;
                    this.initialPaginationCall = false;
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchUsersFilteredRealEstate(filter) {
                return await RealEstateService.getUsersFilteredRealEstate(this.userId, filter);
            },
            async fetchUserInfo() {
                try {
                    this.user = await UserService.getUser(this.userId);
                    if (this.user.account && this.user.account.balance) {
                        // Convert from cents to euros
                        this.user.account.balance = this.user.account.balance / 100;
                    }
                    this.user.is_vat_payer = this.user.is_vat_payer === 1;
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async updateUserInfo(valid) {
                if (valid) {
                    this.loading = true;
                    try {
                        await UserService.updateUser(this.user);
                        this.loading = false;
                        this.$notify({
                            title: this.$t('common.success'),
                            message: this.$t('common.changesSaved'),
                            type: 'success'
                        });
                    } catch {
                        errorConnectionMessageCall();
                    }
                }
                this.validate = false;
            }
        }
    };
</script>
