// Вкладки «ещё»: что нового, ивенты, долги, статистика, предложка.
// Подключается к index.html отдельным файлом или вставкой кода в конец страницы (см. инструкцию).
(function () {
  // --- генератор QR-кодов (qrcode-generator, MIT, Kazuhiko Arase) ---
  var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1})},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(o*r,n*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(){var t=n("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)},function(t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports&&(module.exports=t())}(function(){return qrcode});
  // --- конец генератора QR ---
  const css = `
  .mcard{display:flex;align-items:center;gap:12px;width:100%;font:inherit;text-align:left;color:var(--text);background:var(--card);border:2px solid var(--line);border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer}
  .mcard .ic{font-size:26px;width:36px;text-align:center}
  .back{font:inherit;background:transparent;border:0;color:var(--dim);font-size:15px;padding:4px 0 10px;cursor:pointer}
  .xin{width:100%;font:inherit;font-size:16px;padding:10px 12px;margin:6px 0;color:var(--text);background:var(--deep);border:2px solid var(--line);border-radius:10px}
  .xin:focus{outline:3px solid var(--gold)}
  textarea.xin{resize:none;font-size:15px}
  .box{background:var(--deep);border:2px solid var(--line);border-radius:14px;padding:14px;margin-bottom:10px}
  .box .t{font-size:17px;margin-bottom:4px}
  .bar{height:8px;background:var(--bg);border-radius:6px;overflow:hidden;margin:4px 0 8px}
  .bar i{display:block;height:100%;background:var(--gold)}
  .cm2{font-size:13px;margin-top:3px;white-space:pre-wrap;word-break:break-word;color:var(--dim)}
  .mini{font:inherit;font-size:13px;padding:6px 10px;border:0;border-radius:8px;background:var(--gold);color:#3a0000;font-weight:bold;cursor:pointer}
  .mini.alt{background:transparent;color:var(--text);border:2px solid var(--line)}
  .ovl{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px}
  .ovl.full{background:var(--bg);align-items:flex-start;overflow:auto}
  .gbox{width:100%;max-width:440px;background:var(--deep);border:2px solid var(--line);border-radius:16px;padding:16px;margin:auto}
  .mc{aspect-ratio:1;font:inherit;font-size:18px;border:2px solid var(--line);border-radius:8px;background:var(--card);color:var(--text);cursor:pointer;padding:0}
  .mc.open{background:var(--bg);border-color:transparent}
  .qrbox{background:#fff;border-radius:14px;padding:12px;display:flex;justify-content:center;margin:10px 0}
  .qrbox svg{width:100%;max-width:280px;height:auto}
  .rcpt{background:var(--deep);border:2px dashed var(--line);border-radius:14px;padding:16px;margin:8px 0}
  .rcpt .r2{display:flex;justify-content:space-between;gap:10px;padding:5px 0;font-size:14px;border-bottom:1px dotted var(--line)}
  .spark{display:flex;align-items:flex-end;gap:2px;height:36px;margin-top:6px}
  .spark i{flex:1;background:var(--gold);border-radius:2px 2px 0 0;min-height:3px}
  .codebig{font-size:22px;letter-spacing:1px;margin:8px 0;word-break:break-all}
  .qrbox{background:#fff;border-radius:12px;padding:10px;max-width:280px;margin:10px auto}
  .qrbox svg{display:block;width:100%;height:auto}
  .rcpt{background:var(--deep);border:2px dashed var(--line);border-radius:14px;padding:14px;margin:10px 0}
  .rcpt .rw{display:flex;justify-content:space-between;gap:10px;padding:4px 0;font-size:14px}
  .rcpt .rw span:last-child{text-align:right;word-break:break-word}
  `;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // ---- сессия (вход по приватному коду) и защита ----
  const SKEY = "vitelo_session";
  const getSess = () => { try { return localStorage.getItem(SKEY) || ""; } catch (e) { return ""; } };
  const setSess = t => { try { localStorage.setItem(SKEY, t); } catch (e) {} };
  const origFetch = window.fetch.bind(window);
  let unlockPromise = null, gateEl = null;
  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); tg.showAlert("скопировано"); }
    catch (e) { tg.showAlert(text); }
  };

  window.fetch = async function (url, opts) {
    if (typeof url !== "string" || !url.startsWith(API_URL)) return origFetch(url, opts);
    const withSess = o => { o = Object.assign({}, o); o.headers = Object.assign({}, o.headers, {"X-Wallet-Session": getSess()}); return o; };
    const r = await origFetch(url, withSess(opts));
    if (r.status === 403 && !url.includes("/api/gate/")) {
      const j = await r.clone().json().catch(() => ({}));
      if (j.need === "unlock") { if (await askUnlock()) return origFetch(url, withSess(opts)); }
      else if (j.need === "register") { showGate(); }
    }
    return r;
  };

  function askUnlock() {
    if (unlockPromise) return unlockPromise;
    unlockPromise = new Promise(resolve => {
      const m = document.createElement("div");
      m.className = "ovl";
      m.innerHTML = `<div class="gbox"><div class="t">🔒 разблокируй кошелёк</div>
        <div class="s" style="margin:6px 0">введи свой приватный код (12 цифр), чтобы менять данные кошелька на этом устройстве.</div>
        <input class="xin" id="ulc" inputmode="numeric" maxlength="20" placeholder="приватный код" autocomplete="off">
        <div class="s" id="ule" style="color:#ffb0b0"></div>
        <button class="send" id="ulok" style="margin-top:6px">разблокировать</button>
        <button class="back" id="ulno">отмена</button>
        <div class="s">потерял код? напиши Витьку, он сбросит.</div></div>`;
      document.body.appendChild(m);
      const done = ok => { m.remove(); unlockPromise = null; resolve(ok); };
      m.querySelector("#ulno").onclick = () => done(false);
      m.querySelector("#ulok").onclick = async () => {
        m.querySelector("#ulok").disabled = true;
        try { const r = await api("/api/gate/unlock", {code: m.querySelector("#ulc").value}); setSess(r.session); done(true); }
        catch (e) { m.querySelector("#ule").textContent = e.message; m.querySelector("#ulok").disabled = false; }
      };
    });
    return unlockPromise;
  }

  // ---- регистрация кошелька: код в личку → сапёр → приватный код ----
  async function showGate() {
    if (gateEl) return;
    gateEl = document.createElement("div");
    gateEl.className = "ovl full";
    document.body.appendChild(gateEl);
    await gateStep();
  }

  async function gateStep() {
    let s;
    try { s = await api("/api/gate/status"); }
    catch (e) { gateEl.innerHTML = `<div class="gbox"><div class="empty">${esc(e.message)}</div></div>`; return; }
    if (!s.need) { gateEl.remove(); gateEl = null; load().then(openPendingPay); return; }
    if (s.step === "dm") stepDm(s); else if (s.step === "human") stepHuman(s); else stepPin(s);
  }

  function stepDm(s) {
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 1 из 3</div><div class="t">🔐 регистрация кошелька</div>
      <div class="s" style="margin:6px 0">чтобы пользоваться кошельком, нужно подтвердить, что ты настоящий человек. сначала напиши боту в личку (если ещё не писал), потом нажми «отправить код»: бот пришлёт 12-значный код.</div>
      <button class="mini alt" id="gbot">открыть бота</button>
      <button class="send" id="gsend" style="margin-top:8px">отправить код</button>
      <div id="gcode" style="display:none"><input class="xin" id="gin" inputmode="numeric" maxlength="20" placeholder="код из личных сообщений" autocomplete="off"><button class="send" id="gok">подтвердить</button></div>
      <div class="s" id="gerr" style="color:#ffb0b0;margin-top:6px"></div></div>`;
    const err = m => { gateEl.querySelector("#gerr").textContent = m; };
    gateEl.querySelector("#gbot").onclick = () => tg.openTelegramLink ? tg.openTelegramLink("https://t.me/" + s.bot) : window.open("https://t.me/" + s.bot);
    gateEl.querySelector("#gsend").onclick = async () => {
      err("");
      try { await api("/api/gate/send_code", {}); gateEl.querySelector("#gcode").style.display = "block"; err("код отправлен тебе в личку от бота"); }
      catch (e) { err(e.message); }
    };
    gateEl.querySelector("#gok").onclick = async () => {
      err("");
      try { await api("/api/gate/verify_code", {code: gateEl.querySelector("#gin").value}); gateStep(); }
      catch (e) { err(e.message); }
    };
  }

  function stepHuman(s) {
    const W = s.mines.w, Hh = s.mines.h, N = s.mines.n;
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 2 из 3</div><div class="t">💣 докажи, что ты человек</div>
      <div class="s" style="margin:6px 0">открой все клетки без мин (мин: ${N}). первая клетка всегда безопасна.</div>
      <div id="mgrid" style="display:grid;grid-template-columns:repeat(${W},1fr);gap:4px;margin:10px 0"></div>
      <div class="s" id="mmsg"></div></div>`;
    const grid = gateEl.querySelector("#mgrid"), msg = t => { gateEl.querySelector("#mmsg").textContent = t; };
    let locked = true;
    const cell = (x, y) => grid.children[y * W + x];
    async function startGame() {
      try { await api("/api/gate/mines/start", {}); } catch (e) { msg(e.message); return; }
      grid.innerHTML = "";
      for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) {
        const b = document.createElement("button");
        b.className = "mc"; b.onclick = () => reveal(x, y); grid.appendChild(b);
      }
      msg(""); locked = false;
    }
    async function reveal(x, y) {
      if (locked) return;
      locked = true;
      try {
        const r = await api("/api/gate/mines/reveal", {x, y});
        r.cells.forEach(([cx, cy, n]) => { const b = cell(cx, cy); b.className = "mc open"; b.textContent = n || ""; b.disabled = true; });
        if (r.status === "lost" || r.status === "too_fast") {
          (r.mines || []).forEach(([mx, my]) => { cell(mx, my).textContent = "💥"; });
          msg(r.status === "lost" ? "бум! попробуй ещё раз" : "слишком быстро, ты точно человек? попробуй ещё раз");
          setTimeout(startGame, 1800); return;
        }
        if (r.status === "won") { msg("готово!"); setTimeout(gateStep, 600); return; }
      } catch (e) { msg(e.message); }
      locked = false;
    }
    startGame();
  }

  function stepPin(s) {
    gateEl.innerHTML = `<div class="gbox"><div class="s">шаг 3 из 3</div><div class="t">🔑 твои коды кошелька</div>
      <div class="s" style="margin:6px 0">сейчас тебе выдадут два кода. <b>общественный</b> можно давать всем: по нему тебе могут перекинуть виткоины. <b>приватный</b> нельзя никому давать, он нужен для входа. показывается один раз!</div>
      <button class="send" id="gmk">создать мои коды</button>
      <div id="gres"></div><div class="s" id="gerr" style="color:#ffb0b0"></div></div>`;
    gateEl.querySelector("#gmk").onclick = async () => {
      gateEl.querySelector("#gmk").disabled = true;
      try {
        const r = await api("/api/gate/pin/create", {});
        setSess(r.session);
        gateEl.querySelector("#gmk").style.display = "none";
        gateEl.querySelector("#gres").innerHTML = `
          <div class="s">общественный код (можно делиться):</div><div class="codebig">${esc(r.public_code)}</div>
          <div class="s">приватный код (никому, запиши сейчас):</div><div class="codebig" style="color:var(--gold)">${esc(r.private_code)}</div>
          <button class="mini alt" id="gcp">скопировать приватный</button>
          <button class="send" id="gdone" style="margin-top:10px">я записал(а), войти</button>`;
        gateEl.querySelector("#gcp").onclick = () => copyText(r.private_code);
        gateEl.querySelector("#gdone").onclick = gateStep;
      } catch (e) { gateEl.querySelector("#gerr").textContent = e.message; gateEl.querySelector("#gmk").disabled = false; }
    };
  }

  let sub = null, isOwner = false, admTab = "people", admUser = null, qrScreen = null, qrToken = null, qrReceiptData = null;
  let qrState = {mode: "main"}, pendingPay = null;
  const date = d => new Date(d + "T00:00:00Z").toLocaleDateString("ru-RU");
  const alive = box => box.isConnected;
  const err = (box, e) => { if (alive(box)) box.innerHTML = `<div class="empty">${esc(e.message)}</div>`; };

  // ---- подмена render: добавляем кнопку «ещё» и содержимое вкладки ----
  const baseRender = render;
  render = function () {
    baseRender();
    const nav = document.querySelector("nav");
    if (!nav) return;
    const b = document.createElement("button");
    b.textContent = "ещё";
    b.className = tab === "more" ? "on" : "";
    b.onclick = () => { tab = "more"; sub = null; admUser = null; qrState = {mode: "main"}; render(); };
    nav.appendChild(b);
    if (tab === "more") showMore(nav.nextElementSibling);
  };

  function showMore(div) {
    if (!sub) {
      div.innerHTML = `
        <button class="mcard" data-s="news"><span class="ic">📰</span><span><div class="t">что нового</div><div class="s">последние обновления бота</div></span></button>
        <button class="mcard" data-s="events"><span class="ic">🎃</span><span><div class="t">ивенты</div><div class="s">конкурсы и призы</div></span></button>
        <button class="mcard" data-s="debts"><span class="ic">🧾</span><span><div class="t">долги</div><div class="s">кто кому должен, с комментариями</div></span></button>
        <button class="mcard" data-s="code"><span class="ic">🪪</span><span><div class="t">перекинуть по коду кошелька</div><div class="s">твой общественный код, чаевые и донаты</div></span></button>
        <button class="mcard" data-s="qr"><span class="ic">🔳</span><span><div class="t">QR-код</div><div class="s">оплата по QR: создать свой или отсканировать</div></span></button>
        <button class="mcard" data-s="rates"><span class="ic">📈</span><span><div class="t">курс</div><div class="s">курс валют и как пользуются виткоинами</div></span></button>
        <button class="mcard" data-s="stats"><span class="ic">📊</span><span><div class="t">статистика</div><div class="s">сколько людей в боте и как давно он работает</div></span></button>
        ${isOwner ? `<button class="mcard" data-s="admin"><span class="ic">🛠</span><span><div class="t">админка</div><div class="s">игроки, предметы, подозрительные</div></span></button>` : ""}
        <button class="mcard" data-s="suggest"><span class="ic">💡</span><span><div class="t">предложка</div><div class="s">идея для бота? напиши Витьку</div></span></button>`;
      div.querySelectorAll(".mcard").forEach(c => c.onclick = () => { sub = c.dataset.s; qrScreen = null; render(); });
      return;
    }
    div.innerHTML = `<button class="back">← назад</button><div id="sub"><div class="empty">загружаю…</div></div>`;
    div.querySelector(".back").onclick = () => { sub = null; render(); };
    const box = div.querySelector("#sub");
    ({news: viewNews, events: viewEvents, debts: viewDebts, code: viewCode, qr: viewQr, rates: viewRates, stats: viewStats, admin: viewAdmin, suggest: viewSuggest})[sub](box);
  }

  // ---- что нового ----
  async function viewNews(box) {
    try {
      const info = await api("/api/info");
      if (!alive(box)) return;
      box.innerHTML = info.updates.map(u => `
        <div class="box"><div class="t">${esc(u.title)}</div><div class="s">${esc(date(u.date))}</div>
        <div class="cm2" style="color:var(--text)">${esc(u.text)}</div></div>`).join("");
    } catch (e) { err(box, e); }
  }

  // ---- ивенты ----
  async function viewEvents(box) {
    try {
      const info = await api("/api/info");
      if (!alive(box)) return;
      box.innerHTML = info.events.map(ev => {
        const rows = [["roulette", "сыграть в русскую рулетку"], ["transfers", "перевести виткоины кому-то"]].map(([k, label]) => {
          const need = ev.need[k], have = Math.min(ev.progress[k], need);
          return `<div class="s">${label}: ${have}/${need}</div><div class="bar"><i style="width:${Math.round(have / need * 100)}%"></i></div>`;
        }).join("");
        const ready = ev.progress.roulette >= ev.need.roulette && ev.progress.transfers >= ev.need.transfers;
        let btn;
        if (ev.joined) btn = `<div class="t">✅ ты участвуешь</div>`;
        else if (ev.ended) btn = `<div class="s">ивент закончился</div>`;
        else btn = `<button class="send" data-j="${esc(ev.id)}" ${ready ? "" : "disabled"}>${ready ? "участвовать" : "выполни условия"}</button>`;
        const wins = ev.winners.length ? `<div class="h">победители</div><div class="s">${ev.winners.map(esc).join(", ")}</div>` : "";
        return `<div class="box"><div class="t">🎃 ${esc(ev.title)}</div>
          <div class="s">${esc(ev.desc)}</div>
          <div class="s">приз: ${esc(ev.prize)}</div>
          <div class="s">${esc(date(ev.start))} — ${esc(date(ev.end))} · участников: ${ev.participants}</div>
          <div class="h">условия</div>${rows}${btn}${wins}</div>`;
      }).join("") || `<div class="empty">пока ивентов нет</div>`;
      box.querySelectorAll("[data-j]").forEach(b => b.onclick = async () => {
        b.disabled = true;
        try {
          await api("/api/events/join", {event_id: b.dataset.j});
          tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
          tg.showAlert("ты в игре! удачи в розыгрыше");
          viewEvents(box);
        } catch (e) { b.disabled = false; tg.showAlert(e.message); }
      });
    } catch (e) { err(box, e); }
  }

  // ---- долги ----
  async function viewDebts(box) {
    try {
      const d = await api("/api/debts");
      if (!alive(box)) return;
      const item = (x, mine) => `
        <div class="row"><div class="grow"><div class="t">${esc(x.name)} · ${fmt(x.amount)} в.</div>
        ${x.comment ? `<div class="cm2">💬 ${esc(x.comment)}</div>` : ""}
        <div class="s">${new Date(x.ts * 1000).toLocaleDateString("ru-RU")}</div></div>
        <button class="mini ${mine ? "alt" : ""}" data-${mine ? "f" : "p"}="${x.id}">${mine ? "простить" : "погасить"}</button></div>`;
      box.innerHTML = `
        <div class="h">мне должны</div>${d.owed_to_me.map(x => item(x, true)).join("") || `<div class="s">никто ничего не должен</div>`}
        <div class="h">я должен</div>${d.i_owe.map(x => item(x, false)).join("") || `<div class="s">ты чист как слеза</div>`}
        <div class="h">записать долг</div>
        <input class="xin" id="dq" placeholder="кто должен? найти по нику…" autocomplete="off">
        <div id="dlist" class="mlist"></div>
        <input class="xin" id="damt" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько виткоинов">
        <textarea class="xin" id="dnote" rows="2" maxlength="200" placeholder="за что? (комментарий)"></textarea>
        <div class="s" id="dsel">выбери должника</div>
        <button class="send" id="dok" disabled style="margin-top:8px">записать долг</button>`;

      box.querySelectorAll("[data-p]").forEach(b => b.onclick = () => ask("погасить этот долг? виткоины спишутся сразу.", async () => {
        await api("/api/debts/pay", {id: Number(b.dataset.p)}); done("долг погашен"); }));
      box.querySelectorAll("[data-f]").forEach(b => b.onclick = () => ask("простить долг? он исчезнет.", async () => {
        await api("/api/debts/forgive", {id: Number(b.dataset.f)}); done("долг прощён"); }));

      let picked = null, timer = null, sid = 0;
      const ready = () => {
        const a = parseFloat(($("#damt").value || "").replace(",", "."));
        $("#dok").disabled = !(picked && a >= 0.01);
      };
      async function find() {
        const my = ++sid, q = $("#dq").value.trim();
        try {
          const r = await api("/api/contacts?q=" + encodeURIComponent(q));
          if (my !== sid || !alive(box)) return;
          $("#dlist").innerHTML = r.contacts.length
            ? r.contacts.map(c => `<button class="ct${picked && picked.id === c.id ? " on" : ""}" data-id="${c.id}" data-name="${esc(c.name)}">${esc(c.name)}</button>`).join("")
            : `<div class="s">${r.searching ? "никого не нашёл" : "начни вводить ник"}</div>`;
          $("#dlist").querySelectorAll(".ct").forEach(b => b.onclick = () => {
            picked = {id: Number(b.dataset.id), name: b.dataset.name};
            $("#dlist").querySelectorAll(".ct").forEach(x => x.classList.toggle("on", x === b));
            $("#dsel").textContent = "должник: " + picked.name; ready();
          });
        } catch (e) { $("#dlist").innerHTML = `<div class="s">${esc(e.message)}</div>`; }
      }
      $("#dq").oninput = () => { clearTimeout(timer); timer = setTimeout(find, 300); };
      $("#damt").oninput = ready;
      find();
      $("#dok").onclick = async () => {
        $("#dok").disabled = true;
        try {
          const amount = Math.round(parseFloat($("#damt").value.replace(",", ".")) * 100) / 100;
          await api("/api/debts", {debtor: picked.id, amount, comment: $("#dnote").value.trim()});
          done("долг записан, должнику ушло уведомление");
        } catch (e) { $("#dok").disabled = false; tg.showAlert(e.message); }
      };
    } catch (e) { err(box, e); }

    function ask(text, fn) {
      const go = async ok => { if (!ok) return; try { await fn(); } catch (e) { tg.showAlert(e.message); } };
      if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
    }
    async function done(msg) {
      tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
      try { state = await api("/api/me"); } catch (e) {}
      tg.showAlert(msg);
      render();
    }
  }


  // ---- статистика ----
  const dur = sec => {
    sec = Math.floor(sec || 0);
    const d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60);
    return (d ? d + "д " : "") + (h || d ? h + "ч " : "") + m + "м";
  };
  async function viewStats(box) {
    try {
      const s = await api("/api/stats");
      if (!alive(box)) return;
      const max = Math.max(1, ...s.hourly.map(x => x.n));
      const bars = s.hourly.map(x => `<div title="${x.n}" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:80px"><div style="height:${Math.max(2, Math.round(x.n / max * 80))}px;background:var(--gold);border-radius:3px 3px 0 0"></div></div>`).join("");
      const labels = s.hourly.map((x, i) => `<div style="flex:1;text-align:center;font-size:10px;color:var(--dim)">${i % 6 === 0 ? new Date(x.h * 1000).getHours() : ""}</div>`).join("");
      const status = s.online
        ? `🟢 бот в сети уже ${dur(s.uptime)}`
        : `🔴 бот сейчас не в сети${s.last_online ? ", последний раз был " + new Date(s.last_online * 1000).toLocaleString("ru-RU") : ""}`;
      box.innerHTML = `
        <div class="box"><div class="t">${esc(status)}</div>
          <div class="s">всего проработал: ${dur(s.uptime_total)}</div></div>
        <div class="box">
          <div class="row"><div class="grow t">всего пользователей</div><div class="cnt">${s.total_users}</div></div>
          <div class="row"><div class="grow t">активны за 24 часа</div><div class="cnt">${s.active_24h}</div></div>
          <div class="row"><div class="grow t">активны за 7 дней</div><div class="cnt">${s.active_7d}</div></div>
          <div class="row"><div class="grow t">действий за 24 часа</div><div class="cnt">${s.events_24h}</div></div>
        </div>
        <div class="box"><div class="t">активность по часам</div>
          <div class="s">последние 24 часа, твоё время</div>
          <div style="display:flex;gap:2px;margin-top:8px">${bars}</div>
          <div style="display:flex;gap:2px">${labels}</div></div>`;
    } catch (e) { err(box, e); }
  }


  // ---- перекинуть по коду кошелька ----
  async function viewCode(box) {
    try {
      const w = await api("/api/wallet");
      if (!alive(box)) return;
      box.innerHTML = `
        <div class="box"><div class="t">🪪 твой общественный код</div>
          <div class="s">его можно отправить другу, кинуть в канал или в чат: по нему тебе могут перекинуть виткоины (на чай, в долг, в поддержку). списать с кошелька по нему ничего нельзя.</div>
          <div class="codebig">${esc(w.public_code)}</div>
          <button class="mini" id="cpy">скопировать</button>
          <div class="s" style="margin-top:8px">приватный код (его показали при регистрации) никому не давай: он нужен только для входа.</div></div>
        <div class="box"><div class="t">перекинуть по коду</div>
          <input class="xin" id="cc" inputmode="numeric" maxlength="20" placeholder="код получателя (12 цифр)" autocomplete="off">
          <div class="s" id="cwho">введи 12 цифр</div>
          <input class="xin" id="ca" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько виткоинов">
          <textarea class="xin" id="cn" rows="2" maxlength="200" placeholder="комментарий (необязательно)"></textarea>
          <button class="send" id="cok" disabled style="margin-top:6px">отправить</button></div>`;
      $("#cpy").onclick = () => copyText(w.public_code);
      let who = null, timer = null, sid = 0;
      const ready = () => { const a = parseFloat(($("#ca").value || "").replace(",", ".")); $("#cok").disabled = !(who && a >= 0.01); };
      async function lookup() {
        const my = ++sid, digits = $("#cc").value.replace(/\D/g, "");
        who = null; ready();
        if (digits.length !== 12) { $("#cwho").textContent = "введи 12 цифр"; return; }
        try {
          const r = await api("/api/wallet/lookup?code=" + digits);
          if (my !== sid || !alive(box)) return;
          if (r.self) { $("#cwho").textContent = "это твой собственный код"; return; }
          who = {code: digits, name: r.name}; $("#cwho").textContent = "получатель: " + r.name; ready();
        } catch (e) { if (my === sid && alive(box)) $("#cwho").textContent = e.message; }
      }
      $("#cc").oninput = () => { clearTimeout(timer); timer = setTimeout(lookup, 300); };
      $("#ca").oninput = ready;
      $("#cok").onclick = () => {
        const amount = Math.round(parseFloat($("#ca").value.replace(",", ".")) * 100) / 100;
        const text = `перекинуть ${fmt(amount)} в. игроку ${who.name}?`;
        const go = async ok => {
          if (!ok) return;
          $("#cok").disabled = true;
          try {
            await api("/api/transfer_code", {code: who.code, amount, comment: $("#cn").value.trim()});
            tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
            try { state = await api("/api/me"); } catch (e) {}
            tg.showAlert(`готово! ${fmt(amount)} в. переданы игроку ${who.name}`);
            render();
          } catch (e) { $("#cok").disabled = false; tg.showAlert(e.message); }
        };
        if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
      };
    } catch (e) { err(box, e); }
  }


  // ---- АДМИНКА (видна только владельцу бота) ----
  const ago = ts => {
    if (!ts) return "—";
    const s = Math.floor(Date.now() / 1000 - ts);
    if (s < 90) return "только что";
    if (s < 3600) return Math.floor(s / 60) + " мин назад";
    if (s < 86400) return Math.floor(s / 3600) + " ч назад";
    return Math.floor(s / 86400) + " д назад";
  };
  const confirmAsk = (text, fn) => {
    const go = async ok => { if (!ok) return; try { await fn(); } catch (e) { tg.showAlert(e.message); } };
    if (tg.showConfirm) tg.showConfirm(text, go); else go(window.confirm(text));
  };

  async function viewAdmin(box) {
    if (admUser) return viewAdminUser(box);
    const tabs = [["people", "люди"], ["sus", "подозрительные"], ["feed", "лента"]];
    box.innerHTML = `<div style="display:flex;gap:6px;margin-bottom:10px">${tabs.map(([k, n]) =>
      `<button class="mini ${admTab === k ? "" : "alt"}" data-at="${k}">${n}</button>`).join("")}</div><div id="adm"><div class="empty">загружаю…</div></div>`;
    box.querySelectorAll("[data-at]").forEach(b => b.onclick = () => { admTab = b.dataset.at; viewAdmin(box); });
    const body = box.querySelector("#adm");
    try {
      if (admTab === "people") await admPeople(body);
      else if (admTab === "sus") await admSus(body, box);
      else await admFeed(body);
    } catch (e) { if (alive(body)) body.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
  }

  async function admPeople(body) {
    body.innerHTML = `<input class="xin" id="aq" placeholder="найти игрока по нику…" autocomplete="off"><div id="alist"></div>`;
    let timer = null, sid = 0;
    async function find() {
      const my = ++sid;
      const list = await api("/api/admin/users?q=" + encodeURIComponent($("#aq").value.trim()));
      if (my !== sid || !alive(body)) return;
      $("#alist").innerHTML = list.length ? list.map(u => `
        <div class="row" style="cursor:pointer" data-u="${u.id}"><div class="grow"><div class="t">${esc(u.name)} ${u.flagged ? "⚠️" : ""}${u.is_banned ? "🔒" : ""}${u.bot_banned ? "⛔" : ""}</div>
        <div class="s">заходил: ${ago(u.last_seen)}</div></div><div class="cnt">${fmt(u.balance)}</div></div>`).join("")
        : `<div class="empty">никого не нашёл</div>`;
      $("#alist").querySelectorAll("[data-u]").forEach(r => r.onclick = () => { admUser = Number(r.dataset.u); render(); });
    }
    $("#aq").oninput = () => { clearTimeout(timer); timer = setTimeout(() => find().catch(() => {}), 300); };
    await find();
  }

  async function admSus(body, box) {
    const s = await api("/api/admin/suspicious");
    if (!alive(body)) return;
    body.innerHTML = `<div class="s" style="margin-bottom:8px">правила: до ${s.rules.daily} игр в рулетку за 24 часа; от ${s.rules.hourly} игр за час похоже на майнинг; ${s.rules.burst} переводов за ${s.rules.burst_min} мин или перевод от ${s.rules.big} считаются подозрительными. числа меняются в common.py.</div>` +
      (s.list.length ? s.list.map(x => `<div class="box"><div class="t">⚠️ ${esc(x.name)}</div>
        ${x.reasons.map(r => `<div class="cm2">• ${esc(r)}</div>`).join("")}
        <button class="mini" style="margin-top:8px" data-o="${x.id}">открыть</button></div>`).join("")
        : `<div class="empty">подозрительных нет, все ведут себя хорошо</div>`);
    body.querySelectorAll("[data-o]").forEach(b => b.onclick = () => { admUser = Number(b.dataset.o); render(); });
  }

  async function admFeed(body) {
    const f = await api("/api/admin/feed");
    if (!alive(body)) return;
    const when = ts => new Date(ts * 1000).toLocaleString("ru-RU");
    body.innerHTML = `<div class="h">действия админа</div>` + (f.admin.map(l => `<div class="row"><div class="grow"><div class="t">${esc(l.action)} · ${esc(l.name)}</div>
      <div class="s">${esc(l.details || "")} · ${when(l.ts)}</div></div></div>`).join("") || `<div class="s">пока пусто</div>`) +
      `<div class="h">последние операции игроков</div>` + f.tx.map(t => `<div class="row"><div class="grow"><div class="t">${esc(t.name)}: ${esc(t.note)}</div>
      <div class="s">${when(t.ts)}</div></div><div class="${t.amount >= 0 ? "plus" : "minus"}">${t.amount >= 0 ? "+" : ""}${fmt(t.amount)}</div></div>`).join("");
  }

  async function viewAdminUser(box) {
    box.innerHTML = `<button class="back">← к списку</button><div id="ac"><div class="empty">загружаю…</div></div>`;
    box.querySelector(".back").onclick = () => { admUser = null; render(); };
    const outerBack = box.parentElement && box.parentElement.querySelector(":scope > .back");
    if (outerBack) outerBack.style.display = "none";   // чтобы не было двух кнопок «назад» подряд
    const c = box.querySelector("#ac");
    const reload = () => viewAdminUser(box);
    try {
      const u = await api("/api/admin/user?user_id=" + admUser);
      if (!alive(c)) return;
      const names = {ascorbinka: "Аскорбинка", adrenaline: "Адреналин", stop: "Стоп", god_item: "Артефакт Бога"};
      c.innerHTML = `
        <div class="box"><div class="t">${esc(u.name)}</div>
          <div class="s">id ${u.id} · заходил: ${ago(u.last_seen)} · регистрация кошелька: ${u.registered ? "пройдена" : "нет"}</div>
          <div class="s">рулетка за 24 часа: ${u.roulette_24h} из ${u.limit} (всего записано: ${u.roulette_total})</div>
          <div class="s">общественный код: ${esc(u.public_code)}</div>
          <div class="bal" style="font-size:30px;color:var(--gold);margin-top:6px">${fmt(u.balance)}</div>
          ${u.reasons.length ? u.reasons.map(r => `<div class="cm2" style="color:#ffb0b0">⚠️ ${esc(r)}</div>`).join("") : ""}</div>
        <div class="h">предметы</div>
        ${Object.keys(names).map(k => `<div class="row"><div class="grow t">${names[k]}</div><div class="cnt">${u.inventory[k]}</div>
          <button class="mini alt" data-i="${k}" data-d="-1">−1</button><button class="mini" data-i="${k}" data-d="1">+1</button></div>`).join("")}
        <div class="h">баланс</div>
        <input class="xin" id="abd" type="number" step="0.01" placeholder="сколько (с минусом, чтобы забрать)">
        <input class="xin" id="abr" maxlength="200" placeholder="причина (увидит только админ и игрок в истории)">
        <button class="send" id="abok">применить</button>
        <div class="h">доступ</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="mini ${u.is_banned ? "" : "alt"}" id="afw">${u.is_banned ? "🔓 разблокировать кошелёк" : "🔒 заблокировать кошелёк"}</button>
          <button class="mini ${u.bot_banned ? "" : "alt"}" id="afb">${u.bot_banned ? "✅ разрешить бота" : "⛔ запретить бота"}</button>
          <button class="mini alt" id="afp">сбросить приватный код</button></div>
        <div class="h">последние операции</div>
        ${u.transactions.map(t => `<div class="row"><div class="grow"><div class="t">${esc(t.note)}</div>${t.comment ? `<div class="cm2">💬 ${esc(t.comment)}</div>` : ""}
          <div class="s">${new Date(t.ts * 1000).toLocaleString("ru-RU")}</div></div>
          <div class="${t.amount >= 0 ? "plus" : "minus"}">${t.amount >= 0 ? "+" : ""}${fmt(t.amount)}</div></div>`).join("") || `<div class="s">операций нет</div>`}`;

      c.querySelectorAll("[data-i]").forEach(b => b.onclick = () => {
        const d = Number(b.dataset.d), nm = names[b.dataset.i];
        confirmAsk(`${d > 0 ? "выдать" : "забрать"}: ${nm} ×1 (${u.name})?`, async () => {
          await api("/api/admin/item", {user_id: u.id, item: b.dataset.i, delta: d}); reload(); });
      });
      c.querySelector("#abok").onclick = () => {
        const delta = parseFloat(c.querySelector("#abd").value.replace(",", "."));
        if (!delta) { tg.showAlert("укажи сумму"); return; }
        confirmAsk(`изменить баланс ${u.name} на ${delta > 0 ? "+" : ""}${fmt(delta)}?`, async () => {
          await api("/api/admin/balance", {user_id: u.id, delta, reason: c.querySelector("#abr").value.trim()}); reload(); });
      };
      c.querySelector("#afw").onclick = () => confirmAsk(`${u.is_banned ? "разблокировать" : "заблокировать"} кошелёк ${u.name}?`, async () => {
        await api("/api/admin/flag", {user_id: u.id, field: "is_banned", value: !u.is_banned}); reload(); });
      c.querySelector("#afb").onclick = () => confirmAsk(`${u.bot_banned ? "разрешить" : "запретить"} ${u.name} пользоваться ботом?`, async () => {
        await api("/api/admin/flag", {user_id: u.id, field: "bot_banned", value: !u.bot_banned}); reload(); });
      c.querySelector("#afp").onclick = () => confirmAsk(`сбросить приватный код ${u.name}? ему придётся создать новый.`, async () => {
        await api("/api/admin/reset_pin", {user_id: u.id}); tg.showAlert("сброшено"); reload(); });
    } catch (e) { if (alive(c)) c.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
  }


  // ---- QR-код: оплата ----
  const qrSvg = text => { const q = qrcode(0, "M"); q.addData(text); q.make(); return q.createSvgTag({cellSize: 6, margin: 4, scalable: true}); };
  const parseToken = t => { const m = String(t || "").match(/pay_([A-Za-z0-9_-]{8,64})/); return m ? m[1] : (/^[A-Za-z0-9_-]{8,64}$/.test(String(t || "").trim()) ? String(t).trim() : null); };
  const fdate = ts => new Date(ts * 1000).toLocaleString("ru-RU");
  const qrGo = (mode, extra) => { qrState = Object.assign({mode}, extra || {}); render(); };

  function openPendingPay() {
    if (!pendingPay || !state) return;
    const t = pendingPay; pendingPay = null;
    tab = "more"; sub = "qr"; admUser = null; qrGo("pay", {token: t});
  }

  function receiptText(r) {
    return `чек №${r.no}\nдата: ${fdate(r.ts)}\nот: ${r.from}\nкому: ${r.to}\nсумма: ${fmt(r.amount)} в.\nцель: ${r.purpose || "не указана"}`;
  }

  function qrBack(box, label, fn) {
    const outer = box.parentElement && box.parentElement.querySelector(":scope > .back");
    if (outer) outer.style.display = "none";
    const b = document.createElement("button");
    b.className = "back"; b.textContent = label || "← назад"; b.onclick = fn;
    box.prepend(b);
  }

  async function viewQr(box) {
    const m = qrState.mode;
    if (m === "main") return qrMain(box);
    box.innerHTML = `<div class="empty">загружаю…</div>`;
    qrBack(box, "← к QR-кодам", () => qrGo("main"));
    const body = document.createElement("div");
    box.appendChild(body);
    try {
      if (m === "create") qrCreate(body);
      else if (m === "show") qrShow(body);
      else if (m === "scan") qrScan(body);
      else if (m === "pay") await qrPay(body);
      else if (m === "receipt") qrReceipt(body);
    } catch (e) { if (alive(body)) body.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
    const loading = box.querySelector(":scope > .empty"); if (loading) loading.remove();
  }

  async function qrMain(box) {
    try {
      const d = await api("/api/qr/mine");
      if (!alive(box)) return;
      box.innerHTML = `
        <button class="send" id="qcr">🔳 создать QR для оплаты</button>
        <button class="send" id="qsc" style="background:var(--card);color:var(--text);border:2px solid var(--line)">📷 сканировать QR</button>
        <div class="h">мои QR-коды</div>
        ${d.requests.map(q => `<div class="row"><div class="grow"><div class="t">${q.amount === null ? "любая сумма" : fmt(q.amount) + " в."}</div>
          ${q.purpose ? `<div class="cm2">${esc(q.purpose)}</div>` : ""}<div class="s">действует до ${fdate(q.expires_ts)}</div></div>
          <button class="mini" data-sh="${q.id}">показать</button></div>`).join("") || `<div class="s">пока нет открытых QR</div>`}
        <div class="h">мои чеки</div>
        ${d.receipts.map(r => `<div class="row" style="cursor:pointer" data-rc="${r.id}"><div class="grow"><div class="t">чек №${esc(r.no)} · ${r.direction === "paid" ? "оплатил " + esc(r.to) : "получил от " + esc(r.from)}</div>
          ${r.purpose ? `<div class="cm2">${esc(r.purpose)}</div>` : ""}<div class="s">${fdate(r.ts)}</div></div>
          <div class="${r.direction === "paid" ? "minus" : "plus"}">${r.direction === "paid" ? "-" : "+"}${fmt(r.amount)}</div></div>`).join("") || `<div class="s">чеков пока нет</div>`}`;
      box.querySelector("#qcr").onclick = () => qrGo("create");
      box.querySelector("#qsc").onclick = () => qrGo("scan");
      box.querySelectorAll("[data-sh]").forEach(b => b.onclick = () => qrGo("show", {data: d.requests.find(x => x.id === Number(b.dataset.sh))}));
      box.querySelectorAll("[data-rc]").forEach(r => r.onclick = () => qrGo("receipt", {data: d.receipts.find(x => x.id === Number(r.dataset.rc))}));
    } catch (e) { err(box, e); }
  }

  function qrCreate(body) {
    body.innerHTML = `
      <div class="box"><div class="t">новый QR для оплаты</div>
        <div class="s">сколько должны заплатить? оставь пустым, чтобы платили любую сумму (подходит для донатов: такой QR многоразовый).</div>
        <input class="xin" id="qa" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сумма в виткоинах (необязательно)">
        <textarea class="xin" id="qp" rows="2" maxlength="120" placeholder="цель оплаты: за что платят? (попадёт в чек)"></textarea>
        <div class="s">срок действия:</div>
        <select class="xin" id="qh"><option value="1">1 час</option><option value="24" selected>24 часа</option><option value="168">7 дней</option><option value="720">30 дней</option></select>
        <button class="send" id="qok" style="margin-top:6px">создать QR</button></div>`;
    $("#qok").onclick = async () => {
      $("#qok").disabled = true;
      const av = $("#qa").value.trim();
      try {
        const r = await api("/api/qr/create", {amount: av === "" ? null : parseFloat(av.replace(",", ".")),
          purpose: $("#qp").value.trim(), hours: Number($("#qh").value)});
        tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
        qrGo("show", {data: r});
      } catch (e) { $("#qok").disabled = false; tg.showAlert(e.message); }
    };
  }

  function qrShow(body) {
    const q = qrState.data;
    body.innerHTML = `
      <div class="box" style="text-align:center"><div class="t">${q.amount === null ? "любая сумма" : fmt(q.amount) + " в."}</div>
        ${q.purpose ? `<div class="cm2">${esc(q.purpose)}</div>` : ""}
        <div class="qrbox">${qrSvg(q.link)}</div>
        <div class="s">покажи этот QR плательщику. он наведёт камеру телефона или нажмёт «сканировать QR» в этом приложении.</div>
        <div class="s">действует до ${fdate(q.expires_ts)}</div>
        <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:8px">
          <button class="mini" id="qcp">скопировать ссылку</button>
          <button class="mini alt" id="qsh">поделиться</button>
          ${q.id ? `<button class="mini alt" id="qcn">отменить QR</button>` : ""}</div></div>`;
    $("#qcp").onclick = () => copyText(q.link);
    $("#qsh").onclick = () => { const u = "https://t.me/share/url?url=" + encodeURIComponent(q.link) + "&text=" + encodeURIComponent("оплата по QR"); tg.openTelegramLink ? tg.openTelegramLink(u) : window.open(u); };
    if (q.id) $("#qcn").onclick = () => confirmAsk("отменить этот QR? по нему больше нельзя будет заплатить.", async () => {
      await api("/api/qr/cancel", {id: q.id}); qrGo("main"); });
  }

  function qrScan(body) {
    const can = tg.showScanQrPopup && (!tg.isVersionAtLeast || tg.isVersionAtLeast("6.4"));
    body.innerHTML = `
      <div class="box"><div class="t">📷 сканировать QR</div>
        ${can ? `<button class="send" id="qcam" style="margin-top:6px">открыть камеру</button>` : `<div class="s">камера в этом приложении недоступна, наведи на QR обычную камеру телефона или вставь ссылку:</div>`}
        <input class="xin" id="qlink" placeholder="или вставь ссылку / код из QR" autocomplete="off">
        <button class="send" id="qfind" style="margin-top:6px">найти</button></div>`;
    const open = t => { const tk = parseToken(t); if (!tk) { tg.showAlert("это не похоже на QR-код оплаты"); return false; } qrGo("pay", {token: tk}); return true; };
    if (can) $("#qcam").onclick = () => tg.showScanQrPopup({text: "наведи камеру на QR-код оплаты"}, txt => { open(txt); return true; });
    $("#qfind").onclick = () => open($("#qlink").value);
  }

  async function qrPay(body) {
    const q = await api("/api/qr/info?token=" + encodeURIComponent(qrState.token));
    if (!alive(body)) return;
    const stText = {paid: "этот QR уже оплачен", cancelled: "этот QR отменён", expired: "срок QR истёк"}[q.state];
    body.innerHTML = `
      <div class="box"><div class="t">оплата по QR</div>
        <div class="s">получатель</div><div class="t" style="margin-bottom:6px">${esc(q.receiver)}</div>
        <div class="s">цель</div><div class="t" style="margin-bottom:6px">${q.purpose ? esc(q.purpose) : "не указана"}</div>
        ${q.amount === null
          ? `<div class="s">сумма (по этому QR можно платить любую)</div><input class="xin" id="pa" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сколько заплатить">`
          : `<div class="s">сумма</div><div class="t" style="font-size:24px;color:var(--gold);margin-bottom:6px">${fmt(q.amount)} в.</div>`}
        <div class="s">твой баланс: ${fmt(state.balance)} в.</div>
        ${stText ? `<div class="t" style="margin-top:8px;color:#ffb0b0">${stText}</div>`
          : q.mine ? `<div class="t" style="margin-top:8px">это твой собственный QR</div>`
          : `<button class="send" id="ppay" style="margin-top:8px">оплатить</button>`}</div>`;
    const btn = $("#ppay");
    if (!btn) return;
    btn.onclick = () => {
      const amount = q.amount !== null ? q.amount : Math.round(parseFloat(($("#pa").value || "").replace(",", ".")) * 100) / 100;
      if (!(amount >= 0.01)) { tg.showAlert("укажи сумму"); return; }
      confirmAsk(`оплатить ${fmt(amount)} в.\nполучатель: ${q.receiver}\nцель: ${q.purpose || "не указана"}`, async () => {
        btn.disabled = true;
        try {
          const rc = await api("/api/qr/pay", {token: q.token, amount: q.amount === null ? amount : null});
          tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
          try { state = await api("/api/me"); } catch (e) {}
          qrGo("receipt", {data: rc, fresh: true});
        } catch (e) { btn.disabled = false; throw e; }
      });
    };
  }

  function qrReceipt(body) {
    const r = qrState.data;
    body.innerHTML = `
      ${qrState.fresh ? `<div class="t" style="font-size:20px;text-align:center">✅ оплата прошла</div>` : ""}
      <div class="rcpt"><div class="t" style="text-align:center;margin-bottom:6px">чек №${esc(r.no)}</div>
        <div class="rw"><span>дата</span><span>${fdate(r.ts)}</span></div>
        <div class="rw"><span>от</span><span>${esc(r.from)}</span></div>
        <div class="rw"><span>кому</span><span>${esc(r.to)}</span></div>
        <div class="rw"><span>сумма</span><span style="color:var(--gold)">${fmt(r.amount)} в.</span></div>
        <div class="rw"><span>цель</span><span>${r.purpose ? esc(r.purpose) : "не указана"}</span></div></div>
      <div style="display:flex;gap:6px;justify-content:center"><button class="mini" id="rcp">скопировать чек</button><button class="mini alt" id="rok">готово</button></div>`;
    $("#rcp").onclick = () => copyText(receiptText(r));
    $("#rok").onclick = () => qrGo("main");
  }


  // ---- QR-счета и чеки ----
  const fmtDate = ts => new Date(ts * 1000).toLocaleString("ru-RU");
  const parseTok = text => { const m = /pay_([A-Za-z0-9_-]{8,32})/.exec(text || ""); return m ? m[1] : null; };

  async function viewQr(box) {
    const inner = qrScreen && qrScreen !== "main";
    if (inner) {
      box.innerHTML = `<button class="back" id="qback">← назад</button><div id="qbody"><div class="empty">загружаю…</div></div>`;
      box.querySelector("#qback").onclick = () => { qrScreen = null; render(); };
      const outerBack = box.parentElement && box.parentElement.querySelector(":scope > .back");
      if (outerBack) outerBack.style.display = "none";
      const body = box.querySelector("#qbody");
      try {
        if (qrScreen === "create") qrCreate(body);
        else if (qrScreen === "show") await qrShow(body);
        else if (qrScreen === "pay") await qrPay(body);
        else if (qrScreen === "receipt") qrReceiptView(body);
      } catch (e) { if (alive(body)) body.innerHTML = `<div class="empty">${esc(e.message)}</div>`; }
      return;
    }
    box.innerHTML = `
      <div style="display:flex;gap:8px"><button class="send" id="qc" style="flex:1">создать счёт</button>
        <button class="send" id="qs" style="flex:1">сканировать</button></div>
      <div id="qmine"></div><div id="qrec"></div>`;
    box.querySelector("#qc").onclick = () => { qrScreen = "create"; render(); };
    box.querySelector("#qs").onclick = () => {
      if (!tg.showScanQrPopup) { tg.showAlert("сканер недоступен в этой версии Telegram. открой ссылку со счёта."); return; }
      tg.showScanQrPopup({text: "наведи камеру на QR-код оплаты"}, text => {
        const t = parseTok(text);
        if (!t) return false;           // не наш QR, продолжаем сканировать
        qrToken = t; qrScreen = "pay"; render(); return true;
      });
    };
    try {
      const [mine, recs] = await Promise.all([api("/api/pay/mine"), api("/api/pay/receipts")]);
      if (!alive(box)) return;
      box.querySelector("#qmine").innerHTML = mine.length ? `<div class="h">мои открытые счета</div>` + mine.map(m => `
        <div class="row" style="cursor:pointer" data-t="${esc(m.token)}"><div class="grow"><div class="t">${fmt(m.amount)} в.</div>
        <div class="s">${esc(m.purpose || "без цели")} · до ${fmtDate(m.expires)}</div></div><div class="s">QR ›</div></div>`).join("") : "";
      box.querySelectorAll("#qmine [data-t]").forEach(r => r.onclick = () => { qrToken = r.dataset.t; qrScreen = "show"; render(); });
      box.querySelector("#qrec").innerHTML = `<div class="h">чеки</div>` + (recs.length ? recs.map(c => `
        <div class="row" style="cursor:pointer" data-n="${c.no}"><div class="grow"><div class="t">чек №${c.no} · ${c.direction === "out" ? "→ " + esc(c.to) : "← " + esc(c.from)}</div>
        <div class="s">${esc(c.purpose || "без цели")} · ${fmtDate(c.ts)}</div></div>
        <div class="${c.direction === "out" ? "minus" : "plus"}">${c.direction === "out" ? "-" : "+"}${fmt(c.amount)}</div></div>`).join("")
        : `<div class="s">чеков пока нет</div>`);
      box.querySelectorAll("#qrec [data-n]").forEach(r => r.onclick = () => { qrReceiptData = recs.find(c => c.no === Number(r.dataset.n)); qrScreen = "receipt"; render(); });
    } catch (e) { err(box, e); }
  }

  function qrCreate(body) {
    body.innerHTML = `<div class="box"><div class="t">🔳 новый счёт</div>
      <div class="s">создай QR, и тот, кто его отсканирует, сможет оплатить ровно эту сумму.</div>
      <input class="xin" id="qa" type="number" inputmode="decimal" step="0.01" min="0.01" placeholder="сумма в виткоинах">
      <textarea class="xin" id="qp" rows="2" maxlength="200" placeholder="цель (за что платят): попадёт в чек"></textarea>
      <select class="xin" id="qh"><option value="1">действует 1 час</option><option value="24" selected>действует 24 часа</option><option value="168">действует 7 дней</option></select>
      <button class="send" id="qok" disabled>создать QR</button></div>`;
    const ready = () => { const a = parseFloat((body.querySelector("#qa").value || "").replace(",", ".")); body.querySelector("#qok").disabled = !(a >= 0.01); };
    body.querySelector("#qa").oninput = ready;
    body.querySelector("#qok").onclick = async () => {
      body.querySelector("#qok").disabled = true;
      try {
        const r = await api("/api/pay/create", {amount: Math.round(parseFloat(body.querySelector("#qa").value.replace(",", ".")) * 100) / 100,
          purpose: body.querySelector("#qp").value.trim(), hours: Number(body.querySelector("#qh").value)});
        qrToken = r.token; qrScreen = "show"; render();
      } catch (e) { body.querySelector("#qok").disabled = false; tg.showAlert(e.message); }
    };
  }

  async function qrShow(body) {
    const q = await api("/api/pay/qr?token=" + encodeURIComponent(qrToken));
    if (!alive(body)) return;
    body.innerHTML = `<div class="box"><div class="t">счёт на ${fmt(q.amount)} в.</div>
      <div class="s">${esc(q.purpose || "без цели")} · действует до ${fmtDate(q.expires)}</div>
      ${q.status !== "open" ? `<div class="t" style="color:#ffb0b0;margin-top:6px">статус: ${esc({paid: "оплачен", expired: "срок истёк", cancelled: "отменён"}[q.status] || q.status)}</div>` : ""}
      <div class="qrbox">${q.svg || `<div style="color:#333;text-align:center;font-size:13px">QR не создан: на компьютере с API выполни <b>pip install segno</b> и перезапусти API. пока можно отправить ссылку ниже.</div>`}</div>
      <div class="s" style="word-break:break-all">${esc(q.link)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="mini" id="qcp">скопировать ссылку</button>
        <button class="mini alt" id="qsh">поделиться</button>
        ${q.status === "open" ? `<button class="mini alt" id="qcn">отменить счёт</button>` : ""}</div></div>`;
    body.querySelector("#qcp").onclick = () => copyText(q.link);
    body.querySelector("#qsh").onclick = () => {
      const u = "https://t.me/share/url?url=" + encodeURIComponent(q.link) + "&text=" + encodeURIComponent(`счёт на ${fmt(q.amount)} виткоинов${q.purpose ? ": " + q.purpose : ""}`);
      if (tg.openTelegramLink) tg.openTelegramLink(u); else window.open(u);
    };
    const cn = body.querySelector("#qcn");
    if (cn) cn.onclick = () => confirmAsk("отменить этот счёт? по QR уже нельзя будет оплатить.", async () => {
      await api("/api/pay/cancel", {token: qrToken}); qrScreen = null; render(); });
  }

  async function qrPay(body) {
    const d = await api("/api/pay/request?token=" + encodeURIComponent(qrToken));
    if (!alive(body)) return;
    const stText = {paid: "этот счёт уже оплачен", expired: "срок этого счёта истёк", cancelled: "этот счёт отменён"}[d.status];
    body.innerHTML = `<div class="box"><div class="t">💸 оплата по QR</div>
      <div class="row"><div class="grow s">кому</div><div class="t">${esc(d.to)}</div></div>
      <div class="row"><div class="grow s">сумма</div><div class="t" style="color:var(--gold)">${fmt(d.amount)} в.</div></div>
      <div class="row"><div class="grow s">цель</div><div class="t">${esc(d.purpose || "не указана")}</div></div>
      <div class="s" style="margin-top:6px">действует до ${fmtDate(d.expires)} · твой баланс: ${fmt(state.balance)} в.</div>
      ${stText ? `<div class="t" style="color:#ffb0b0;margin-top:8px">${stText}</div>` : d.mine ? `<div class="t" style="margin-top:8px">это твой собственный счёт: его оплачивает другой человек</div>` : `<button class="send" id="qpay" style="margin-top:10px">оплатить ${fmt(d.amount)} в.</button>`}
      </div>`;
    const pb = body.querySelector("#qpay");
    if (pb) pb.onclick = () => confirmAsk(`оплатить ${fmt(d.amount)} в. получателю ${d.to}?`, async () => {
      pb.disabled = true;
      try {
        const r = await api("/api/pay/pay", {token: qrToken});
        tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
        try { state = await api("/api/me"); } catch (e) {}
        qrReceiptData = r.receipt; qrScreen = "receipt"; render();
      } catch (e) { pb.disabled = false; throw e; }
    });
  }

  function qrReceiptView(body) {
    const c = qrReceiptData;
    if (!c) { body.innerHTML = `<div class="empty">чек не найден</div>`; return; }
    body.innerHTML = `<div class="rcpt"><div class="t" style="text-align:center;font-size:18px">✅ чек №${c.no}</div>
      <div class="r2"><span class="s">дата</span><span>${fmtDate(c.ts)}</span></div>
      <div class="r2"><span class="s">от кого</span><span>${esc(c.from)}</span></div>
      <div class="r2"><span class="s">кому</span><span>${esc(c.to)}</span></div>
      <div class="r2"><span class="s">сумма</span><b style="color:var(--gold)">${fmt(c.amount)} в.</b></div>
      <div class="r2" style="border:0"><span class="s">цель</span><span style="text-align:right">${esc(c.purpose || "не указана")}</span></div></div>
      <button class="send" id="qdone">готово</button>`;
    body.querySelector("#qdone").onclick = () => { qrScreen = null; render(); };
  }

  // ---- курс валют ----
  const nstr = x => { const s = Number(x).toFixed(4); return s.replace(/0+$/, "").replace(/\.$/, ""); };
  async function viewRates(box) {
    try {
      const d = await api("/api/rates");
      if (!alive(box)) return;
      const s = d.stats;
      const spark = h => { if (h.length < 2) return ""; const lo = Math.min(...h.map(x => x.rate)), hi = Math.max(...h.map(x => x.rate)), span = (hi - lo) || 1;
        return `<div class="spark">${h.map(x => `<i title="${nstr(x.rate)}" style="height:${Math.round(12 + (x.rate - lo) / span * 24)}px"></i>`).join("")}</div>`; };
      box.innerHTML = `
        <div class="box"><div class="t">📈 курс к виткоину</div>
          ${d.rates.length ? d.rates.map(r => `<div style="margin:10px 0"><div class="row" style="border:0;padding:4px 0"><div class="grow"><div class="t">1 ${esc(r.name)} = ${nstr(r.rate)} в.</div>
            <div class="s">${r.bot ? esc(r.bot) + " · " : ""}обновлён ${fmtDate(r.updated)}</div></div>
            ${r.change_pct == null ? "" : `<div class="${r.change_pct >= 0 ? "plus" : "minus"}">${r.change_pct >= 0 ? "+" : ""}${r.change_pct}%</div>`}</div>${spark(r.history)}</div>`).join("")
            : `<div class="s">курсы пока не выставлены</div>`}</div>
        <div class="box"><div class="t">как пользуются виткоинами</div>
          <div class="row"><div class="grow t">в обороте (без владельца)</div><div class="cnt">${fmt(s.circulation)}</div></div>
          <div class="row"><div class="grow t">игроков с виткоинами</div><div class="cnt">${s.holders}</div></div>
          <div class="row"><div class="grow t">переводов за 24 часа</div><div class="cnt">${s.transfers_24h}</div></div>
          <div class="row"><div class="grow t">объём переводов за 24 часа</div><div class="cnt">${fmt(s.volume_24h)}</div></div>
          <div class="row"><div class="grow t">оплат по QR за 24 часа</div><div class="cnt">${s.qr_payments_24h}</div></div>
          <div class="row"><div class="grow t">активных за 24 часа</div><div class="cnt">${s.active_24h}</div></div></div>
        ${d.owner ? `<div class="box"><div class="t">выставить курс (только владелец)</div>
          <input class="xin" id="rc" placeholder="валюта одним словом, например серкойн" maxlength="20">
          <input class="xin" id="rv" type="number" inputmode="decimal" step="0.0001" placeholder="сколько виткоинов за 1 штуку">
          <input class="xin" id="rn" placeholder="название для показа (необязательно)" maxlength="60">
          <div style="display:flex;gap:8px"><button class="send" id="rok" style="flex:2">сохранить</button><button class="send" id="rdel" style="flex:1;background:transparent;color:var(--text);border:2px solid var(--line)">убрать</button></div></div>` : ""}`;
      if (d.owner) {
        box.querySelector("#rok").onclick = async () => {
          try { await api("/api/admin/rate", {code: box.querySelector("#rc").value, rate: parseFloat(box.querySelector("#rv").value.replace(",", ".")) || 0, name: box.querySelector("#rn").value}); viewRates(box); }
          catch (e) { tg.showAlert(e.message); } };
        box.querySelector("#rdel").onclick = () => confirmAsk("убрать этот курс?", async () => {
          await api("/api/admin/rate/delete", {code: box.querySelector("#rc").value}); viewRates(box); });
      }
    } catch (e) { err(box, e); }
  }

  // ссылка вида ...?startapp=pay_XXXX открывает экран оплаты сразу
  (function deepLink() {
    const sp = tg.initDataUnsafe && tg.initDataUnsafe.start_param;
    if (!sp || !/^pay_/.test(sp)) return;
    const t0 = Date.now();
    const iv = setInterval(() => {
      if (state && !gateEl) { clearInterval(iv); tab = "more"; sub = "qr"; qrToken = sp.slice(4); qrScreen = "pay"; render(); }
      else if (Date.now() - t0 > 60000) clearInterval(iv);
    }, 300);
  })();

  // ---- предложка ----
  function viewSuggest(box) {
    box.innerHTML = `
      <div class="box"><div class="t">💡 предложка</div>
      <div class="s">напиши идею, баг или что хочешь добавить. сообщение придёт Витьку в личку.</div>
      <textarea class="xin" id="sg" rows="5" maxlength="500" placeholder="например: хочу дуэли на ставку…"></textarea>
      <div class="s" id="sgc" style="text-align:right">0/500</div>
      <button class="send" id="sgok" disabled style="margin-top:8px">отправить</button></div>`;
    $("#sg").oninput = () => { $("#sgc").textContent = $("#sg").value.length + "/500"; $("#sgok").disabled = $("#sg").value.trim().length < 5; };
    $("#sgok").onclick = async () => {
      $("#sgok").disabled = true;
      try {
        await api("/api/suggest", {text: $("#sg").value.trim()});
        tg.HapticFeedback && tg.HapticFeedback.notificationOccurred("success");
        $("#sg").value = ""; $("#sgc").textContent = "0/500";
        tg.showAlert("отправлено! спасибо");
      } catch (e) { $("#sgok").disabled = false; tg.showAlert(e.message); }
    };
  }

  // при запуске узнаём, нужна ли регистрация кошелька
  (async function () {
    try {
      const sp = (tg.initDataUnsafe && tg.initDataUnsafe.start_param) || "";
      if (/^pay_[A-Za-z0-9_-]{8,64}$/.test(sp)) pendingPay = sp.slice(4);
      const s = await api("/api/gate/status");
      isOwner = !!s.owner;
      if (s.need === "register") showGate();
      else {
        if (!state) load();
        const t0 = Date.now();
        const iv = setInterval(() => { if (state) { clearInterval(iv); openPendingPay(); } else if (Date.now() - t0 > 6000) clearInterval(iv); }, 100);
      }
    } catch (e) {}
  })();
})();
