<template>
    <div>
        <el-page-header @back="$router.push('/')" title="" :content="$t('navigation.settings')">
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
                                    @click.prevent="validate = true"
                                    :loading="loading"
                                    icon="el-icon-check"
                            >
                                {{ $t('common.save') }}
                            </el-button>
                        </el-form-item>
                    </user-info>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    import UserService from "@/services/UserService";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";
    import {deepCopy} from "@/utils/ObjectUtils";

    export default {
        name: "UserProfile",
        components: {UserInfo},
        data() {
            return {
                user: {},
                loading: false,
                validate: false
            }
        },
        computed: {
            userStore() {
                return this.$store.getters["user"];
            },
            userInfoLoaded() {
                return this.$store.getters["userInfoLoaded"];
            }
        },
        watch: {
            userInfoLoaded: {
                handler() {
                    if (this.userInfoLoaded) {
                        this.user = deepCopy(this.userStore);
                    }
                },
                immediate: true
            }
        },
        methods: {
            async updateUserInfo(valid) {
                if(valid) {
                    this.loading = true;
                    try {
                        await UserService.updateClientUser(this.user);
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
