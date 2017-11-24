require(['ipu', 'jquery'], function (ipu, $) {
    var provinces = [
        { text: '全部', value: 'all', data:[] },
        { text: '湖南', value: 'HN', data:[
            { text:'长沙', value:'CS', data:[
                {
                    text:'岳麓区', value:'YL'
                },{
                    text:'芙蓉区', value:'HR'
                },{
                    text:'天心区', value:'TX'
                },{
                    text:'雨花区', value:'YH'
                }
            ]},
            {text:'邵阳', value:'SY'},
            {text:'常德', value:'CD'},
            {text:'湘西', value:'CD'},
            {text:'岳阳', value:'CD'}
        ] },
        { text: '湖北', value: 'HB' , data:[
            {text:'武汉', value:'CS'},
            {text:'天门', value:'SY'},
            {text:'常德', value:'CD'},
            {text:'湘西', value:'CD'},
            {text:'岳阳', value:'CD'}
            ]
        },
        { text: '江西', value: 'JX' },
        { text: '北京', value: 'JX' },
        { text: '广东', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '江西', value: 'JX' },
        { text: '北京', value: 'JX' },
        { text: '广东', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '江西', value: 'JX' },
        { text: '北京', value: 'JX' },
        { text: '广东', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '江西', value: 'JX' },
        { text: '北京', value: 'JX' },
        { text: '广东', value: 'JX' },
        { text: '上海', value: 'JX' },
        { text: '上海', value: 'JX' }
    ];

    var LV1Picker = ipu.popPicker({layer:1});
    var LV2Picker = ipu.popPicker({layer: 2});
    var LV3Picker = ipu.popPicker({layer: 3});

    LV1Picker.setData(provinces);
    LV2Picker.setData(provinces);
    LV3Picker.setData(provinces);

    $("input[name='lv1']").click(function () {
        var self = $(this);
        LV1Picker.show(function (data) {
            self.val(data.text);
            $(".result-value").val(JSON.stringify(data));
        });
    });
    $("input[name='lv2']").click(function () {
        var self = $(this);
        LV2Picker.show(function (data) {
            $(self).val(data[0].text + " "+ (data[1].text || ''));
            $(".result-value").val(JSON.stringify(data));
        });
    });

    $("input[name='lv3']").click(function () {
        var self = $(this);
        LV3Picker.show(function (data) {
            $(self).val(data[0].text + (data[1].text || '') + (data[2].text || ''));
            $(".result-value").val(JSON.stringify(data));
        });
    });
});
