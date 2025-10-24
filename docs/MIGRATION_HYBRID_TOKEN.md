# 🔄 Migração para Sistema Híbrido de Token

## Visão Geral

Este guia explica como migrar do sistema OAuth2 atual para o novo **Sistema Híbrido de Token** que resolve o problema de "refreshToken is required".

---

## 🎯 Problema Resolvido

### **Problema Atual (OAuth2):**
- ❌ Token expira em 1 hora
- ❌ Sistema automático não atualiza credenciais
- ❌ Erro "refreshToken is required"
- ❌ Intervenção manual necessária

### **Solução (Sistema Híbrido):**
- ✅ **Autenticação simples** com Access Token
- ✅ **Atualização automática** de credenciais
- ✅ **Sistema híbrido** (automático + manual)
- ✅ **Zero falhas** por token expirado

---

## 🚀 Implementação

### **1. Nova Credential Type**

#### **Instagram Access Token API:**
```typescript
// Configuração simplificada
{
  "accessToken": "IGQVJ...",           // Token de acesso
  "instagramBusinessAccountId": "123", // ID da conta (auto-descoberto)
  "autoRefresh": true,                 // Refresh automático
  "refreshThreshold": 7               // Dias antes da expiração
}
```

#### **Vantagens:**
- ✅ **Apenas 1 campo obrigatório** (vs 4 no OAuth2)
- ✅ **Auto-descoberta** do Account ID
- ✅ **Refresh automático** configurável
- ✅ **Credenciais atualizáveis** programaticamente

### **2. Sistema Híbrido**

#### **Atualização Automática (Padrão):**
```typescript
// Em GenericFunctions.ts
export async function getAccessTokenHybrid(
  context: IExecuteFunctions,
  credentialId: string,
): Promise<string> {
  // 1. Verificar se auto-refresh está habilitado
  // 2. Verificar status do token
  // 3. Fazer refresh automático se necessário
  // 4. Atualizar credenciais automaticamente
  // 5. Retornar token atualizado
}
```

#### **Controle Manual (Opcional):**
```typescript
// Node InstagramTokenRefresh
export class InstagramTokenRefresh implements INodeType {
  // Operações disponíveis:
  // - Check Token Status
  // - Refresh Token
  // - Clear Cache
  // - Get Access Token
}
```

### **3. Compatibilidade**

#### **Suporte Duplo:**
- ✅ **OAuth2** (sistema atual) - continua funcionando
- ✅ **Access Token** (novo sistema) - com refresh automático
- ✅ **Detecção automática** do tipo de credencial
- ✅ **Migração gradual** sem quebrar workflows existentes

---

## 📋 Guia de Migração

### **Passo 1: Instalar Nova Versão**
```bash
npm update n8n-nodes-instagram-integrations
```

### **Passo 2: Criar Nova Credencial**
1. Vá em **Credentials** → **New**
2. Selecione **Instagram Access Token API**
3. Configure:
   - **Access Token**: Seu token atual do OAuth2
   - **Auto Refresh**: `true` (recomendado)
   - **Refresh Threshold**: `7` dias

### **Passo 3: Testar Nova Credencial**
1. Crie um workflow de teste
2. Use **Instagram Token Refresh** node
3. Execute operação **"Check Token Status"**
4. Verifique se o token está válido

### **Passo 4: Migrar Workflows**
1. **Gradualmente** substitua credenciais OAuth2
2. **Teste** cada workflow após migração
3. **Mantenha** OAuth2 como backup inicialmente

### **Passo 5: Configurar Automação (Opcional)**
```yaml
# Workflow de exemplo
Cron (diário) → Instagram Token Refresh → Notificação
```

---

## 🔧 Configuração Avançada

### **1. Configuração de Auto-Refresh**

#### **Habilitado (Recomendado):**
```json
{
  "autoRefresh": true,
  "refreshThreshold": 7
}
```
- ✅ **Refresh automático** quando token expira em 7 dias
- ✅ **Zero intervenção** manual
- ✅ **Funcionamento transparente**

