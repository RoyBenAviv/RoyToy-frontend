<template>
    <chart-one v-if="toys" />
</template>

<script>
import chartOne from '../components/chart-one.vue';

export default {
    data() {
        return {
        };
    },
    computed: {
        toys() {
            return this.$store.getters.getToys;
        },

    },
    components: {
        chartOne
    }
};
</script>
