Ext.data.JsonP.Picker({"tagname":"class","name":"Picker","autodetected":{},"files":[{"filename":"ipu.js","href":"ipu.html#Picker"}],"private":true,"members":[{"name":"defaultOption","tagname":"cfg","owner":"Picker","id":"cfg-defaultOption","meta":{}},{"name":"constructor","tagname":"method","owner":"Picker","id":"method-constructor","meta":{}},{"name":"calcItemVisable","tagname":"method","owner":"Picker","id":"method-calcItemVisable","meta":{}},{"name":"getSelectedIndex","tagname":"method","owner":"Picker","id":"method-getSelectedIndex","meta":{}},{"name":"getSelectedItem","tagname":"method","owner":"Picker","id":"method-getSelectedItem","meta":{}},{"name":"getSelectedText","tagname":"method","owner":"Picker","id":"method-getSelectedText","meta":{}},{"name":"getSelectedValue","tagname":"method","owner":"Picker","id":"method-getSelectedValue","meta":{}},{"name":"setAngle","tagname":"method","owner":"Picker","id":"method-setAngle","meta":{}},{"name":"setItems","tagname":"method","owner":"Picker","id":"method-setItems","meta":{}},{"name":"setListen","tagname":"method","owner":"Picker","id":"method-setListen","meta":{}},{"name":"setSelectedValue","tagname":"method","owner":"Picker","id":"method-setSelectedValue","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Picker","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/ipu.html#Picker' target='_blank'>ipu.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>选择器，被DtPicker和PopPicker使用，实现选择与滚动等基础功能</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-defaultOption' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-cfg-defaultOption' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-cfg-defaultOption' class='name expandable'>defaultOption</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>组件默认配置项 ...</div><div class='long'><p>组件默认配置项</p>\n<p>Defaults to: <code></code></p><ul><li><span class='pre'>listen</span> : Boolean<div class='sub-desc'><p>是否需要监听变化</p>\n<p>Defaults to: <code>true</code></p></div></li><li><span class='pre'>data</span> : [Object]<div class='sub-desc'><p>可选择项数组，每个项须有text属性</p>\n<p>Defaults to: <code>[]</code></p><ul><li><span class='pre'>text</span> : String<div class='sub-desc'><p>子项展示文本</p>\n</div></li></ul></div></li><li><span class='pre'>onChange</span> : Function<div class='sub-desc'><p>选择变化时的回调函数</p>\n<p>Defaults to: <code>null</code></p><h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>sltItem</span> : Object<div class='sub-desc'><p>选中项</p>\n</div></li><li><span class='pre'>newIndex</span> : Number<div class='sub-desc'><p>新的选中项索引</p>\n</div></li><li><span class='pre'>oldIndex</span> : Number<div class='sub-desc'><p>旧的选中项索引</p>\n</div></li><li><span class='pre'>newData</span> : Boolean<div class='sub-desc'><p>是否为调用setItem()方法触发</p>\n</div></li></ul></div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Picker-method-constructor' class='name expandable'>Picker</a>( <span class='pre'>slt, option</span> ) : <a href=\"#!/api/Picker\" rel=\"Picker\" class=\"docClass\">Picker</a><span class=\"signature\"></span></div><div class='description'><div class='short'>初始化方法 ...</div><div class='long'><p>初始化方法</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>slt</span> : String|DOM|JQueryObj<div class='sub-desc'>\n</div></li><li><span class='pre'>option</span> : object<div class='sub-desc'><p>组件参数，默认配置见 <a href=\"#!/api/Picker-cfg-defaultOption\" rel=\"Picker-cfg-defaultOption\" class=\"docClass\">defaultOption</a></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Picker\" rel=\"Picker\" class=\"docClass\">Picker</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-calcItemVisable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-calcItemVisable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-calcItemVisable' class='name expandable'>calcItemVisable</a>( <span class='pre'>angle</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>计算各子项滚动角度与新的滚动角度的值差异来决定显示的情况\n角度大于 90-(itemAngle/2)时，隐藏\n角度小于itemAngle/2表示最中心的项，显示并高亮\n其它值则表示此项为显示 ...</div><div class='long'><p>计算各子项滚动角度与新的滚动角度的值差异来决定显示的情况\n角度大于 90-(itemAngle/2)时，隐藏\n角度小于itemAngle/2表示最中心的项，显示并高亮\n其它值则表示此项为显示</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>angle</span> : Number<div class='sub-desc'><p>新的滚动角度</p>\n</div></li></ul></div></div></div><div id='method-getSelectedIndex' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-getSelectedIndex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-getSelectedIndex' class='name expandable'>getSelectedIndex</a>( <span class='pre'></span> ) : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>获取选中项的索引，若子项集为空则返回null ...</div><div class='long'><p>获取选中项的索引，若子项集为空则返回null</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSelectedItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-getSelectedItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-getSelectedItem' class='name expandable'>getSelectedItem</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>获取选中的子项，若子项集为空时，返回空对象 ...</div><div class='long'><p>获取选中的子项，若子项集为空时，返回空对象</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSelectedText' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-getSelectedText' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-getSelectedText' class='name expandable'>getSelectedText</a>( <span class='pre'></span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>返回选中项的text属性 ...</div><div class='long'><p>返回选中项的text属性</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getSelectedValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-getSelectedValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-getSelectedValue' class='name expandable'>getSelectedValue</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>获取选中的子项的value属性 ...</div><div class='long'><p>获取选中的子项的value属性</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setAngle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-setAngle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-setAngle' class='name expandable'>setAngle</a>( <span class='pre'>newAngle, endScroll</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>为组件设置新的滚动角度 ...</div><div class='long'><p>为组件设置新的滚动角度</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newAngle</span> : Number<div class='sub-desc'><p>新的滚动角度</p>\n</div></li><li><span class='pre'>endScroll</span> : Boolean<div class='sub-desc'><p>是否为最终滚动角度，为最终滚动角度时，若索引更新可以触发onChange的回调</p>\n</div></li></ul></div></div></div><div id='method-setItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-setItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-setItems' class='name expandable'>setItems</a>( <span class='pre'>data</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>设置选择项 ...</div><div class='long'><p>设置选择项</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>data</span> : [Object]<div class='sub-desc'><p>设置项数组</p>\n</div></li></ul></div></div></div><div id='method-setListen' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-setListen' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-setListen' class='name expandable'>setListen</a>( <span class='pre'>listen</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>设置是否监听触发onChange回调 ...</div><div class='long'><p>设置是否监听触发onChange回调</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>listen</span> : Boolean<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-setSelectedValue' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Picker'>Picker</span><br/><a href='source/ipu.html#Picker-method-setSelectedValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Picker-method-setSelectedValue' class='name expandable'>setSelectedValue</a>( <span class='pre'>value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>设置选中项，若子项的value属性为value，则设置该项为选中项 ...</div><div class='long'><p>设置选中项，若子项的value属性为value，则设置该项为选中项</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});