application.timesheetTemplate = {};
application.timesheetStorage = {};
application.eventStorage = [];
application.tempEventStorage = [];
application.tempDate = {};
application.editingEvent = {};
application.isReady = false;
application.currentVersion = 0.3;
application.tempContent = null;

application.currentEffort = {
		data: {},
		calEffort: function(start,end){
			var startHour = start.get('hour'),
				endHour = end.get('hour'),
				diff = (end.diff(start,'minute') / 60);
			
			if((startHour <= 12
					&& endHour >= 13)
				|| (startHour <= 18
						&& endHour >= 19)){
				diff -= 1;			
			}
			return diff;
		},
		clearData: function(){
			application.currentEffort.data = {};
		},
		temp: {
			key: '',
			diff: 0,
			startHour: 0,
			endHour: 0
		},
		addEffortToDate: function(event){
			application.currentEffort.temp.key =  event.start.format("YYYY-MM-DD").toString();
			
			if(application.currentEffort.data[application.currentEffort.temp.key]){
				application.currentEffort.data[application.currentEffort.temp.key] += application.currentEffort.calEffort(event.start, event.end);
			}else{
				application.currentEffort.data[application.currentEffort.temp.key] = application.currentEffort.calEffort(event.start, event.end);
			}		
		},		
		reRender: function(){
			var date,$tempElement,tempEffort;
			$("span.label-effort").each(function(index,element){
				$tempElement = $(element).removeClass('label-success label-danger label-warning');
				date = $tempElement.data('date');
				if(application.currentEffort.data[date]){
					tempEffort = application.currentEffort.data[date];
					if(tempEffort < 8){
						$tempElement.addClass('label-warning');
					}else if (tempEffort == 8){
						$tempElement.addClass('label-success');
					}else{
						$tempElement.addClass('label-danger');
					}
					$tempElement.text(application.currentEffort.data[date]).show();
				}else{
					$tempElement.hide();
				}
			});
			application.currentEffort.clearData();
		}
};

application.dialog = {
	type: null,
	addTemplate: {
		type: 'AddTemplate',
		show: function(obj,isTemp){
			application.dialog.type = application.dialog.addTemplate.type;
			$("#addTempalteModalLabel").text("Add Template");
			if(obj){
				var projectCode = null,taskName = null,start = null,stop = null;
				if(isTemp){
					projectCode = obj.projectCode;
					taskName = obj.taskName;
					start = obj.start;
					stop = obj.end;
				}else{
					projectCode = obj.projectCode;
					taskName = obj.taskName;
					start = moment(obj.startDateTime);
					stop = moment(obj.stopDateTime);
				}
				
				
				$("#project").select2('val',projectCode=="non project code"?"":projectCode);							
				application.fetchTaskGroup();
				$("#taskGroup").select2('val',application.findTaskGroupFromName(taskName));				
				application.fetchTask();
				$("#task").select2('val',taskName);
				
				$('#startTimeHour option[value='+start.format("H")+']').attr('selected','selected');
				$('#startTimeMin option[value='+start.format("m")+']').attr('selected','selected');
				$('#stopTimeHour option[value='+stop.format("H")+']').attr('selected','selected');
				$('#stopTimeMin option[value='+stop.format("m")+']').attr('selected','selected');
				$("#memoTextArea").val(obj.memo);

			}else{
				application.fetchDefaultForm();
			}
			$(".add-timesheet-group").hide();
			$("#addTempalteModal").modal('show');
		},
		hide: function(){
			$("#addTempalteModal").modal('hide');				
		}
	},
	addTimesheet: {
		type: 'AddTimesheet',
		show: function(){
			application.dialog.type = application.dialog.addTimesheet.type;
			$("#addTempalteModalLabel").text("Add Timesheet");
			application.fetchDefaultForm();
			$("#date").val(application.tempDate.format('YYYY/M/DD')).attr('disabled','disabled');
			$(".add-timesheet-group").show();
			$("#addTempalteModal").modal('show');				
		},
		hide: function(){
			$("#addTempalteModal").modal('hide');				
		}
	},
	addMonthlyTimesheet:{
		type: 'AddMonthlyTimesheet',
		show: function(){
			var dateInputBox = $("#date").val('').attr('disabled',false).data('daterangepicker');
			dateInputBox.setStartDate(moment());
			dateInputBox.setEndDate(moment());
			dateInputBox.updateInputText();
			application.dialog.type = application.dialog.addMonthlyTimesheet.type;
			$("#addTempalteModalLabel").text("Add Monthly Timesheet");
			application.fetchDefaultForm();
			$(".add-timesheet-group").show();
			$("#addTempalteModal").modal('show');							
		},
		hide: function(){
			$("#addTempalteModal").modal('hide');			
		}
	},
	editTimesheet: {
		type: 'EditTimesheet',
		show: function(){
			application.dialog.type = application.dialog.editTimesheet.type;
			
			$("#addTempalteModalLabel").text("Edit Timesheet");
			$("#date").val(application.editingEvent.start.format('YYYY/M/DD'));
			$("#project").select2('val',application.editingEvent.projectCode=="non project code"?"":application.editingEvent.projectCode);			
			
			application.fetchTaskGroup();
			$("#taskGroup").select2('val',application.findTaskGroupFromName(application.editingEvent.taskName));				

			application.fetchTask();
			$("#task").select2('val',application.editingEvent.taskName);
			
			$('#startTimeHour option[value='+application.editingEvent.start.format("H")+']').attr('selected','selected');
			$('#startTimeMin option[value='+application.editingEvent.start.format("m")+']').attr('selected','selected');
			$('#stopTimeHour option[value='+application.editingEvent.end.format("H")+']').attr('selected','selected');
			$('#stopTimeMin option[value='+application.editingEvent.end.format("m")+']').attr('selected','selected');

			$("#memoTextArea").val(application.editingEvent.memo);
			$(".add-timesheet-group").show();
			$("#addTempalteModal").modal('show');			
			
		},
		hide: function(){
			$("#addTempalteModal").modal('hide');					
		}
	}
};


