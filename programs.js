
// Course Data
const courses = [
    {
        title: "Web Development",
        dept: "Information Technology",
        duration: "6 Months",
        level: "Intermediate",
        icon: "fas fa-code",
        description: "Master HTML, CSS, JavaScript, and modern frameworks for full-stack web development."
    },
    {
        title: "Network Administration",
        dept: "Information Technology",
        duration: "1 Year",
        level: "Advanced",
        icon: "fas fa-network-wired",
        description: "Learn to design, implement, and manage secure enterprise networks."
    },
    {
        title: "Industrial Electrician",
        dept: "Electrical Technology",
        duration: "1 Year",
        level: "Intermediate",
        icon: "fas fa-bolt",
        description: "Training in industrial wiring, motor controls, and power distribution systems."
    },
    {
        title: "CNC Machining",
        dept: "Mechanical Technology",
        duration: "6 Months",
        level: "Advanced",
        icon: "fas fa-cog",
        description: "Operate computer numerical control machines for precision manufacturing."
    },
    {
        title: "Auto EFI Technician",
        dept: "Auto & Diesel",
        duration: "6 Months",
        level: "Beginner",
        icon: "fas fa-car-battery",
        description: "Diagnose and repair electronic fuel injection systems in modern vehicles."
    },
    {
        title: "Civil Surveyor",
        dept: "Civil Technology",
        duration: "1 Year",
        level: "Intermediate",
        icon: "fas fa-map-marked-alt",
        description: "Learn land surveying techniques using total stations and GPS equipment."
    },
    {
        title: "HVAC Technician",
        dept: "Refrigeration & AC",
        duration: "1 Year",
        level: "Beginner",
        icon: "fas fa-snowflake",
        description: "Installation, maintenance, and repair of heating, ventilation, and air conditioning systems."
    },
    {
        title: "Certified Welder (3G/4G)",
        dept: "Welding",
        duration: "6 Months",
        level: "Intermediate",
        icon: "fas fa-fire",
        description: "Advanced welding techniques including TIG and MIG for industrial applications."
    },
    {
        title: "Plumbing & Pipefitting",
        dept: "Plumbing",
        duration: "6 Months",
        level: "Beginner",
        icon: "fas fa-faucet",
        description: "Residential and commercial plumbing systems installation and maintenance."
    },
    {
        title: "Graphic Design",
        dept: "Computer Applications",
        duration: "3 Months",
        level: "Beginner",
        icon: "fas fa-palette",
        description: "Create visual concepts using computer software to communicate ideas that inspire and captivate."
    },
    {
        title: "Safety Inspector (HSE)",
        dept: "Safety",
        duration: "3 Months",
        level: "Advanced",
        icon: "fas fa-shield-alt",
        description: "Ensure workplace safety compliance and implement health and safety protocols."
    },
    {
        title: "Industrial Automation (PLC)",
        dept: "Industrial Electronics",
        duration: "6 Months",
        level: "Advanced",
        icon: "fas fa-microchip",
        description: "Programming and troubleshooting Printable Logic Controllers for automation."
    }
];

// DOM Elements
const programsGrid = document.getElementById('programsGrid');
const searchInput = document.getElementById('searchInput');
const deptFilter = document.getElementById('deptFilter');
const durationFilter = document.getElementById('durationFilter');
const levelFilter = document.getElementById('levelFilter');
const clearBtn = document.getElementById('clearFilters');
const modal = document.getElementById('courseModal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.getElementById('modalContent');

// Render Courses
function renderCourses(data) {
    programsGrid.innerHTML = '';
    
    if (data.length === 0) {
        programsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No programs found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }

    data.forEach((course, index) => {
        const card = document.createElement('div');
        card.className = 'program-card-item';
        card.innerHTML = `
            <div class="card-icon">
                <i class="${course.icon}"></i>
            </div>
            <div class="card-content">
                <span class="card-dept">${course.dept}</span>
                <h3 class="card-title">${course.title}</h3>
                <div class="card-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-layer-group"></i> ${course.level}</span>
                </div>
                <p class="card-desc">${course.description}</p>
                <div class="card-actions">
                    <button class="btn-details" onclick="openModal(${index})">View Details</button>
                    <button class="btn-apply">Apply Now</button>
                </div>
            </div>
        `;
        programsGrid.appendChild(card);
    });
}

// Filter Logic
function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDept = deptFilter.value;
    const selectedDuration = durationFilter.value;
    const selectedLevel = levelFilter.value;

    const filtered = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) || 
                            course.description.toLowerCase().includes(searchTerm);
        const matchesDept = selectedDept === '' || course.dept === selectedDept;
        const matchesDuration = selectedDuration === '' || course.duration === selectedDuration;
        const matchesLevel = selectedLevel === '' || course.level === selectedLevel;

        return matchesSearch && matchesDept && matchesDuration && matchesLevel;
    });

    renderCourses(filtered);
}

