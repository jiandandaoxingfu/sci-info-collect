/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-10 18:08:54
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-11 19:50:10
*/

const fs = require('fs')
const request = require('request');
const axios = require('axios');
const origin = 'http://apps.webofknowledge.com/'
const request_headers = {	
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 
	'Accept-Encoding': 'gzip, deflate', 
	'Accept-Language': 'zh-CN,zh;q=0.9', 
	'Cache-Control': 'max-age=0', 
	'Connection': 'keep-alive', 
	'Content-Type': 'application/x-www-form-urlencoded', 
	'Host': 'apps.webofknowledge.com', 
	'Origin': origin, 
	'Upgrade-Insecure-Requests': 1, 
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36 OPR/63.0.3368.107', 
}


class Crawl {
	constructor(year) {
		this.year = year;
	}

	search_page(url) {
		return axios({
			url: url, 
			headers: request_headers
		}).then( (res) => {
			let data = res.data.replace(/&amp;/g, '&');
			this.qid = data.match(/qid=(\d+)/)[1];
		})
	}

	defail_page() {
		return axios({
			url: this.cite_url, 
			headers: request_headers
		}).then( (res) => {

		})
	}

	cite_page() {
		return axios({
			url: this.cite_url, 
			headers: request_headers
		}).then( (res) => {
			fs.writeFile('./public/cite_page.html', res.data, (err) => {
				console.log('err');
			})
		})
	}

	cite_page_fliter_by_year() {
		return axios({
			url: `http://apps.webofknowledge.com/Refine.do?update_back2search_link_param=no&parentQid=20&SID=${this.sid}&product=WOS&databaseId=WOS&colName=WOS&service_mode=Refine&search_mode=CitingArticles&action=search&clickRaMore=%E5%A6%82%E6%9E%9C%E7%BB%A7%E7%BB%AD%E4%BD%BF%E7%94%A8+&openCheckboxes=%E5%A6%82%E6%9E%9C%E9%9A%90%E8%97%8F%E5%B7%A6%E4%BE%A7%E9%9D%A2%E6%9D%BF%EF%BC%8C%E5%88%99%E5%85%B6%E4%B8%AD%E7%9A%84%E7%B2%BE%E7%82%BC%E9%80%89%E6%8B%A9%E5%B0%86%E4%B8%8D%E4%BC%9A%E4%BF%9D%E5%AD%98%E3%80%82&refineSelectAtLeastOneCheckbox=%E8%AF%B7%E8%87%B3%E5%B0%91%E9%80%89%E4%B8%AD%E4%B8%80%E4%B8%AA%E5%A4%8D%E9%80%89%E6%A1%86%E6%9D%A5%E7%B2%BE%E7%82%BC%E6%A3%80%E7%B4%A2%E7%BB%93%E6%9E%9C%E3%80%82&queryOption%28sortBy%29=PY.D%3BLD.D%3BSO.A%3BVL.D%3BPG.A%3BAU.A&queryOption%28ss_query_language%29=auto&sws=&defaultsws=%E5%9C%A8%E5%A6%82%E4%B8%8B%E7%BB%93%E6%9E%9C%E9%9B%86%E5%86%85%E6%A3%80%E7%B4%A2...&swsFields=TS&swsHidden=%E5%9C%A8%E5%89%8D+100%2C000+%E6%9D%A1%E7%BB%93%E6%9E%9C%E5%86%85%3Cbr%3E%E6%A3%80%E7%B4%A2&exclude=&exclude=&exclude=&refineSelection=PublicationYear_${this.year}&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&exclude=&mode=refine`,
			headers: request_headers
		}).then( (res) => {
			
		})
	}
}

exports.Crawl = Crawl;