// Cronômetro do Foco. Bug corrigido na etapa 5: o tempo contava por "tiques" e
// atrasava quando o navegador desacelerava a aba; agora é pelo relógio real.
import { novoCronometro, pausarCronometro, retomarCronometro, decorridoSeg, restanteSeg, minutosFocados, valeGravar } from '../src/lib/foco.js'

let ok = 0
let tot = 0
function conferir(descricao, real, esperado) {
  tot++
  if (JSON.stringify(real) === JSON.stringify(esperado)) ok++
  else console.log(`  ✗ ${descricao}\n     esperado: ${JSON.stringify(esperado)}\n     veio:     ${JSON.stringify(real)}`)
}

const T0 = 1_000_000
const min = (n) => n * 60_000
const c = novoCronometro(25 * 60, T0)

conferir('começa com 25 minutos', restanteSeg(c, T0), 1500)
// O caso do bug: aba escondida por 10 minutos, sem nenhum tique no meio.
conferir('10 min sem tique nenhum continuam contando', decorridoSeg(c, T0 + min(10)), 600)
conferir('restante depois de 10 min', restanteSeg(c, T0 + min(10)), 900)

const p = pausarCronometro(c, T0 + min(5))
conferir('pausado não conta o tempo parado', decorridoSeg(p, T0 + min(20)), 300)
const r = retomarCronometro(p, T0 + min(20))
conferir('retomado volta a contar de onde parou', decorridoSeg(r, T0 + min(22)), 420)
conferir('pausar duas vezes não muda nada', pausarCronometro(p, T0 + min(30)), p)

conferir('nunca passa do total', decorridoSeg(c, T0 + min(90)), 1500)
conferir('restante nunca fica negativo', restanteSeg(c, T0 + min(90)), 0)

conferir('poucos segundos viram 1 minuto (o banco exige > 0)', minutosFocados(40), 1)
conferir('25 minutos', minutosFocados(1500), 25)
conferir('menos de 30 s não grava', valeGravar(29), false)

console.log(`${ok}/${tot} — foco`)
process.exit(ok === tot ? 0 : 1)
