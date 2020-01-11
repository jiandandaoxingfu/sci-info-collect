/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-11 16:32:20
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-11 20:05:08
*/

const fs = require('fs')

function print2pdf(win, fn, callback) {
	win.webContents.printToPDF({}).then( data => {
    	fs.writeFile('./file/' + fn, data, (error) => {
      		if (error) throw error
      		callback();
    		})
  		}).catch(error => {
    		console.log(error)
  		})
}

exports.print2pdf = print2pdf;