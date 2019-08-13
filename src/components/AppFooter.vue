<template>
    <div class="admin-footer">
        <div class="footer-wrapper">
            <div class="container footer-container">
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="9"
                            :lg="8" :xl="8">
                        <div class="no-decor">
                            <h3>{{$t('footer.about')}}</h3>
                            <div><a href="/legal-notes">{{$t('footer.conditions')}}</a></div>
                            <div><a href="#">{{$t('footer.pricelist')}}</a></div>
                            <div><a href="#">{{$t('footer.support')}}</a></div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="9"
                            :lg="8" :xl="8">
                        <div class="no-decor">
                            <h3>{{$t('footer.serviceCenter')}}</h3>
                            <div><a href="/legal-service">{{$t('footer.legalService')}}</a></div>
                            <div><a href="#">{{$t('footer.financialService')}}</a></div>
                            <div><a href="#">{{$t('footer.loanService')}}</a></div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6"
                            :lg="8" :xl="8">
                        <div class="no-decor">
                            <div style="    width: 100%;
    text-align: right;
    margin-top: 118px;
    color: rgb(255, 255, 255);
    font-weight: 600;">
                                EdFlat&copy; {{year}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .footer-wrapper {
        background: #00639a;
        padding: 20px 60px;

        .footer-container {
            padding-bottom: 70px;
            padding-top: 40px;

            .no-decor {
                h3 {
                    color: #fff;
                    margin-top: 30px;
                }

                a {
                    font-size: 14px;
                    margin-top: 10px;
                    display: block;
                }

                a:link {
                    color: #fff;
                }

                a:visited {
                    color: #fff;
                }

                a:hover {
                    color: #fff;
                }

                a:active {
                    color: #fff;
                }
            }
        }
    }
</style>
<script>
    export default {
        name: "AppFooter",
        data: function () {
            return {
                support: {
                    email: null,
                    message: null,
                    type: 1
                },
                year: new Date().getFullYear(),
                supportVisible: false,
                mailSending: false,
                supportErrors: null
            }
        },
        methods: {}
    }
</script>