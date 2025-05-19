// Arquivo: animar.js
// Função para manipular o envio do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Impede o comportamento padrão do formulário (navegação para outra página)
            event.preventDefault();
            
            // Obtém os dados do formulário
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Aqui você pode adicionar o código para enviar os dados para um servidor
            // usando fetch ou XMLHttpRequest
            
            // Exemplo com fetch (comentado, pois precisa de um endpoint real)
     
            fetch('seu_endpoint_aqui', {
                method: 'https://formsubmit.co/suportenotamil2025@gmail.com',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                showSuccessMessage();
            })
            .catch(error => {
                showErrorMessage();
            });
    
            
            // Para demonstração, vamos apenas simular o envio bem-sucedido
            showSuccessMessage();
            
            // Limpa o formulário
            contactForm.reset();
        });
    }
    
    // Função para mostrar mensagem de sucesso
    function showSuccessMessage() {
        // Cria um elemento de mensagem de sucesso se não existir
        let successMessage = document.querySelector('.form-success-message');
        
        if (!successMessage) {
            successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.style.color = '#009fff';
            successMessage.style.backgroundColor = 'rgba(0, 159, 255, 0.1)';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontWeight = '500';
            
            // Insere a mensagem após o botão de envio
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.parentNode.insertBefore(successMessage, submitBtn.nextSibling);
        }
        
        // Define o texto da mensagem
        successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        
        // Faz a mensagem desaparecer após 5 segundos
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transition = 'opacity 0.5s ease';
            
            // Remove o elemento após a transição
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
            }, 500);
        }, 5000);
    }
    
    // Função para mostrar mensagem de erro (caso necessário)
    function showErrorMessage() {
        let errorMessage = document.querySelector('.form-error-message');
        
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'form-error-message';
            errorMessage.style.color = '#ff3333';
            errorMessage.style.backgroundColor = 'rgba(255, 51, 51, 0.1)';
            errorMessage.style.padding = '15px';
            errorMessage.style.borderRadius = '5px';
            errorMessage.style.marginTop = '20px';
            errorMessage.style.textAlign = 'center';
            errorMessage.style.fontWeight = '500';
            
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.parentNode.insertBefore(errorMessage, submitBtn.nextSibling);
        }
        
        errorMessage.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
        
        setTimeout(() => {
            errorMessage.style.opacity = '0';
            errorMessage.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                if (errorMessage.parentNode) {
                    errorMessage.parentNode.removeChild(errorMessage);
                }
            }, 500);
        }, 5000);
    }
});
