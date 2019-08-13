<template>
    <div class="sidebar-wrapper" :class="{'active':opened}">
        <div class="sidebar">
            <ul>
                <li class="immutable-item">
                    <div>
                        <img src="../assets/img/logo.jpg" width="48px">
                    </div>
                </li>
                <li class="sidebar-user-info" v-if="type==='user'">
                    <div class="user-info-name">
                        <el-avatar :size="60"
                                   src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        <h4 class="menu-account-heading">
                            <span>{{user.name}}</span>
                        </h4>
                    </div>
                    <div class="user-additional-info">
                        <div class="main-info">
                            {{$t('menu.balance')}}:
                            <strong>
                                <span v-if="user&&user.account">{{user.account.balance}}</span>
                                <span v-else>0</span>€
                            </strong>
                        </div>
                        <div>
                            <router-link tag="button"
                                         class="el-button el-button--primary el-button--small is-round"
                                         :to="{name:'account'}">
                                <i class="el-icon-circle-plus-outline"></i> {{$t('menu.topUp')}}
                            </router-link>
                        </div>
                    </div>
                </li>
                <router-link tag="li"
                             v-for="(item, index) in items"
                             :to="{name:item.name}"
                             :key="index">
                    <i :class="item.icon"></i> <span>{{ $t(item.label) }}</span>
                </router-link>
            </ul>
        </div>
        <div class="backdrop" @click="opened=false"></div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../assets/scss/_variables.scss";

    .sidebar-wrapper {

        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: $sidebar-width;
            background: $dark-primary;
            z-index: 99;
            transition: all .4s cubic-bezier(.25, .8, .25, 1);
            transition-property: transform;
            will-change: transform;
            transform: translate3D(-100%, 0, 0);
            @media (min-width: $sidebar-breakpoint) {
                transform: translateZ(0) !important;
                box-shadow: inset -8px 0px 12px 0px rgba(0, 0, 0, 0.12);
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 18px;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    transition: background-color 1s cubic-bezier(.25, .8, .25, 1);
                    &:hover {
                        cursor: pointer;
                        background-color: rgba(0, 63, 106, 0.5);
                    }

                    &.immutable-item {
                        div {
                            background: #fff;
                            padding: 10px;
                            border-radius: 50%;
                            width: 25%;
                            text-align: center;
                            margin: auto;
                            margin-bottom: 15px;
                        }

                        &:hover {
                            cursor: default;
                            background: $dark-primary;
                        }

                        padding: 15px;

                        img {
                            border-radius: 4px;
                        }
                    }

                    &.sidebar-user-info {
                        background: $even-darker-primary;

                        .user-info-name {
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;

                            .el-avatar {
                                margin-right: 10px;
                            }
                        }

                        .user-additional-info {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .main-info {
                                flex: 1;
                                font-size: 14px;
                            }
                        }
                    }

                    i {
                        margin-right: 10px;
                    }
                }
            }
        }

        .backdrop {
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            position: fixed;
            opacity: 0;
            z-index: 98;
            pointer-events: none;
            background-color: rgba(0, 0, 0, .54);
            transition: all .5s cubic-bezier(.35, 0, .25, 1);
            transition-property: opacity;
            will-change: opacity;
        }

        &.active {
            .backdrop {
                opacity: 1;
                pointer-events: auto;
            }

            .sidebar {
                transform: translate3D(0, 0, 0);
                @media (max-width: $sidebar-breakpoint) {
                    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.3);
                }
            }
        }

        @media (min-width: $sidebar-breakpoint) {
            .backdrop {
                opacity: 0 !important;
                pointer-events: none !important;
            }
        }
    }

    .el-menu-vertical-demo {
        @media (max-width: 1200px) {
            width: 64px;
            .menu-balance {
                height: 100%;
                background: transparent;

                .reduced-height {
                    display: none;
                }
            }
            .el-menu-item span, .el-submenu > .el-submenu__title span {
                height: 0;
                width: 0;
                overflow: hidden;
                visibility: hidden;
                display: inline-block;
            }
        }
    }
</style>
<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Sidebar",
        computed: {
            ...mapGetters({
                user: 'user',
            }),
            isCollapse() {

            }
        },
        data() {
            return {
                opened: false
            }
        },
        props: {
            items: {
                type: Array,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'user'
            }
        },
        methods: {
            open() {
                this.opened = true;
            }
        }
    };
</script>