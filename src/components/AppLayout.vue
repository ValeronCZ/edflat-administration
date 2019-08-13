<template>
    <div class="admin-wrapper">
        <app-header @open-sidebar="$refs.sidebar.open()"/>
        <div v-if="userInfoLoaded" class="admin-body">
            <sidebar
                    ref="sidebar"
                    :items="isAdmin ? adminMenu : userMenu"
                    :type="isAdmin ? 'admin' : 'user'"
                    :title="isAdmin ? 'admin menu' : $t('menu.header')"
            />
            <div class="content-container">
                <div class="container-fluid">
                    <slot></slot>
                </div>
                <app-footer/>
            </div>
        </div>
    </div>
</template>

<script>
    import AppFooter from "../components/AppFooter";
    import AppHeader from "../components/AppHeader";
    import Sidebar from '../components/Sidebar';
    import cssBreakpointsMixin from "../mixins/cssBreakpointsMixin";
    import {adminMenu, userMenu} from "../menu";

    export default {
        name: "AppLayout",
        mixins: [cssBreakpointsMixin],
        components: {
            AppFooter,
            AppHeader,
            Sidebar
        },
        data() {
            return {
                activeIndex: "1",
                adminMenu: adminMenu,
                userMenu: userMenu
            }
        },
        computed: {
            isAdmin() {
                return this.$store.getters["isAdmin"];
            },
            userInfoLoaded() {
                return this.$store.getters["userInfoLoaded"];
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    @import "../assets/scss/index.scss";

    .content-container {
        padding-left: $sidebar-width;
        padding-top: $spacer;
        margin-top: $navbar-space;
        display: flex;
        flex-direction: column;
        height: 100%;
        @media (max-width: $sidebar-breakpoint) {
            padding-left: 0;
        }
        @media (max-width: $small-mobile) {
           margin-top: 0;
        }
    }

    .container-fluid {
        flex: 1;
    }

    .admin-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;

        .admin-header {
            width: 100%;
            top: 0;
            z-index: 97;
            @media (min-width: $small-mobile) {
                position: fixed;
            }

            .el-menu--horizontal {
                .el-menu-item {
                    &.right-side-item {
                        float: right;
                    }
                }

                .el-submenu {
                    &.right-side-item {
                        float: right;
                    }
                }
            }
        }

        .page-spacer {
            padding-top: 2rem;
            padding-bottom: 4rem;
        }

        .admin-body {
            height: 100%;

            .el-menu {
                border: 1px solid #e6e6e6;
                border-radius: $border-radius;
                margin-bottom: $spacer;

                .menu-header {
                    background-color: $primary-color;
                    border-radius: $border-radius $border-radius 0 0;
                    color: $white;
                    cursor: default;
                }
            }
        }

        .admin-footer {
            width: 100%;
        }

        .add-item-button-wrapper {
            margin-bottom: 15px;
            text-align: center;

            .add-item-button {
                font-size: 16px;
            }
        }
    }

    .no-border-card {
        border: none;
    }
</style>