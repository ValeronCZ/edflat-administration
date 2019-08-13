<template>
    <div>
        <ol class="breadcrumb">
            <li><a href="/admin">Admin</a></li>
        </ol>
        <div class="col-md-12">
            <h3>Statistics</h3>
            <el-table
                    :data="sources"
                    border
                    style="width: 100%"
                    v-loading="loading"
                    element-loading-text="Načitavam...">
                <el-table-column
                        label="Source"
                        min-width="180"
                        :resizable="false">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="100"
                        label="Ads count"
                        :resizable="false">
                    <template slot-scope="scope">
                        <span>{{scope.row.count}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="100"
                        label="Last update"
                        :resizable="false">
                    <template slot-scope="scope">
                        <span>{{scope.row.last_update}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        ame: 'parser-statistics',
        data() {
            return {
                loading: false,
                sources: [],
                errors: [],
            }
        },
        mounted() {
            this.fetch();
        },
        methods: {
            fetch() {
                this.loading = true;
                axios.get(`/api/admin/statistics`)
                    .then(response => {
                        if (response.data.statistics) {
                            this.sources = response.data.statistics;
                        }
                        this.loading = false;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        components: {}
    }
</script>
