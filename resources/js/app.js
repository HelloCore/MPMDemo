var serviceBaseURL = window.location.protocol +'//'+ window.location.host;
if(window.location.host == 'localhost:8080'){
	serviceBaseURL += '/MPMService';
}

var serviceURL = {
	"authen" : {
		"validate" : serviceBaseURL + "/authen/validate.htm",
		"login" : serviceBaseURL + "/authen/login.htm",
		"logout" : serviceBaseURL + "/authen/logout.htm"
	},
	"mpm" : {
		"timesheet" : {
			"list" : serviceBaseURL + "/timesheet/listPaging.htm",
			"creates" : serviceBaseURL + "/timesheet/creates.htm",
			"remove" : serviceBaseURL + "/timesheet/delete.htm",
		},
		"customerProject" : {
			"listCustomerTask" : serviceBaseURL + "/customerProject/listCustomer.htm"
		}
	}
};


var application = { 
	isFirstLogin : false,
	lastCallback : {},
	path : serviceBaseURL ,
	isValid : false,
	htmlEscape : function(s) {
		return (s + '').replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#039;')
			.replace(/"/g, '&quot;')
			.replace(/\n/g, '<br />');
	},
	alertSuccess : function(message){
		$.jGrowl(message,{header:'Success',theme:'alert alert-block alert-success'});
	},
	alertError : function(message){
		$.jGrowl(message,{header:'Error',theme:'alert alert-error alert-error'});
	},


	lastResult : {},
	callService : function(obj){	
		obj.data = obj.data? obj.data : {};
		obj.headers = {};
		if(localStorage['mpm-session-id']){
			obj.headers['x-mpm-session-id'] = localStorage['mpm-session-id'];
		}
		if(localStorage['sign-front-session-id']){
			obj.headers['x-sign-front-session-id'] = localStorage['sign-front-session-id'];
		}
		if(application.csrfToken){
			obj.headers['csrf-token'] = application.csrfToken;
		}
		
		$.ajax({
			url : obj.url,
			type : obj.type?obj.type:'GET',
			data : obj.data?obj.data:{},
			dataType : 'json',
			headers : obj.headers,
	        success : function(jqXHR,textStatus) { 
	        	if(obj.success){
					setTimeout(function(){
		    			obj.success(jqXHR);
					},0);
	    		}        	
	        },
	        error : function(jqXHR,textStatus ){
	        	if(jqXHR.status == 404 || jqXHR.status == 500){
	        		application.alertError("Cannot connect to server");
	        	}else{
	        		if(jqXHR.responseText.length > 0){
	        			application.lastResult = JSON.parse(jqXHR.responseText);
	        		}
					if(application.lastResult.errorCode == 2001){
						delete localStorage['mpm-session-id'];
						if(obj.success){
							application.lastCallback = obj.success;
						}
						$("#loginModal").modal('show');
					}else{
			        	if(obj.error){
			     			obj.error(application.lastResult);
			        	}
			        }
	        	}
	        }
		})
	},
	
	validateSession : function(callback){
		if(localStorage['mpm-session-id']){
			application.callService({
				url: serviceURL.authen.validate,
				type: 'GET',
				success: function(responseData){
					application.isValid = true;
					application.csrfToken = responseData.csrfToken;
					application.processValidateComplete(responseData.name);
					if(callback){
						callback(responseData);
					}
				},
				error: function(responseData){
					application.isValid = false;
					application.alertError(responseData.message);
				}
			});
		}else{
			application.lastCallback = callback;
			$("#loginModal").modal('show');	
		}
	},
	processValidateComplete : function(username){
		$("#usernameHolder").text(username);
	},
	progressBar : {
		create: function(progressClass){
			return $('<div class="progress progress-striped active temp-progress-bar"><div class="progress-bar '+progressClass+'" role="progressbar" style="width: 1%;"></div></div>');
		}
	}
}

$(document).ready(function(){
	$(document).ajaxStart(function(){
		var randomNumber = Math.floor((Math.random() * 5)),progressClass,progressBar;
		if(randomNumber == 0){
			progressClass = 'progress-bar-primary';
		}else if (randomNumber == 1){
			progressClass = 'progress-bar-success';			
		}else if (randomNumber == 2){
			progressClass = 'progress-bar-info';		
		}else if (randomNumber == 3){
			progressClass = 'progress-bar-warning';			
		}else{
			progressClass = 'progress-bar-danger';			
		}
		progressBar = application.progressBar.create(progressClass);
		$.blockUI({ "message": progressBar,css:{ border: '0px',backgroundColor:'transparent' }});
		progressBar.find('div').css('width','100%');
	}).ajaxStop(function(){
		$.unblockUI();
//		$('#globalProgessBar').hide();
//		$('#globalProgessBar > div').css('width','1%');
	});

	application.loginModal = $('#loginModal').modal({'backdrop':'static','show':false});
	
	$("#loginButton").click(function(e){
		e.preventDefault();
		$("#loginForm").submit();
	});
	
	$("#loginForm").submit(function(e){
		var userName = $("#username").val();
		e.preventDefault();
		application.callService({
			url : serviceURL.authen.login,
			type: 'POST',
			data: {
				username: userName,
				password: $("#password").val()
			},
			success: function(response){
				application.isFirstLogin = true;
				localStorage['myName'] = userName;
				localStorage['mpm-session-id'] = response.sessionId;
				localStorage['sign-front-session-id'] = response.signfrontSessionId;
				application.csrfToken = response.csrfToken;
				$("#username").val('');
				$("#password").val('');
				$('#loginModal').modal('hide');
				application.processValidateComplete(response.name);
				if(application.lastCallback){
					application.lastCallback(response);
				}
			},
			error: function(response){
				$("#username").val('');
				$("#password").val('');
				if(response.errorCode == 1001 || response.errorCode == 2003){
					$('#loginErrorMessage').text(response.message).fadeIn(300);
				}
			}
		});
	});
	$("#logoutButton").click(function(e){		
		e.preventDefault();
		application.callService({
			url: serviceURL.authen.logout,
			error:function(){},
			success:function(){
				delete localStorage['mpm-session-id'];
				window.location.reload();
			}
		});
	});
	
	
});