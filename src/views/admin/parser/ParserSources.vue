<template>
    <div>
        <el-page-header @back="$router.push('/')" title="" content="Parser sources">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="add-item-button-wrapper">
                        <router-link :to="{name:'source', params:{id:'_'}}" class="el-button el-button--success is-round add-item-button">
                            <i class="el-icon-plus"></i> Add source
                        </router-link>
                    </div>
                </el-col>
            </el-row>
            <el-table
                    v-loading="loading"
                    :data="sources"
                    border
                    style="width: 100%">
                <el-table-column
                        label="ID"
                        min-width="50"
                        :resizable="false">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Name"
                        min-width="160"
                        :resizable="false">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="URL"
                        min-width="200"
                        :resizable="false">
                    <template slot-scope="scope">
                        <code>{{scope.row.url}}</code>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Ads count"
                        min-width="80"
                        :resizable="false">
                    <template slot-scope="scope">
                        {{scope.row.count}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="Last parsed"
                        min-width="120"
                        :resizable="false">
                    <template slot-scope="scope">
                       {{scope.row.last_update}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="400"
                        label="Action"
                        :resizable="false">
                    <template slot-scope="scope">
                        <div class="el-button-group">
                            <router-link :to="{name:'source', params:{id:scope.row.id}}"
                                         class="el-button el-button">
                                <i class="el-icon-view"></i>
                                <span>Manage</span>
                            </router-link>
                            <el-button
                                    icon="el-icon-delete"
                                    type="danger"
                                    @click="remove(scope.row.id)">Delete
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {ParserResource} from '@/services/ParserService';

    export default {
        name: 'parser-sources',
        data: function () {
            return {
                loading: false,
                sources: []
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            async fetch() {
                this.loading = true;
                try {
                    let response = await ParserResource.get();
                    if (response.data) {
                        this.sources = response.data;
                    }
                    this.loading = false;
                } catch (e) {
                    this.errors.push(e);
                }
            },
            async remove(id) {
                this.loading = true;
                try {
                    await ParserResource.delete({id});
                    this.loading = false;
                    this.fetch();
                } catch (e) {
                    this.errors.push(e);
                }
                this.loading = false;
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    code{
        color: #e83e8c;
        padding: 0.5rem;
        background: #F2F2F2;
        word-break: break-word;
    }
</style>
