import {breakpoints} from "@/theme";

/// Mixin for css breakpoints and devices recognition
export default {
    data() {
        return {
            $_windowWidth: window.innerWidth,
            $_windowHeight: window.innerHeight,
        };
    },
    computed: {
        $_breakpoints() {
            return breakpoints;
        },
        $_isXs() {
            return this.$_breakpoints.xs <= this.$data.$_windowWidth && this.$data.$_windowWidth < this.$_breakpoints.sm;
        },
        $_isSm() {
            return this.$_breakpoints.sm <= this.$data.$_windowWidth && this.$data.$_windowWidth < this.$_breakpoints.md;
        },
        $_isMd() {
            return this.$_breakpoints.md <= this.$data.$_windowWidth && this.$data.$_windowWidth < this.$_breakpoints.lg;
        },
        $_isLg() {
            return this.$_breakpoints.lg <= this.$data.$_windowWidth && this.$data.$_windowWidth < this.$_breakpoints.xl;
        },
        $_isXl() {
            return this.$_breakpoints.xl <= this.$data.$_windowWidth;
        },
        $_isMobile() {
            return this.$_isXs || this.$_isSm;
        },
        $_isTablet() {
            return this.$_isMd;
        },
        $_isDesktop() {
            return this.$_isXl || this.$_isLg;
        },
    },
    methods: {
        $_onWindowResize() {
            this.$data.$_windowWidth = window.innerWidth;
            this.$data.$_windowHeight = window.innerHeight;
        }
    },
    created() {
        this.$nextTick(() =>
            window.addEventListener("resize", this.$_onWindowResize));
    },
    beforeDestroy() {
        // Required to preserve memory leaks
        window.removeEventListener("resize", this.$_onWindowResize);
    }
};