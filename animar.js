// Espera o documento carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animações aos elementos quando a página carrega
    animateElementsOnLoad();
    
    // Inicializa animações para os elementos do formulário
    setupFormAnimations();
    
    // Configura o envio do formulário
    setupFormSubmission();
    
    // Adiciona efeitos de hover e outros elementos interativos
    setupInteractiveElements();
});

// Animação de elementos na carga da página
function animateElementsOnLoad() {
    // Animação para o header
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animação para o slogan principal
    const slogan = document.querySelector('.slogan');
    if (slogan) {
        slogan.style.opacity = '0';
        slogan.style.transform = 'translateX(-30px)';
        slogan.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            slogan.style.opacity = '1';
            slogan.style.transform = 'translateX(0)';
        }, 400);
    }
    
    // Animação para a imagem do herói
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(30px)';
        heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
    
    // Animação para a seção de oportunidades
    animateOnScroll('.opportunities-content h2', 'fadeInUp');
    
    // Animação para os itens de recursos
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
    
    // Animação para a seção de citação
    animateOnScroll('.quote-container', 'fadeIn');
    
    // Animação para os depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        animateOnScroll(card, 'fadeInUp', 200 * index);
    });
}

// Configuração das animações do formulário
function setupFormAnimations() {
    // Efeito de foco nos campos do formulário
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Estado inicial
        input.style.transition = 'all 0.3s ease, box-shadow 0.3s ease';
        
        // Evento de foco
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 8px rgba(0, 159, 255, 0.5)';
            this.style.transform = 'translateY(-2px)';
        });
        
        // Evento de saída do foco
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
        
        // Efeito ao digitar
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = 'rgba(0, 159, 255, 0.8)';
            } else {
                this.style.borderColor = 'rgba(0, 159, 255, 0.2)';
            }
        });
    });
    
    // Animação do botão de envio
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 120, 212, 0.4)';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        submitBtn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        submitBtn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    }
}

// Configuração do envio do formulário
function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        // Configurar o formulário para usar FormSubmit
        contactForm.setAttribute('action', 'https://formsubmit.co/ajax/suportenotamil2025@gmail.com');
        contactForm.setAttribute('method', 'POST');
        
        // Adicionar evento para capturar o envio do formulário
        contactForm.addEventListener('submit', function(e) {
            // Prevenir o comportamento padrão do formulário (recarregar a página)
            e.preventDefault();
            
            // Verificar se os campos estão preenchidos
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Animação de carregamento no botão
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.backgroundColor = '#004c8a';
            submitBtn.disabled = true;
            
            // Mostrar notificação de envio
            showNotification('Enviando mensagem para suportenotamil2025@gmail.com...', 'info');
            
            // Coletar os dados do formulário
            const formData = new FormData(this);
            
            // Adicionar campos adicionais necessários para o FormSubmit
            formData.append('_subject', 'Nova mensagem do site NotaMil');
            formData.append('_captcha', 'false');
            
            // Enviar os dados via fetch API
            fetch('https://formsubmit.co/ajax/suportenotamil2025@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar o formulário');
                }
                return response.json();
            })
            .then(data => {
                // Mostrar notificação de sucesso
                showNotification('Mensagem enviada com sucesso!', 'success');
                
                // Limpar os campos do formulário
                contactForm.reset();
                
                // Restaurar o botão de envio
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            })
            .catch(error => {
                // Mostrar notificação de erro
                showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
                
                // Restaurar o botão de envio
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                
                console.error('Erro:', error);
            });
        });
    }
}

// Configuração de elementos interativos adicionais
function setupInteractiveElements() {
    // Efeito parallax para a seção de oportunidades
    window.addEventListener('scroll', function() {
        const section = document.querySelector('.opportunities-section');
        if (section) {
            const scrollPosition = window.scrollY;
            const sectionPosition = section.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition + windowHeight > sectionPosition && scrollPosition < sectionPosition + section.offsetHeight) {
                const yPos = (scrollPosition - sectionPosition) * 0.1;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        }
    });
    
    // Efeito pulsante para o botão "Saiba mais"
    const saibaMaisBtn = document.querySelector('.saiba-mais-btn');
    if (saibaMaisBtn) {
        setInterval(() => {
            saibaMaisBtn.style.transform = 'scale(1.05)';
            saibaMaisBtn.style.boxShadow = '0 0 15px rgba(0, 120, 212, 0.6)';
            
            setTimeout(() => {
                saibaMaisBtn.style.transform = 'scale(1)';
                saibaMaisBtn.style.boxShadow = 'none';
            }, 500);
        }, 3000);
    }
    
    // Animação para ícones sociais
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(5deg) scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
}

// Função de animação baseada no scroll
function animateOnScroll(selector, animationClass, delay = 0) {
    const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];
    
    elements.forEach(element => {
        element.style.opacity = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        
                        switch (animationClass) {
                            case 'fadeIn':
                                element.style.opacity = '1';
                                break;
                            case 'fadeInUp':
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0)';
                                break;
                            case 'fadeInLeft':
                                element.style.opacity = '1';
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'fadeInRight':
                                element.style.opacity = '1';
                                element.style.transform = 'translateX(0)';
                                break;
                        }
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        if (animationClass === 'fadeInUp') {
            element.style.transform = 'translateY(30px)';
        } else if (animationClass === 'fadeInLeft') {
            element.style.transform = 'translateX(-30px)';
        } else if (animationClass === 'fadeInRight') {
            element.style.transform = 'translateX(30px)';
        }
        
        observer.observe(element);
    });
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Verificar se já existe uma notificação e removê-la
    const existingNotification = document.querySelector('.notamil-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notamil-notification ${type}`;
    notification.innerHTML = message;
    
    // Estilizar o elemento
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.fontFamily = "'Orbitron', sans-serif";
    notification.style.fontSize = '14px';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Definir cores com base no tipo
    if (type === 'success') {
        notification.style.backgroundColor = 'rgba(0, 180, 0, 0.9)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 4px 12px rgba(0, 180, 0, 0.3)';
    } else if (type === 'error') {
        notification.style.backgroundColor = 'rgba(220, 0, 0, 0.9)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 4px 12px rgba(220, 0, 0, 0.3)';
    } else {
        notification.style.backgroundColor = 'rgba(0, 120, 212, 0.9)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 4px 12px rgba(0, 120, 212, 0.3)';
    }
    
    // Adicionar ao corpo do documento
    document.body.appendChild(notification);
    
    // Animar a entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remover após alguns segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Adiciona efeito de destaque para as seções que aparecem no viewport
function setupScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Inicializa as animações de revelação ao scroll
document.addEventListener('DOMContentLoaded', setupScrollReveal);
