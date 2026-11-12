(() => {
  'use strict';
  const STORAGE_KEY = 'taskflow-local-demo-v1';
  const statuses = ['todo', 'progress', 'review', 'done'];
  const statusNames = { todo: 'To do', progress: 'In progress', review: 'In review', done: 'Done' };
  const people = {
    'Alex Morgan': { initials: 'AM', color: 'avatar-me' },
    'Jules Park': { initials: 'JP', color: 'avatar-jules' },
    'Ravi Shah': { initials: 'RS', color: 'avatar-ravi' },
    'Mia Chen': { initials: 'MC', color: 'avatar-mia' },
    'Unassigned': { initials: '—', color: 'avatar-extra' }
  };
  const starterTasks = [
    { id:'tf-01', title:'Map the first-run experience', description:'Sketch the welcome flow and note the moments that need a little more care.', priority:'high', assignee:'Alex Morgan', due:'Oct 22', status:'todo', tags:['Product'] },
    { id:'tf-02', title:'Gather customer interview notes', description:'Pull the recurring themes into one easy-to-scan summary.', priority:'medium', assignee:'Jules Park', due:'Oct 23', status:'todo', tags:['Research'] },
    { id:'tf-03', title:'Define success metrics', description:'Agree on a small set of signals for the next release.', priority:'low', assignee:'Ravi Shah', due:'Oct 25', status:'todo', tags:['Planning'] },
    { id:'tf-04', title:'Refresh the settings page', description:'Simplify the layout and make account preferences easier to find.', priority:'high', assignee:'Mia Chen', due:'Oct 21', status:'progress', tags:['Design'] },
    { id:'tf-05', title:'Write empty-state messages', description:'Keep helpful hints warm, brief, and genuinely useful.', priority:'medium', assignee:'Alex Morgan', due:'Oct 24', status:'progress', tags:['Content'] },
    { id:'tf-06', title:'Build reusable button styles', description:'Bring hover, focus, and disabled states into the shared pattern.', priority:'low', assignee:'Ravi Shah', due:'Oct 26', status:'progress', tags:['UI kit'] },
    { id:'tf-07', title:'Review onboarding prototype', description:'The latest clickable flow is ready for a second pair of eyes.', priority:'high', assignee:'Jules Park', due:'Oct 22', status:'review', tags:['Design'] },
    { id:'tf-08', title:'Check mobile spacing', description:'A final pass on small-screen rhythm and tap targets.', priority:'medium', assignee:'Mia Chen', due:'Oct 20', status:'review', tags:['Quality'] },
    { id:'tf-09', title:'Share the project kickoff', description:'Align on the problem, the team, and a good first milestone.', priority:'low', assignee:'Alex Morgan', due:'Oct 18', status:'done', tags:['Team'] }
  ];
  const lists = Object.fromEntries(statuses.map(s => [s, document.querySelector(`[data-list="${s}"]`)]));
  const search = document.getElementById('search-input');
  const statusFilter = document.getElementById('status-filter');
  const priorityFilter = document.getElementById('priority-filter');
  const dialog = document.getElementById('task-dialog');
  const form = document.getElementById('task-form');
  const toast = document.getElementById('toast');
  const announcer = document.getElementById('board-announcer');
  let draggedId = null;
  let toastTimer;
  let tasks = loadTasks();

  function loadTasks() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(isValidTask)) return parsed;
      }
    } catch (error) { /* Storage may be disabled; this session still works. */ }
    return starterTasks.map(task => ({ ...task, tags: [...task.tags] }));
  }
  function isValidTask(task) {
    return task && typeof task.id === 'string' && typeof task.title === 'string' && statuses.includes(task.status) && ['high','medium','low'].includes(task.priority) && typeof task.assignee === 'string';
  }
  function saveTasks() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch (error) { showToast('Changes are only saved for this session in this browser.'); }
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function makeAvatar(person, label) {
    const info = people[person] || people['Unassigned'];
    const avatar = element('span', `avatar ${info.color}`, info.initials);
    avatar.setAttribute('aria-label', label || person);
    return avatar;
  }
  function cardFor(task) {
    const card = element('article', 'task-card');
    card.dataset.id = task.id;
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('draggable', 'true');
    card.setAttribute('aria-label', `${task.title}. ${task.priority} priority. Assigned to ${task.assignee}. ${statusNames[task.status]}. Use arrow keys to move between columns.`);
    const topline = element('div', 'task-topline');
    const priority = element('span', `priority priority-${task.priority}`);
    const mark = element('span', 'priority-mark', task.priority === 'high' ? '↑' : task.priority === 'medium' ? '◆' : '↓');
    mark.setAttribute('aria-hidden', 'true');
    priority.append(mark, document.createTextNode(task.priority[0].toUpperCase() + task.priority.slice(1)));
    topline.append(priority, element('span', 'card-menu', '···'));
    const title = element('h3', '', task.title);
    card.append(topline, title);
    if (task.description) card.append(element('p', 'task-description', task.description));
    if (Array.isArray(task.tags) && task.tags.length) {
      const tags = element('div', 'task-tags');
      task.tags.slice(0, 2).forEach(tag => tags.append(element('span', 'task-tag', tag)));
      card.append(tags);
    }
    const footer = element('div', 'task-card-footer');
    const assignee = element('span', 'assignee');
    assignee.append(makeAvatar(task.assignee), element('span', '', task.assignee));
    const due = element('span', 'due-date', task.due || 'No due date');
    if (task.due === 'Oct 20' && task.status !== 'done') due.classList.add('overdue');
    footer.append(assignee, due);
    card.append(footer);
    card.addEventListener('dragstart', event => {
      draggedId = task.id;
      card.classList.add('dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', task.id);
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      document.querySelectorAll('.drop-active').forEach(col => col.classList.remove('drop-active'));
      draggedId = null;
    });
    card.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const oldIndex = statuses.indexOf(task.status);
      const newStatus = statuses[Math.max(0, Math.min(statuses.length - 1, oldIndex + (event.key === 'ArrowRight' ? 1 : -1)))];
      if (newStatus !== task.status) moveTask(task.id, newStatus, true);
      requestAnimationFrame(() => document.querySelector(`[data-id="${CSS.escape(task.id)}"]`)?.focus());
    });
    return card;
  }
  function visibleTasks() {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedStatus = statusFilter.value;
    const selectedPriority = priorityFilter.value;
    return tasks.filter(task => {
      const matchesText = !query || [task.title, task.description, task.assignee, ...(task.tags || [])].join(' ').toLocaleLowerCase().includes(query);
      return matchesText && (selectedStatus === 'all' || task.status === selectedStatus) && (selectedPriority === 'all' || task.priority === selectedPriority);
    });
  }
  function render() {
    const shown = visibleTasks();
    statuses.forEach(status => {
      const list = lists[status];
      list.replaceChildren();
      const columnTasks = shown.filter(task => task.status === status);
      document.querySelector(`[data-count="${status}"]`).textContent = String(tasks.filter(task => task.status === status).length);
      if (!columnTasks.length) list.append(element('p', 'task-empty', shown.length ? 'No matching tasks' : 'Nothing here yet — add a task'));
      columnTasks.forEach(task => list.append(cardFor(task)));
    });
    document.getElementById('nav-count').textContent = String(tasks.length);
    const hasFilter = search.value.trim() || statusFilter.value !== 'all' || priorityFilter.value !== 'all';
    document.getElementById('clear-filters').hidden = !hasFilter;
  }
  function moveTask(id, status, keyboard = false) {
    const task = tasks.find(item => item.id === id);
    if (!task || task.status === status) return;
    task.status = status;
    saveTasks();
    render();
    const message = `Moved “${task.title}” to ${statusNames[status]}.`;
    announcer.textContent = message;
    showToast(message);
    if (!keyboard) document.querySelector(`[data-id="${CSS.escape(id)}"]`)?.focus();
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  }
  function openDialog(status = 'todo') {
    document.getElementById('task-status').value = status;
    dialog.showModal();
    requestAnimationFrame(() => document.getElementById('task-title').focus());
  }
  document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', event => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      column.classList.add('drop-active');
    });
    column.addEventListener('dragleave', event => {
      if (!column.contains(event.relatedTarget)) column.classList.remove('drop-active');
    });
    column.addEventListener('drop', event => {
      event.preventDefault();
      column.classList.remove('drop-active');
      const id = event.dataTransfer.getData('text/plain') || draggedId;
      moveTask(id, column.dataset.status);
    });
  });
  search.addEventListener('input', render);
  statusFilter.addEventListener('change', render);
  priorityFilter.addEventListener('change', render);
  document.getElementById('clear-filters').addEventListener('click', () => {
    search.value = '';
    statusFilter.value = 'all';
    priorityFilter.value = 'all';
    render();
    search.focus();
  });
  document.getElementById('add-task-button').addEventListener('click', () => openDialog());
  document.querySelectorAll('[data-add-status]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.addStatus)));
  document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
  document.getElementById('cancel-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    if (!title) return;
    const task = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      title,
      description: String(data.get('description') || '').trim(),
      priority: String(data.get('priority')),
      assignee: String(data.get('assignee')),
      status: String(data.get('status')),
      due: '', tags: []
    };
    tasks.unshift(task);
    saveTasks();
    form.reset();
    dialog.close();
    render();
    showToast('Task added to your local board.');
    announcer.textContent = `Added ${task.title} to ${statusNames[task.status]}.`;
    requestAnimationFrame(() => document.querySelector(`[data-id="${CSS.escape(task.id)}"]`)?.focus());
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !dialog.open && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      search.focus();
    }
  });
  document.getElementById('help-button')?.addEventListener('click', () => showToast('Local demo: sample tasks and your edits stay in this browser only.'));
  document.getElementById('invite-button').addEventListener('click', () => showToast('Team invites are not connected in this local demo.'));
  document.querySelectorAll('.column-menu,.profile-more').forEach(button => button.addEventListener('click', () => showToast('Workspace options are not connected in this demo.')));
  render();
})();
