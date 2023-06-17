const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            width: 40% !important;
        }

        .form-container {
            background-color: white;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            padding: 20px;
            border-radius: 10px;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="textarea"]:focus,
        .form-text-area:focus {
            border-color: rgba(34, 67, 167, 0.343) !important;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
            outline: 0 none !important;
        }

        .btn-custom,
        .btn-custom:active,
        .btn-custom:visited {
            background-color: #f25f5c !important;
            color: white !important;
        }

        .btn-custom:hover {
            background-color: #f25e5cee !important;
            color: white !important;
        }
    </style>
    <div class="container">
        <h3>Get in touch:</h3>
        <p class="subtitle">Let's connect and create something amazing.</p>
        <form id="serverless_form" method="post">
            <div class="form-container">
                <div class="form-group">
                    <label for="input_name" class="pb-2">Name</label>
                    <input type="text" class="form-control" id="input_name" name="name" aria-describedby="emailHelp">
                </div>

                <div class="form-group pt-4">
                    <label for="input_email" class="pb-2">Email</label>
                    <input type="email" class="form-control" id="input_email" name="email" aria-describedby="emailHelp">
                </div>

                <div class="form-group pt-4">
                    <label for="input_message" class="pb-2">Message</label>
                    <textarea class="form-control form-text-area" id="input_message" name="message" aria-describedby="emailHelp" rows="5"></textarea>
                </div>

                <div class="d-grid gap-2 pt-4">
                    <button type="submit" class="btn btn-custom">Submit</button>
                </div>
            </div>
        </form>
    </div>
`;

class ServerlessForm extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.form = this._shadowRoot.querySelector('#serverless_form');
        this.nameInput = this._shadowRoot.querySelector('#input_name');
        this.emailInput = this._shadowRoot.querySelector('#input_email');
        this.messageInput = this._shadowRoot.querySelector('#input_message');
    }

    connectedCallback() {
        this.form.addEventListener('submit', this.submitForm.bind(this));

     
            // Add CSS framework stylesheets or additional stylesheets
            const cssLink = document.createElement('link');
            cssLink.setAttribute('rel', 'stylesheet');
            cssLink.setAttribute('href', 'assets/css/bootstrap.min.css');
            this._shadowRoot.appendChild(cssLink);
            
            const customCss = document.createElement('csslink');
            customCss.setAttribute('rel', 'stylesheet');;
            customCss.setAttribute('href', 'assets/style.css');
            this._shadowRoot.appendChild(customCss);
        
            const bootstrapScript = document.createElement('script');
            bootstrapScript.setAttribute('src', 'assets/js/bootstrap.min.js');
            this._shadowRoot.appendChild(bootstrapScript);
          
    }

    submitForm(event) {
        event.preventDefault();
      
        if (!this.validateName()) {
          alert("Name cannot be less than 2 characters");
          return;
        }
      
        if (!this.validateEmail()) {
          alert("Please enter a valid email address");
          return;
        }
      
        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const message = this.messageInput.value;
      
        const data = {
          name: name,
          email: email,
          message: message
        };
      
        const URL = "https://l39qsmv8i8.execute-api.ap-southeast-1.amazonaws.com/beta/mail-me";
      
        fetch(URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.ok) {
              alert("Successful");
              console.log(data);
            } else {
              throw new Error("Unsuccessful");
            }
          })
          .catch(error => {
            alert(error.message);
          });
      }
      

    validateName() {
        const name = this.nameInput.value.trim();
        return name.length >= 2;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
        return emailRegex.test(email);
    }
}

window.customElements.define('serverless-form', ServerlessForm);