application.calendar = {
	obj: null,
	showWeekend: function(){ return (localStorage['showWeekends'] == '1'); },
	renderWeekendButton: function(){
		var $span = $("#toggleWeekendButton > span").removeClass('glyphicon-check glyphicon-unchecked');
		if(application.calendar.showWeekend()){
			$span.addClass('glyphicon-check');
		}else{
			$span.addClass('glyphicon-unchecked');
		}
	},
	toggleWeekEnd: function(){
		var newShowWeekend = !(application.calendar.showWeekend());
		application.calendar.obj.getView().showWeekEnds(newShowWeekend);
		localStorage['showWeekends'] = newShowWeekend? '1':'0';
		application.calendar.renderWeekendButton();
	},
	init: function(){
		application.calendar.obj = $('#calendar').fullCalendar({
			weekends: application.calendar.showWeekend(),
			editable: true,
			droppable: true,
			allDaySlot: false,
			header: {
				left: false,
				center: 'title',
				right: 'today prev,next'
			},
			holiday: holiday,
			drop: function(date) {
				if($(this).data('drag-type') == 'copy'){					
					application.copyTimesheet(date,$(this).data('index'),$(this).data('temp'));
				}else{
					application.addTimesheetFromTemplate(date,$(this).data('index'));
				}
			},
		    eventDrop: function(event, delta, revertFunc) {
		    	var obj = application.tempEventStorage[event.index];
		    	obj.start = event.start;
		    	obj.end = event.end;
		    	$(this).fullCalendar('refetchEvents');
		    },
			dayDBClick: function(date){
				application.tempDate = date;
				application.dialog.addTimesheet.show();
			},
			eventSources:  [application.eventStorage,application.tempEventStorage],

		    eventRender: function(event, element) {
		    	application.currentEffort.addEffortToDate(event);
		    	$("span.icon-copy-timesheet").draggable({
					zIndex: 1000,
					revert: false,
					appendTo: ".fc-event-container",
					helper: function(){
						var parent = $(this).closest('.fc-event');
						var result = parent.clone().width(parent.width()).height(parent.height());
						result.find('.panel-body').height(parent.find('.panel-body').height() + 30);
						return result;
					},
					scroll: true,
					start: function(){

					},
					stop: function(){

					}
				});
		    },
		    eventAfterAllRender: function(){
		    	if(application.isReady){
			    	if(application.tempEventStorage.length > 0){
			    		localStorage['tempEventStorage'] = JSON.stringify(application.tempEventStorage);
			    	}else{
			    		if(localStorage['tempEventStorage']){
			    			delete localStorage['tempEventStorage'];
			    		}
			    	}
			    	$(".label-event-time-tooltip,.has-tool-tip").tooltip();
					$(".btn-popover").popover();
			    	application.currentEffort.reRender();
		    	}

		    	if(application.tempEventStorage.length == 0){
		    		$(window).off('beforeunload');
		   		}else{
				   	$(window).on('beforeunload', function(){
			    		return 'You have some temporary timesheets';
			    	});
		   		}
		    }
		}).data('fullCalendar');
	}
};

