var B={},w={get exports(){return B},set exports(a){B=a}},x={},E={get exports(){return x},set exports(a){x=a}};(function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",y={rotl:function(f,l){return f<<l|f>>>32-l},rotr:function(f,l){return f<<32-l|f>>>l},endian:function(f){if(f.constructor==Number)return y.rotl(f,8)&16711935|y.rotl(f,24)&4278255360;for(var l=0;l<f.length;l++)f[l]=y.endian(f[l]);return f},randomBytes:function(f){for(var l=[];f>0;f--)l.push(Math.floor(Math.random()*256));return l},bytesToWords:function(f){for(var l=[],c=0,i=0;c<f.length;c++,i+=8)l[i>>>5]|=f[c]<<24-i%32;return l},wordsToBytes:function(f){for(var l=[],c=0;c<f.length*32;c+=8)l.push(f[c>>>5]>>>24-c%32&255);return l},bytesToHex:function(f){for(var l=[],c=0;c<f.length;c++)l.push((f[c]>>>4).toString(16)),l.push((f[c]&15).toString(16));return l.join("")},hexToBytes:function(f){for(var l=[],c=0;c<f.length;c+=2)l.push(parseInt(f.substr(c,2),16));return l},bytesToBase64:function(f){for(var l=[],c=0;c<f.length;c+=3)for(var i=f[c]<<16|f[c+1]<<8|f[c+2],h=0;h<4;h++)c*8+h*6<=f.length*8?l.push(a.charAt(i>>>6*(3-h)&63)):l.push("=");return l.join("")},base64ToBytes:function(f){f=f.replace(/[^A-Z0-9+\/]/ig,"");for(var l=[],c=0,i=0;c<f.length;i=++c%4)i!=0&&l.push((a.indexOf(f.charAt(c-1))&Math.pow(2,-2*i+8)-1)<<i*2|a.indexOf(f.charAt(c))>>>6-i*2);return l}};E.exports=y})();var d={utf8:{stringToBytes:function(a){return d.bin.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(d.bin.bytesToString(a)))}},bin:{stringToBytes:function(a){for(var y=[],f=0;f<a.length;f++)y.push(a.charCodeAt(f)&255);return y},bytesToString:function(a){for(var y=[],f=0;f<a.length;f++)y.push(String.fromCharCode(a[f]));return y.join("")}}},T=d;/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var H=function(a){return a!=null&&(_(a)||M(a)||!!a._isBuffer)};function _(a){return!!a.constructor&&typeof a.constructor.isBuffer=="function"&&a.constructor.isBuffer(a)}function M(a){return typeof a.readFloatLE=="function"&&typeof a.slice=="function"&&_(a.slice(0,0))}(function(){var a=x,y=T.utf8,f=H,l=T.bin,c=function(i,h){i.constructor==String?h&&h.encoding==="binary"?i=l.stringToBytes(i):i=y.stringToBytes(i):f(i)?i=Array.prototype.slice.call(i,0):!Array.isArray(i)&&i.constructor!==Uint8Array&&(i=i.toString());for(var u=a.bytesToWords(i),s=i.length*8,t=1732584193,r=-271733879,o=-1732584194,n=271733878,e=0;e<u.length;e++)u[e]=(u[e]<<8|u[e]>>>24)&16711935|(u[e]<<24|u[e]>>>8)&4278255360;u[s>>>5]|=128<<s%32,u[(s+64>>>9<<4)+14]=s;for(var p=c._ff,v=c._gg,F=c._hh,g=c._ii,e=0;e<u.length;e+=16){var S=t,A=r,I=o,C=n;t=p(t,r,o,n,u[e+0],7,-680876936),n=p(n,t,r,o,u[e+1],12,-389564586),o=p(o,n,t,r,u[e+2],17,606105819),r=p(r,o,n,t,u[e+3],22,-1044525330),t=p(t,r,o,n,u[e+4],7,-176418897),n=p(n,t,r,o,u[e+5],12,1200080426),o=p(o,n,t,r,u[e+6],17,-1473231341),r=p(r,o,n,t,u[e+7],22,-45705983),t=p(t,r,o,n,u[e+8],7,1770035416),n=p(n,t,r,o,u[e+9],12,-1958414417),o=p(o,n,t,r,u[e+10],17,-42063),r=p(r,o,n,t,u[e+11],22,-1990404162),t=p(t,r,o,n,u[e+12],7,1804603682),n=p(n,t,r,o,u[e+13],12,-40341101),o=p(o,n,t,r,u[e+14],17,-1502002290),r=p(r,o,n,t,u[e+15],22,1236535329),t=v(t,r,o,n,u[e+1],5,-165796510),n=v(n,t,r,o,u[e+6],9,-1069501632),o=v(o,n,t,r,u[e+11],14,643717713),r=v(r,o,n,t,u[e+0],20,-373897302),t=v(t,r,o,n,u[e+5],5,-701558691),n=v(n,t,r,o,u[e+10],9,38016083),o=v(o,n,t,r,u[e+15],14,-660478335),r=v(r,o,n,t,u[e+4],20,-405537848),t=v(t,r,o,n,u[e+9],5,568446438),n=v(n,t,r,o,u[e+14],9,-1019803690),o=v(o,n,t,r,u[e+3],14,-187363961),r=v(r,o,n,t,u[e+8],20,1163531501),t=v(t,r,o,n,u[e+13],5,-1444681467),n=v(n,t,r,o,u[e+2],9,-51403784),o=v(o,n,t,r,u[e+7],14,1735328473),r=v(r,o,n,t,u[e+12],20,-1926607734),t=F(t,r,o,n,u[e+5],4,-378558),n=F(n,t,r,o,u[e+8],11,-2022574463),o=F(o,n,t,r,u[e+11],16,1839030562),r=F(r,o,n,t,u[e+14],23,-35309556),t=F(t,r,o,n,u[e+1],4,-1530992060),n=F(n,t,r,o,u[e+4],11,1272893353),o=F(o,n,t,r,u[e+7],16,-155497632),r=F(r,o,n,t,u[e+10],23,-1094730640),t=F(t,r,o,n,u[e+13],4,681279174),n=F(n,t,r,o,u[e+0],11,-358537222),o=F(o,n,t,r,u[e+3],16,-722521979),r=F(r,o,n,t,u[e+6],23,76029189),t=F(t,r,o,n,u[e+9],4,-640364487),n=F(n,t,r,o,u[e+12],11,-421815835),o=F(o,n,t,r,u[e+15],16,530742520),r=F(r,o,n,t,u[e+2],23,-995338651),t=g(t,r,o,n,u[e+0],6,-198630844),n=g(n,t,r,o,u[e+7],10,1126891415),o=g(o,n,t,r,u[e+14],15,-1416354905),r=g(r,o,n,t,u[e+5],21,-57434055),t=g(t,r,o,n,u[e+12],6,1700485571),n=g(n,t,r,o,u[e+3],10,-1894986606),o=g(o,n,t,r,u[e+10],15,-1051523),r=g(r,o,n,t,u[e+1],21,-2054922799),t=g(t,r,o,n,u[e+8],6,1873313359),n=g(n,t,r,o,u[e+15],10,-30611744),o=g(o,n,t,r,u[e+6],15,-1560198380),r=g(r,o,n,t,u[e+13],21,1309151649),t=g(t,r,o,n,u[e+4],6,-145523070),n=g(n,t,r,o,u[e+11],10,-1120210379),o=g(o,n,t,r,u[e+2],15,718787259),r=g(r,o,n,t,u[e+9],21,-343485551),t=t+S>>>0,r=r+A>>>0,o=o+I>>>0,n=n+C>>>0}return a.endian([t,r,o,n])};c._ff=function(i,h,u,s,t,r,o){var n=i+(h&u|~h&s)+(t>>>0)+o;return(n<<r|n>>>32-r)+h},c._gg=function(i,h,u,s,t,r,o){var n=i+(h&s|u&~s)+(t>>>0)+o;return(n<<r|n>>>32-r)+h},c._hh=function(i,h,u,s,t,r,o){var n=i+(h^u^s)+(t>>>0)+o;return(n<<r|n>>>32-r)+h},c._ii=function(i,h,u,s,t,r,o){var n=i+(u^(h|~s))+(t>>>0)+o;return(n<<r|n>>>32-r)+h},c._blocksize=16,c._digestsize=16,w.exports=function(i,h){if(i==null)throw new Error("Illegal argument "+i);var u=a.wordsToBytes(c(i,h));return h&&h.asBytes?u:h&&h.asString?l.bytesToString(u):a.bytesToHex(u)}})();export{B as m};