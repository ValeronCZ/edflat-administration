<template>
    <el-form label-position="top" class="adverts-filter">
        <el-row :gutter="10" type="flex">
            <el-col :xs="24" :sm="8" :md="8" :lg="5">
                <el-form-item :label="$t('adverts.category')">
                    <el-select v-model="filter.categories" :placeholder="$t('adverts.selectCategory')" multiple>
                        <el-option
                                v-for="item in categories"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="5">
                <el-form-item :label="$t('adverts.kind')">
                    <el-select v-model="filter.kinds" :placeholder="$t('adverts.selectKind')" multiple>
                        <el-option
                                v-for="item in kinds"
                                :key="item.id"
                                :label="item.estate_kind"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="5">
                <el-form-item :label="$t('adverts.type')">
                    <el-select v-model="filter.types" :placeholder="$t('adverts.selectType')" multiple>
                        <el-option
                                v-for="item in types"
                                :key="item.id"
                                :label="item.estate_type"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="5">
                <el-form-item :label="$t('adverts.state')">
                    <el-select
                        v-model="filter.active"
                        clearable
                        :placeholder="$t('adverts.selectState')"
                    >
                        <el-option
                                v-for="item in states"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="4">
                <el-button type="primary" plain @click="$emit('clear')">{{ $t('adverts.clearFilter') }}</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
    export default {
        name: "AdvertsFilter",
        props: {
            filter: {
                type: Object,
                required: true
            },
            categories: {
                type: Array,
                required: true
            },
            kinds: {
                type: Array,
                required: true
            },
            types: {
                type: Array,
                required: true
            },
            states: {
                type: Array,
                required: true
            }
        }
    };
</script>