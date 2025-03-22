document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const toastModal = document.getElementById('toastModal');
    const toastMessage = document.getElementById('toastMessage');
    const closeBtn = document.querySelector('.close');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
  
      const response = await fetch('/submitData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        showToast(data.message);
      } else {
        showToastError(data.message);
      }
    });
  
    // Function to display success or info toast
    function showToast(message) {
      toastModal.style.display = 'block';
      toastMessage.textContent = message;
  
      closeBtn.onclick = function() {
        toastModal.style.display = 'none';
      }
  
      setTimeout(() => {
        toastModal.style.display = 'none';
      }, 3000);
    }
  
    // Function to display error toast
    function showToastError(message) {
      toastModal.style.backgroundColor = '#ffcccc'; // Change background color for error
      showToast(message);
    }
  });
  