application.checkMigrateVersion = function(callback){
	if(localStorage['appVersion'] != application.currentVersion){
		localStorage['showWeekends'] = 0;
		var appVersion = parseFloat(localStorage['appVersion']?localStorage['appVersion']:0);
		// if(appVersion < 0.2){
		// 	localStorage['appVersion'] = 0.2;
		// }
		// if(appVersion < 0.3){
		// 	localStorage['appVersion'] = 0.3;
		// 	$("#featureModel img").prop('src','resources/img/features.png');
		// 	$("#featureModel").modal('show')
		// }
		localStorage['appVersion'] = application.currentVersion;
	}
	if(callback){
		callback();
	}
};

application.reIndexTempEventStorage = function(callBack){
	var index = 0,obj = null;
	for(obj in application.tempEventStorage){
		application.tempEventStorage[obj].index = index;
		index++;
	}
	if(callBack){
		callBack();
	}
};

application.buildTemplate = function(){
	if(localStorage["timesheetTemplate"]){
		application.timesheetTemplate = eval(localStorage["timesheetTemplate"]);
		application.generateTemplate();
	}else{
		application.timesheetTemplate = [];
	}

	var obj,obj2,key,key2,$tempSelect = $("#project").empty(),tempHtml = '<option value="" data-index="">Non Project Code</option>';
	
	for(key in application.listCustomer){
		obj = application.listCustomer[key];
		tempHtml += '<optgroup label="'+obj.name+'">';
		for(key2 in obj.listProject){
			obj2 = obj.listProject[key2];
			tempHtml += '<option value="'+obj2.code+'" data-index="'+key+'">'+obj2.name+'</option>';
		}
		tempHtml += '</optgroup>';
	}
	$tempSelect.append(tempHtml).select2();
	application.fetchTaskGroup();
	application.fetchTask();
};


application.fetchDefaultForm = function(){
	application.fetchTaskGroup();
	application.fetchTask();
	
	$("#startTimeHour > option[value=9]").attr('selected','selected');
	$("#startTimeMin > option[value=0]").attr('selected','selected');
	$("#stopTimeHour > option[value=18]").attr('selected','selected');
	$("#stopTimeMin > option[value=0]").attr('selected','selected');
	$("#memoTextArea").val('');
};

application.content = function(){
	if(application.tempContent == null){
		application.tempContent = $("#content");
	}
	return application.tempContent;
};

application.generateTemplate = function(){
	var key,obj,$eventHolder=$("#eventHolder").empty(),htmlTemplate;
	for(key in application.timesheetTemplate){
		obj = application.timesheetTemplate[key];
		htmlTemplate = '<div class="alert alert-info alert-dismissable draggble-event alert-template" data-index="'+key+'">'
		+'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
		+'<span class="label label-info label-time">'+application.appendZero(obj.startTimeHour)+':'+application.appendZero(obj.startTimeMin)+'-'+application.appendZero(obj.stopTimeHour)+':'+application.appendZero(obj.stopTimeMin)+'</span>';
		if(obj.memo && obj.memo.length > 0){
			htmlTemplate += '<span class="glyphicon glyphicon-comment icon-comment" data-container="body" data-placement="auto" data-toggle="popover" data-trigger="hover" data-content="'+obj.memo+'"></span>'
		}		
		htmlTemplate +='<br class="visible-md visible-lg"><b class="label-project" >'+application.htmlEscape(obj.projectDesc)+' </b> <br class="visible-md visible-lg">'
		+'<p class="label-task">'+application.htmlEscape(obj.taskDesc)+'</p></div>'; 
		$(htmlTemplate)
		.on('closed.bs.alert', function () {
			application.removeTemplate($(this).data('index'));
		}).draggable({
			zIndex: 1000,
			revert: false,
			helper: "clone" ,
			scroll: true,
			start: function(){
				application.content().css('z-index',-1);
			},
			stop: function(){
				application.content().css('z-index','');
			}
		}).appendTo($eventHolder);
	}
	
	$("span.icon-comment").popover();
}
application.appendZero = function(val){
	return val>9?val:'0'+val;
}
application.addTemplate = function(template){
	application.timesheetTemplate.push(template);
	localStorage["timesheetTemplate"] = '('+JSON.stringify(application.timesheetTemplate)+')';
	application.generateTemplate();
}
application.removeTemplate = function(index){
	var newArray = [],key;
	for(key in application.timesheetTemplate){
		if(key != index){
			newArray.push(application.timesheetTemplate[key]);
		}
	}
	application.timesheetTemplate = newArray;
	localStorage["timesheetTemplate"] = '('+JSON.stringify(application.timesheetTemplate)+')';
	application.generateTemplate();
}

