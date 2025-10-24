# n8n-nodes-insta-accessToken

![Instagram Banner](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)
[![npm version](https://img.shields.io/npm/v/n8n-nodes-insta-accessToken.svg)](https://www.npmjs.com/package/n8n-nodes-insta-accessToken)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-community-FF6D5A?logo=n8n)](https://n8n.io)

**Fork com Sistema Híbrido de Token** - N8N community nodes para integração Instagram com **atualização automática de token** e **controle manual**.

---

## 🎯 **Problema Resolvido**

### **Problema Original:**
- ❌ Token expira em 1 hora
- ❌ Erro "refreshToken is required"
- ❌ Sistema automático não atualiza credenciais
- ❌ Intervenção manual necessária

### **Solução Implementada:**
- ✅ **Sistema híbrido** (automático + manual)
- ✅ **Atualização automática** de credenciais
- ✅ **Zero falhas** por token expirado
- ✅ **Controle manual** quando necessário

---

## 🚀 **Instalação**

### **Opção 1: NPM (Recomendado)**
```bash
npm install n8n-nodes-insta-accessToken
```

### **Opção 2: n8n Community Nodes**
1. Abra n8n
2. Vá em **Settings** → **Community Nodes**
3. Procure por `n8n-nodes-insta-accessToken`
4. Clique **Install**
5. Reinicie n8n

### **Opção 3: Docker**
```yaml
services:
  n8n:
    environment:
      - N8N_COMMUNITY_PACKAGES=n8n-nodes-insta-accessToken
```

---

## 🔧 **Configuração Rápida**

### **1. Nova Credential Type:**
- **Instagram Access Token API** (simplificada)
- **Apenas 1 campo obrigatório** (vs 4 no OAuth2)
- **Auto-descoberta** do Account ID
- **Refresh automático** configurável

### **2. Sistema Híbrido:**
- **Atualização automática** (padrão)
- **Controle manual** (opcional)
- **Cache inteligente** com validação
- **Logs informativos** para debugging

---

## 📦 **Novos Recursos**

### **1. Instagram Access Token API**
```typescript
{
  "accessToken": "IGQVJ...",           // Token de acesso
  "instagramBusinessAccountId": "123", // ID da conta (auto-descoberto)
  "autoRefresh": true,                 // Refresh automático
  "refreshThreshold": 7               // Dias antes da expiração
}
```

### **2. Instagram Token Refresh Node**
- **Check Token Status** - Verificar status do token
- **Refresh Token** - Forçar refresh manual
- **Clear Cache** - Limpar cache
- **Get Access Token** - Obter token com refresh automático

### **3. Sistema Automático**
- **Detecção automática** de token expirado
- **Refresh automático** antes da expiração
- **Atualização automática** de credenciais
- **Zero intervenção** manual

---

## 🎯 **Casos de Uso**

### **Automação Completa:**
- ✅ **Workflows contínuos** sem falhas
- ✅ **Refresh automático** de tokens
- ✅ **Zero manutenção** necessária
- ✅ **Funcionamento transparente**

### **Controle Manual:**
- ✅ **Verificação** de status do token
- ✅ **Refresh manual** quando necessário
- ✅ **Limpeza** de cache
- ✅ **Debugging** facilitado

### **Workflows de Automação:**
```
Cron (diário) → Instagram Token Refresh → Notificação
```

---

## 🔄 **Migração do Original**

### **Diferenças Principais:**
- ✅ **Sistema híbrido** implementado
- ✅ **Nova credential type** simplificada
- ✅ **Node de controle manual** adicionado
- ✅ **Atualização automática** de credenciais
- ✅ **Compatibilidade** com sistema original

### **Vantagens:**
- ✅ **Resolve** problema "refreshToken is required"
- ✅ **Configuração simplificada** (1 campo vs 4)
- ✅ **Sistema automático** completo
- ✅ **Controle manual** opcional
- ✅ **Zero falhas** por token expirado

---

## 📚 **Documentação**

### **Guias Principais:**
- 📘 **README.md** - Documentação completa
- 🔄 **MIGRATION_HYBRID_TOKEN.md** - Guia de migração
- 🔧 **AUTHENTICATION_GUIDE.md** - Configuração OAuth2
- 📸 **POST_STORY_GUIDE.md** - Criação de posts e stories

### **Exemplos:**
- 💡 **EXAMPLES.md** - Exemplos de código
- 📊 **FEATURE_SUMMARY.md** - Resumo técnico
- 🚀 **QUICKSTART.md** - Guia de 5 minutos

---

## 🛠️ **Troubleshooting**

### **Problemas Comuns:**
- **Token expirado** → Use Instagram Token Refresh node
- **Credenciais não encontradas** → Configure Instagram Access Token API
- **Auto-refresh não funciona** → Verifique se está habilitado
- **Cache corrompido** → Use Clear Cache operation

### **Debug:**
- **Check Token Status** → Verificar status atual
- **Logs do console** → Informações detalhadas
- **Teste de conexão** → Verificar credenciais

---

## 🤝 **Contribuição**

### **Fork Original:**
- **Repositório**: [n8n-nodes-instagram-integrations](https://github.com/Msameim181/n8n-nodes-instagram-integrations)
- **Autor Original**: Mohammad Mahdi Samei
- **Licença**: MIT

### **Este Fork:**
- **Sistema híbrido** implementado
- **Resolução** do problema de token
- **Melhorias** na experiência do usuário
- **Compatibilidade** mantida

---

## 📄 **Licença**

MIT License - veja [LICENSE.md](LICENSE.md) para detalhes.

---

## 🙏 **Agradecimentos**

- **Autor Original**: Mohammad Mahdi Samei
- **n8n Community**: Framework de automação
- **Instagram Graph API**: API oficial do Instagram
- **Contribuidores**: Comunidade n8n

---

**Status**: ✅ **Sistema Híbrido Implementado**  
**Benefício**: 🟢 **Máximo** (resolve problema fundamental)  
**Pronto para**: 🚀 **Produção**

---

**Feito com ❤️ para a comunidade n8n** | [GitHub](https://github.com/SEU-USUARIO/n8n-nodes-insta-accessToken) | [npm](https://www.npmjs.com/package/n8n-nodes-insta-accessToken)
