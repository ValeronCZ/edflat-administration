<template>
    <div>
        <el-page-header @back="$router.push('/')" title="" :content="$t('menu.dashboard')">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <el-card>
                        <h3>{{$t('navigation.realEstates')}}</h3>

                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'home'
    }
</script>
