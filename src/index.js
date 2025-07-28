// Main application entry point

// Application state
let currentPage = 'home';
let tasks = [];
let masters = [];

// Sample data
const sampleTasks = [
  {
    id: 1,
    title: 'Повісити картину в спальні',
    category: 'hanging',
    description: 'Потрібно акуратно повісити велику картину над ліжком. Є дрель і саморізи.',
    budget: 300,
    urgency: 'flexible',
    city: 'Київ',
    status: 'open',
    createdAt: new Date('2024-06-01'),
    clientName: 'Марія К.',
    responses: 3
  },
  {
    id: 2,
    title: 'Зібрати шафу IKEA',
    category: 'furniture',
    description: 'Велика шафа-купе з 3-х упаковок. Всі інструменти є.',
    budget: 800,
    urgency: 'week',
    city: 'Львів',
    status: 'open',
    createdAt: new Date('2024-06-02'),
    clientName: 'Андрій П.',
    responses: 7
  },
  {
    id: 3,
    title: 'Полагодити кран на кухні',
    category: 'plumbing',
    description: 'Кран підкапує, потрібно замінити прокладку або картридж.',
    budget: 500,
    urgency: 'urgent',
    city: 'Одеса',
    status: 'open',
    createdAt: new Date('2024-06-03'),
    clientName: 'Ольга М.',
    responses: 12
  }
];

const sampleMasters = [
  {
    id: 1,
    name: 'Володимир Іванов',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    specialties: ['hanging', 'furniture', 'repair'],
    rating: 4.9,
    reviewsCount: 156,
    city: 'Київ',
    experience: '5+ років',
    priceRange: '200-600 грн',
    completedTasks: 342,
    isOnline: true
  },
  {
    id: 2,
    name: 'Сергій Коваленко',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    specialties: ['plumbing', 'electrical'],
    rating: 4.8,
    reviewsCount: 89,
    city: 'Львів',
    experience: '8+ років',
    priceRange: '300-800 грн',
    completedTasks: 178,
    isOnline: false
  },
  {
    id: 3,
    name: 'Олексій Петренко',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    specialties: ['cleaning', 'furniture'],
    rating: 4.7,
    reviewsCount: 234,
    city: 'Одеса',
    experience: '3+ років',
    priceRange: '150-400 грн',
    completedTasks: 456,
    isOnline: true
  },
  {
    id: 4,
    name: 'Ірина Шевченко',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    specialties: ['cleaning', 'hanging'],
    rating: 5.0,
    reviewsCount: 67,
    city: 'Київ',
    experience: '2+ років',
    priceRange: '200-500 грн',
    completedTasks: 123,
    isOnline: true
  }
];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  tasks = [...sampleTasks];
  masters = [...sampleMasters];
  
  initializeEventListeners();
  renderTasks();
  renderMasters();
});

// Event listeners
function initializeEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      if (page) navigateToPage(page);
    });
  });

  // Create task modal
  const createTaskBtn = document.getElementById('create-task-btn');
  const modal = document.getElementById('create-task-modal');
  const closeButtons = document.querySelectorAll('.modal-close');
  const createTaskForm = document.getElementById('create-task-form');

  createTaskBtn?.addEventListener('click', () => {
    modal?.classList.remove('hidden');
    modal?.classList.add('animate-fade-in');
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });
  });

  // Close modal on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Create task form submission
  createTaskForm?.addEventListener('submit', handleCreateTask);

  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.querySelector('.category-name').textContent;
      filterTasksByCategory(categoryName);
    });
  });

  // Find masters button
  document.getElementById('find-masters-btn')?.addEventListener('click', () => {
    navigateToPage('masters');
  });
}

// Navigation
function navigateToPage(page) {
  currentPage = page;
  
  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
    link.classList.add('text-gray-500');
  });
  
  const activeLink = document.querySelector(`[data-page="${page}"]`);
  if (activeLink) {
    activeLink.classList.remove('text-gray-500');
    activeLink.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
  }

  // Show/hide sections based on page
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'block';
  });

  switch (page) {
    case 'tasks':
      document.getElementById('hero').style.display = 'none';
      document.getElementById('categories').style.display = 'none';
      document.getElementById('top-masters').style.display = 'none';
      break;
    case 'masters':
      document.getElementById('hero').style.display = 'none';
      document.getElementById('categories').style.display = 'none';
      document.getElementById('recent-tasks').style.display = 'none';
      break;
  }
}

