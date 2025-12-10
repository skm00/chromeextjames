let quill;
let currentEditIndex = -1;
let draggedIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    initializeEditor();
    setupEventListeners();
    loadTasks();
});

// todo.js
function initializeEditor() {
    // Extended color palette with popular colors
    const colors = [
        '#2c3e50',   // Dark slate
        '#3498db',   // Peter river
        '#2ecc71',   // Emerald
        '#f1c40f',   // Sun flower
        '#e74c3c',   // Alizarin
        '#9b59b6',   // Amethyst
        '#ff7f50',   // Coral
        '#ff69b4',   // Hot pink
        '#1abc9c',   // Turquoise
        '#4b0082',   // Indigo
        '#95a5a6',   // Cool gray
        '#8b0000',   // Dark red
        '#87ceeb',   // Light sky blue
        '#ffd700',   // Gold
        '#228b22',   // Forest green
        '#6a5acd',   // Slate blue
        '#ffffff',   // White
        '#000000'    // Black
    ];

    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline'],
                    [{ 'header': [1, 2, false] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'blockquote'],
                    [{ 'color': colors }, { 'background': colors }],
                    ['clean']
                ],
                handlers: {
                    color: function(value) {
                        this.quill.format('color', value);
                    },
                    background: function(value) {
                        this.quill.format('background', value);
                    }
                }
            }
        },
        formats: [
            'header',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'link', 'blockquote',
            'color', 'background'
        ]
    });

    // Add CSS for color classes
    const style = document.createElement('style');
    style.textContent = `
        .ql-color-palette {
            width: 240px !important;
            padding: 8px !important;
        }
        .ql-color-picker .ql-picker-item {
            width: 20px !important;
            height: 20px !important;
        }
        /* Text colors */
        .ql-color-#2c3e50 { color: #2c3e50 !important; }
        .ql-color-#3498db { color: #3498db !important; }
        .ql-color-#2ecc71 { color: #2ecc71 !important; }
        .ql-color-#f1c40f { color: #f1c40f !important; }
        .ql-color-#e74c3c { color: #e74c3c !important; }
        .ql-color-#9b59b6 { color: #9b59b6 !important; }
        .ql-color-#ff7f50 { color: #ff7f50 !important; }
        .ql-color-#ff69b4 { color: #ff69b4 !important; }
        .ql-color-#1abc9c { color: #1abc9c !important; }
        .ql-color-#4b0082 { color: #4b0082 !important; }
        .ql-color-#95a5a6 { color: #95a5a6 !important; }
        .ql-color-#8b0000 { color: #8b0000 !important; }
        .ql-color-#87ceeb { color: #87ceeb !important; }
        .ql-color-#ffd700 { color: #ffd700 !important; }
        .ql-color-#228b22 { color: #228b22 !important; }
        .ql-color-#6a5acd { color: #6a5acd !important; }
        .ql-color-#ffffff { color: #ffffff !important; }
        .ql-color-#000000 { color: #000000 !important; }
        
        /* Background colors */
        .ql-bg-#2c3e50 { background-color: #2c3e50 !important; }
        .ql-bg-#3498db { background-color: #3498db !important; }
        .ql-bg-#2ecc71 { background-color: #2ecc71 !important; }
        .ql-bg-#f1c40f { background-color: #f1c40f !important; }
        .ql-bg-#e74c3c { background-color: #e74c3c !important; }
        .ql-bg-#9b59b6 { background-color: #9b59b6 !important; }
        .ql-bg-#ff7f50 { background-color: #ff7f50 !important; }
        .ql-bg-#ff69b4 { background-color: #ff69b4 !important; }
        .ql-bg-#1abc9c { background-color: #1abc9c !important; }
        .ql-bg-#4b0082 { background-color: #4b0082 !important; }
        .ql-bg-#95a5a6 { background-color: #95a5a6 !important; }
        .ql-bg-#8b0000 { background-color: #8b0000 !important; }
        .ql-bg-#87ceeb { background-color: #87ceeb !important; }
        .ql-bg-#ffd700 { background-color: #ffd700 !important; }
        .ql-bg-#228b22 { background-color: #228b22 !important; }
        .ql-bg-#6a5acd { background-color: #6a5acd !important; }
        .ql-bg-#ffffff { background-color: #ffffff !important; }
        .ql-bg-#000000 { background-color: #000000 !important; }
    `;
    document.head.appendChild(style);
}

function setupEventListeners() {
    document.getElementById('newTaskBtn').addEventListener('click', () => showEditor());
    document.getElementById('saveTaskBtn').addEventListener('click', saveTask);
    document.getElementById('cancelBtn').addEventListener('click', hideEditor);
    document.getElementById('closeViewerBtn').addEventListener('click', hideViewer);
        document.getElementById('closeViewerBtn2').addEventListener('click', hideViewer);

    const taskList = document.getElementById('taskList');
    taskList.addEventListener('click', handleTaskClick);
    taskList.addEventListener('dragstart', handleDragStart);
    taskList.addEventListener('dragover', handleDragOver);
    taskList.addEventListener('drop', handleDrop);
    taskList.addEventListener('dragend', handleDragEnd);
}

function handleTaskClick(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const index = Array.from(taskItem.parentNode.children).indexOf(taskItem);
    
    if (e.target.closest('[data-action="edit"]')) {
        e.stopPropagation();
        showEditor(index);
    }
    else if (e.target.closest('[data-action="delete"]')) {
        e.stopPropagation();
        deleteTask(index);
    }
    else {
        showTaskDetails(index);
    }
}

