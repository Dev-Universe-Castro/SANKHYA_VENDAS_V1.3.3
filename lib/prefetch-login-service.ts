import { oracleAuthService } from './oracle-auth-service'

// Serviço de prefetch de dados para otimizar o carregamento inicial
export async function prefetchLoginData() {
  try {
    console.log('🔄 Iniciando prefetch completo de dados...')

    // Chamar a API route de prefetch
    const response = await fetch('/api/prefetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao fazer prefetch: ${response.status}`)
    }

    const data = await response.json()

    // Sincronizar com IndexedDB também no login prefetch
    const { OfflineDataService } = await import('./offline-data-service')

    // Atualizar caches no sessionStorage (Método Centralizado)
    OfflineDataService.atualizarCachesSessionStorage(data)

    // Passar todos os dados recebidos para a sincronização no IndexedDB
    await OfflineDataService.sincronizarTudo(data, 'PrefetchLoginService')

    return {
      parceiros: data.parceiros?.count || 0,
      produtos: data.produtos?.count || 0,
      tiposNegociacao: data.tiposNegociacao?.count || 0,
      tiposOperacao: data.tiposOperacao?.count || 0,
      pedidos: data.pedidos?.count || 0,
      financeiro: data.financeiro?.count || 0,
      usuarios: data.usuarios?.count || 0,
      total: 0 // Simplificado pois agora o log está dentro do serviço
    }
  } catch (error) {
    console.error('❌ Erro no prefetch de dados:', error)
    return {
      parceiros: 0,
      produtos: 0,
      tiposNegociacao: 0,
      tiposOperacao: 0,
      pedidos: 0,
      financeiro: 0,
      usuarios: 0,
      total: 0
    }
  }
}

// Limpar cache de prefetch (útil para forçar atualização)
export async function clearPrefetchCache() {
  try {
    // Chamar endpoint de limpeza de cache
    await fetch('/api/cache/clear', {
      method: 'POST',
    })
    console.log('🗑️ Cache de prefetch limpo')
  } catch (error) {
    console.error('❌ Erro ao limpar cache de prefetch:', error)
  }
}