#### **Desabilitado (Controle Manual):**
```json
{
  "autoRefresh": false
}
```
- ✅ **Controle total** do usuário
- ✅ **Refresh manual** quando necessário
- ✅ **Visibilidade** do processo

### **2. Node de Controle Manual**

#### **Operações Disponíveis:**

##### **Check Token Status:**
```json
{
  "success": true,
  "token": "IGQVJ...",
  "expiresAt": "2025-12-15T10:30:00Z",
  "age": 15,
  "needsRefresh": false,
  "isExpired": false,
  "status": "VALID"
}
```

##### **Refresh Token:**
```json
{
  "success": true,
  "newToken": "IGQVJ...",
  "message": "Token refreshed successfully"
}
```

##### **Clear Cache:**
```json
{
  "success": true,
  "message": "Token cache cleared successfully"
}
```

### **3. Workflow de Automação**

#### **Exemplo: Verificação Diária**
```
┌─────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│   Cron      │───▶│  Instagram Token    │───▶│   Notification  │
│ (diário)    │    │  Refresh Node       │    │   (Email/Slack) │
└─────────────┘    └──────────────────────┘    └─────────────────┘
```

#### **Exemplo: Refresh Proativo**
```
┌─────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│   Cron      │───▶│  Check Status       │───▶│  Refresh if     │
│ (semanal)   │    │  (needsRefresh=true) │    │  needed         │
└─────────────┘    └──────────────────────┘    └─────────────────┘
```

---

## 🎯 Benefícios da Migração

### **1. Resolução do Problema Principal:**
- ✅ **Elimina** erro "refreshToken is required"
- ✅ **Atualização automática** de credenciais
- ✅ **Zero falhas** por token expirado
- ✅ **Funcionamento contínuo** dos workflows

### **2. Melhor Experiência do Usuário:**
- ✅ **Configuração simplificada** (1 campo vs 4)
- ✅ **Auto-descoberta** do Account ID
- ✅ **Sistema híbrido** (automático + manual)
- ✅ **Flexibilidade** de configuração

### **3. Manutenção Reduzida:**
- ✅ **Zero intervenção** manual
- ✅ **Monitoramento automático** de tokens
- ✅ **Refresh proativo** antes da expiração
- ✅ **Logs informativos** para debugging

---

## 🚨 Considerações Importantes

### **1. Compatibilidade:**
- ✅ **OAuth2 continua funcionando** (não quebra workflows existentes)
- ✅ **Migração gradual** possível
- ✅ **Suporte duplo** durante transição

### **2. Limitações:**
- ⚠️ **Credenciais Access Token** são mais simples (menos campos)
- ⚠️ **Migração manual** de workflows necessária
- ⚠️ **Teste** de cada workflow após migração

### **3. Recomendações:**
- 🔄 **Migre gradualmente** (não tudo de uma vez)
- 🧪 **Teste** cada workflow após migração
- 📊 **Monitore** logs para verificar funcionamento
- 🔄 **Mantenha OAuth2** como backup inicialmente

---

## 📞 Suporte

### **Recursos:**
- 📖 **Documentação**: [README.md](../README.md)
- 🔧 **Guia de Configuração**: [AUTHENTICATION_GUIDE.md](../AUTHENTICATION_GUIDE.md)
- 💡 **Exemplos**: [docs/publish_content/EXAMPLES.md](publish_content/EXAMPLES.md)

### **Troubleshooting:**
- ✅ **Verificar** se nova credencial está configurada
- ✅ **Testar** com Instagram Token Refresh node
- ✅ **Verificar** logs para erros de token
- ✅ **Confirmar** que auto-refresh está habilitado

---

**Status**: ✅ **Sistema Híbrido Implementado**  
**Benefício**: 🟢 **Máximo** (resolve problema fundamental)  
**Complexidade**: 🟡 **Média** (migração gradual necessária)
