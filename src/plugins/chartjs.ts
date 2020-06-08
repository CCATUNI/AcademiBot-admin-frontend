import {Chart, ChartDataSets, ChartOptions} from 'chart.js';

Chart.plugins.register({
    afterDraw: function(chartInstance: Chart) {
        const showDataPoints = (chartInstance.config!.options! as ChartOptions & { showDataPoints: { [p: string]: any } }).showDataPoints;
        const defaultFontColor = (chartInstance.config!.options! as ChartOptions & { defaultFontColor: string }).defaultFontColor;
        if (showDataPoints) {
            const helpers = Chart.helpers;
            const ctx = chartInstance.ctx!;
            const fontColor = helpers.getValueOrDefault(showDataPoints.fontColor, defaultFontColor);

            // render the value of the chart above the bar
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = fontColor;

            chartInstance.data.datasets!.forEach(function (dataset) {
                for (let i = 0; i < dataset.data!.length; i++) {
                    const _meta = (dataset as ChartDataSets & { _meta: {[p: string]: any}})._meta;
                    const model = _meta[Object.keys(_meta)[0]].data[i]._model;
                    const scaleMax = _meta[Object.keys(_meta)[0]].data[i]._yScale.maxHeight;
                    const yPos = (scaleMax - model.y) / scaleMax >= 0.93 ? model.y + 20 : model.y - 5;
                    const yVal = (dataset.data![i] as unknown & { y: number }).y;
                    ctx.fillText(String(yVal), model.x, yPos);
                }
            });
        }
    }
});
Chart.defaults.global.tooltips.enabled = false;
