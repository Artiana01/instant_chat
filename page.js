(function () {
  

  document.getElementById('join-user').addEventListener('click', function() {
    document.querySelector('.app').classList.add('with-profil');
  });
  

    const app = document.querySelector(".app");
    document.getElementById('theme-toggle').addEventListener('click', function() {
      document.querySelectorAll('*').forEach(function(element) {
          var backgroundColor = window.getComputedStyle(element).getPropertyValue('background-color');
          var color = window.getComputedStyle(element).getPropertyValue('color');
          
          // Inversion des couleurs claires et sombres
          if (backgroundColor === 'rgb(255, 255, 255)') {
              element.style.backgroundColor = 'rgb(0, 0, 0)';
              element.style.color = 'rgb(255, 255, 255)';
          } else if (backgroundColor === 'rgb(0, 0, 0)') {
              element.style.backgroundColor = 'rgb(255, 255, 255)';
              element.style.color = 'rgb(0, 0, 0)';
          }
          
          // Inversion des couleurs des bordures
          var borderColor = window.getComputedStyle(element).getPropertyValue('border-color');
          if (borderColor === 'rgb(255, 255, 255)') {
              element.style.borderColor = 'rgb(0, 0, 0)';
          } else if (borderColor === 'rgb(0, 0, 0)') {
              element.style.borderColor = 'rgb(255, 255, 255)';
          }
      });
  });
  
  
    let uname;
  
    app.querySelector(".join-screen #join-user").addEventListener("click", function () {
      let username = app.querySelector(".join-screen #username").value;
  
      if (username.length == 0) {
        return;
      }
  
      uname = username;
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
      app.querySelector(".ligne").classList.add("active");
      app.querySelector(".app").classList.add("with-profil");
      document.querySelector(".profil").style.display = "block";
    });
  
    app.querySelector(".chat-screen #send-message").addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message,
        date: getCurrentTime()
      });
  
      app.querySelector(".chat-screen #message-input").value = "";
    });
  
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return hours + ':' + minutes;
    }
  
    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function () {
      window.location.href = window.location.href;
    });
  
    app.querySelector(".chat-screen #cancel-message").addEventListener("click", function () {
      let messages = app.querySelectorAll(".chat-screen .message");
      if (messages.length > 0) {
        messages[messages.length - 1].remove();
      }
    });
  
    app.querySelector(".chat-screen #clear-conversation").addEventListener("click", function () {
      let messages = app.querySelectorAll(".chat-screen .message");
      messages.forEach(function (message) {
        message.remove();
      });
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        if (type == "my") {
            
        
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML =
                `<div>
        <div class="name">You</div>
        <div class="text">
            ${message.text}
        </div>
        <div class="date">Sent on ${message.date}</div> <!-- Affichage de la date d'envoi -->
        </div>`;

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            el.remove();
        });
        el.appendChild(deleteButton);
            messageContainer.appendChild(el);

        } else if (type == "other") {
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML =
                `<div>
                    <div class="name">${message.username}</div>
                    <div class="text">
                        ${message.text}
                    </div>
                </div>`;
            messageContainer.appendChild(el);

        } else if (type == "update") {
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageContainer.appendChild(el);
        }

        // Scroll down to the last message
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;

        
    }

    // Récupérer la référence de l'élément input
const usernameInput = document.getElementById('username');

// Récupérer la référence de l'élément contenant les messages
const messagesContainer = document.getElementById('messages');

// Fonction pour afficher le message de connexion de l'utilisateur
function afficherMessageConnexion() {
  const username = usernameInput.value;
  const message = document.createElement('div');
  message.textContent = `Un utilisateur nommé ${username} a rejoint le chat`;
  messagesContainer.appendChild(message);
}

// Ajouter un événement pour détecter lorsque l'utilisateur entre dans le chatroom
usernameInput.addEventListener('focusout', afficherMessageConnexion);

}());


