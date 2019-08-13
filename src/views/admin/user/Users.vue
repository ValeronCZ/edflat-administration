<template>
    <div>
        <el-page-header @back="$router.push('/')" title="" content="Registered users">
        </el-page-header>
        <div class="page-spacer">
            <el-table border :data="users.data">
                <el-table-column prop="id" label="ID" min-width="80">
                    <template slot-scope="scope">
                        <router-link class="user" :to="'/users/' + scope.row.id">
                            {{scope.row.id}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="name" min-width="200"/>
                <el-table-column prop="type" label="type" min-width="120"/>
                <el-table-column prop="email" label="email" min-width="120"/>
                <el-table-column
                        min-width="200"
                        label="Action"
                        :resizable="false">
                    <template slot-scope="scope">
                        <div class="el-button-group">
                            <router-link :to="{name:'user', params:{id:scope.row.id}}"
                                         class="el-button el-button">
                                <i class="el-icon-view"></i>
                                <span>Manage</span>
                            </router-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    layout="sizes, prev, pager, next"
                    :page-sizes="[10, 20, 50, 100]"
                    :current-page="pagination.page"
                    :page-size="pagination.per_page"
                    :total="users.total"
                    @size-change="onPageSizeChange"
                    @current-change="onCurrentPageChange"
                    @prev-click="onCurrentPageChange"
                    @next-click="onCurrentPageChange"
            />
        </div>
    </div>
</template>

<script>
    import UserService from "@/services/UserService";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";

    export default {
        name: "AdminPage",
        data() {
            return {
                users: {},
                pagination: {}
            }
        },
        created() {
            this.fetchUsers();
        },
        methods: {
            async fetchUsers() {
                try {
                    this.users = await UserService.getUsers();
                    this.pagination.page = this.users.current_page;
                    this.pagination.per_page = this.users.per_page;
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchUsersPaginated() {
                try {
                    this.users = await UserService.getUsersPaginated(this.pagination);
                    this.pagination.page = this.users.current_page;
                    this.pagination.per_page = parseInt(this.users.per_page);
                } catch {
                    errorConnectionMessageCall();
                }
            },
            onCurrentPageChange(newCurrentPage) {
                if (this.pagination.page !== newCurrentPage) {
                    this.pagination.page = newCurrentPage;
                    this.fetchUsersPaginated();
                }
            },
            onPageSizeChange(newPageSize) {
                this.pagination.per_page = newPageSize;
                this.fetchUsersPaginated();
            }
        }
    };
</script>