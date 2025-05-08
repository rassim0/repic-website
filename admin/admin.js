document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const content = document.querySelector('.content');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('active');
            content.classList.toggle('full-width');
        });
    }

    // Mock Data
    let ideas = [
        { id: 1, title: 'Solar Panel Design', description: 'Eco-friendly panel layout', category: 'Innovation' },
        { id: 2, title: 'AI Workshop', description: 'Intro to AI for members', category: 'Education' }
    ];
    let media = [
        { id: 1, file: 'workshop.jpg', caption: 'Renewable Energy Workshop', url: 'https://via.placeholder.com/150' },
        { id: 2, file: 'demo.mp4', caption: 'Smart Grid Demo', url: 'https://via.placeholder.com/150' }
    ];
    let projects = [
        { id: 1, title: 'Smart Grid', description: 'IoT-based grid system', status: 'In Progress', members: ['John', 'Sarah'] },
        { id: 2, title: 'Water Dispenser', description: 'Automatic dispenser', status: 'Completed', members: ['Ali'] }
    ];
    let profiles = [
        { id: 1, name: 'John Doe', bio: 'Renewable energy enthusiast', photo: 'https://via.placeholder.com/50', contact: 'john@example.com' },
        { id: 2, name: 'Sarah Lee', bio: 'AI researcher', photo: 'https://via.placeholder.com/50', contact: 'sarah@example.com' }
    ];
    let chats = [
        { id: 1, user: 'John', message: 'Great workshop!', timestamp: '2025-04-18 09:00' },
        { id: 2, user: 'Sarah', message: 'Need help with project', timestamp: '2025-04-18 09:05' }
    ];
    let members = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Member', approved: true },
        { id: 2, name: 'Ali Smith', email: 'ali@example.com', role: 'Pending', approved: false }
    ];

    // Update Dashboard Stats
    function updateDashboard() {
        const totalMembers = document.getElementById('totalMembers');
        const ongoingProjects = document.getElementById('ongoingProjects');
        const upcomingEvents = document.getElementById('upcomingEvents');
        const activitiesList = document.getElementById('recentActivities');

        if (totalMembers) totalMembers.textContent = members.filter(m => m.approved).length;
        if (ongoingProjects) ongoingProjects.textContent = projects.filter(p => p.status === 'In Progress').length;
        if (upcomingEvents) upcomingEvents.textContent = '5'; // Static for demo
        if (activitiesList) {
            activitiesList.innerHTML = `
                <li class="list-group-item">John Doe updated <b>Project Alpha</b> status.</li>
                <li class="list-group-item">Admin added event: <b>Renewable Energy Workshop</b></li>
                <li class="list-group-item">New member <b>Sarah Lee</b> joined.</li>
            `;
        }
    }

    // Render Table
    function renderTable(tableId, data, fields, actions) {
        const tableBody = document.getElementById(tableId);
        if (!tableBody) return;
        tableBody.innerHTML = data.map(item => `
            <tr>
                ${fields.map(field => `<td>${Array.isArray(item[field]) ? item[field].join(', ') : item[field]}</td>`).join('')}
                <td>
                    ${actions.edit ? `<button class="btn btn-warning btn-sm" onclick="editItem('${tableId}', ${item.id})">Edit</button>` : ''}
                    ${actions.delete ? `<button class="btn btn-danger btn-sm" onclick="deleteItem('${tableId}', ${item.id})">Delete</button>` : ''}
                    ${actions.custom ? actions.custom(item) : ''}
                </td>
            </tr>
        `).join('');
    }

    // Edit Item
    window.editItem = function(tableId, id) {
        let data;
        let formId;
        if (tableId === 'ideasTable') { data = ideas; formId = 'ideaForm'; }
        else if (tableId === 'mediaTable') { data = media; formId = 'mediaForm'; }
        else if (tableId === 'projectsTable') { data = projects; formId = 'projectForm'; }
        else if (tableId === 'profilesTable') { data = profiles; formId = 'profileForm'; }
        else if (tableId === 'chatsTable') { data = chats; formId = 'chatForm'; }
        else if (tableId === 'membersTable') { data = members; formId = 'memberForm'; }

        const item = data.find(i => i.id === id);
        const form = document.getElementById(formId);
        if (!form || !item) return;

        Object.keys(item).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) input.value = Array.isArray(item[key]) ? item[key].join(', ') : item[key];
        });
    };

    // Delete Item
    window.deleteItem = function(tableId, id) {
        if (!confirm('Are you sure you want to delete this item?')) return;
        if (tableId === 'ideasTable') ideas = ideas.filter(i => i.id !== id);
        else if (tableId === 'mediaTable') media = media.filter(m => m.id !== id);
        else if (tableId === 'projectsTable') projects = projects.filter(p => p.id !== id);
        else if (tableId === 'profilesTable') profiles = profiles.filter(p => p.id !== id);
        else if (tableId === 'chatsTable') chats = chats.filter(c => c.id !== id);
        else if (tableId === 'membersTable') members = members.filter(m => m.id !== id);
        updateTables();
        updateDashboard();
    };

    // Handle Form Submission
    function handleFormSubmit(formId, dataArray, tableId, fields, clearFields) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(form);
            const item = {};
            formData.forEach((value, key) => {
                item[key] = key === 'members' ? value.split(',').map(m => m.trim()) : value;
            });

            const existing = dataArray.find(i => i.id == item.id);
            if (existing) {
                Object.assign(existing, item);
            } else {
                item.id = dataArray.length + 1;
                dataArray.push(item);
            }

            updateTables();
            updateDashboard();
            form.reset();
            clearFields.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (input) input.value = '';
            });
        });
    }

    // Approve Member
    window.approveMember = function(id) {
        const member = members.find(m => m.id === id);
        if (member) {
            member.approved = true;
            member.role = 'Member';
            updateTables();
            updateDashboard();
        }
    };

    // Ban User
    window.banUser = function(id) {
        if (!confirm('Are you sure you want to ban this user?')) return;
        chats = chats.filter(c => c.id !== id);
        updateTables();
    };

    // Update All Tables
    function updateTables() {
        renderTable('ideasTable', ideas, ['title', 'description', 'category'], { edit: true, delete: true });
        renderTable('mediaTable', media, ['file', 'caption'], { edit: true, delete: true });
        renderTable('projectsTable', projects, ['title', 'description', 'status', 'members'], { edit: true, delete: true });
        renderTable('profilesTable', profiles, ['name', 'bio', 'contact'], { edit: true, delete: true });
        renderTable('chatsTable', chats, ['user', 'message', 'timestamp'], { 
            delete: true, 
            custom: item => `<button class="btn btn-danger btn-sm" onclick="banUser(${item.id})">Ban</button>`
        });
        renderTable('membersTable', members, ['name', 'email', 'role'], { 
            edit: true, 
            delete: true, 
            custom: item => item.approved ? '' : `<button class="btn btn-success btn-sm" onclick="approveMember(${item.id})">Approve</button>`
        });
    }

    // Initialize Forms
    handleFormSubmit('ideaForm', ideas, 'ideasTable', ['title', 'description', 'category'], ['title', 'description', 'category']);
    handleFormSubmit('mediaForm', media, 'mediaTable', ['file', 'caption', 'url'], ['file', 'caption']);
    handleFormSubmit('projectForm', projects, 'projectsTable', ['title', 'description', 'status', 'members'], ['title', 'description', 'members']);
    handleFormSubmit('profileForm', profiles, 'profilesTable', ['name', 'bio', 'photo', 'contact'], ['name', 'bio', 'photo', 'contact']);
    handleFormSubmit('chatForm', chats, 'chatsTable', ['user', 'message', 'timestamp'], ['message']);
    handleFormSubmit('memberForm', members, 'membersTable', ['name', 'email', 'role'], ['name', 'email', 'role']);

    // Initialize Dashboard and Tables
    updateDashboard();
    updateTables();
});