<template>
    <el-menu :default-active="$route.path" :router="true" class="el-menu-vertical-demo">
        <el-menu-item class="menu-header" index="/">
            <span>{{ title.toUpperCase() }}</span>
        </el-menu-item>
        <el-menu-item class="menu-balance" index="/account" v-if="type==='user'">
            <h4 class="menu-account-heading"><i class="el-icon-wallet"></i> <span>{{$t('menu.myAccount')}}</span></h4>
            <div class="reduced-height">
                {{$t('menu.balance')}}:
                <strong>
                    <span v-if="user&&user.account">{{user.account.balance}}</span>
                    <span v-else>0</span>€
                </strong>
            </div>
            <div class="reduced-height">
                <el-button class="icon-fix" type="primary" size="small" round>
                    <i class="el-icon-circle-plus-outline"></i> {{$t('menu.topUp')}}
                </el-button>
            </div>
        </el-menu-item>
        <el-menu-item v-for="(item, index) in items"
                      :key="index" :index="item.path" :route="{name:item.name}">
            <i :class="item.icon"></i> <span>{{ $t(item.label) }}</span>
        </el-menu-item>
    </el-menu>
</template>
<style lang="scss" scoped>
    .el-menu-item.menu-balance {
        height: 160px;
        background: #efefef;

        .reduced-height {
            line-height: 40px;
        }

        &.is-active {
            color: inherit;
        }

        .icon-fix {
            i {
                color: #fff;
            }
        }

        .menu-account-heading {
            margin-bottom: 15px;
            padding-top: 15px;
            margin-top: 0;
            line-height: 30px;
        }
    }
    .el-menu-vertical-demo{
        @media (max-width:1200px) {
            width: 64px;
            .menu-balance{
                height: 100%;
                background:transparent;
                .reduced-height{
                    display: none;
                }
            }
            .el-menu-item span, .el-submenu>.el-submenu__title span{
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
        name: "AppMenu",
        computed: {
            ...mapGetters({
                user: 'user',
            }),
            isCollapse(){

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
        }
    };
</script>