// Event Listeners
searchInput.addEventListener('input', filterCourses);
deptFilter.addEventListener('change', filterCourses);
durationFilter.addEventListener('change', filterCourses);
levelFilter.addEventListener('change', filterCourses);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    deptFilter.value = '';
    durationFilter.value = '';
    levelFilter.value = '';
    filterCourses();
});

// Modal Logic
window.openModal = function(index) {
    const course = courses[index]; // Note: This works if filtered list matches original indices or we pass object. 
    // Ideally we should pass the course object or find it. 
    // Let's improve this: find the course by title since render passes index of sorted array?
    // Actually, let's just use the filtered data context or pass the object directly?
    // Simpler: find course in main array by title for now assuming unique titles
    
    // Better approach:
    // Update render to pass the actual course object or ID. 
    // For simplicity with this setup:
    // We will search the main array for the clicked course.
    
    // Re-finding for safety as index might mismatch if filtered
    // But wait, the onclick is generated during render.
    // If we filter, index 0 is the first filtered item. 
    // So we need to be careful.
    // Let's pass the Title to openModal and find it.
}

// Corrected Render for Modal
function renderCoursesSafe(data) {
    programsGrid.innerHTML = '';
    
    if (data.length === 0) {
        programsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No programs found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }

    data.forEach(course => {
        const card = document.createElement('div');
        card.className = 'program-card-item';
        card.innerHTML = `
            <div class="card-icon">
                <i class="${course.icon}"></i>
            </div>
            <div class="card-content">
                <span class="card-dept">${course.dept}</span>
                <h3 class="card-title">${course.title}</h3>
                <div class="card-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-layer-group"></i> ${course.level}</span>
                </div>
                <p class="card-desc">${course.description}</p>
                <div class="card-actions">
                    <button class="btn-details" onclick="openModal('${course.title.replace(/'/g, "\\'") }')">View Details</button>
                    <button class="btn-apply">Apply Now</button>
                </div>
            </div>
        `;
        programsGrid.appendChild(card);
    });
}
// Override renderCourses with safe version
renderCourses = renderCoursesSafe;


// Modal Functions
window.openModal = function(courseTitle) {
    const course = courses.find(c => c.title === courseTitle);
    if (!course) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <span class="modal-dept">${course.dept}</span>
            <h2>${course.title}</h2>
        </div>
        <div class="modal-body">
            <div class="modal-info-grid">
                <div class="info-item">
                    <i class="far fa-clock"></i>
                    <div>
                        <small>Duration</small>
                        <strong>${course.duration}</strong>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-layer-group"></i>
                    <div>
                        <small>Level</small>
                        <strong>${course.level}</strong>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-certificate"></i>
                    <div>
                        <small>Certification</small>
                        <strong>GTTI / PBTE</strong>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>Course Overview</h3>
                <p>${course.description} This comprehensive program is designed to equip students with practical skills and theoretical knowledge required for the modern industry.</p>
            </div>

            <div class="modal-section">
                <h3>What You Will Learn</h3>
                <ul class="modal-list">
                    <li>Core concepts and fundamentals of ${course.title}</li>
                    <li>Industry-standard tools and equipment usage</li>
                    <li>Safety protocols and workplace ethics</li>
                    <li>Practical project implementation</li>
                    <li>Advanced techniques and troubleshooting</li>
                </ul>
            </div>

            <div class="modal-section">
                <h3>Eligibility</h3>
                <p>Matriculation (Science/Arts) or equivalent. Age limit: 15-25 years.</p>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-apply-modal">Apply for Admission</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
});
