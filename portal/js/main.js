require([
    "esri/tasks/Locator",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/Map",
    "esri/Basemap",
    "esri/layers/WebTileLayer",
    "esri/widgets/Print",
    "esri/widgets/Print/TemplateOptions",
    "esri/widgets/LayerList",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/layers/CSVLayer",

    "dojo/domReady!"
], function (               //参数与调用对应
    Locator,
    CoordinateConversion,
    Compass,
    ScaleBar,
    Map,
    Basemap,
    WebTileLayer,
    Print,
    TemplateOptions,
    LayerList,
    MapView,
    FeatureLayer,
    ImageryLayer,
    GroupLayer,
    MapImageLayer,
    CSVLayer
    ) {

    var mymapx = new WebTileLayer({
        urlTemplate: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}",

    });

    var mymap = new Basemap({
        baseLayers: [ mymapx ],
        // title: "Terrain",
        // id: "terrain",
        // thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
    });

    var map = new Map({
        basemap: mymap,
        ground: "world-elevation"

    });

    var view = new MapView({
        container: "viewDiv",  // Reference to the scene div created in step 5
        map: map,  // Reference to the map object created before the scene
        zoom: 7,
        center: [112.537674, 37.871594]  // 112.537674,37.871594
    });

    //动态图层
    var wLayer = new MapImageLayer({
        url: "https://localhost:6443/arcgis/rest/services/w/MapServer",
        visible:false
    });
    map.add(wLayer);

    //全国区划
    // var chinaLayer = new FeatureLayer({
    //     url: "https://localhost:6443/arcgis/rest/services/test1/china/MapServer"
    // });
    // map.add(chinaLayer, 0);
    //全国铁路
    var railLayer = new FeatureLayer({
        url: "https://localhost:6443/arcgis/rest/services/test1/railway/MapServer",
        visible:false
    });
    //map.add(railLayer,1);

    //popup模板
    var template = {
        title: "矿山崩塌信息:",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "RECID_NAME",
                label: "所属矿山",
                visible: true
            }, {
                fieldName: "HAPPEN_FLA",
                label: "是否发生",
                visible: true,
            }, {
                fieldName: "HAPPEN_DAT",
                label: "发生时间",
                visible: true
            }, {
                fieldName: "COLLAPSE_T",
                label: "崩塌类型",
                visible: true
            }, {
                fieldName: "SLOPE_TYPE",
                label: "斜坡类型",
                visible: true
            }, {
                fieldName: "TOP_EVEVAT",
                label: "斜坡高程",
                visible: true
            }, {
                fieldName: "BUTTOM_EVE",
                label: "坡底高程",
                visible: true
            }, {
                fieldName: "MEMO",
                label: "崩塌描述",
                visible: true
            }]
           },
            {
                type: "text",
                text: "崩塌信息详情："
            },{
                type: "media",
                mediaInfos: [{
                    title: "<b>平面图</b>",
                    type: "image",
                    value: {


                        //sourceURL: "./img/sximg/{PMTX_FILEI}_{PMTX}_看图王.jpg"
                        sourceURL: "./img/2d129c5a15f14556be1de105298608f4_007-1_看图王.jpg"

                    }
                },{
                    title: "<b>剖面图</b>",
                    type: "image",
                    value: {


                        //sourceURL: "./img/sximg/{PMTX_FILEI}_{PMTX}_看图王.jpg"
                        sourceURL: "./img/1b0ae76d4b394f54a5479bfde7377271_144-1_看图王.jpg"

                    }
                }]
            }
            ]
    };
    //崩塌实验
    var pointLayer = new FeatureLayer({
        url: "https://localhost:6443/arcgis/rest/services/sxlayer/landcollapse/MapServer",
        outFields: ["*"],
        popupTemplate: template,
        title:"pt",
        visible:false

    });

    //遥感影像
    var Layer2017 = new ImageryLayer({
        url: "https://localhost:6443/arcgis/rest/services/test1/Shanxi_2017N/ImageServer",
        format: "jpgpng",
        title:"2017",
        visible:false
    });
    map.add(Layer2017,2);

    //图层组控制
    var demoGroupLayer = new GroupLayer({
        title: "山西省矿山数据图层",
        visible: false,
        visibilityMode: "exclusive",
        layers: [pointLayer,railLayer],
        opacity: 0.75
    });
    map.add(demoGroupLayer);

    //online
    // var censusLayer = new MapImageLayer({
    //     url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
    //     title: "US Sample Census",
    //     visible: false
    // });
    // map.add(censusLayer,3);

    //核密度热力图
    const url =
        "./img/2.5_week.csv";

    const renderer = {
        type: "heatmap",
        colorStops: [
            {
                color: "rgba(63, 40, 102, 0)",
                ratio: 0
            },
            {
                color: "#472b77",
                ratio: 0.083
            },
            {
                color: "#4e2d87",
                ratio: 0.166
            },
            {
                color: "#563098",
                ratio: 0.249
            },
            {
                color: "#5d32a8",
                ratio: 0.332
            },
            {
                color: "#6735be",
                ratio: 0.415
            },
            {
                color: "#7139d4",
                ratio: 0.498
            },
            {
                color: "#7b3ce9",
                ratio: 0.581
            },
            {
                color: "#853fff",
                ratio: 0.664
            },
            {
                color: "#a46fbf",
                ratio: 0.747
            },
            {
                color: "#c29f80",
                ratio: 0.830
            },
            {
                color: "#e0cf40",
                ratio: 0.913
            },
            {
                color: "#ffff00",
                ratio: 1
            }],
        maxPixelIntensity: 25,
        minPixelIntensity: 0
    };

    const csvlayer01 = new CSVLayer({
        url: url,
        title: "Magnitude 2.5+ earthquakes from the last week",
        copyright: "USGS Earthquakes",

        renderer: renderer
    });
    map.add(csvlayer01);

    view.when(function() {
        var print = new Print({
             view: view,
            //templateOptions:templateOptions,
            //printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
             printServiceUrl: "https://localhost:6443/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"

        });

        var layerList = new LayerList({
            view: view
        });

        // //地图打印
        // var templateOptions = new TemplateOptions({
        //     title: "My Print",
        //     author: "Sam",
        //     copyright: "Shanxi",
        //     format:"pdf",
        //     //layout: "map-only",
        //     legendEnabled: false
        // });

        view.ui.add(print, "top-right");
        view.ui.add(layerList, "top-right");
        });


    //-----------位置坐标--------------
    var ccWidget = new CoordinateConversion({
        view: view
    });
    view.ui.add(ccWidget, "bottom-right");

    //------------比例尺--------------
    var scaleBar = new ScaleBar({
        view: view,
        unit: "metric"// The scale bar displays both metric and non-metric units.
        //style:"ruler"
    });
    view.ui.add(scaleBar, "bottom-right");

    //------------缩放、指南针--------------
    view.ui.move("zoom", "top-right");
    var compassWidget = new Compass({
        view: view
    });
    view.ui.add(compassWidget, "top-right");
    view.ui.add('scale', "top-right");


});

    //jQuery制作左侧工具栏点击效果
    $(function () {
        $('.gis').on('click', function () {
            if ($(this).children('.tools').is(':visible')) {
                $(this).children('.tools').slideUp();
                //测试 console.log($('.gis'));

            } else {
                $(this).children('.tools').slideDown();
            }
        });

        $('#switch').on('click', function () {
            $('.gisFunc').slideToggle("normal");
        });

        $('#lyr_c').on('click', function () {
            $('.esri-layer-list').slideToggle("normal");
        });

        $('#output').on('click', function () {
            $('.esri-print').slideToggle("normal");
        });
    });















    //     var myChart = echarts.init($('#ichart'));
    //
    //     var option = {
    //         title : {
    //             text: '某站点用户访问来源',
    //             subtext: '纯属虚构',
    //             x:'center'
    //         },
    //         tooltip : {
    //             trigger: 'item',
    //             formatter: "{a} <br/>{b} : {c} ({d}%)"
    //         },
    //         legend: {
    //             orient: 'vertical',
    //             left: 'left',
    //             data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    //         },
    //         series : [
    //             {
    //                 name: '访问来源',
    //                 type: 'pie',
    //                 radius : '55%',
    //                 center: ['50%', '60%'],
    //                 data:[
    //                     {value:335, name:'直接访问'},
    //                     {value:310, name:'邮件营销'},
    //                     {value:234, name:'联盟广告'},
    //                     {value:135, name:'视频广告'},
    //                     {value:1548, name:'搜索引擎'}
    //                 ],
    //                 itemStyle: {
    //                     emphasis: {
    //                         shadowBlur: 10,
    //                         shadowOffsetX: 0,
    //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                     }
    //                 }
    //             }
    //         ]
    //     };
    //     myChart.setOption(option);
    //
    //


//===============================================