application.fetchTaskGroup = function(callBack){
	var obj,key,$taskGroupSelect = $("#taskGroup").empty(),projectValue = $("#project option:selected").data('index');
	var isNonProject = (projectValue.length == 0);
	
	for(key in application.listTask){
		obj = application.listTask[key];
		if(obj.name == "None Project" && isNonProject){
			$taskGroupSelect.append('<option value="'+obj.name+'" data-index="'+key+'"">'+obj.name+'</option>');			
		}else if(obj.name != "None Project" && !isNonProject){
			$taskGroupSelect.append('<option value="'+obj.name+'" data-index="'+key+'"">'+obj.name+'</option>');			
		}
	}
	$taskGroupSelect.select2();
	if(callBack){
		callBack();
	}
}

application.fetchTask = function(){
	var obj,key,$taskSelect = $("#task").empty(),taskGroupValue = $("#taskGroup > option:selected").data('index');

	for(key in application.listTask[taskGroupValue].listTask){
		obj = application.listTask[taskGroupValue].listTask[key];
		$("#task").append('<option value="'+obj.name+'">'+application.htmlEscape(obj.name)+'</option>');
	}
	$taskSelect.select2();	
}

application.loadCustomerTask = function(callback){
	if(localStorage["listCustomer"]){
		application.listCustomer = eval(localStorage["listCustomer"]);					
		if(callback){
			callback();
		}
	}else{
		application.reloadCustomerTask(function(){			
			if(callback){
				callback();
			}
		});
	}
}

application.reloadCustomerTask = function(callback){		
	application.callService({
		url: serviceURL.mpm.customerProject.listCustomerTask,		
		success: function(response){
			localStorage["listCustomer"] = "(" +JSON.stringify(response) + ")";
			application.listCustomer = response;
			application.alertSuccess("Load Customer Data Complete");
			if(callback){
				callback();
			}
		},
		error: function(response){
			console.log(response);
		}
	});		
}

application.generateEventClass = function(obj){
	var color = [];
	
	if(obj.approveStatus == "Wait Approve"){
		if(obj.timesheetID && obj.timesheetID != null){
			color.push('info');
		}else{
			color.push('warning');
		}
	}else if(obj.approveStatus == "Approved"){
		color.push('success');
	}else{
		color.push('danger');
	}	
	return color;
}

application.generateEvent = function(callBack){
	var rawData = application.timesheetStorage,key,obj;
	application.eventStorage.length = 0;
	for(key in rawData){
		obj = rawData[key];
		application.eventStorage.push({
			'title': obj.taskName,
			'desc': application.findProjectDescFromCode(obj.projectCode),
			'start': obj.startDateTime,
			'end': obj.stopDateTime,
			'eventColor': application.generateEventClass(obj),
			'index': key,
			'editable': false,
			'memo': obj.memo,
			'effort': obj.effort,
			'timesheetID': obj.timesheetID,
			'temp': 0,
			'canSaveTemplate': (obj.projectCode.length > 0 && obj.taskName.length > 0)
		});
	}
	$('#calendar').fullCalendar( 'refetchEvents' );
	if(callBack){
		callBack();
	}
}

application.getEvent = function(callBack){		
	application.callService({
		url: serviceURL.mpm.timesheet.list,
		data: {
			'month': 'ALL',
			'resourceName': (localStorage['myName']||'*')
		},
		success: function(response){
			application.timesheetStorage = response.listTimesheet;
			application.setPercent(response.percent);
			application.generateEvent(callBack);
		},
		error: function(response,a,b){
			console.log(response);
		}
	});
}

