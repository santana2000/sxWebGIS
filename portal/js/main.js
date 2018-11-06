require([

    "esri/Map",
    "esri/Basemap",
    "esri/views/MapView",
    "esri/layers/WebTileLayer",
    "esri/layers/CSVLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/tasks/Locator",
    "esri/widgets/Print",
    "esri/widgets/Print/TemplateOptions",
    "esri/widgets/LayerList",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/widgets/BasemapGallery",


], function (               //参数与调用对应

    Map,
    Basemap,
    MapView,
    WebTileLayer,
    CSVLayer,
    FeatureLayer,
    ImageryLayer,
    GroupLayer,
    MapImageLayer,
    Locator,
    Print,
    TemplateOptions,
    LayerList,
    CoordinateConversion,
    Compass,
    ScaleBar,
    BasemapGallery

) {

    var mymapx = new WebTileLayer({
        urlTemplate: "https://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{level}/{row}/{col}",

    });

    var mymap = new Basemap({
        baseLayers: [ mymapx ],

    });

    var map = new Map({
        basemap: mymap,
        //ground: "world-elevation"

    });
    map.basmap = null;

    var view = new MapView({
        container: "viewDiv",  // Reference to the scene div created in step 5
        map: map,  // Reference to the map object created before the scene
        zoom: 7,
        center: [112.537674, 37.871594]  // 112.537674,37.871594
    });

    //动态图层
    var DLayer = new MapImageLayer({
        url: "https://localhost:6443/arcgis/rest/services/w/MapServer",
        visible:false
    });

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
                       // sourceURL: "./img/2d129c5a15f14556be1de105298608f4_007-1_看图王.jpg"

                    }
                },{
                    title: "<b>剖面图</b>",
                    type: "image",
                    value: {


                        //sourceURL: "./img/sximg/{PMTX_FILEI}_{PMTX}_看图王.jpg"
                        //sourceURL: "./img/1b0ae76d4b394f54a5479bfde7377271_144-1_看图王.jpg"

                    }
                }]
            }
        ]
    };
    //崩塌点图层
    var pointLayer = new FeatureLayer({
        url: "https://localhost:6443/arcgis/rest/services/sxlayer/landcollapse/MapServer",
        outFields: ["*"],
        popupTemplate: template,
        title:"collapse",
        visible:false
    });
    map.add(pointLayer,2);

    //遥感影像
    var Layer2017 = new ImageryLayer({
        url: "https://localhost:6443/arcgis/rest/services/sxlayer/2017Shanxi_yasuo/ImageServer",
        format: "jpgpng",
        title:"2017",
        visible:false
    });
    map.add(Layer2017,1);

    //图层组控制
    var demoGroupLayer = new GroupLayer({
        title: "山西省矿山数据图层",
        visible: false,
        visibilityMode: "exclusive",
        layers: [ DLayer],
        opacity: 0.75
    });
    map.add(demoGroupLayer);
    //核密度热力图

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
        blurRadius:14,
        maxPixelIntensity: 50,
        minPixelIntensity: 0
    };
    const url = 'point.csv';
    const layer = new CSVLayer({
        url: url,
        popupTemplate: template,
        renderer: renderer,
        opacity:0.7
    });

    map.add(layer,3);

    //online
    // var censusLayer = new MapImageLayer({
    //     url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
    //     title: "US Sample Census",
    //     visible: false
    // });
    // map.add(censusLayer,3);

    // 地图打印
    var templateOptions = new TemplateOptions({
        title: "My Print",
        author: "Sam",
        copyright: "Shanxi",
        format:"pdf",
        //layout: "map-only",
        legendEnabled: false
    });

    var print = new Print({
        view: view,
        templateOptions:templateOptions,
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


    //----------底图库切换------------
    var basemapGallery = new BasemapGallery({
        view: view,

    });
    view.ui.add(basemapGallery, "bottom-left");















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



