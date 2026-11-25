// Contas da tela Licenças.

export function resumoLicencas(licencas, agora = new Date()) {
  const mes = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}`
  return {
    ativas: licencas.filter((l) => l.status === 'Ativa').length,
    bloqueadas: licencas.filter((l) => l.status === 'Bloqueada').length,
    // "Vendidas" = compras da Hotmart neste mês (liberação manual não é venda).
    vendidasNoMes: licencas.filter((l) => l.origem === 'Hotmart' && mesLocal(l.comprado_em) === mes).length,
  }
}

function mesLocal(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function filtrarLicencas(licencas, { busca = '', status = '', origem = '' }) {
  const t = busca.trim().toLowerCase()
  return licencas
    .filter((l) => (!status || l.status === status) && (!origem || l.origem === origem) &&
      (!t || (l.email + ' ' + (l.nome || '')).toLowerCase().includes(t)))
    .sort((a, b) => b.comprado_em.localeCompare(a.comprado_em))
}
