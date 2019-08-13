<template>
    <div>
        <el-page-header @back="$router.push({name:'sources'})" title="" content="Parser source">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                        <el-form-item label="Source name" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Source url" prop="url">
                            <el-input v-model="form.url"></el-input>
                        </el-form-item>
                        <el-form-item label="Source parse" prop="parse">
                            <el-switch
                                    v-model="form.parse"
                                    active-text=""
                                    inactive-text="">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="Source text show" prop="source_expiration">
                            <el-date-picker
                                    style="width:100%; margin-top: 12px;"
                                    v-model="form.source_expiration"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="To"
                                    start-placeholder="Start date"
                                    end-placeholder="End date"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Source photo show" prop="photo_expiration">
                            <el-date-picker
                                    style="width:100%; margin-top: 12px;"
                                    v-model="form.photo_expiration"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="To"
                                    start-placeholder="Start date"
                                    end-placeholder="End date"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="Source items show" prop="item_expiration">
                            <el-date-picker
                                    style="width:100%; margin-top: 12px;"
                                    v-model="form.item_expiration"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="To"
                                    start-placeholder="Start date"
                                    end-placeholder="End date"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button :loading="loading" icon="el-icon-check" @click="save" type="success">Save
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {ParserResource} from '@/services/ParserService';
    import {formatDate} from "@/utils/dateUtils";

    export default {
        name: 'parser-source',
        data() {
            return {
                id: this.$route.params.id,
                form: {
                    name: null,
                    url: null,
                    parse: false,
                    photo_expiration: null,
                    item_expiration: null,
                    source_expiration: null
                },
                rules: {
                    name: [
                        {required: true, message: 'Please input source name', trigger: 'blur'},
                        {min: 1, max: 255, message: 'Length should be 3 to 5', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: 'Please select source url', trigger: 'blur'}
                    ],
                    photo_expiration: [
                        {type: 'array', required: false, message: 'Please pick a date', trigger: 'change'}
                    ],
                    item_expiration: [
                        {type: 'array', required: false, message: 'Please pick a date', trigger: 'change'}
                    ],
                    source_expiration: [
                        {type: 'array', required: false, message: 'Please pick a date', trigger: 'change'}
                    ]
                },
                loading: false,
                errors: [],
                pickerOptions: {
                    firstDayOfWeek: 1,
                    shortcuts: [
                        {
                            text: 'Nasledujúci týždeň',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: 'Nasledujúci mesiac',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: 'Nasledujúci rok',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
                                picker.$emit('pick', [start, end]);
                            }
                        }]
                }
            }
        },
        mounted() {
            if (!this.isNew) {
                this.fetch();
            }
        },
        computed: {
            isNew() {
                return this.id === '_';
            }
        },
        methods: {
            async fetch() {
                this.loading = true;
                try {
                    let response = await ParserResource.get({id: this.id});
                    if (response.data) {
                        let source = response.data;
                        this.form.name = source.name;
                        this.form.url = source.url;
                        this.form.parse = source.parse === 1;
                        this.mutateDatesInverse(this.form, source, 'item', 'show');
                        this.mutateDatesInverse(this.form, source, 'photo', 'photo');
                        this.mutateDatesInverse(this.form, source, 'source', 'source');
                    }
                    this.loading = false;
                } catch (e) {
                    this.errors.push(e);
                }
            },
            mutateDatesInverse(obj, remoteObj, propLocal, propRemote) {
                if (remoteObj[`${propRemote}_from`] && remoteObj[`${propRemote}_to`]) {
                    obj[`${propLocal}_expiration`] = [remoteObj[`${propRemote}_from`], remoteObj[`${propRemote}_to`]];
                } else {
                    obj[`${propLocal}_expiration`] = null;
                }
            },
            mutateDates(obj, propLocal, propRemote) {
                if (obj[`${propLocal}_expiration`]) {
                    obj[`${propRemote}_from`] = formatDate(obj[`${propLocal}_expiration`][0]);
                    obj[`${propRemote}_to`] = formatDate(obj[`${propLocal}_expiration`][1]);
                } else {
                    obj[`${propRemote}_from`] = null;
                    obj[`${propRemote}_to`] = null;
                }
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let form = this.form;
                        this.mutateDates(form, 'item', 'show');
                        this.mutateDates(form, 'photo', 'photo');
                        this.mutateDates(form, 'source', 'source');
                        if (this.isNew) {
                            this.store(form);
                        } else {
                            this.update(form);
                        }
                    } else {
                        return false;
                    }
                });
            },
            async store(form) {
                try {
                    await ParserResource.save(form);
                    this.loading = false;
                    this.$router.push({name: 'sources'});
                    this.$notify({
                        title: 'Success',
                        message: 'Source created',
                        type: 'success'
                    });
                } catch (e) {
                    this.$notify({
                        title: 'Error',
                        message: 'Error on server',
                        type: 'error'
                    });
                    this.errors.push(e);
                }
            },
            async update(form) {
                try {
                    await ParserResource.update({id: this.id}, form);
                    this.loading = false;
                    this.$notify({
                        title: 'Success',
                        message: 'Source updated',
                        type: 'success'
                    });
                    this.fetch();
                } catch (e) {
                    this.$notify({
                        title: 'Error',
                        message: 'Error on server',
                        type: 'error'
                    });
                    this.errors.push(e);
                }
            }
        },
        components: {}
    }
</script>
