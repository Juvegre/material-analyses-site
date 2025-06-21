const sampleTypeSelect = document.getElementById('sampleType');
const methodContainer = document.getElementById('methodContainer');
const methodSelect = document.getElementById('method');
const labsContainer = document.getElementById('labsContainer');
const labsSelect = document.getElementById('labs');
const contactContainer = document.getElementById('contactContainer');
const form = document.getElementById('analysisForm');
const successMessage = document.getElementById('successMessage');

// Dummy data
const methods = {
  'whole-rock': ['X-ray Fluorescence', 'ICP-OES', 'ICP-MS'],
  'in-situ': ['Laser Ablation', 'Electron Microprobe']
};

const labs = {
  'X-ray Fluorescence': ['Lab A', 'Lab B'],
  'ICP-OES': ['Lab B', 'Lab C'],
  'ICP-MS': ['Lab A', 'Lab C'],
  'Laser Ablation': ['Lab D', 'Lab E'],
  'Electron Microprobe': ['Lab E', 'Lab F']
};

sampleTypeSelect.addEventListener('change', () => {
  const sampleType = sampleTypeSelect.value;
  // Clear method options
  methodSelect.innerHTML = '<option value="" disabled selected>Select...</option>';

  if (!sampleType) {
    methodContainer.style.display = 'none';
    labsContainer.style.display = 'none';
    contactContainer.style.display = 'none';
    return;
  }

  // Populate methods
  methods[sampleType].forEach(method => {
    const opt = document.createElement('option');
    opt.value = method;
    opt.textContent = method;
    methodSelect.appendChild(opt);
  });

  methodContainer.style.display = 'block';
  labsContainer.style.display = 'none';
  contactContainer.style.display = 'none';
});

methodSelect.addEventListener('change', () => {
  const selectedMethod = methodSelect.value;

  if (!selectedMethod) {
    labsContainer.style.display = 'none';
    contactContainer.style.display = 'none';
    return;
  }

  // Populate labs
  labsSelect.innerHTML = '<option value="" disabled selected>Select...</option>';
  labs[selectedMethod].forEach(lab => {
    const opt = document.createElement('option');
    opt.value = lab;
    opt.textContent = lab;
    labsSelect.appendChild(opt);
  });

  labsContainer.style.display = 'block';
  contactContainer.style.display = 'none';
});

labsSelect.addEventListener('change', () => {
  if (labsSelect.value) {
    contactContainer.style.display = 'block';
  } else {
    contactContainer.style.display = 'none';
  }
});

// Handle form submission via AJAX to prevent page reload and show success message
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Use Formspree endpoint from form's action attribute
  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.style.display = 'none';
      successMessage.style.display = 'block';
    } else {
      alert('Oops! There was a problem submitting your form');
    }
  }).catch(error => {
    alert('Oops! There was a problem submitting your form');
  });
});