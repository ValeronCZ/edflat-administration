<template>
    <div>
        <el-page-header @back="$router.push({name:'service-prices'})" title="" content="Service price">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                        <el-form-item label="Service days count" prop="days">
                            <el-input-number v-model="form.days"></el-input-number>
                        </el-form-item>
                        <el-form-item label="Service price" prop="price">
                            <el-input-number v-model="form.price"></el-input-number>
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
    import {ServicePriceResource} from '@/services/PriceService';

    export default {
        name: 'service-price',
        data() {
            return {
                id: this.$route.params.id,
                form: {
                    days: 1,
                    price: 0
                },
                rules: {
                    days: [
                        {required: true, message: 'Please input days count', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: 'Please input price', trigger: 'blur'}
                    ]
                },
                loading: false,
                errors: []
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
                    let response = await ServicePriceResource.get({id: this.id});
                    if (response.data) {
                        let source = response.data;
                        this.form.days = source.days;
                        this.form.price = source.price;
                    }
                    this.loading = false;
                } catch (e) {
                    this.errors.push(e);
                }
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        let form = this.form;
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
                    await ServicePriceResource.save(form);
                    this.loading = false;
                    this.$router.push({name: 'service-prices'});
                    this.$notify({
                        title: 'Success',
                        message: 'Service price created',
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
                    await ServicePriceResource.update({id: this.id}, form);
                    this.loading = false;
                    this.$notify({
                        title: 'Success',
                        message: 'Service price updated',
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
