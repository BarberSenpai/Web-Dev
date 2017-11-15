
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
		$("new-task-name").keypress(function(e) {
		if(e.which == 13)
		{
			addTask();
			return false;
		}
		});
		$("app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};	
    function addTask()
		{
        var taskName = $("#new-task-name").val();
        if (taskName)
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
        
		$("button.delete", $task).click(function() { $task.remove(); });
        
		$("button.move-up", $task).click(function() { $task.insertBefore($task.prev()); });
        
		$("button.move-down", $task).click(function() { $task.insertAfter($task.next()); });
        
		$("span.task-name", $task).click(function() { onEditTaskName($(this)); });
        
		$("input.task-name", $task).change(function() { onChangeTaskName($(this)); })
        .blur(function() { $(this).hide().siblings("span.task-name").show(); });
		
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
	
	function moveTask($task, moveUp)
	{
		if(moveUp)
		$task.insertBefore($task.prev());
		else
		$task.insertAfter($task.next());
		saveTaskList();
	}
	
	function removeTask($task)
	{
		$task.remove();
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
    
	$(function()
	{
		window.app = new TaskAtHandApp();
    window.app.start();
});
