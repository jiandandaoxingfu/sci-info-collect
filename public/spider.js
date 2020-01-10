/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-10 18:08:54
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-10 19:28:44
*/

/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-10 18:08:54
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-10 18:29:49
*/

const axios = require('axios');
const title = 'Explicit quasi-periodic solution of  the Vakhnenko equation';
const root = 'http://apps.webofknowledge.com/WOS_GeneralSearch.do';
const request_headers = {
	'Origin': 'https://apps.webofknowledge.com/', 
	'Referer': 'http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&SID=7DBXuf8BGjDHjAXvhAb&search_mode=GeneralSearch', 
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 
	'Accept-Encoding': 'gzip, deflate', 
	'Accept-Language': 'zh-CN,zh;q=0.9', 
	'Cache-Control': 'max-age=0', 
	'Connection': 'keep-alive', 
	'Content-Length': '1512', 
	'Host': 'apps.webofknowledge.com', 
	'Content-Type': 'application/x-www-form-urlencoded', 
	'Upgrade-Insecure-Requests': '1', 
	'Cookie': 'dotmatics.elementalKey=SLsLWlMhrHnTjDerSrlG; CUSTOMER="Zhengzhou University"; E_GROUP_NAME="ID Set 1776"; SID="7DBXuf8BGjDHjAXvhAb"; bm_sz=BDEB92B2D80A34CA208613D9E43A9256~YAAQh8czuNd2vX9uAQAAI5WwjgZ6wivTLqmHQxSHOmIFJvOpXpNCAKmNdqvfKBWXjWg0gKZuxL4ymPcd+/i8bvjrHMqryaraY5jb2i8bJxnz0MxzIqUa9tP2CyrPWMcWQ6qguxLHBLq6KSbAo0gRBzYn2jKfbm3IqjccRTD0tKE0RtpGZUjBQlMX44/JRYIjtCa531/cFGc=; _sp_ses.630e=*; JSESSIONID=EF1701D22C361844B66F8948E797419D; ak_bmsc=E6053B03B6C03CC746F5FB40AB7D62D3B833C7932A510000875F185E1B236411~plHjNIev2B6T0qUyOoCiOWH2EJikdQPG9cvrP0atLOvYAxx4xDgJnKECFcT6BsAyFIiv7yQZbCwTY7xHINDLd/iRxJXvfPC2p49IsDXG2HgJLm51ah2Za4s/bzqgBHRGyT/9jsgwXfF2xCGuFBhhsspZqRp2Hc/8TtDXBeznPxTpQ5w4zZfx88uu83vMylYE8F5/zz/5oANP9xv9OyZZljYN5DBE+VnCm9vfzHAUai5z0k+nen3+VLWXT4LkCUv3i+; _sp_id.630e=320b7e85-9073-4d2b-b374-88f7627bd66d.1573200798.15.1578655637.1578648672.3a18bcf3-1788-400c-8b56-f9baffb7fb49', 
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36 OPR/63.0.3368.107', 
}


function init( title ) {
	axios.get('https://apps.webofknowledge.com/').then( (res) => {
		let sid = res.request._header.match(/SID=(.*?)&/)[0].slice(4, -1);
		sid = '7DBXuf8BGjDHjAXvhAb';
		request_form_data = {
			'fieldCount': '1', 
			'action': 'search', 
			'product': 'WOS', 
			'search_mode': 'GeneralSearch', 
			'SID': sid, 
			'max_field_count': '25', 
			'max_field_notice': '注意: 无法添加另一字段。', 
			'input_invalid_notice': '检索错误: 请输入检索词。', 
			'exp_notice': '检索错误: 专利检索词可以在多个家族中找到 (', 
			'input_invalid_notice_limits': ' <br/>注意: 滚动框中显示的字段必须至少与一个其他检索字段相组配。', 
			'sa_params': `WOS||${sid}|http://apps.webofknowledge.com|`, 
			'formUpdated': 'true', 
			'value(input1)': title,
			'value(select1)': 'TI', 
			'value(hidInput1)': '', 
			'limitStatus': 'collapsed', 
			'ss_lemmatization': 'On', 
			'ss_spellchecking': 'Suggest', 
			'SinceLastVisit_UTC': '', 
			'SinceLastVisit_DATE': '', 
			'period': 'Range Selection', 
			'range': 'ALL', 
			'startYear': '1985', 
			'endYear': '2020', 
			'editions': 'SCI', 
			'editions': 'SSCI', 
			'editions': 'AHCI', 
			'editions': 'ISTP', 
			'editions': 'ESCI', 
			'editions': 'CCR', 
			'editions': 'IC', 
			'update_back2search_link_param': 'yes', 
			'ssStatus': 'display:none', 
			'ss_showsuggestions': 'ON', 
			'ss_numDefaultGeneralSearchFields': 1, 
			'ss_query_language': '', 
			'rs_sort_by': 'PY.D;LD.D;SO.A;VL.D;PG.A;AU.A', 
		}
		console.log(request_form_data);
		return request_form_data;
	}).then( (data) => {
		axios.post(root, headers = request_headers, data = data).then( (res) => {
			console.log(res)
		})
	});
	
}

init(title)