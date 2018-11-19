var myChart = echarts.init(document.getElementById('sxmap'));

var data = [
    {name: '长治', value: 41},
    {name: '大同', value: 58},
    {name: '临汾', value: 47},
    {name: '太原', value: 39},
    {name: '阳泉', value: 31}
    ];

var geoCoordMap = {
    '阳泉':[113.57,37.85],
    '大同':[113.3,40.12],
    '长治':[113.08,36.18],
    '临汾':[111.5,36.08],
    '太原':[112.53,37.87]
}

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
    backgroundColor: '#404a59',
    title: {
        text: '严重矿山灾害点分布',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    //图例
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['危害性'],
        textStyle: {
            color: '#fff'
        }
    },
    geo: {
        map: "china",
        label: {
            emphasis: {
                show: false
            }
        },
        roam: true,
        zoom:3,
        itemStyle: {
            normal: {
                areaColor: "#323c48",
                borderColor: "#000000"
            },
            emphasis: {
                areaColor: "#2a333d"
            }
        }
    },
    series: [{
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function (a, b) {
            return b.value - a.value;
        }).slice(0, 4)),
        symbolSize: 22,
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
            normal: {
                formatter: '{b}',
                position: 'right',
                show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        zlevel: 1
    }
    ]
};
myChart.setOption(option);