// Create task handler
function handleCreateTask(e) {
  e.preventDefault();
  
  const newTask = {
    id: tasks.length + 1,
    title: document.getElementById('task-title').value,
    category: document.getElementById('task-category').value,
    description: document.getElementById('task-description').value,
    budget: parseInt(document.getElementById('task-budget').value) || 0,
    urgency: document.getElementById('task-urgency').value,
    city: document.getElementById('task-city').value,
    status: 'open',
    createdAt: new Date(),
    clientName: 'Ви',
    responses: 0
  };

  tasks.unshift(newTask);
  renderTasks();
  
  // Close modal and reset form
  document.getElementById('create-task-modal').classList.add('hidden');
  e.target.reset();
  
  // Show success message
  showNotification('Завдання створено успішно!', 'success');
}

// Render tasks
function renderTasks() {
  const tasksGrid = document.getElementById('tasks-grid');
  if (!tasksGrid) return;

  tasksGrid.innerHTML = tasks.slice(0, 6).map(task => createTaskCard(task)).join('');
}

// Create task card
function createTaskCard(task) {
  const urgencyBadge = getUrgencyBadge(task.urgency);
  const categoryName = getCategoryName(task.category);
  
  return `
    <div class="card task-card animate-fade-in">
      <div class="task-header">
        <div class="task-badges">
          <span class="badge badge-primary">${categoryName}</span>
          ${urgencyBadge}
        </div>
        <span class="text-sm text-gray-500">${formatDate(task.createdAt)}</span>
      </div>
      
      <h4 class="task-title">${task.title}</h4>
      <p class="task-description">${task.description}</p>
      
      <div class="task-details">
        <div class="text-sm text-gray-500">
          <span>${task.city}</span>
        </div>
        <div class="task-budget">
          ${task.budget ? `${task.budget} грн` : 'Договірна'}
        </div>
      </div>
      
      <div class="task-footer">
        <div class="text-sm text-gray-500">
          <span>${task.responses}</span> відгуків
        </div>
        <button class="btn btn-primary btn-sm" onclick="viewTask(${task.id})">
          Переглянути
        </button>
      </div>
    </div>
  `;
}

// Render masters
function renderMasters() {
  const mastersGrid = document.getElementById('masters-grid');
  if (!mastersGrid) return;

  mastersGrid.innerHTML = masters.slice(0, 4).map(master => createMasterCard(master)).join('');
}

// Create master card
function createMasterCard(master) {
  const stars = createStarRating(master.rating);
  const specialtiesText = master.specialties.map(getCategoryName).join(', ');
  
  return `
    <div class="card master-card animate-fade-in">
      <div class="master-avatar">
        <img src="${master.avatar}" alt="${master.name}">
        ${master.isOnline ? '<div class="online-indicator"></div>' : ''}
      </div>
      
      <h4 class="master-name">${master.name}</h4>
      <p class="master-specialties">${specialtiesText}</p>
      
      <div class="master-rating">
        ${stars}
        <span class="text-sm text-gray-500">(${master.reviewsCount})</span>
      </div>
      
      <div class="master-info">
        <div>${master.city}</div>
        <div>${master.experience}</div>
        <div class="master-price">${master.priceRange}</div>
      </div>
      
      <button class="btn btn-primary w-full" onclick="contactMaster(${master.id})">
        Зв'язатися
      </button>
    </div>
  `;
}

// Helper functions
function getUrgencyBadge(urgency) {
  const badges = {
    urgent: '<span class="badge badge-danger">Терміново</span>',
    week: '<span class="badge badge-warning">Тиждень</span>',
    flexible: '<span class="badge badge-success">Гнучко</span>'
  };
  return badges[urgency] || '';
}

function getCategoryName(category) {
  const categories = {
    hanging: 'Повішення картин',
    plumbing: 'Сантехніка',
    electrical: 'Електрика',
    furniture: 'Збірка меблів',
    cleaning: 'Прибирання',
    repair: 'Ремонт'
  };
  return categories[category] || category;
}

function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="star filled">★</span>';
  }
  if (hasHalfStar) {
    stars += '<span class="star filled">☆</span>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<span class="star empty">☆</span>';
  }
  
  return `<div class="rating">${stars}</div>`;
}

function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Сьогодні';
  if (days === 1) return 'Вчора';
  if (days < 7) return `${days} дн. тому`;
  return date.toLocaleDateString('uk-UA');
}

function filterTasksByCategory(categoryName) {
  // Implementation for filtering tasks
  console.log('Filtering by category:', categoryName);
  navigateToPage('tasks');
}

function viewTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    showNotification(`Переглядаємо завдання: ${task.title}`, 'info');
  }
}

function contactMaster(masterId) {
  const master = masters.find(m => m.id === masterId);
  if (master) {
    showNotification(`Зв'язуємося з ${master.name}`, 'info');
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-slide-up ${
    type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  window.setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Make functions globally available
window.viewTask = viewTask;
window.contactMaster = contactMaster;