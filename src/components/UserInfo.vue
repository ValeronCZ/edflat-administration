<template>
    <el-form :model="user" label-width="150px" label-position="right" ref="userInfo">
        <el-form-item>
            <el-radio v-model="user.type" label="person" disabled>{{ $t('user.privatePerson') }}</el-radio>
            <el-radio v-model="user.type" label="company" disabled>{{ $t('user.company') }}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('user.name')" prop="name">
            <el-input v-model="user.name" name="name"/>
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email">
            <el-input v-model="user.email" name="email"/>
        </el-form-item>
        <el-form-item v-if="user.account" :label="$t('user.balance')" prop="balance">
            <el-input v-model="user.account.balance" name="balance" disabled/>
        </el-form-item>
        <div v-if="user.type === 'company'">
            <el-form-item :label="$t('user.ico')">
                <el-input v-model="user.ico" name="ico"/>
            </el-form-item>
            <el-form-item :label="$t('user.dic')">
                <el-input v-model="user.dic" name="dic"/>
            </el-form-item>
            <el-form-item :label="$t('user.icVAT')">
                <el-input v-model="user.ic_vat" name="ic_vat"/>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="user.is_vat_payer" name="is_vat_payer">{{ $t('user.vatPayable') }}</el-checkbox>
            </el-form-item>
        </div>
        <div v-for="(address, index) in user.addresses" :key="'i'+index">
            <el-form-item v-if="index === 1">
                <div class="in-form-text">{{ $t('registration.billingAddress') }}</div>
            </el-form-item>
            <el-form-item
                    :label="$t('user.street')"
                    :rules="[
                                { required: true, message: $t('validation.required'), trigger: 'blur' },
                                { max: 255, message: $t('validation.max', {number: 255}), trigger: 'blur' }
                            ]"
                    :prop="'addresses.' + index + '.street'"
            >
                <el-input v-model="user.addresses[index].street" :placeholder="$t('registration.enterStreet')"
                          name="street"/>
            </el-form-item>
            <el-form-item
                    :label="$t('user.city')"
                    :rules="[
                                { required: true, message: $t('validation.required'), trigger: 'blur' },
                                { max: 255, message: $t('validation.max', {number: 255}), trigger: 'blur' }
                            ]"
                    :prop="'addresses.' + index + '.city'"
            >
                <el-input v-model="user.addresses[index].city" :placeholder="$t('registration.enterCity')" name="city"/>
            </el-form-item>
            <el-form-item
                    :label="$t('user.municipality')"
                    :rules="[
                                { required: true, message: $t('validation.required'), trigger: 'blur' },
                                { max: 255, message: $t('validation.max', {number: 255}), trigger: 'blur' }
                            ]"
                    :prop="'addresses.' + index + '.municipality'"
            >
                <el-input v-model="user.addresses[index].municipality"
                          :placeholder="$t('registration.enterMunicipality')" name="municipality"/>
            </el-form-item>
            <el-form-item
                    :label="$t('user.country')"
                    :rules="[
                                { required: true, message: $t('validation.required'), trigger: 'blur' },
                                { max: 255, message: $t('validation.max', {number: 255}), trigger: 'blur' }
                            ]"
                    :prop="'addresses.' + index + '.country'"
            >
                <el-input v-model="user.addresses[index].country" :placeholder="$t('registration.country')"
                          name="country"/>
            </el-form-item>
            <el-form-item
                    :label="$t('user.zip')"
                    :rules="[
                                { required: true, message: $t('validation.required'), trigger: 'blur' },
                                { type: 'number', message: $t('validation.number'), trigger: ['blur', 'change'] },
                                { validator: validateNumber(7), trigger: ['blur', 'change'] }
                            ]"
                    :prop="'addresses.' + index + '.zip'"
            >
                <el-input v-model.number="user.addresses[index].zip" :placeholder="$t('registration.enterZip')"
                          name="zip"/>
            </el-form-item>
        </div>
        <el-form-item
                v-for="(phone, index) in user.phones"
                :key="index"
                :label="$t('user.phone')+(index?` #${index+1}`:'')"
                :rules="[
                        { required: true, message: $t('validation.required'), trigger: 'blur' },
                        { max: 255, message: $t('validation.max', {number: 255}), trigger: 'blur' }
                    ]"
                :prop="'phones.' + index + '.number'"
        >
            <el-input
                    v-model="user.phones[index].number"
                    :placeholder="$t('user.enterPhone')"
                    :name="'phones[' + index + ']'"
            >
                <i
                        v-if="index > 0"
                        slot="suffix"
                        class="el-input__icon el-icon-close"
                        @click="user.phones.splice(index, 1)"
                ></i>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button id="phone-button" icon="el-icon-plus" size="medium" round @click="user.phones.push('')">{{ $t('user.addPhoneNumber')
                }}
            </el-button>
        </el-form-item>
        <slot name="submit"></slot>
    </el-form>
</template>

<script>
    import {numberValidator} from "../utils/ValidatorUtils";

    export default {
        name: "UserInfo",
        props: {
            user: {
                type: Object,
                required: true
            },
            validateForm: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            validateForm() {
                if(this.validateForm) {
                    this.$refs.userInfo.validate((valid) => {
                        this.$emit("validate", valid);
                    });
                }
            }
        },
        methods: {
            validateNumber(value) {
                return numberValidator(value);
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    form {
        .in-form-text {
            font-weight: 500;
            margin-right: 1rem;
        }

        .el-button {
            display: block;
            margin: 0;
            float: right;
        }
    }
</style>
