"use strict";

function TaskAtHandApp()
{
	var version = "v1.3",
		appStorage = new AppStorage("taskAtHand");	
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}
	this.start = function()
	{
		$("#new-task-name").keypress(function(e) {
			if(e.which == 13) //13 is the ASCII code for enter
			{
				addTask();
				return false;
			}
		});		
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};	
	function addTask() 
	{
		var taskName = $("#new-task-name").val();
		if(taskName) 
		{
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}		
	}	
	function addTaskElement(taskName)
	{
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		
		saveTaskList();
	}
	
	function onEditTaskName($span)
	{
		$span.hide()
			 .siblings("input.task-name")
			 .show()
			 .val($span.text())
			 .show()
			 .focus();
		saveTaskList();
	}
	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
	}
	function removeTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	function moveTask($task, moveUp)
	{
		if(moveUp)
			$task.insertBefore($task.prev());
		else
			$task.insertAfter($task.next());
		saveTaskList();
	}
	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text());
		});
		appStorage.setValue("taskList", tasks);
	}	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if(tasks)
		{
			for(var i in tasks)
				addTaskElement(tasks[i]);
		}
	}
} 
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});