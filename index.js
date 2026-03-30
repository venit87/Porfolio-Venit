// Configuração de animações por seção
const ANIMATIONS = {
    about: { show: 'slideInLeft', close: 'slideOutLeft' },
    work: { show: 'slideInRight', close: 'slideOutRight' },
    contact: { show: 'slideInUp', close: 'slideOutDown' }
};

const ANIMATION_DURATION = 800;

/**
 * Abre um container com animação
 * @param {string} section - Nome da seção (about, work, contact)
 */
function openSection(section) {
    const container = document.getElementById(`${section}_container`);
    if (!container) return;
    
    container.style.display = 'inherit';
    const showAnimation = ANIMATIONS[section].show;
    
    container.classList.add('animated', showAnimation);
    
    setTimeout(() => {
        container.classList.remove('animated', showAnimation);
    }, ANIMATION_DURATION);
}

/**
 * Fecha um container com animação
 * @param {string} section - Nome da seção (about, work, contact)
 */
function closeSection(section) {
    const container = document.getElementById(`${section}_container`);
    if (!container) return;
    
    const closeAnimation = ANIMATIONS[section].close;
    
    container.classList.add('animated', closeAnimation);
    
    setTimeout(() => {
        container.classList.remove('animated', closeAnimation);
        container.style.display = 'none';
    }, ANIMATION_DURATION);
}

// Aliases para compatibilidade com HTML existente
const showabout = () => openSection('about');
const closeabout = () => closeSection('about');
const showwork = () => openSection('work');
const closework = () => closeSection('work');
const showcontact = () => openSection('contact');
const closecontact = () => closeSection('contact');

// Tela de carregamento
setTimeout(() => {
    const loading = document.getElementById('loading');
    const box = document.getElementById('box');
    const navButtons = document.querySelectorAll('#about, #work, #contact');
    
    loading.classList.add('animated', 'fadeOut');
    
    setTimeout(() => {
        loading.classList.remove('animated', 'fadeOut');
        loading.style.display = 'none';
        box.style.display = 'none';
        
        navButtons.forEach(btn => btn.classList.remove('animated', 'fadeIn'));
    }, 1000);
}, 1500);

// ============================================
// FORMULÁRIO DE CONTATO - Formspree
// ============================================

/**
 * Envia o formulário de contato usando Formspree
 */
async function sendContactEmail(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Limpar mensagem anterior
    statusDiv.innerHTML = '';
    
    try {
        // Desabilitar botão durante o envio
        submitButton.disabled = true;
        submitButton.textContent = 'enviando...';
        
        // Obter valores do formulário
        const nameValue = form.elements['name'].value.trim();
        const emailValue = form.elements['email'].value.trim();
        const messageValue = form.elements['message'].value.trim();
        
        // Validar campos obrigatórios
        if (!nameValue || !emailValue || !messageValue) {
            throw new Error('Por favor, preencha todos os campos.');
        }
        
        // Validar formato do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            throw new Error('Por favor, insira um e-mail válido.');
        }
        
        console.log('Enviando formulário com os dados:', {
            name: nameValue,
            email: emailValue,
            message: messageValue
        });
        
        // Enviar para Formspree via POST
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameValue,
                email: emailValue,
                message: messageValue
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor: ' + response.status);
        }
        
        const data = await response.json();
        console.log('✓ Formulário enviado com sucesso:', data);
        
        // Sucesso
        statusDiv.innerHTML = '<p style="color: #4CAF50; font-weight: bold;">✓ Mensagem enviada com sucesso!</p>';
        form.reset();
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 5000);
        
    } catch (error) {
        console.error('✗ Erro ao enviar formulário:', error);
        
        let errorMessage = '✗ Erro ao enviar. Tente novamente.';
        
        // Tratamento de erros específicos
        if (error.message && error.message.includes('preencha')) {
            errorMessage = '✗ ' + error.message;
        } else if (error.message && error.message.includes('e-mail válido')) {
            errorMessage = '✗ ' + error.message;
        } else if (error.message && error.message.includes('YOUR_FORM_ID')) {
            errorMessage = '✗ Configure o Formspree antes de usar (veja console)';
        }
        
        statusDiv.innerHTML = `<p style="color: #f44336; font-weight: bold;">${errorMessage}</p>`;
    } finally {
        // Reabilitar botão
        submitButton.disabled = false;
        submitButton.textContent = 'send';
    }
}

// Adicionar listener ao formulário quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendContactEmail);
        console.log('✓ Formulário de contato configurado para Formspree');
    } else {
        console.error('✗ Elemento com id "contactForm" não encontrado');
    }
});
