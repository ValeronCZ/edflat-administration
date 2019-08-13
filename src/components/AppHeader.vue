<template>
    <div class="admin-header">
        <el-card class="no-border-card" :body-style="{padding:'0px'}">
            <el-menu mode="horizontal">
                <el-menu-item class="sidebar-activator" @click="openSidebar()">
                    <div>
                        <el-button type="text" icon="el-icon-s-fold"></el-button>
                    </div>
                </el-menu-item>
                <el-submenu class="right-side-item" index="1">
                    <template slot="title">{{ userEmail }}</template>
                    <router-link
                            :to="{
                                name: 'settings'
                            }"
                    >
                        <el-menu-item index="1-1">{{ $t("header.accountSettings") }}</el-menu-item>
                    </router-link>
                    <el-menu-item index="1-2" native-type="submit" @click="onLogoutClick">{{ $t("common.logOut") }}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item class="right-side-item" index="2" @click="$store.commit('setNextLanguage')">{{
                    getNextLanguage().toUpperCase() }}
                </el-menu-item>
                <el-menu-item class="right-side-item add-item-button-nav" index="3">
                    <router-link :to="{name:'advert', params:{id:'_'}}"
                                 class="el-button el-button--success is-round el-button--medium">
                        <i class="el-icon-plus"></i> {{$t('adverts.addAdvert') }}
                    </router-link>
                </el-menu-item>
            </el-menu>
        </el-card>
        <el-form
                v-show="false"
                ref="logoutForm"
                method="POST"
                action="/logout"
        >
            <input :value="csrf" name="_token"/>
        </el-form>
    </div>
</template>

<script>
    import cssBreakpointsMixin from "@/mixins/cssBreakpointsMixin";
    import {nextLanguage} from "@/utils/localesUtils";
    import {adminMenu, userMenu} from "../menu";
    import Vue from "vue";

    export default {
        name: "AppHeader",
        mixins: [cssBreakpointsMixin],
        data() {
            return {
                adminMenu: adminMenu,
                userMenu: userMenu,
                csrf: ''
            }
        },
        computed: {
            currentLanguage() {
                return this.$store.getters["language"];
            },
            isAdmin() {
                return this.$store.getters["isAdmin"];
            },
            userInfoLoaded() {
                return this.$store.getters["userInfoLoaded"];
            },
            userEmail() {
                return this.$store.getters["userEmail"];
            },
            menu() {
                return this.isAdmin ? adminMenu : userMenu;
            }
        },
        created() {
            this.csrf = Vue.http.headers.common["X-CSRF-TOKEN"];
        },
        methods: {
            openSidebar() {
                this.$emit('open-sidebar')
            },
            getNextLanguage() {
                return nextLanguage(this.currentLanguage);
            },
            onLogoutClick() {
                this.$refs.logoutForm.$el.submit();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid transparent;
    }

    .el-menu--horizontal > .el-menu-item.add-item-button-nav {
        i {
            color: #fff;
        }

        a {
            &:hover {
                color: #fff;
            }

            &:visited {
                color: #fff;
            }

            &:active {
                color: #fff;
            }

            color: #fff;
        }
    }
</style>