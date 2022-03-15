<template>
    <PieChart :chartData="data" />
</template>
   
   <script>
import { PieChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    components: { PieChart },
    data() {
        return {
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            '#77CEFF',
                            '#0079AF',
                            '#123E6B',
                            '#97B0C4',
                            '#A5C8ED',
                        ],
                    },

                ]
            }

        };
    },
    created() {
        this.showPrices()
    },
    methods: {
        showPrices() {
            var res = this.$store.getters.getToys.reduce((acc, toy) => {
                toy.labels.forEach(label => {
                    if (!acc[label]) {
                        acc[label] = {
                            total: toy.price,
                            amount: 1
                        };
                    }
                    else {
                        acc[label].total += toy.price;
                        acc[label].amount++;
                    }
                });
                return acc;
            }, {});
            for (const label in res) {
                this.data.labels.push(label);
                this.data.datasets[0].data.push((res[label].total / res[label].amount));
            }
        },
    },
};
    </script>