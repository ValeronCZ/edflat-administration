<template>
    <div class="adverts-list">
        <adverts-filter
                :filter="filter"
                :categories="categories"
                :states="states"
                :kinds="kinds"
                :types="types"
                @clear="clearFilter"
        />
        <el-table :data="adverts"
                  v-loading="loading"
                  border
                  :row-class-name="tableRowClassName"
                  style="width: 100%" ref="usersTable" @sort-change="onSortChange">
            <el-table-column prop="active" :label="$t('adverts.status')" :resizable="false" min-width="80">
                <template slot-scope="scope">
                    <el-tag effect="dark" v-if="scope.row.active===1" type="success">{{$t('adverts.active')}}</el-tag>
                    <el-tag effect="dark" v-else type="danger">{{$t('adverts.disabled')}}</el-tag>
                    <div v-if="scope.row.show_to" class="active-date">
                        {{$t('adverts.activeTo')}}:
                        <div><code><strong>{{formatDate(scope.row.show_to)}}</strong></code></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('adverts.photos')" :resizable="false" min-width="150" align="center">
                <template slot-scope="scope">
                    <div v-if="scope.row.main_photo">
                        <el-avatar shape="square" :size="120" fit="cover"  :src="'/storage/' + scope.row.main_photo"></el-avatar>
                    </div>
                    <i v-else class="el-icon-camera"></i>
                </template>
            </el-table-column>
            <el-table-column :label="$t('adverts.type')" :resizable="false" min-width="200">
                <template slot-scope="scope">
                    <div class="type-tags">
                        <el-tag>{{ findCategory(scope.row.category_id) }}</el-tag>
                        <el-tag type="info">{{ findKind(scope.row.kind_id) }}</el-tag>
                        <el-tag type="warning">{{ findType(scope.row.type_id) }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="title" :label="$t('adverts.title')" :resizable="false" min-width="250"/>
            <el-table-column prop="price" :label="$t('adverts.price')" :resizable="false" min-width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.price">{{scope.row.price}}€</span>
                </template>
            </el-table-column>
            <el-table-column v-if="showButtons" :label="$t('common.action')" :resizable="false" :width="380">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                                v-if="showProlongButton(scope.row.auto_prolong, scope.row.show_to)"
                                type="success"
                                icon="el-icon-sell"
                                @click="onProlongClick(scope.row.id)"
                        >
                            {{ $t('adverts.prolong') }}
                        </el-button>
                        <el-button type="primary" icon="el-icon-edit" @click="editAdvert(scope.row)">
                            {{$t('common.edit')}}
                        </el-button>
                        <a :href="'/real-estate/'+scope.row.id" class="el-button el-button--info"><i class="el-icon-view"></i>
                        </a>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteAdvert(scope.row)"></el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="sizes, prev, pager, next"
                :page-sizes="[10, 20, 50, 100]"
                :current-page.sync="pagination.current_page"
                :page-size.sync="pagination.per_page"
                :total="totalAdverts"
        />
    </div>
</template>

<script>
    import AdvertsFilter from "@/components/AdvertsFilter";
    import RealEstateService from "@/services/RealEstateService";
    import SystemService from "@/services/SystemService";
    import {errorConnectionMessageCall} from "@/utils/ErrorHandlingUtils";
    import {Loading, MessageBox, Message} from "element-ui";
    import {deepCopy} from "@/utils/ObjectUtils";
    import {formatDate} from "../utils/dateUtils";

    const DAYS_BEFORE_DEACTIVE = 3;

    const baseSort = {
        by: 'category_id',
        type: 'asc'
    };

    const baseFilter = {
        categories: [],
        types: [],
        kinds: [],
        active: ''
    };

    const baseStates = [
        {
            name: "Active",
            value: 1
        },
        {
            name: "Disabled",
            value: 0
        }
    ];

    export default {
        name: "AdvertsList",
        components: {AdvertsFilter},
        props: {
            adverts: {
                type: Array,
                required: true
            },
            showButtons: {
                type: Boolean
            },
            fetchAdverts: {
                type: Function
            },
            prolongId: {
                type: Number
            },
            totalAdverts: {
                type: Number
            },
            pagination: {
                type: Object
            },
            initialPaginationCall: {
                type: Boolean
            },
            fetchFilteredAdverts: {
                type: Function
            },
            userId: {
                type: Number
            }
        },
        data() {
            return {
                categories: [],
                types: [],
                kinds: [],
                sort: baseSort,
                filter: deepCopy(baseFilter),
                loadingInstance: null,
                states: baseStates,
                loading: false,
            }
        },
        computed: {
            languageState() {
                return this.$store.getters["language"];
            }
        },
        watch: {
            filter: {
                handler() {
                    this.getFilteredRealEstates();
                    this.pushURL();
                },
                deep: true
            },
            sort: {
                handler() {
                    this.getFilteredRealEstates();
                },
                deep: true
            },
            pagination: {
                handler() {
                    if (!this.initialPaginationCall) {
                        this.getFilteredRealEstates();
                    }
                },
                deep: true
            }
        },
        created() {
            this.initializeComponent();
        },
        methods: {
            formatDate(date) {
                return formatDate(new Date(date));
            },
            tableRowClassName({row, rowIndex}) {
                if (row.active === 0) {
                    return 'warning-row';
                }
                return '';
            },
            async fetchCategories() {
                try {
                    this.categories = await SystemService.category();
                } catch (e) {
                    errorConnectionMessageCall();
                }
            },
            async fetchTypes() {
                try {
                    this.types = await SystemService.type();
                } catch (e) {
                    errorConnectionMessageCall();
                }
            },
            async fetchKinds() {
                try {
                    this.kinds = await SystemService.kind();
                } catch (e) {
                    errorConnectionMessageCall();
                }
            },
            async deleteExistingAdvert(advert) {
                try {
                    await RealEstateService.deleteRealEstate(advert.id);
                    this.fetchAdverts();
                    Message({
                        type: 'success',
                        message: this.$t("adverts.deleteCompleted")
                    });
                } catch (e) {
                    errorConnectionMessageCall();
                }
            },
            async getFilteredRealEstates() {
                try {
                    this.loading = true;
                    // Check if service had time to close existing loading
                    if (this.loadingInstance === null) {
                        this.loadingInstance = Loading.service({target: ".el-table__body-wrapper"});
                    } else {
                        this.loadingInstance.close();
                        this.loadingInstance = Loading.service({target: ".el-table__body-wrapper"});
                    }
                    let realEstates = await this.fetchFilteredAdverts({
                        ...this.filter,
                        ...this.pagination,
                        sort: {...this.sort}
                    });
                    // Convert from cents to euros
                    realEstates.data.forEach(estate => {
                        return estate.price ? estate.price = estate.price / 100 : estate.price;
                    });
                    this.$emit("update:adverts", realEstates.data);
                    // Close loading if service had time to create it
                    if (this.loadingInstance !== null) {
                        this.loadingInstance.close();
                        this.loadingInstance = null;
                    }
                    this.loading = false;
                } catch (e) {
                    errorConnectionMessageCall();
                }
            },
            findCategory(id) {
                let category = this.categories.find(category => category.id === id);
                if (category) {
                    return this.languageState === "sk" ? category.type : category.type_en;
                } else {
                    return null;
                }
            },
            findKind(id) {
                let kind = this.kinds.find(kind => kind.id === id);
                if (kind) {
                    return this.languageState === "sk" ? kind.estate_kind : kind.estate_kind_en;
                } else {
                    return null;
                }
            },
            findType(id) {
                let type = this.types.find(type => type.id === id);
                if (type) {
                    return this.languageState === "sk" ? type.estate_type : type.estate_type_en;
                } else {
                    return null;
                }
            },
            editAdvert(advert) {
                this.$router.push({name: 'advert', params: {id: advert.id}});
            },
            deleteAdvert(advert) {
                MessageBox.confirm(
                    this.$t("adverts.permanentlyDelete"),
                    this.$t("adverts.warning"), {
                        confirmButtonText: 'OK',
                        cancelButtonText: this.$t("adverts.cancel"),
                        type: 'warning'
                    }).then(() => {
                    this.deleteExistingAdvert(advert);
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: this.$t("adverts.canceled")
                    });
                });
            },
            daysBetween(date1, date2) {
                //Get 1 day in milliseconds
                let one_day = 1000 * 60 * 60 * 24;
                // Convert both dates to milliseconds
                let date1_ms = date1.getTime();
                let date2_ms = date2.getTime();
                // Calculate the difference in milliseconds
                let difference_ms = date2_ms - date1_ms;
                // Convert back to days and return
                return Math.round(difference_ms / one_day);
            },
            showProlongButton(autoProlong, showTo) {
                if (!autoProlong) {
                    let currentDate = new Date();
                    let showToDate = new Date(showTo);
                    if (this.daysBetween(currentDate, showToDate) <= DAYS_BEFORE_DEACTIVE) {
                        return true;
                    }
                }
                return false;
            },
            onProlongClick(advertId) {
                this.$emit('prolong', {
                    showProlong: true,
                    advertId: advertId
                });
            },
            onSortChange(sortInfo) {
                this.sort.type = sortInfo.order === "ascending" ? "asc" : "desc";
                switch (sortInfo.column.label) {
                    case this.$t("adverts.category"):
                        this.sort.by = "category_id";
                        break;
                    case this.$t("adverts.kind"):
                        this.sort.by = "kind_id";
                        break;
                    case this.$t("adverts.type"):
                        this.sort.by = "type_id";
                        break;
                }
            },
            clearFilter() {
                this.filter = deepCopy(baseFilter);
            },
            pushURL() {
                this.$router.push({
                    path: this.userId ? `/users/${this.userId}` : "/adverts",
                    query: {
                        categories: this.filter.categories,
                        kinds: this.filter.kinds,
                        types: this.filter.types,
                        active: this.filter.active,
                        title: this.filter.title
                    }
                });
            },
            parseRoute() {
                let categories = this.$route.query.categories;
                let kinds = this.$route.query.kinds;
                let types = this.$route.query.types;

                if (typeof categories === "string") {
                    this.filter.categories.push(parseInt(categories));
                } else if (typeof categories === "object") {
                    categories = categories.map(category => parseInt(category));
                    this.filter.categories = categories;
                }
                if (typeof kinds === "string") {
                    this.filter.kinds.push(parseInt(kinds));
                } else if (typeof kinds === "object") {
                    kinds = kinds.map(kind => parseInt(kind));
                    this.filter.kinds = kinds;
                }
                if (typeof types === "string") {
                    this.filter.types.push(parseInt(types));
                } else if (typeof types === "object") {
                    types = types.map(type => parseInt(type));
                    this.filter.types = types;
                }

                if (this.$route.query.active) {
                    this.filter.active = parseInt(this.$route.query.active);
                }
                if (this.$route.query.title) {
                    this.filter.title = this.$route.query.title;
                }
            },
            initializeComponent() {
                this.fetchCategories();
                this.fetchTypes();
                this.fetchKinds();
                if (Object.keys(this.$route.query).length > 0) {
                    this.parseRoute();
                }
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    @import "~@/assets/scss/_variables.scss";

    .adverts-list {
        .el-table .warning-row {
            background: rgba(245, 108, 108, 0.2);
        }

        .adverts-filter {
            margin-bottom: $spacer;

            button {
                margin-top: $item-label-line-height;
                width: 100%;
            }

            .el-row {
                flex-wrap: wrap;
            }

            .el-form-item {
                margin: 0;

                .el-form-item__label {
                    padding: 0;
                    margin: 0;
                }

                .adverts-filter-input-label {
                    width: 100%;
                }

                .el-select {
                    width: 100%;
                }
            }
        }

        .el-table {
            overflow-x: auto;

            .el-table__body-wrapper {
                .table-main-photo {
                    width: 140px;
                    height: 80px;
                }

                .el-icon-camera {
                    font-size: 60px;
                }
            }
        }

        .el-pagination {
            margin-top: $spacer;
        }

        .type-tags {
            .el-tag {
                margin-right: 5px;
                margin-bottom: 5px;
            }
        }
        .active-date{
            margin-top: 13px;
            code{
                font-size: 0.72rem;
            }
        }
    }
</style>
