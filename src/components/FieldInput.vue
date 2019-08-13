<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <el-input
            :value="value"
            :id="id"
            v-bind="$attrs"
            @input="onInput"
        />
    </div>
</template>

<script>
    export default {
        name: "FieldInput",
        inheritAttrs: false,
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        },
        methods: {
            onInput(value) {
                this.$emit("input", value);
            }
        }
    };
</script>

<style lang="scss" type="text/scss">
    .input-field {
        margin-bottom: 0.5rem;
    }
</style>