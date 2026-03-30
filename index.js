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
