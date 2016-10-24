var firstDate = new Date(),secondDate;
firstDate = new Date(firstDate.getFullYear()+'-'+(firstDate.getMonth()+1)+'-01T12:00:00');
if(firstDate.getDay()==0){
	//SUNDAY
	firstDate = new Date(firstDate.getTime()+(1000*60*60*24));
	secondDate = new Date(firstDate.getTime()+(1000*60*60*24));
}else if(firstDate.getDay()==5){
	//FRIDAY
	secondDate = new Date(firstDate.getTime()+((1000*60*60*24)*3));
}else if(firstDate.getDay()==6){
	//SATURDAY
	firstDate = new Date(firstDate.getTime()+((1000*60*60*24)*2));
	secondDate = new Date(firstDate.getTime()+(1000*60*60*24));
}else{
	secondDate = new Date(firstDate.getTime()+(1000*60*60*24));	
}

var firstDateText = firstDate.getFullYear()+'-';
if(firstDate.getMonth()+1<10){ firstDateText+='0' }
firstDateText+=(firstDate.getMonth()+1)+'-';
if(firstDate.getDate()+1<10){ firstDateText+='0' }
firstDateText+=firstDate.getDate()+'T';

var secondDateText = secondDate.getFullYear()+'-';
if(secondDate.getMonth()+1<10){ secondDateText+='0' }
secondDateText+=(secondDate.getMonth()+1)+'-';
if(secondDate.getDate()+1<10){ secondDateText+='0' }
secondDateText+=secondDate.getDate()+'T';

var tempTimesheetList = {
	'percent': 10,
	'listTimesheet' : [
		{	
			'taskName': 'CODING',
			'projectCode': 'CBANK03',
			'startDateTime': firstDateText+'09:00:00',
			'stopDateTime': firstDateText+'18:00:00',
			'memo': 'Hello',
			'timesheetID': '0001',
			'approveStatus': 'Wait Approve'
		},
		{	
			'taskName': 'CODING',
			'projectCode': 'CBANK03',
			'startDateTime': secondDateText+'09:00:00',
			'stopDateTime': secondDateText+'18:00:00',
			'memo': 'Hello',
			'timesheetID': '0002',
			'approveStatus': 'Approved'
		}
	]
};
var runningNumber = 0;

$(document).ready(function(){
	$.mockjax({
		url: serviceURL.authen.login,
		proxy: "resources/mock/data/authen/login.json"
	});
	$.mockjax({
		url: serviceURL.authen.validate,
		proxy: "resources/mock/data/authen/login.json"
	});
	$.mockjax({
		url: serviceURL.mpm.timesheet.logout,
  		responseText: ""
	});
	$.mockjax({
		url: serviceURL.mpm.customerProject.listCustomerTask,
  		dataType: "json",
  		contentType:"application/json",
		proxy: "resources/mock/data/mpm/listCustomerTask.json"
	});
	$.mockjax({
		url: serviceURL.mpm.timesheet.list,
  		dataType: "json",
  		contentType:"application/json",
  		response: function(){
  			this.responseText = JSON.stringify(tempTimesheetList);
  		}
	});
	$.mockjax({
		url: serviceURL.mpm.timesheet.creates,
  		dataType: "json",
  		contentType:"application/json",
  		status: 200,
  		response: function(settings){
  			var listNewTimesheet = JSON.parse(settings.data.listTimesheet),key,obj;
  			for(key in listNewTimesheet){
  				runningNumber++;
  				obj = listNewTimesheet[key];
  				tempTimesheetList.listTimesheet.push({
					'taskName': obj.taskName,
					'projectCode': obj.projectCode,
					'startDateTime': obj.workingDate+'T'+obj.startTime+':00',
					'stopDateTime': obj.workingDate+'T'+obj.endTime+':00',
					'memo': obj.memo,
					'timesheetID': 'TEMP'+runningNumber,
					'approveStatus': 'Wait Approve'  					
  				});
  			}
  			this.responseText = '{}';
  		}
	});
	$.mockjax({
		url: serviceURL.mpm.timesheet.remove,
  		dataType: "json",
  		contentType:"application/json",
  		response: function(settings){
  			var index=-1,key,obj;
  			for(key in tempTimesheetList.listTimesheet){
  				if(tempTimesheetList.listTimesheet[key].timesheetID == settings.data.timesheetID){
  					index = key;
  					break;
  				}
  			}
  			if(index > -1){
				tempTimesheetList.listTimesheet.splice(index,1);
  				this.responseText = '{}';
			}
  		}
	});

});