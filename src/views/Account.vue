<template>
    <div>
        <el-page-header @back="$router.push('/')" title="" :content="$t('navigation.myAccount')">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <el-card class="box-card">
                        <h3>{{$t('account.topUpAccount')}}</h3>
                        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                            <el-form-item :label="$t('account.amount')" prop="amount">
                                <el-input-number v-model="form.amount" :step="1"></el-input-number>
                            </el-form-item>
                            <el-form-item size="large">
                                <el-button :loading="loading" icon="el-icon-check" @click="store" type="success">
                                    {{$t('menu.topUp')}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px;" v-if="history">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <h3>{{$t('account.transactionHistory')}}</h3>
                    <p v-if="history.length===0">{{$t('account.noTransactions')}}</p>
                    <el-timeline>
                        <el-timeline-item
                                size="large"
                                :type="item.transaction_type==='income'?'success':'danger'"
                                :timestamp="item.created_at"
                                placement="top"
                                v-for="item in history"
                                :key="item.id">
                            <el-card>
                                <h3 v-if="item.transaction_type==='income'" class="top-up">
                                    <i class="el-icon-download"></i> {{$t('account.accountToppedUp')}}
                                </h3>
                                <h3 v-else class="charge">
                                    <i class="el-icon-upload2"></i> {{$t('account.accountCharged')}}
                                </h3>
                                <p>{{$t('account.amount')}}: <code>{{item.amount}}€</code></p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    <div style="text-align: center">
                        <el-button plain v-if="hasMore" @click="loadMoreHistory" type="primary">
                            {{$t('common.loadMore')}}
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {AccountResource} from '@/services/AccountService';

    export default {
        name: 'my-account',
        data: function () {
            return {
                loading: false,
                history: [],
                page: 1,
                hasMore: true,
                form: {
                    amount: 1
                },
                rules: {
                    amount: [
                        {required: true, message: 'Please enter an amount', trigger: 'blur'},
                        {min: 1, max: 1000, message: 'Min amount is 1', trigger: 'blur'}
                    ]
                },
            }
        },
        mounted() {
            this.fetch(this.page);
        },
        methods: {
            loadMoreHistory() {
                this.page++;
                this.fetch(this.page);
            },
            async store() {
                try {
                    await AccountResource.save(this.form);
                    this.loading = false;
                    this.fetch()
                } catch (e) {
                    this.$notify({
                        title: 'Error',
                        message: 'Error on server',
                        type: 'error'
                    });
                }
            },
            async fetch(page = 1) {
                this.loading = true;
                try {
                    let response = await AccountResource.history({page: page});
                    this.hasMore = response.data.next_page_url !== null;
                    if (response.data.data) {
                        this.history = this.history.concat(response.data.data);
                    }
                    this.loading = false;
                } catch (e) {
                    this.$notify({
                        title: 'Error',
                        message: 'Error on server',
                        type: 'error'
                    });
                }
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .top-up {
        color: #67c23a;
    }

    .charge {
        color: #e83e8c;
    }

    code {
        color: #e83e8c;
        padding: 0.5rem;
        background: #F2F2F2;
        word-break: break-word;
    }
</style>
