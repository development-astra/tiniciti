(function () {
  "use strict";

  console.log("validate.js loaded ✅");

  let forms = document.querySelectorAll('.contact-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log("Form submitted ✅");

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      if (!action) {
        console.error('Form action is not set!');
        return;
      }

      // Get loader
      let loading = thisForm.querySelector('.loading');

      // Show loader
      if (loading) loading.style.display = "block";

      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(response => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`${response.status} ${response.statusText} ${response.url}`);
          }
        })
        .then(data => {
          // Hide loader
          if (loading) loading.style.display = "none";

          if (data.trim() === 'OK') {
            window.location.href = "thank-you.html";
          } else {
            window.location.href = "form-error.html";
          }
        })
        .catch((error) => {
          // Hide loader
          if (loading) loading.style.display = "none";
          console.error("Form error:", error);
          window.location.href = "form-error.html";
        });
    });
  });

})();
