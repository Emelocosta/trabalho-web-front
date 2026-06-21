// CONTROLE DE CONTRASTE
function aplicarContraste(modo) {
    const body = document.body;
    
    // Remove classes anteriores
    body.classList.remove('contraste-alto', 'contraste-escuro');
    
    if (modo === 'alto') {
        body.classList.add('contraste-alto');
        localStorage.setItem('contraste', 'alto');
    } else if (modo === 'escuro') {
        body.classList.add('contraste-escuro');
        localStorage.setItem('contraste', 'escuro');
    } else {
        localStorage.setItem('contraste', 'normal');
    }
}

function contrasteNormal() {
    aplicarContraste('normal');
}

function contrasteAlto() {
    aplicarContraste('alto');
}

function contrasteEscuro() {
    aplicarContraste('escuro');
}

// CONTROLE DE FONTE
let tamanhoFonte = 100;

function aplicarFonte(tamanho) {
    document.documentElement.style.fontSize = tamanho + '%';
    localStorage.setItem('tamanhoFonte', tamanho);
}

function fonteMenor() {
    if (tamanhoFonte > 80) {
        tamanhoFonte = tamanhoFonte - 10;
        aplicarFonte(tamanhoFonte);
    }
}

function fonteNormal() {
    tamanhoFonte = 100;
    aplicarFonte(tamanhoFonte);
}

function fonteMaior() {
    if (tamanhoFonte < 150) {
        tamanhoFonte = tamanhoFonte + 10;
        aplicarFonte(tamanhoFonte);
    }
}

// CARREGAR PREFERÊNCIAS SALVAS
document.addEventListener('DOMContentLoaded', function() {
    
    // Carregar contraste salvo
    const contrasteSalvo = localStorage.getItem('contraste');
    if (contrasteSalvo && contrasteSalvo !== 'normal') {
        aplicarContraste(contrasteSalvo);
    }
    
    // Carregar tamanho da fonte salvo
    const fonteSalva = localStorage.getItem('tamanhoFonte');
    if (fonteSalva) {
        tamanhoFonte = parseInt(fonteSalva);
        aplicarFonte(tamanhoFonte);
    }
});

// FUNÇÃO PARA VALIDAR FORMULÁRIO (cadastro.html)
function agendarVisita(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    
    if (nome.value.trim().length < 3) {
        alert('Por favor, digite seu nome completo (mínimo 3 caracteres)');
        nome.focus();
        return false;
    }
    
    if (!email.value.includes('@') || !email.value.includes('.')) {
        alert('Por favor, digite um e-mail válido');
        email.focus();
        return false;
    }
    
    const cpfLimpo = cpf.value.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
        alert('Por favor, digite um CPF válido com 11 números');
        cpf.focus();
        return false;
    }
    
    const telefoneLimpo = telefone.value.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
        alert('Por favor, digite um telefone válido com DDD');
        telefone.focus();
        return false;
    }
    
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'block';
    
    return true;
}

// MÁSCARA PARA CPF 
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    
    input.value = valor;
}

// MÁSCARA PARA TELEFONE 
function mascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length > 10) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    input.value = valor;
}