// Drag and Drop Functions
function handleDragStart(e) {
    draggedIndex = Array.from(e.target.closest('.task-item').parentNode.children)
                      .indexOf(e.target.closest('.task-item'));
    e.target.closest('.task-item').classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const taskList = document.getElementById('taskList');
    const draggingItem = taskList.querySelector('.dragging');
    const siblings = [...taskList.querySelectorAll('.task-item:not(.dragging)')];
    
    const nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    
    taskList.insertBefore(draggingItem, nextSibling);
}

function handleDrop(e) {
    e.preventDefault();
    const newIndex = Array.from(e.target.closest('.task-item').parentNode.children)
                    .indexOf(e.target.closest('.task-item'));
    
    chrome.storage.local.get("tasks", ({tasks = []}) => {
        const movedTask = tasks.splice(draggedIndex, 1)[0];
        tasks.splice(newIndex, 0, movedTask);
        chrome.storage.local.set({ tasks }, loadTasks);
    });
}

function handleDragEnd(e) {
    e.target.closest('.task-item').classList.remove('dragging');
}

function showEditor(index = -1) {
    currentEditIndex = index;
    const modal = document.getElementById('editorModal');
    
    if(index >= 0) {
        chrome.storage.local.get("tasks", ({tasks}) => {
            document.getElementById('taskTitle').value = tasks[index].title;
            quill.root.innerHTML = tasks[index].body;
            document.getElementById('dueDate').value = tasks[index].dueDate;
        });
    } else {
        document.getElementById('taskTitle').value = '';
        quill.root.innerHTML = '';
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 30);
        document.getElementById('dueDate').value = defaultDate.toISOString().split('T')[0];
    }
    modal.style.display = 'flex';
}

function hideEditor() {
    document.getElementById('editorModal').style.display = 'none';
}

function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const body = quill.root.innerHTML;
    const dueDate = document.getElementById('dueDate').value;
    
    if(!title) return alert('Title is required');
    
    chrome.storage.local.get("tasks", ({tasks = []}) => {
        if(currentEditIndex >= 0) {
            // Update existing task
            tasks[currentEditIndex] = {
                ...tasks[currentEditIndex],
                title,
                body,
                dueDate
            };
        } else {
            // Add new task to the beginning of the array
            tasks.unshift({ 
                title, 
                body, 
                dueDate, 
                completed: false,
                createdAt: new Date().toISOString()
            });
        }
        chrome.storage.local.set({ tasks }, () => {
            loadTasks();
            hideEditor();
        });
    });
}
function loadTasks() {
    chrome.storage.local.get("tasks", ({ tasks = [] }) => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const progress = getProgress(task);
            const progressClass = getProgressClass(task.dueDate);
            
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.draggable = true;
            taskItem.innerHTML = `
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
                    <div class="task-actions">
                        <button class="action-btn edit-btn" data-action="edit" data-index="${index}" title="Edit">
                            <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button class="action-btn delete-btn" data-action="delete" data-index="${index}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="due-date-progress ${progressClass}" 
                     style="--progress-width: ${progress}%"></div>
                <div class="time-status">
                    <span class="status-pill">${getDateStatus(task.dueDate)}</span>
                    <span class="days-remaining">${getDaysRemaining(task.dueDate)}</span>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    });
}


 

// Progress and Date Helpers
function getProgress(task) {
    const createdAt = task.createdAt ? new Date(task.createdAt) : new Date(new Date(task.dueDate).getTime() - 2592000000);
    const due = new Date(task.dueDate);
    const now = new Date();
    
    const totalDuration = due - createdAt;
    if (totalDuration <= 0) return 100;
    
    const elapsed = now - createdAt;
    const progress = (elapsed / totalDuration) * 100;
    
    return Math.min(100, Math.max(0, progress));
}

function getProgressClass(dueDate) {
    const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if(days < 0) return 'progress-danger';
    if(days <= 3) return 'progress-warning';
    return 'progress-safe';
}

function getDaysRemaining(dueDate) {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = due - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if(days < 0) return `${Math.abs(days)} days overdue`;
    if(days === 0) return 'Due today';
    return `${days} days remaining`;
}

function getDateStatus(dueDate) {
    const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if(days < 0) return 'Overdue';
    if(days === 0) return 'Due Today';
    if(days <= 3) return 'Due Soon';
    return 'On Track';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showTaskDetails(index) {
    chrome.storage.local.get("tasks", ({tasks}) => {
        const task = tasks[index];
        document.getElementById('viewTitle').textContent = task.title;
        document.getElementById('viewContent').innerHTML = task.body;
        document.getElementById('viewDueDate').textContent = `Due: ${formatDate(task.dueDate)}`;
        document.getElementById('viewerModal').style.display = 'flex';
    });
}

function hideViewer() {
    document.getElementById('viewerModal').style.display = 'none';
}

function deleteTask(index) {
    chrome.storage.local.get("tasks", ({tasks = []}) => {
        tasks.splice(index, 1);
        chrome.storage.local.set({ tasks }, loadTasks);
    });
}


function sendButtonClickData(buttonId) {
   fetch("https://scrsht.com/track-button-click.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buttonId: buttonId,
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Button click tracked successfully:", data);
    //  alert("Button click tracked successfully:", data);
	  
    })
    .catch((error) => {
      console.error("Error sending button click data:", error);
	//        alert("Error sending button click data:", error);

    });
}


document.addEventListener("DOMContentLoaded", () => {
    var buttonId = 'openToDo';
    sendButtonClickData(buttonId);
});
	
