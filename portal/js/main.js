require([
    "esri/tasks/Locator",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Compass",
    "esri/widgets/ScaleBar",
    "esri/Map",
    "esri/widgets/Print",
    "esri/widgets/Print/TemplateOptions",
    "esri/widgets/LayerList",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/ImageryLayer",

    "dojo/domReady!"
], function (               //参数与调用对应
    Locator,
    CoordinateConversion,
    Compass,
    ScaleBar,
    Map,
    Print,
    TemplateOptions,
    LayerList,
    MapView,
    FeatureLayer,
    ImageryLayer) {
    var map = new Map({
        basemap: "osm",

    });

    var view = new MapView({
        container: "viewDiv",  // Reference to the scene div created in step 5
        map: map,  // Reference to the map object created before the scene
        zoom: 7,
        center: [112.537674, 37.871594]  // 112.537674,37.871594
    });

    //遥感影像
    var Layer2017 = new ImageryLayer({
        url: "https://localhost:6443/arcgis/rest/services/test1/Shanxi_2017N/ImageServer",
        format: "jpgpng"

    });
    map.add(Layer2017);

    //全国区划
    // var chinaLayer = new FeatureLayer({
    //     url: "https://localhost:6443/arcgis/rest/services/test1/china/MapServer"
    // });
    // map.add(chinaLayer, 0);

    //popup模板
    var template = {
        title: "矿山崩塌信息:",
        content: [{
            type: "media",
            mediaInfos: [{
                title: "<b>土地崩塌</b>",
                type: "image",
                value: {
                    //sourceURL: "https://i.loli.net/2018/09/20/5ba39c600ad6c.png"
                    sourceURL: "./css/symbol01.png"
                }
            }]
        },{
            type: "fields",
            fieldInfos: [{
                fieldName: "CREATEDATE",
                label: "采集日期",
                visible: true
            }, {
                fieldName: "SLOPE_TYPE",
                label: "土质类型",
                visible: true,
            }, {
                fieldName: "COLLAPSE_T",
                label: "崩塌类型",
                visible: true
            }, {
                fieldName: "MEMO",
                label: "崩塌描述",
                visible: true
            }]
           },
            {
                type: "text",
                text: "该区域土地利用类型是：{SLOPE_TYPE}"
            }
            ]
    }

    //全国铁路
    // var railLayer = new FeatureLayer({
    //     url: "https://localhost:6443/arcgis/rest/services/test1/railway/MapServer"
    // });
    //map.add(railLayer,1);

    //崩塌实验
    var pointLayer = new FeatureLayer({
        url: "https://localhost:6443/arcgis/rest/services/test1/point01/MapServer",
        outFields: ["*"],
        popupTemplate: template
    });
    map.add(pointLayer);

    view.when(function() {

        //图层控制
        var layerList = new LayerList({
            view: view
        });
        view.ui.add(layerList, "top-right");

        //地图打印
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
            printServiceUrl:
                "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });

        view.ui.add(print, "top-right");
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


})

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

    })