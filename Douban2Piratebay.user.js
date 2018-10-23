// ==UserScript==
// @name         Douban2Piratebay Beta
// @namespace    https://github.com/housiliao/Douban2Piratebay/
// @version      0.6.1
// @description  And direct link to piratebay from douban movie page.
// @author       bitdust&distbq
// @match        https://movie.douban.com/subject/*
// @updateURL    https://raw.githubusercontent.com/housiliao/Douban2Piratebay/beta/Douban2Piratebay.meta.js
// @downloadURL  https://raw.githubusercontent.com/housiliao/Douban2Piratebay/beta/Douban2Piratebay.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function addLink(fragment, text, href){
        let a = imdblink.cloneNode(true);
        a.textContent = text;
        a.href = href;
        fragment.appendChild(a);
    }


    var title = $('html head title').text();
    var keyword = title.replace( '(\u8c46\u74e3)', '' ).trim();	//去掉标题中的 (豆瓣) 结尾


    var links =  document.querySelectorAll (
        "#info > a"
    );
    var imdblink = null;
    var imdbRe = new RegExp("tt[0-9]{4,}");
    for (var i=0; i<links.length; i++) {
        if(imdbRe.test(links[i].textContent)) {
            imdblink = links[i];
            break;
        }
    }

    if (imdblink !== null) {
       var imdbindex = imdblink.innerText;
       var fragment = document.createDocumentFragment();
       var br = document.createElement("br");
       var span = imdblink.previousElementSibling.cloneNode(false);
       span.textContent = "\u8d44\u6e90: ";	//资源
       fragment.appendChild(br);
       fragment.appendChild(span);
       addLink(fragment, "TPB ", 'https://thepiratebay.org/search/' + imdbindex);
       addLink(fragment, "RARGB ", 'https://rarbgmirror.com/torrents.php?imdb=' + imdbindex);
       addLink(fragment, "HD\u6e7e ", 'http://www.hdwan.net/?s=' + imdbindex);	//HD湾
       addLink(fragment, "\u7535\u5f71\u5929\u5802 ", 'http://www.btrr.net/?s=' + imdbindex);	//电影天堂
       addLink(fragment, "ed2k ", 'https://www.google.com/search?hl=zh-CN&q=' + keyword + ' ed2k');
       addLink(fragment, "torrent ",'https://www.google.com/search?hl=zh-CN&q=' + keyword + ' torrent');
       addLink(fragment, "\u80d6\u9e1f ", 'http://www.pniao.com/Mov/so/' + imdbindex);	//胖鸟
       addLink(fragment, "\u80d6\u6b21 ", 'http://www.panc.cc/s/' + keyword + '/td');	//胖次
	   addLink(fragment, "BT\u4eba\u4eba ", 'http://www.btrenren.com/index.php/Search/index.html?search='+imbindex);	//BT人人


       var br = document.createElement("br");
       var span = imdblink.previousElementSibling.cloneNode(false);
       span.textContent = "\u5b57\u5e55: ";	//字幕
       fragment.appendChild(br);
       fragment.appendChild(span);
       addLink(fragment, "zimuku  ", 'http://www.zimuku.cn/search?q=' + imdbindex);
       addLink(fragment, "Sub HD  ", 'http://subhd.com/search/' + keyword);

       insertAfter(fragment, imdblink);
    }
})();
