/**
 * Initializes the summary view by executing a series of tasks.
 * This asynchronous function ensures the completion of initial setup through 'init',
 * updates the greeting through 'updateGreeting', and then calls 'allopenTasks', 'nearDeadline',
 * and 'urgentCheck' to handle specific summary-related operations.
 *
 * @async
 * @return {Promise<void>} A promise that resolves after all initialization steps are completed.
 */
async function summaryinit() {
    await init();
    await updateGreeting();
    allopenTasks();
    nearDeadline();
    urgentCheck();
}


/**
 * This function has the task of checking what kind of time we have and adapting the greetings accordingly.
 * made by Michael Povoa
 */
async function updateGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const timeGreetingElement = document.getElementById("greeting");

    let greeting = "";

    if (currentHour >= 0 && currentHour < 12) {
        greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon";
    } else if (currentHour >= 18 && currentHour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }
    
    timeGreetingElement.innerHTML = `${greeting}<span id=comma></span>`;
    await welcomeUser();
}


/**
 * This function checks the username. If he is a “guest”, no greeting is displayed. Otherwise, the first name is used for the greeting.
 *  made by Michael Povoa
 */
async function welcomeUser() {
    let currentName = user['name'];

    if (currentName === 'Guest') {

        document.getElementById('comma').innerHTML = '';
    } else {
        const fullName = currentName;
        const [firstName, lastName] = fullName.split(' ');
        document.getElementById('comma').innerHTML = `<span>, </span> `;

        document.getElementById('comma').innerHTML += `<span id="firstName">${firstName}</span>`;
    }
}


/**
 * This function counts the number of tasks in different categories and updates corresponding HTML elements with the counted values ​​on a web page.
 *  made by Michael Povoa
 */
function allopenTasks() {
    let TaskBordLength = openTasks.filter(task => task.container === 'toDo').length;
    let TaskProgressLength = openTasks.filter(task => task.container === 'inProgress').length;
    let TaskFeedbackLength = openTasks.filter(task => task.container === 'awaitFeedback').length;
    let TaskDoneackLength = openTasks.filter(task => task.container === 'done').length;
    let taskToDo = TaskBordLength + TaskProgressLength + TaskFeedbackLength + TaskDoneackLength;

    document.getElementById('openTask').innerHTML = `
    ${TaskBordLength}`;

    document.getElementById('openProgressTask').innerHTML = `
    ${TaskProgressLength}`;

    document.getElementById('openFeedbackTask').innerHTML = `
    ${TaskFeedbackLength}`;

    document.getElementById('openDoneTask').innerHTML = `
    ${TaskDoneackLength}`;

    document.getElementById('openBoardTask').innerHTML = `
    ${taskToDo}`;
}


/**
 * This function finds the nearest task with a due date, compares it to the current date, and displays that task's due date (if any) in a specific date format on a web page.
 *  made by Michael Povoa
 */
function nearDeadline() {
    let nearestTask = null;
    let nearestDeadline = Infinity;
    for (let task of openTasks) {
        const taskDeadline = new Date(task.date);
        const currentDate = new Date();

        if (taskDeadline >= currentDate && taskDeadline < nearestDeadline) {
            nearestDeadline = taskDeadline;
            nearestTask = task;
        }
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDeadline = nearestTask ? new Date(nearestTask.date).toLocaleDateString('en-US', options) : 'Keine fälligen Aufgaben';
    document.getElementById('deadlineDatum').innerHTML = `${formattedDeadline}`;
}


/**
 * This function counts the number of urgent tasks in a list of open tasks and displays this count in an HTML element on a web page.
 *  made by Michael Povoa
 */
function urgentCheck() {
    let urgentTasksCount = 0;

    for (let task of openTasks) {
        if (task.priority === 'Urgent') {
            urgentTasksCount++;
        }
    }

    document.getElementById('allUrgentTasks').innerHTML = `${urgentTasksCount}`;
}