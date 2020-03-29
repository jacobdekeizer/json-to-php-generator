(function(t){function e(e){for(var a,i,l=e[0],u=e[1],o=e[2],h=0,p=[];h<l.length;h++)i=l[h],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);c&&c(e);while(p.length)p.shift()();return r.push.apply(r,o||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,l=1;l<n.length;l++){var u=n[l];0!==s[u]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},s={app:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="https://jacobdekeizer.github.io/json-to-php-generator/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var o=0;o<l.length;o++)e(l[o]);var c=u;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"2aa8":function(t,e,n){},"51a1":function(t,e,n){"use strict";var a=n("2aa8"),s=n.n(a);s.a},"7d32":function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],i=n("2877"),l={},u=Object(i["a"])(l,s,r,!1,null,null,null),o=u.exports,c=n("8c4f"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Card",[n("h1",{staticClass:"text-gray-700 text-sm font-bold text-3xl"},[t._v(" JSON to PHP converter ")]),n("div",{staticClass:"mt-0 mb-6 text-gray-600"},[t._v(" Generate PHP classes from json ")]),n("TextArea",{staticClass:"mb-4",attrs:{id:"json-input",label:"Json input"},on:{"on-value-change":t.onJsonContentChange}}),n("h2",{staticClass:"text-gray-700 text-sm font-bold text-2xl mb-2"},[t._v("Settings")]),n("Settings",{attrs:{settings:t.settings}})],1),this.code?n("Card",[n("Code",{attrs:{code:t.code}})],1):t._e(),this.errorMessage?n("Card",[n("Alert",{attrs:{message:t.errorMessage}})],1):t._e()],1)},p=[],f=(n("d3b7"),n("25f0"),n("d4ec")),b=n("bee2"),g=n("2caf"),v=n("262e"),d=n("9ab4"),y=n("60a3"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[this.message?n("div",{staticClass:"bg-red-100 border-l-4 border-red-500 text-red-700 p-4",attrs:{role:"alert"}},[n("p",[t._v(t._s(this.message))])]):t._e()])},j=[],O=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){return Object(f["a"])(this,n),e.apply(this,arguments)}return n}(y["d"]);Object(d["b"])([Object(y["c"])(String)],O.prototype,"message",void 0),O=Object(d["b"])([y["a"]],O);var C=O,k=C,x=Object(i["a"])(k,m,j,!1,null,null,null),w=x.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container w-full max-w-screen-xl mx-auto px-4 mt-5"},[n("div",{staticClass:"w-full"},[n("div",{staticClass:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"},[t._t("default")],2)])])},S=[],N=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){return Object(f["a"])(this,n),e.apply(this,arguments)}return n}(y["d"]);N=Object(d["b"])([y["a"]],N);var V=N,_=V,T=Object(i["a"])(_,P,S,!1,null,null,null),A=T.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("VueCodeHighlight",[t._v(t._s(this.code))])],1)},$=[],E=n("d36c"),H=(n("4717"),n("80be"),n("5d6e"),function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){return Object(f["a"])(this,n),e.apply(this,arguments)}return n}(y["d"]));Object(d["b"])([Object(y["c"])(String)],H.prototype,"code",void 0),H=Object(d["b"])([Object(y["a"])({components:{VueCodeHighlight:E["a"]}})],H);var B=H,F=B,M=Object(i["a"])(F,D,$,!1,null,null,null),R=M.exports,q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"flex flex-wrap -mx-3 mb-3"},[n("div",{staticClass:"w-full md:w-1/3 px-3"},[n("Select",{attrs:{id:"php-version",label:"Php version","default-value":t.settings.phpVersion,options:t.phpVersionOptions},on:{"on-value-change":function(e){return t.settings.phpVersion=e}}})],1),n("div",{staticClass:"w-full md:w-1/3 px-3"},[n("Select",{attrs:{id:"class-case",label:"Class case","default-value":t.settings.classCase,options:t.caseOptions},on:{"on-value-change":function(e){return t.settings.classCase=e}}})],1),n("div",{staticClass:"w-full md:w-1/3 px-3"},[n("Select",{attrs:{id:"property-case",label:"Property case","default-value":t.settings.propertyCase,options:t.caseOptions},on:{"on-value-change":function(e){return t.settings.propertyCase=e}}})],1)]),n("hr",{staticClass:"mb-3"}),n("div",{staticClass:"flex flex-wrap -mx-3"},[n("div",{staticClass:"w-full md:w-1/3 px-3"},[n("Checkbox",{staticClass:"mb-3",attrs:{label:"Add getters","default-value":t.settings.addGetters},on:{"on-value-change":function(e){return t.settings.addGetters=e}}}),t.settings.addGetters?n("Select",{staticClass:"mb-3",attrs:{id:"getter-case",label:"Getter case","default-value":t.settings.getterCase,options:t.caseOptions},on:{"on-value-change":function(e){return t.settings.getterCase=e}}}):t._e()],1),n("div",{staticClass:"w-full md:w-1/3 px-3"},[n("div",{staticClass:"flex flex-wrap"},[n("div",{staticClass:"w-full md:w-1/2"},[n("Checkbox",{attrs:{label:"Add setters","default-value":t.settings.addSetters},on:{"on-value-change":function(e){return t.settings.addSetters=e}}})],1),n("div",{staticClass:"w-full md:w-1/2"},[t.settings.addSetters?n("Checkbox",{staticClass:"mb-3",attrs:{label:"Is fluent setter","default-value":t.settings.isFluentSetter},on:{"on-value-change":function(e){return t.settings.isFluentSetter=e}}}):t._e()],1)]),t.settings.addSetters?n("Select",{staticClass:"mb-3",attrs:{id:"setter-case",label:"Setter case","default-value":t.settings.setterCase,options:t.caseOptions},on:{"on-value-change":function(e){return t.settings.setterCase=e}}}):t._e()],1)]),n("hr",{staticClass:"mb-3"}),n("Checkbox",{attrs:{label:"Add constructor","default-value":t.settings.addConstructor},on:{"on-value-change":function(e){return t.settings.addConstructor=e}}}),n("Checkbox",{attrs:{label:"Add docblocks","default-value":t.settings.addDocBlocks},on:{"on-value-change":function(e){return t.settings.addDocBlocks=e}}}),n("Checkbox",{attrs:{label:"Final classes","default-value":t.settings.finalClasses},on:{"on-value-change":function(e){return t.settings.finalClasses=e}}})],1)},G=[],J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"md:w-2/3 block text-gray-500 font-bold"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],staticClass:"mr-2 leading-tight",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.value)?t._i(t.value,null)>-1:t.value},on:{change:function(e){var n=t.value,a=e.target,s=!!a.checked;if(Array.isArray(n)){var r=null,i=t._i(n,r);a.checked?i<0&&(t.value=n.concat([r])):i>-1&&(t.value=n.slice(0,i).concat(n.slice(i+1)))}else t.value=s}}}),n("span",{staticClass:"text-sm"},[t._v(t._s(this.label))])])},W=[],z=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){var t;return Object(f["a"])(this,n),t=e.apply(this,arguments),t.value=!1,t}return Object(b["a"])(n,[{key:"mounted",value:function(){this.defaultValue&&(this.value=this.defaultValue)}},{key:"onValueChanged",value:function(t){this.onValueChange(t)}},{key:"onValueChange",value:function(t){return t}}]),n}(y["d"]);Object(d["b"])([Object(y["c"])(String)],z.prototype,"id",void 0),Object(d["b"])([Object(y["c"])(Boolean)],z.prototype,"defaultValue",void 0),Object(d["b"])([Object(y["c"])(String)],z.prototype,"label",void 0),Object(d["b"])([Object(y["e"])("value")],z.prototype,"onValueChanged",null),Object(d["b"])([Object(y["b"])()],z.prototype,"onValueChange",null),z=Object(d["b"])([y["a"]],z);var L=z,I=L,U=Object(i["a"])(I,J,W,!1,null,null,null),K=U.exports,Q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("label",{staticClass:"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",attrs:{for:this.id}},[t._v(" "+t._s(this.label)+" ")]),n("div",{staticClass:"relative"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],staticClass:"block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",attrs:{id:this.id},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.value=e.target.multiple?n:n[0]}}},t._l(this.options,(function(e){return n("option",{key:e.value,domProps:{value:e.value}},[t._v(" "+t._s(e.text)+" ")])})),0),n("div",{staticClass:"absolute flex inset-y-0 items-center px-3 right-0 text-gray-700 bg-gray-300 rounded-r pointer-events-none"},[n("svg",{staticClass:"fill-current h-4 w-4",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])])},X=[],Y=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){var t;return Object(f["a"])(this,n),t=e.apply(this,arguments),t.value=null,t}return Object(b["a"])(n,[{key:"mounted",value:function(){this.defaultValue&&(this.value=this.defaultValue)}},{key:"onValueChanged",value:function(t){this.onValueChange(t)}},{key:"onValueChange",value:function(t){return t}}]),n}(y["d"]);Object(d["b"])([Object(y["c"])(String)],Y.prototype,"id",void 0),Object(d["b"])([Object(y["c"])(String)],Y.prototype,"label",void 0),Object(d["b"])([Object(y["c"])(String)],Y.prototype,"defaultValue",void 0),Object(d["b"])([Object(y["c"])(Array)],Y.prototype,"options",void 0),Object(d["b"])([Object(y["e"])("value")],Y.prototype,"onValueChanged",null),Object(d["b"])([Object(y["b"])()],Y.prototype,"onValueChange",null),Y=Object(d["b"])([y["a"]],Y);var Z,tt,et=Y,nt=et,at=Object(i["a"])(nt,Q,X,!1,null,null,null),st=at.exports,rt=(n("b64b"),function t(e,n){Object(f["a"])(this,t),this.text=e,this.value=n}),it=function(){function t(){Object(f["a"])(this,t)}return Object(b["a"])(t,null,[{key:"getOptions",value:function(t){for(var e=[],n=Object.keys(t),a=0,s=n;a<s.length;a++){var r=s[a];e.push(new rt(t[r],t[r]))}return e}}]),t}();(function(t){t["PHP74"]="PHP 7.4",t["PHP73"]="PHP 7.3"})(Z||(Z={})),function(t){t["Original"]="Original",t["CamelCase"]="Camel case",t["PascalCase"]="Pascal case",t["SnakeCase"]="Snake case"}(tt||(tt={}));var lt=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){return Object(f["a"])(this,n),e.apply(this,arguments)}return Object(b["a"])(n,[{key:"phpVersionOptions",get:function(){return it.getOptions(Z)}},{key:"caseOptions",get:function(){return it.getOptions(tt)}}]),n}(y["d"]);Object(d["b"])([Object(y["c"])(Object)],lt.prototype,"settings",void 0),lt=Object(d["b"])([Object(y["a"])({components:{Checkbox:K,Select:st}})],lt);var ut=lt,ot=ut,ct=Object(i["a"])(ot,q,G,!1,null,null,null),ht=ct.exports,pt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("label",{staticClass:"block text-gray-700 text-sm font-bold mb-2",attrs:{for:this.id}},[t._v(" "+t._s(this.label)+" ")]),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],staticClass:"resize-y border rounded focus:outline-none focus:shadow-outline w-full min-height",attrs:{id:this.id},domProps:{value:t.value},on:{input:function(e){e.target.composing||(t.value=e.target.value)}}})])},ft=[],bt=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){var t;return Object(f["a"])(this,n),t=e.apply(this,arguments),t.value=null,t}return Object(b["a"])(n,[{key:"mounted",value:function(){this.defaultValue&&(this.value=this.defaultValue)}},{key:"onValueChanged",value:function(t){this.onValueChange(t)}},{key:"onValueChange",value:function(t){return t}}]),n}(y["d"]);Object(d["b"])([Object(y["c"])(String)],bt.prototype,"id",void 0),Object(d["b"])([Object(y["c"])(String)],bt.prototype,"defaultValue",void 0),Object(d["b"])([Object(y["c"])(String)],bt.prototype,"label",void 0),Object(d["b"])([Object(y["e"])("value")],bt.prototype,"onValueChanged",null),Object(d["b"])([Object(y["b"])()],bt.prototype,"onValueChange",null),bt=Object(d["b"])([y["a"]],bt);var gt=bt,vt=gt,dt=(n("51a1"),Object(i["a"])(vt,pt,ft,!1,null,"92668920",null)),yt=dt.exports,mt=(n("caad"),n("2532"),function(){function t(){Object(f["a"])(this,t),this.phpVersion=Z.PHP74,this.classCase=tt.PascalCase,this.propertyCase=tt.CamelCase,this.addConstructor=!0,this.addDocBlocks=!1,this.finalClasses=!1,this.addGetters=!1,this.getterCase=tt.CamelCase,this.addSetters=!1,this.setterCase=tt.CamelCase,this.isFluentSetter=!0}return Object(b["a"])(t,[{key:"supportsTypedProperties",value:function(){var t=[Z.PHP74];return t.includes(this.phpVersion)}}]),t}()),jt=(n("4de4"),n("7db0"),n("d81d"),n("b85c")),Ot=n("53ca"),Ct=(n("b0c0"),function(){function t(e){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return"string"}},{key:"getDocblockContent",value:function(){return"@var string"}},{key:"isDocblockRequired",value:function(){return!1}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t}}]),t}()),kt=function(){function t(e,n){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e,this.type=n}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return"array"}},{key:"getDocblockContent",value:function(){return"@var "+this.type.getType()+"[]"}},{key:"isDocblockRequired",value:function(){return!0}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t,this.type.setSettings(t)}}]),t}(),xt=function(){function t(e,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];Object(f["a"])(this,t),this.name=e,this.properties=n,this.children=a}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getProperties",value:function(){return this.properties}},{key:"getChildren",value:function(){return this.children}}]),t}(),wt=(n("4160"),n("a15b"),n("159b"),n("1b47")),Pt=n("600b"),St=n("a4d6"),Nt=function(){function t(){Object(f["a"])(this,t)}return Object(b["a"])(t,null,[{key:"changeCase",value:function(t,e){switch(e){case tt.CamelCase:return Object(wt["a"])(t);case tt.PascalCase:return Object(Pt["a"])(t);case tt.SnakeCase:return Object(St["a"])(t)}return t}}]),t}(),Vt=function(){function t(e,n){Object(f["a"])(this,t),this.phpType=e,this.settings=n}return Object(b["a"])(t,[{key:"getPhpTypeNotation",value:function(){return(this.phpType.isNullable()&&""!==this.phpType.getType()?"?":"")+this.phpType.getType()}},{key:"getPhpVarName",value:function(){return Nt.changeCase(this.phpType.getName(),this.settings.propertyCase)}},{key:"getPhpVar",value:function(){return"$"+this.getPhpVarName()}},{key:"getPhpVarWithType",value:function(){return this.getPhpTypeNotation()+(""!==this.phpType.getType()?" ":"")+this.getPhpVar()}},{key:"getDocblockContent",value:function(){return this.phpType.getDocblockContent()+(this.phpType.isNullable()?"|null":"")}},{key:"toString",value:function(){var t="";return(this.phpType.isDocblockRequired()||this.settings.addDocBlocks)&&(t+="\t/** "+this.getDocblockContent()+" */\n"),this.settings.supportsTypedProperties()?t+="\tprivate "+this.getPhpVarWithType():t+="\tprivate "+this.getPhpVar(),t+=";",t}}]),t}(),_t=function(){function t(e,n){Object(f["a"])(this,t),this.type=e,this.settings=n}return Object(b["a"])(t,[{key:"toString",value:function(){var t="";return this.settings.addDocBlocks&&(t+="\t/**\n",t+="\t * @return "+this.type.getPhpTypeNotation()+"\n",t+="\t */\n"),t+="\tpublic function "+Nt.changeCase("get_"+this.type.getPhpVarName(),this.settings.getterCase)+"(): "+this.type.getPhpTypeNotation()+"\n",t+="\t{\n",t+="\t\treturn $this->"+this.type.getPhpVarName()+";\n",t+="\t}\n",t}}]),t}(),Tt=function(){function t(e,n){Object(f["a"])(this,t),this.type=e,this.settings=n}return Object(b["a"])(t,[{key:"toString",value:function(){var t="";return this.settings.addDocBlocks&&(t+="\t/**\n",t+="\t * @var "+this.type.getPhpVarWithType()+"\n",t+="\t * @return void",t+="\t */\n"),t+="\tpublic function "+Nt.changeCase("set_"+this.type.getPhpVarName(),this.settings.setterCase)+"("+this.type.getPhpVarWithType()+"): void",t+="\t{\n",t+="\t\t$this->"+this.type.getPhpVarName()+" = "+this.type.getPhpVar()+";\n",t+="\t}\n",t}}]),t}(),At=function(){function t(e,n){Object(f["a"])(this,t),this.type=e,this.settings=n}return Object(b["a"])(t,[{key:"toString",value:function(){var t="";return this.settings.addDocBlocks&&(t+="\t/**\n",t+="\t * @var "+this.type.getPhpVarWithType()+"\n",t+="\t * @return self\n",t+="\t */\n"),t+="\tpublic function "+Nt.changeCase("set_"+this.type.getPhpVarName(),this.settings.setterCase)+"("+this.type.getPhpVarWithType()+"): self",t+="\t{\n",t+="\t\t$this->"+this.type.getPhpVarName()+" = "+this.type.getPhpVar()+";\n",t+="\t\treturn $this;\n",t+="\t}\n",t}}]),t}(),Dt=function(){function t(e,n){Object(f["a"])(this,t),this.phpClass=e,this.settings=n}return Object(b["a"])(t,[{key:"getClassName",value:function(){return Nt.changeCase(this.phpClass.getName(),this.settings.classCase)}},{key:"toString",value:function(){var e=this,n="\n";n+=(this.settings.finalClasses?"final ":"")+"class "+this.getClassName()+"\n",n+="{\n",this.phpClass.getProperties().forEach((function(t){return t.setSettings(e.settings)}));var a=this.phpClass.getProperties().map((function(t){return new Vt(t,e.settings)}));return n+=a.map((function(t){return t.toString()})).join("\n")+"\n",this.settings.addConstructor&&(n+="\n",this.settings.addDocBlocks&&(n+="\t/**\n",n+=a.map((function(t){return"\t * "+t.getDocblockContent()+" "+t.getPhpVar()})).join("\n")+"\n",n+="\t */\n"),n+="\tpublic constructor("+a.map((function(t){return t.getPhpVarWithType()})).join(", ")+") \n",n+="\t{\n",n+=a.map((function(t){return"\t\t$this->"+t.getPhpVarName()+" = "+t.getPhpVar()})).join(";\n")+"\n",n+="\t}\n"),this.settings.addGetters&&(n+="\n",n+=a.map((function(t){return new _t(t,e.settings).toString()})).join("\n")),this.settings.addSetters&&(n+="\n",this.settings.isFluentSetter?n+=a.map((function(t){return new At(t,e.settings).toString()})).join("\n"):n+=a.map((function(t){return new Tt(t,e.settings).toString()})).join("\n")),n+="}",this.phpClass.getChildren().length>0&&(n+="\n"+this.phpClass.getChildren().map((function(n){return new t(n,e.settings).toString()})).join("\n")),n}}]),t}(),$t=function(){function t(e,n){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e,this.phpClass=n}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return this.getClassName()}},{key:"getDocblockContent",value:function(){return"@var "+this.getClassName()}},{key:"isDocblockRequired",value:function(){return!1}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t}},{key:"getClassName",value:function(){return this.settings?new Dt(this.phpClass,this.settings).getClassName():this.phpClass.getName()}}]),t}(),Et=function(){function t(e){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return"int"}},{key:"getDocblockContent",value:function(){return"@var int"}},{key:"isDocblockRequired",value:function(){return!1}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t}}]),t}(),Ht=function(){function t(e){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return"bool"}},{key:"getDocblockContent",value:function(){return"@var bool"}},{key:"isDocblockRequired",value:function(){return!1}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t}}]),t}(),Bt=function(){function t(e){Object(f["a"])(this,t),this.nullable=!1,this.settings=null,this.name=e}return Object(b["a"])(t,[{key:"getName",value:function(){return this.name}},{key:"getType",value:function(){return""}},{key:"getDocblockContent",value:function(){return"@var mixed"}},{key:"isDocblockRequired",value:function(){return!0}},{key:"isNullable",value:function(){return this.nullable}},{key:"setNullable",value:function(t){this.nullable=t}},{key:"setSettings",value:function(t){this.settings=t}}]),t}(),Ft=function(){function t(){Object(f["a"])(this,t)}return Object(b["a"])(t,null,[{key:"make",value:function(e,n){if("string"===typeof n)return new Ct(e);if("number"===typeof n)return new Et(e);if(Array.isArray(n)){var a=t.make(e,n[0]);if(null!==a)return new kt(e,a)}else{if(n instanceof xt)return new $t(e,n);if("boolean"===typeof n)return new Ht(e)}var s=new Bt(e);return null===n&&s.setNullable(!0),s}}]),t}(),Mt=function(){function t(){Object(f["a"])(this,t)}return Object(b["a"])(t,null,[{key:"make",value:function(t,e){var n=[],a=[];if(Array.isArray(t)){var s=this.getTypeAndClassFromArray(e,t);return null!==s[0]&&a.push(s[0]),n.push(s[1]),new xt(e,n,a)}if(t instanceof Object)for(var r=Object.keys(t),i=0,l=r;i<l.length;i++){var u=l[i],o=null,c=t[u];if(Array.isArray(c)){var h=this.getTypeAndClassFromArray(u,c);null!==h[0]&&a.push(h[0]),o=h[1]}else if("object"===Object(Ot["a"])(c)&&null!==c){var p=this.make(c,u);a.push(p),o=Ft.make(u,p)}else o=Ft.make(u,c);n.push(o)}return new xt(e,n,a)}},{key:"getTypeAndClassFromArray",value:function(t,e){var n,a=this.makeOneClassFromArray(e,t);return n=null!==a?Ft.make(t,[a]):Ft.make(t,e),[a,n]}},{key:"makeOneClassFromArray",value:function(e,n){var a,s=[],r=Object(jt["a"])(e);try{for(r.s();!(a=r.n()).done;){var i=a.value,l=Ft.make(n,i);if(!(l instanceof Bt))return null;s.push(t.make(i,n))}}catch(u){r.e(u)}finally{r.f()}return 0===s.length?null:new xt(n,this.mergeProperties(s))}},{key:"mergeProperties",value:function(t){var e,n=[],a=Object(jt["a"])(t);try{for(a.s();!(e=a.n()).done;){var s,r=e.value,i=Object(jt["a"])(r.getProperties());try{var l=function(){var t=s.value,e=n.find((function(e){return e.getName()===t.getName()}));if(e)return t.isNullable()&&e.setNullable(!0),"continue";n.push(t)};for(i.s();!(s=i.n()).done;)l()}catch(p){i.e(p)}finally{i.f()}}}catch(p){a.e(p)}finally{a.f()}var u,o=n.map((function(t){return t.getName()})),c=Object(jt["a"])(t);try{var h=function(){var t,e=u.value,a=e.getProperties().map((function(t){return t.getName()})),s=o.filter((function(t){return!a.includes(t)})),r=Object(jt["a"])(s);try{var i=function(){var e=t.value,a=n.find((function(t){return t.getName()===e}));a&&a.setNullable(!0)};for(r.s();!(t=r.n()).done;)i()}catch(p){r.e(p)}finally{r.f()}};for(c.s();!(u=c.n()).done;)h()}catch(p){c.e(p)}finally{c.f()}return n}}]),t}(),Rt=function(){function t(){Object(f["a"])(this,t)}return Object(b["a"])(t,null,[{key:"make",value:function(t){var e;try{e=JSON.parse(t)}catch(n){throw new Error("Unable to decode json content")}return Mt.make(e,"RootObject")}}]),t}(),qt=function(t){Object(v["a"])(n,t);var e=Object(g["a"])(n);function n(){var t;return Object(f["a"])(this,n),t=e.apply(this,arguments),t.jsonContent="",t.class=null,t.settings=new mt,t.errorMessage="",t}return Object(b["a"])(n,[{key:"onJsonContentChange",value:function(t){this.jsonContent=t}},{key:"code",get:function(){if(this.errorMessage="",!this.jsonContent)return null;try{this.class=Rt.make(this.jsonContent)}catch(t){return this.errorMessage=t.message,null}return new Dt(this.class,this.settings).toString()}}]),n}(y["d"]);qt=Object(d["b"])([Object(y["a"])({components:{Alert:w,Card:A,Code:R,Settings:ht,TextArea:yt}})],qt);var Gt=qt,Jt=Gt,Wt=Object(i["a"])(Jt,h,p,!1,null,null,null),zt=Wt.exports;a["a"].use(c["a"]);var Lt=[{path:"/",name:"Home",component:zt}],It=new c["a"]({mode:"hash",base:"https://jacobdekeizer.github.io/json-to-php-generator/",routes:Lt}),Ut=It;n("7d32");a["a"].config.productionTip=!1,new a["a"]({router:Ut,render:function(t){return t(o)}}).$mount("#app")}});
//# sourceMappingURL=app.7f17aa82.js.map