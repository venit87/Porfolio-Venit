# Configuração de Envio de E-mail com EmailJS

## ⚙️ Passo 1: Criar conta no EmailJS

1. Acesse [emailjs.com](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie a sua conta (pode usar Gmail/GitHub)
3. Verifique seu e-mail

## 📧 Passo 2: Configurar Email Service

1. No dashboard, vá para **Email Services**
2. Clique em **Add New Service** (ou use um serviço existente)
3. Escolha seu provedor de e-mail (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Copie o Service ID** (você vai precisar dele)

### Exemplo: Gmail
- Selecione "Gmail"
- Faça login com sua conta Google
- Autorize o EmailJS

## 📝 Passo 3: Criar Template de E-mail

1. Vá para **Email Templates**
2. Clique em **Create New Template**
3. Preencha assim:

**Template Name:** `contact_form` (ou outro nome)

**Template ID:** Será gerado automaticamente (copie-o!)

**Email Content:**
```
Assunto: Nova Mensagem do Portfólio

De: {{from_name}} ({{from_email}})

Mensagem:
{{message}}
```

4. Clique em **Save** e depois em **Save Template**

## 🔑 Passo 4: Obter sua Public Key

1. No menu superior, clique em **Account**
2. Vá para **API Keys**
3. Copie sua **Public Key**

## 🔧 Passo 5: Atualizar o arquivo index.js

Abra o arquivo `index.js` e localize esta seção (próximo ao final do arquivo):

```javascript
function initEmailJS() {
    emailjs.init('YOUR_PUBLIC_KEY');
}
```

**Substitua `YOUR_PUBLIC_KEY`** pela sua chave pública:

```javascript
function initEmailJS() {
    emailjs.init('sua_chave_publica_aqui');
}
```

---

Procure também por estas linhas:

```javascript
const templateParams = {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    to_email: 'seu-email@exemplo.com', // ← MUDE ISTO
    message: document.getElementById('message').value
};
```

**Substitua `seu-email@exemplo.com`** pelo seu e-mail:

```javascript
to_email: 'seu-email-real@gmail.com',
```

---

E finalmente:

```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
```

**Substitua os valores:**

```javascript
await emailjs.send('seu_service_id_aqui', 'seu_template_id_aqui', templateParams);
```

## ✅ Teste

1. Abra o portfólio no navegador
2. Clique em **Contact**
3. Preencha o formulário e clique em **send**
4. Você deve receber um e-mail em alguns segundos!

## 🎉 Pronto!

Seu formulário de contato agora está funcionando!

---

### Dúvidas comuns:

**P: Não estou recebendo os e-mails?**
- Verifique se configurou o Email Service corretamente
- Procure na pasta de SPAM
- Verifique se os IDs estão corretos no index.js

**P: Posso enviar e-mails para múltiplos endereços?**
- Sim! Na template do EmailJS, você pode adicionar "CC" e "BCC"

**P: O limite de e-mails é gratuito?**
- EmailJS oferece 200 e-mails/mês na versão gratuita

**P: Como personalizar a mensagem de sucesso?**
- Edite o arquivo `index.js`, procure por "Mensagem enviada com sucesso" e mude o texto