application.addTimesheetFromTemplate = function(date,index){
	var obj = application.timesheetTemplate[index];
	application.tempEventStorage.push({
		editable: true,
		start: moment(date.format('YYYY-MM-DD') + 'T' + application.appendZero(obj.startTimeHour) + ':' + application.appendZero(obj.startTimeMin) + ':00'),
		end: moment(date.format('YYYY-MM-DD') + 'T' + application.appendZero(obj.stopTimeHour) + ':' + application.appendZero(obj.stopTimeMin) + ':00'),
		projectCode: obj.projectCode,
		taskName: obj.task,
		index: application.tempEventStorage.length,
		desc: application.findProjectDescFromCode(obj.projectCode),
		title: obj.taskDesc,
		eventColor: 'info',
		className: ['panel-temp'],
		memo: obj.memo,
		temp: 1
	});

	$('#calendar').fullCalendar('refetchEvents');
}

application.findTaskGroupFromName = function(taskName){
	var key,obj,key2,obj2,taskGroup='';
	for(key in application.listTask){
		obj = listTask[key];
		for(key2 in obj.listTask){
			obj2 = obj.listTask[key2];
			if(obj2.name == taskName){
				taskGroup = obj.name;
				break;				
			}
		}
		if(taskGroup.length > 0){
			break;
		}
	}
	return taskGroup;
};

application.findProjectDescFromCode = function(projectCode){
	if(projectCode.length == 0 || projectCode == 'non project code'){
		return 'non project code';
	}
	var key,obj,key2,obj2,projectDesc='';
	for(key in application.listCustomer){
		obj = application.listCustomer[key];
		for(key2 in obj.listProject){
			obj2 = obj.listProject[key2];
			if(obj2.code == projectCode){
				projectDesc = '['+projectCode+'] '+obj2.name;
				break;				
			}
		}
		if(projectDesc.length > 0){
			break;
		}
	}
	if(projectDesc.length == 0){
		projectDesc = projectCode;
	}
	return projectDesc;
	
};

application.setPercent = function(percent){
	var fPercent = parseFloat(percent),
		cacheProgress = $("#monthlyProgressBar").removeClass('progress-bar-danger progress-bar-warning progress-bar-success progress-bar-info');
	cacheProgress.css('width',(percent+'%'));
	$("#processTextLeft").text('');
	$("#processTextRight").text('');
	if(fPercent > 100){
		cacheProgress.addClass("progress-bar-danger");		
		$("#processTextLeft").text(percent+'%');
	}else if(fPercent == 100){
		cacheProgress.addClass("progress-bar-success");
		$("#processTextLeft").text(percent+'%');
	}else if (fPercent > 60){
		cacheProgress.addClass("progress-bar-info");		
		$("#processTextLeft").text(percent+'%');
	}else if(fPercent > 30){
		cacheProgress.addClass("progress-bar-warning");		
		$("#processTextLeft").text(percent+'%');
	}else{
		cacheProgress.addClass("progress-bar-danger");		
		$("#processTextRight").text('  '+percent+'%');
	}
};

application.copyTimesheet = function(date,index,isTemp){
	var obj,customerId = null,projectCode = null,taskName = null,start = null,stop = null,memo = '';
	var projectDesc,taskDesc;
	if(isTemp){
		obj = application.tempEventStorage[index];
		projectCode = obj.projectCode;
		taskName = obj.taskName;
		start = obj.start;
		stop = obj.end;
		memo = obj.memo;
		projectDesc = obj.desc;
		taskDesc = obj.title;
	}else{
		obj = application.timesheetStorage[index];
		projectCode = obj.projectCode;
		taskName = obj.taskName;
		start = moment(obj.startDateTime);
		stop = moment(obj.stopDateTime);
		memo = obj.memo;
		projectDesc = obj.projectCode;
		taskDesc = obj.taskName;
	}
	if(!date.isSame(start)){
		application.tempEventStorage.push({
			editable: true,
			start: moment(date.format('YYYY-MM-DD') + 'T' + start.format('HH:mm') + ':00'),
			end: moment(date.format('YYYY-MM-DD') + 'T' + stop.format('HH:mm') + ':00'),
			projectCode: projectCode,
			taskName: taskName,
			index: application.tempEventStorage.length,
			desc: application.findProjectDescFromCode(projectCode),
			title: taskDesc,
			eventColor: 'info',
			className: ['panel-temp'],
			memo: memo,
			temp: 1
		});
		$('#calendar').fullCalendar('refetchEvents');
	}
}

application.isHoliday = function(str){
	return (holiday[str])? true: false;
}

