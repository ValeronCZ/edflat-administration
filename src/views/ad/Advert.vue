<template>
    <div class="create-advert">
        <el-page-header @back="$router.push({name:'adverts'})" title="" :content="$t('navigation.realEstate')">
        </el-page-header>
        <div class="page-spacer">
            <el-row :gutter="20">
                <el-col :xs="{span:24, offset:0}" :sm="{span:20, offset:1}" :md="{span:19, offset:1}"
                        :lg="{span:16, offset:2}" :xl="{span:12, offset:4}">
                    <el-form :model="advert" :rules="rules" label-position="right" label-width="150px" ref="newAdvert">
                        <el-form-item :label="$t('adverts.category')" prop="category_id">
                            <el-select v-model="advert.category_id" placeholder="Select category">
                                <el-option
                                        v-for="item in categories"
                                        :key="item.id"
                                        :label="item.type"
                                        :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.kind')" prop="kind_id">
                            <el-select v-model="advert.kind_id" placeholder="Select kind">
                                <el-option
                                        v-for="item in kinds"
                                        :key="item.id"
                                        :label="item.estate_kind"
                                        :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.type')" prop="type_id">
                            <el-select v-model="advert.type_id" placeholder="Select type">
                                <el-option
                                        v-for="item in computedTypes"
                                        :key="item.id"
                                        :label="item.estate_type"
                                        :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.title')" prop="title">
                            <el-input v-model="advert.title" name="title"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.price')" prop="price">
                            <el-input v-model="advert.price" name="price">
                                <template slot="prepend">
                                    &#8364;
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.shortDescription')" prop="short_description">
                            <el-input v-model="advert.short_description" name="short_description"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.square')" prop="square">
                            <el-input v-model.number="advert.square" name="square">
                                <template slot="prepend">
                                    m<sup>2</sup>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.country')" prop="country">
                            <el-select v-model="advert.country" placeholder="Select country">
                                <el-option
                                        v-for="item in countries"
                                        :key="item.id"
                                        :label="item.country"
                                        :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.region')" prop="region">
                            <el-input v-model="advert.region" name="region"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.municipality')" prop="municipality">
                            <el-input v-model="advert.municipality" name="municipality"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.city')" prop="city">
                            <el-input v-model="advert.city" name="city"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.district')" prop="district">
                            <el-input v-model="advert.district" name="district"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.street')" prop="street">
                            <el-input v-model="advert.street" name="street"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.house')" prop="house">
                            <el-input v-model="advert.house" name="house"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.zip')" prop="zip">
                            <el-input v-model="advert.zip" name="zip"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.flat')" prop="flat">
                            <el-input v-model="advert.flat" name="flat"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.description')" prop="description">
                            <el-input v-model="advert.description" name="description" type="textarea"/>
                        </el-form-item>
                        <el-form-item :label="$t('adverts.photos')">
                            <el-upload
                                    action="#"
                                    name="image"
                                    list-type="picture-card"
                                    :http-request="onUpload"
                                    :file-list="files"
                            >
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}" class="actions-wrapper">
                                    <el-image
                                            class="el-upload-list__item-thumbnail"
                                            :src="file.url"
                                            fit="cover"></el-image>
                                    <span class="el-upload-list__item-actions">
                            <div
                                    v-if="file.image !== advert.main_photo"
                                    class="set-cover"
                                    @click="onImageClick(file)"
                            >
                                {{ $t("adverts.setCover") }}
                            </div>
                            <div
                                    class="set-cover"
                                    @click="onFileRemove(file)"
                            >
                              <i class="el-icon-delete"></i>
                            </div>
                        </span>
                                    <div v-if="file.image === advert.main_photo" class="cover-photo-text">
                                        <div>{{ $t("adverts.coverPhoto") }}</div>
                                    </div>
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item v-if="isNew" :label="$t('adverts.showFrom')" prop="show_from">
                            <advert-type-block
                                    :days.sync="advert.days"
                                    :auto-prolong.sync="advert.auto_prolong"
                            >
                                <el-button
                                        type="primary"
                                        native-type="submit"
                                        @click.prevent="addUpdateAdvert"
                                >
                                    {{ !isNew ? $t('adverts.updateAdvert') : $t('adverts.publish') }}
                                </el-button>
                            </advert-type-block>
                        </el-form-item>
                        <el-form-item v-if="!isNew">
                            <el-checkbox v-model="advert.auto_prolong">{{ $t("adverts.autoProlong") }}</el-checkbox>
                        </el-form-item>
                        <el-form-item size="large">
                            <el-button
                                    v-if="!isNew"
                                    type="success"
                                    icon="el-icon-check"
                                    native-type="submit"
                                    @click.prevent="addUpdateAdvert"
                            >
                                {{ $t('adverts.updateAdvert') }}
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import AdvertTypeBlock from "@/components/AdvertTypeBlock";
    import UploadService from "@/services/UploadService";
    import RealEstateService from "@/services/RealEstateService";
    import SystemService from "@/services/SystemService";
    import {deepCopy} from "@/utils/ObjectUtils";
    import {preciseRound} from "@/utils/mathUtils";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";
    import {Message, MessageBox} from "element-ui";

    const baseAdvert = {
        category_id: '',
        type_id: '',
        kind_id: '',
        title: '',
        price: null,
        short_description: '',
        square: null,
        region: '',
        municipality: '',
        country: 'SK',
        city: '',
        district: '',
        street: '',
        house: '',
        zip: '',
        flat: '',
        description: '',
        auto_prolong: true,
        days: 7,
        main_photo: '',
        photos: []
    };


    export default {
        name: "CreateAdvert",
        components: {AdvertTypeBlock},
        data() {
            return {
                id: this.$route.params.id,
                countries: [{id: 'CZ', country: this.$t(`country.cz`)}, {id: 'SK', country: this.$t(`country.sk`)}],
                categories: [],
                types: [],
                kinds: [],
                advert: deepCopy(baseAdvert),
                files: [],
                // For update advert purpose
                newPhotos: [],
                rules: {
                    category_id: [
                        {required: true, message: this.$t('validation.required'), trigger: 'change'}
                    ],
                    kind_id: [
                        {required: true, message: this.$t('validation.required'), trigger: 'change'}
                    ],
                    type_id: [
                        {required: true, message: this.$t('validation.required'), trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: this.$t('validation.required'), trigger: 'blur'}
                    ],
                    price: [
                        {
                            type: 'string',
                            pattern: /[0-9]+(\.?[0-9])?$/,
                            required: false,
                            message: this.$t('validation.price'),
                            trigger: ['blur', 'change']
                        }
                    ],
                    square: [
                        {
                            type: 'number',
                            required: false,
                            message: this.$t('validation.number'),
                            trigger: ['blur', 'change']
                        }
                    ],
                    /*show_from: [
                        { required: true, message: this.$t('validation.showFrom'), trigger: 'blur' }
                    ]*/
                }
            }
        },
        computed: {
            isNew() {
                return this.id === '_';
            },
            computedTypes() {
                return this.types.filter(type => this.advert.kind_id ? type.kind_id === this.advert.kind_id : type);
            }
        },
        watch: {
            "advert.square"() {
                if (this.advert.square === "") {
                    this.advert.square = null;
                }
            }
        },
        created() {
            if (!this.isNew) {
                this.fetchAdvert(this.$route.params.id);
            }
            this.fetchCategories();
            this.fetchTypes();
            this.fetchKinds();
        },
        methods: {
            async fetchCategories() {
                try {
                    this.categories = await SystemService.category();
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchTypes() {
                try {
                    this.types = await SystemService.type();
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchKinds() {
                try {
                    this.kinds = await SystemService.kind();
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async fetchAdvert(id) {
                try {
                    this.advert = await RealEstateService.getRealEstateById(id);
                    this.advert.auto_prolong = (this.advert.auto_prolong === 1);
                    this.advert.price = this.advert.price === 0 ? "" : this.advert.price.toString();
                    this.advert.photos.forEach((photo, index) => {
                        this.files.push({image: "", url: ""});
                        this.files[index].image = photo;
                        this.files[index].url = "/storage/" + photo;
                    });
                    this.advert.photos.splice(0, this.advert.photos.length);
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async sendUpdatedAdvert() {
                try {
                    this.newPhotos.forEach(photo => this.advert.photos.push(photo.image));
                    await RealEstateService.updateRealEstate(this.advert);
                    this.$router.push({name: 'adverts'});
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async createAdvert() {
                try {
                    this.files.forEach((file, index) => this.advert.photos[index] = file.image);
                    await RealEstateService.sendRealEstate(this.advert);
                    this.$router.push({name: 'adverts'});
                } catch {
                    errorConnectionMessageCall();
                }
            },
            async onUpload(form) {
                let formData = new FormData();
                formData.append('image', form.file);
                let uploadedImage;
                try {
                    uploadedImage = await UploadService.image(formData);
                    uploadedImage.url = "/storage/" + uploadedImage.image;
                    this.files.push(uploadedImage);
                    this.newPhotos.push(uploadedImage);
                    if (!this.advert.main_photo) {
                        this.advert.main_photo = uploadedImage.image;
                    }
                } catch {
                    errorConnectionMessageCall();
                }
            },
            confirmCreateAdvert() {
                MessageBox.confirm(
                    this.$t("adverts.confirmationMessage") + " 5 " + "\u20ac",
                    this.$t("adverts.confirmation"), {
                        confirmButtonText: this.$t("adverts.confirm"),
                        cancelButtonText: this.$t("adverts.cancel"),
                        type: 'warning'
                    }).then(() => {
                    this.createAdvert();
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: this.$t("adverts.publishCanceled")
                    });
                });
            },
            addUpdateAdvert() {
                // Send real estate
                this.$refs.newAdvert.validate((valid) => {
                    if (valid) {
                        // Convert price to cents for backend
                        if (this.advert.price !== null) {
                            this.advert.price = preciseRound(parseFloat(this.advert.price), 2) * 100;
                        }

                        if (!this.isNew) {
                            this.sendUpdatedAdvert();
                        } else {
                            this.confirmCreateAdvert();
                        }
                    } else {
                        Message({
                            type: 'error',
                            message: this.$t('validation.form'),
                            duration: 6000
                        });
                        return false;
                    }
                });
            },
            handleMainPhotoRemove(fileIndex) {
                if (this.files.length === 1) {
                    this.advert.main_photo = "";
                } else if (fileIndex === 0) {
                    // In case first photo removed set second as cover
                    this.advert.main_photo = this.files[1].image;
                } else {
                    this.advert.main_photo = this.files[0].image;
                }
            },
            onFileRemove(fileArg) {
                let fileIndex = this.files.findIndex(file => file.image === fileArg.image);
                if (fileIndex !== -1) {
                    if (this.files[fileIndex].image === this.advert.main_photo) {
                        this.handleMainPhotoRemove(fileIndex);
                    }
                    this.files.splice(fileIndex, 1);
                }
            },
            onImageClick(file) {
                this.advert.main_photo = file.image;
            },
            setDateTime(targetDate, sourceDate) {
                targetDate.setHours(sourceDate.getHours());
                targetDate.setMinutes(sourceDate.getMinutes());
                targetDate.setSeconds(sourceDate.getSeconds());
                targetDate.setMilliseconds(sourceDate.getMilliseconds());
            },
            areDatesEqual(formDate, currentDate) {
                let localDate = new Date(formDate);
                this.setDateTime(localDate, currentDate);
                return currentDate.getTime() === localDate.getTime();
            },
            dateParsing(date) {
                // Set time in form date, when current date and selected date are equal
                let currentDate = new Date();
                if (this.areDatesEqual(this.advert.show_from, currentDate)) {
                    this.setDateTime(this.advert.show_from, currentDate);
                }
                // Set East Europe timezone
                date.setHours(date.getHours() + 2);
                let dateString = date.toISOString();
                let datePart = dateString.substring(0, dateString.indexOf("T"));
                let timePart = dateString.substr(dateString.indexOf("T") + 1, 8);
                return datePart + " " + timePart;
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    @import "~@/assets/scss/_variables.scss";

    .create-advert {
        .el-form {
            .el-upload-list--picture-card {
                .el-upload-list__item-actions {
                    padding-top: 10px;

                    .set-cover {
                        cursor: pointer;
                        font-size: 16px;
                    }

                    &:hover {
                        span {
                            display: block;
                            width: 20%;
                            margin: 0 auto;
                        }
                    }
                }
            }

            .el-upload-list {
                .cover-photo-text {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 40%;
                    bottom: 0;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                }

                .actions-wrapper {
                    width: 100%;
                    height: 100%;
                }

                div {
                    width: 100%;
                }
            }
        }
    }

    @media (min-width: 768px) {
        .create-advert {
            .el-form-item {
                .el-form-item__label {
                    width: 20%;
                }

                .el-form-item__content {
                    margin-left: 20%;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .create-advert {
            .el-form-item {
                .el-form-item__label {
                    width: 90%;
                    text-align: left;
                }
            }
        }
    }
</style>