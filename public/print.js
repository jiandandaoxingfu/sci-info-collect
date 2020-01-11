/*
* @Author:             old jia
* @Email:              jiaminxin@outlook.com
* @Date:               2020-01-11 16:32:20
* @Last Modified by:   jiandandaoxingfu
* @Last Modified time: 2020-01-11 17:50:54
*/

const fs = require('fs')

function print2pdf(win, fn) {
	win.webContents.printToPDF({}).then( data => {
    	fs.writeFile('./file/' + fn, data, (error) => {
      		if (error) throw error
      		console.log('Write PDF successfully.')
    		})
  		}).catch(error => {
    		console.log(error)
  		})
}

exports.print2pdf = print2pdf;