$(document).ready(function(){
	application.listTask = listTask;

	$("#project").select2().on('change',function(e){ application.fetchTaskGroup(function(){ application.fetchTask(); }); });
	$("#taskGroup").select2().on('change',function(e){ application.fetchTask(); });
	$("#task").select2();
	
	$("#date").daterangepicker();
	$("#exportDateRange").daterangepicker();
	
	application.checkMigrateVersion(function(){
		application.validateSession(function(){
			application.loadCustomerTask(function(){
				
				application.isReady = true;
				if(localStorage['tempEventStorage']){
					if(localStorage['tempEventStorage'].length > 0){
						var newTempEventStorage = eval('('+localStorage['tempEventStorage']+')');
						var index,maxLength = newTempEventStorage.length,tempObj;
						for(index = 0;index < maxLength;index++){
							tempObj = newTempEventStorage[index];
							tempObj.index = application.tempEventStorage.length;
							tempObj.start = moment(tempObj.start);
							tempObj.end = moment(tempObj.end);
							
							application.tempEventStorage.push(tempObj);
						}
					}
				}
				application.buildTemplate();
	
				application.getEvent(function(){
					if(application.isFirstLogin){
						application.getEvent();
					}
				});
			});
		});
	});

	var $hour = $('.select-hour'),tempHtml='';
	for (var i = 0; i < 23; i++) {
		tempHtml += '<option value="'+i+'">'+(i<10?('0'+i):(i))+'</option>';
	};
	$hour.append(tempHtml);
	tempHtml = '';

	$("#startTimeHour > option[value=9]").attr('selected','selected');
	$("#stopTimeHour > option[value=18]").attr('selected','selected');

	application.calendar.renderWeekendButton();
	$("#toggleWeekendButton").on('click',function(e){
		e.preventDefault();
		application.calendar.toggleWeekEnd();
	});
	
	$('#refreshButton').on('click',function(){
		application.getEvent();
	});
	
	application.calendar.init();
	
	$("#addTemplateButton").on('click',function(){
		application.dialog.addTemplate.show();
	});

	$("#addTemplateConfirm").on('click',function(){
		if(application.dialog.type == application.dialog.addTemplate.type){
			application.dialog.addTemplate.hide();
			application.addTemplate({
				startTimeHour: $("#startTimeHour").val(),
				startTimeMin: $("#startTimeMin").val(),
				stopTimeHour: $("#stopTimeHour").val(),
				stopTimeMin: $("#stopTimeMin").val(),
				projectCode: $("#project").val(),
				projectDesc: application.findProjectDescFromCode($("#project").val()),
				task: $("#task").val(),
				taskDesc: $("#task  > option:selected").text(),
				memo: $("#memoTextArea").val()
			});
		}else if(application.dialog.type == application.dialog.addTimesheet.type){
			application.dialog.addTimesheet.hide();
			application.tempEventStorage.push({
				editable: true,
				start: moment(application.tempDate.format('YYYY-MM-DD') + 'T' + application.appendZero($("#startTimeHour").val()) + ':' + application.appendZero($("#startTimeMin").val()) + ':00'),
				end: moment(application.tempDate.format('YYYY-MM-DD') + 'T' + application.appendZero($("#stopTimeHour").val()) + ':' + application.appendZero($("#stopTimeMin").val()) + ':00'),
				projectCode: $("#project").val(),
				taskName: $("#task").val(),
				index: application.tempEventStorage.length,
				desc: application.findProjectDescFromCode($("#project").val()),
				title: $("#task  > option:selected").text(),
				eventColor: 'info',
				className: ['panel-temp'],		
				memo: $("#memoTextArea").val(),
				temp: 1
			});

			$('#calendar').fullCalendar('refetchEvents');
		}else if(application.dialog.type == application.dialog.addMonthlyTimesheet.type){
			var tempDate = $('#date').data('daterangepicker').startDate,
				endDateUnix = $('#date').data('daterangepicker').endDate.unix();
			while(tempDate.unix() <= endDateUnix){
				if(!(tempDate.day() == 0 || tempDate.day() == 6 || application.isHoliday(tempDate.format('YYYY-MM-DD')))){
					application.tempEventStorage.push({
						editable: true,
						start: moment(tempDate.format('YYYY-MM-DD') + 'T' + application.appendZero($("#startTimeHour").val()) + ':' + application.appendZero($("#startTimeMin").val()) + ':00'),
						end: moment(tempDate.format('YYYY-MM-DD') + 'T' + application.appendZero($("#stopTimeHour").val()) + ':' + application.appendZero($("#stopTimeMin").val()) + ':00'),
						projectCode: $("#project").val(),
						taskName: $("#task").val(),
						index: application.tempEventStorage.length,
						desc:  application.findProjectDescFromCode($("#project").val()),
						title: $("#task  > option:selected").text(),
						eventColor: 'info',
						className: ['panel-temp'],		
						memo: $("#memoTextArea").val(),
						temp: 1
					});
				}
				tempDate = tempDate.add('days', 1);
			}
			application.dialog.addMonthlyTimesheet.hide();
			$('#calendar').fullCalendar('refetchEvents');
		}else if(application.dialog.type == application.dialog.editTimesheet.type){		
			application.dialog.editTimesheet.hide();
			application.editingEvent.projectCode = $("#project").val();
			application.editingEvent.taskName = $("#task").val();
			application.editingEvent.desc = $("#project option:selected").text()=='non project code'?$("#project option:selected").text():'['+$("#project").val()+'] '+$("#project option:selected").text();
			application.editingEvent.title = $("#task  > option:selected").text();
			application.editingEvent.memo = $("#memoTextArea").val();
			application.editingEvent.start = moment(application.editingEvent.start.format('YYYY-MM-DD') + 'T' + application.appendZero($("#startTimeHour").val()) + ':' + application.appendZero($("#startTimeMin").val()) + ':00');
			application.editingEvent.end = moment(application.editingEvent.start.format('YYYY-MM-DD') + 'T' + application.appendZero($("#stopTimeHour").val()) + ':' + application.appendZero($("#stopTimeMin").val()) + ':00');
			
			$('#calendar').fullCalendar('refetchEvents');
			application.editingEvent = null;
		}
	});
	$("#saveButton").on('click',function(){
		if(application.tempEventStorage.length == 0){
			application.alertSuccess("no need to save");
		}else{
			if(window.confirm("save timesheet ?")){
				var rawData,storageIndex,tempKey,timesheetData = [],dateObj;

				for(storageIndex in application.tempEventStorage){
					rawData = application.tempEventStorage[storageIndex];
					timesheetData.push({
						workingDate: rawData.start.format('YYYY-MM-DD'),
						startTime: rawData.start.format('HH:mm'),
						endTime: rawData.end.format('HH:mm'),
						projectCode: rawData.projectCode,
						taskName: rawData.taskName,
						memo:  (rawData.memo || '')
					});
				}
				application.callService({
					url: serviceURL.mpm.timesheet.creates,
					type: 'POST',
					data: {
						'listTimesheet': JSON.stringify(timesheetData)
					},
					success: function(response){
						application.tempEventStorage.length = 0;
						application.getEvent();
					},
					error: function(response){
						console.log(response);
					}
				});
			}
		}
	});
	
	$("#calendar").on('click','.button-edit',function(){
		if($(this).data('temp')){
			application.editingEvent = application.tempEventStorage[$(this).data('index')];
			application.dialog.editTimesheet.show();
		}
	}).on('click','.button-delete',function(){
		var obj;
		if($(this).data('temp')){
			application.tempEventStorage.splice($(this).data('index'),1);
			application.reIndexTempEventStorage(function(){
				$('#calendar').fullCalendar('refetchEvents');
			});
		}else{
			if(window.confirm("delete timesheet ?")){
				application.callService({
					url: serviceURL.mpm.timesheet.remove,
					type: 'POST',
					data: { timesheetID: application.eventStorage[$(this).data('index')].timesheetID },
					success: function(response){
						// application.tempEventStorage.length = 0;
						application.getEvent();					
					},
					error: function(response){
						console.log(response);
					}
				});
			}
		}
	}).on('click','span.icon-save-template',function(){		
		if($(this).data('temp')){
			application.dialog.addTemplate.show(application.tempEventStorage[$(this).data('index')],1);
		}else{
			application.dialog.addTemplate.show(application.timesheetStorage[$(this).data('index')],0);
		}
	});
	
	$("#reloadCustomerButton").on('click',function(){
		application.reloadCustomerTask(function(){
			application.buildTemplate();
		});		
	});
	
	$("#addMonthlyTimesheetButton").on('click',function(){
		application.dialog.addMonthlyTimesheet.show();		
	});
	
	$("#cancelButton").on('click',function(){
		if(application.tempEventStorage.length == 0){
			application.alertSuccess("no need to cancel");
		}else{
			if(window.confirm("delete all temp timesheet ?")){
				application.tempEventStorage.length = 0;
				$('#calendar').fullCalendar('refetchEvents');
			}
		}
	});
	
	if(localStorage['hideStatus'] && localStorage['hideStatus'] == '1'){
		$('#toggleStatusIcon').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
		$("#statusBarTop").animate({'height':'0'});
	}
	
	$("#toggleStatusButton,#hideStatusButton").on('click',function(e){
		e.preventDefault();
		if(localStorage['hideStatus'] && localStorage['hideStatus'] == '1'){
			localStorage['hideStatus'] = '0';
			$('#toggleStatusIcon').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
			$("#statusBarTop").animate({'height':'71'});	
			$leftBarHolder.affix({ offset: { top: 60+71 }});		
		}else{
			localStorage['hideStatus'] = '1';
			$('#toggleStatusIcon').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
			$("#statusBarTop").animate({'height':'0'});	
			$leftBarHolder.affix({ offset: { top: 60 }});		
		}
	});
	
	if(localStorage['hideAddTemplate'] && localStorage['hideAddTemplate'] == '1'){
		$("#calendar").addClass("hide-add-template");
		$("#toggleAddTemplateButton > span").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
	}
	
	$("#toggleAddTemplateButton").on('click',function(e){
		e.preventDefault();
		if(localStorage['hideAddTemplate'] && localStorage['hideAddTemplate'] == '1'){
			localStorage['hideAddTemplate'] = 0;
			$("#calendar").removeClass("hide-add-template");
			$("#toggleAddTemplateButton > span").removeClass('glyphicon-unchecked').addClass('glyphicon-check');
		}else{
			localStorage['hideAddTemplate'] = 1;
			$("#calendar").addClass("hide-add-template");
			$("#toggleAddTemplateButton > span").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
		}		
	});

	$("#toggleDragDropButton").on('click',function(e){
		e.preventDefault();
		if(localStorage['hideDragDrop'] && localStorage['hideDragDrop'] == '1'){
			localStorage['hideDragDrop'] = 0;
			$("#calendar").removeClass("hide-drag-drop");
			$("#toggleDragDropButton > span").removeClass('glyphicon-unchecked').addClass('glyphicon-check');
		}else{
			localStorage['hideDragDrop'] = 1;
			$("#calendar").addClass("hide-drag-drop");
			$("#toggleDragDropButton > span").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
		}		
	});


	if(localStorage['hideTaskName'] && localStorage['hideTaskName'] == '1'){
		$("#calendar").addClass("hide-task-name");
		$("#toggleTaskNamButton > span").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
	}
	$("#toggleTaskNamButton").on('click',function(e){
		e.preventDefault();
		if(localStorage['hideTaskName'] && localStorage['hideTaskName'] == '1'){
			localStorage['hideTaskName'] = 0;
			$("#calendar").removeClass("hide-task-name");
			$("#toggleTaskNamButton > span").removeClass('glyphicon-unchecked').addClass('glyphicon-check');
		}else{
			localStorage['hideTaskName'] = 1;
			$("#calendar").addClass("hide-task-name");
			$("#toggleTaskNamButton > span").removeClass('glyphicon-check').addClass('glyphicon-unchecked');
		}		
		$('#calendar').fullCalendar('refetchEvents');
	});
	
	$( window ).resize(function() {
		$("#eventHolder").css('max-height',$(window).height() - 391);
		$leftBarHolder.css('width',$("#leftBar").width());
	});
	var $leftBarHolder = $("#leftBarHolder").css('width',$("#leftBar").width());

	$("#exportButton").on('click',function(){
		var dateInputBox = $('#exportDateRange').data('daterangepicker');
		dateInputBox.setStartDate($("#calendar").data('fullCalendar').getView().start);
		dateInputBox.setEndDate($("#calendar").data('fullCalendar').getView().end);
		dateInputBox.updateInputText();
		$("#exportModal").modal('show');
	});
	
	$("#moveToTopButton").on('click',function(){
		$("html, body").animate({ scrollTop: 0 });
	});
	$("#moveToBottomButton").on('click',function(){
		$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
	});
	
	var $leftBarHolder = $("#leftBarHolder").css('width',$("#leftBar").width());
	if($('#mainContainer').width() > 750){
		$leftBarHolder.affix({ offset: { top: (60+$("#statusBarTop").height()) }});
	}

	$("#eventHolder").css('max-height',$(window).height() - 391);
});