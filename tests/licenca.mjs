// Quem entra onde. Esta regra separa quem pagou de quem não pagou.
import { telaDeEntrada, licencaAtiva, normalizarEmail, podeAdministrar } from '../src/lib/licenca.js'
import { semanaSugerida, metasSugeridas } from '../src/lib/series.js'
import { MATERIAS } from '../src/lib/fabrica.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

const aluno = { role: 'aluno', serie: '2º ano EM' }
const ativa = { status: 'Ativa' }

conferir('administradora vai para Licenças', telaDeEntrada({ perfil: { role: 'admin' }, licenca: null, emailConfirmado: true }), 'admin')
conferir('administradora com licença bloqueada só administra', telaDeEntrada({ perfil: { role: 'admin', serie: '2º ano EM' }, licenca: { status: 'Bloqueada' }, emailConfirmado: true }), 'admin')
conferir('administradora com licença de cortesia estuda', telaDeEntrada({ perfil: { role: 'admin', serie: '2º ano EM' }, licenca: ativa, emailConfirmado: true }), 'aluno')
conferir('administradora com licença, primeira vez, pede a série', telaDeEntrada({ perfil: { role: 'admin', serie: null }, licenca: ativa, emailConfirmado: true }), 'serie')
conferir('só a administradora vê Licenças no menu', [podeAdministrar({ role: 'admin' }), podeAdministrar(aluno), podeAdministrar(null)], [true, false, false])
conferir('aluno com licença ativa e série vai para o Quadro', telaDeEntrada({ perfil: aluno, licenca: ativa, emailConfirmado: true }), 'aluno')
conferir('primeira entrada pede a série', telaDeEntrada({ perfil: { role: 'aluno', serie: null }, licenca: ativa, emailConfirmado: true }), 'serie')
conferir('sem licença', telaDeEntrada({ perfil: aluno, licenca: null, emailConfirmado: true }), 'sem-licenca')
conferir('licença bloqueada', telaDeEntrada({ perfil: aluno, licenca: { status: 'Bloqueada' }, emailConfirmado: true }), 'licenca-bloqueada')
conferir('email não confirmado não entra, mesmo com licença', telaDeEntrada({ perfil: aluno, licenca: ativa, emailConfirmado: false }), 'nao-confirmado')
conferir('sem perfil não entra', telaDeEntrada({ perfil: null, licenca: ativa, emailConfirmado: true }), 'sem-licenca')
conferir('licença ativa exige email confirmado', licencaAtiva(ativa, false), false)
conferir('email da compra compara sem maiúscula e espaço', normalizarEmail('  Maria@Exemplo.COM '), 'maria@exemplo.com')


const s9 = semanaSugerida('9º ano EF', MATERIAS)
const s3 = semanaSugerida('3º ano EM', MATERIAS)
conferir('9º ano: 20 blocos, segunda a sexta', [s9.length, Math.max(...s9.map((b) => b.dia_semana))], [20, 5])
conferir('3º ano ganha os blocos de fim de semana', s3.filter((b) => b.dia_semana > 5).length, 3)
conferir('as 19 matérias aparecem, Matemática duas vezes', [new Set(s9.map((b) => b.materia_id)).size, s9.filter((b) => b.materia_id === 'm-matematica').length], [19, 2])
conferir('todo bloco de Estudo tem matéria', s3.filter((b) => b.tipo === 'Estudo' && !b.materia_id).length, 0)
conferir('metas sugeridas do 3º ano', metasSugeridas('3º ano EM'), { meta_questoes_semana: 50, meta_foco_min_semana: 480, meta_provas_mes: 4 })

console.log(`${ok}/${tot} — licenca e series`)
process.exit(ok === tot ? 0 : 1)
