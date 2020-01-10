const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const url = 'http://apps.webofknowledge.com/WOS_GeneralSearch_input.do?product=WOS&SID=7DBXuf8BGjDHjAXvhAb&search_mode=GeneralSearch';
const title_ = '卧槽';

nightmare
	.goto(url)
	.type('#value(input1)', title_)
	.type('select2-select1-container', '标题')
	.click('#searchCell1')
	.then()