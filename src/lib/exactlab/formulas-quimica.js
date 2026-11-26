// Fórmulas de Química do 9º ano EF ao 3º ano EM, por assunto.
// Cada fórmula: [nome, fórmula, [[símbolo, significado e unidade], ...], observação opcional]
const EF9 = '9º ano EF', EM1 = '1º ano EM', EM2 = '2º ano EM', EM3 = '3º ano EM'

export const QUIMICA = [
  { assunto: 'Estrutura atômica', serie: EF9, formulas: [
    ['Número de massa', 'A = Z + N', [['A', 'número de massa'], ['Z', 'número atômico (prótons)'], ['N', 'nêutrons']]],
    ['Átomo neutro', 'prótons = elétrons = Z', [['', 'em um íon, elétrons = Z − carga']]],
    ['Elétrons em um íon', 'e⁻ = Z − q', [['q', 'carga do íon (ex.: Na⁺ → q = +1; Cl⁻ → q = −1)']]],
    ['Máximo de elétrons por camada', 'K 2 · L 8 · M 18 · N 32 · O 32 · P 18 · Q 8', [['', 'nos átomos conhecidos']]],
    ['Máximo de elétrons por subnível', 's 2 · p 6 · d 10 · f 14', [['', 'ordem de preenchimento: diagrama de Linus Pauling']]],
  ] },
  { assunto: 'Densidade e misturas', serie: EF9, formulas: [
    ['Densidade', 'd = m / V', [['m', 'massa (g)'], ['V', 'volume (cm³ ou mL)']]],
    ['Massa atômica média', 'MA = Σ(massa do isótopo × abundância) / 100', [['abundância', 'em %']]],
  ] },
  { assunto: 'Grandezas químicas (mol)', serie: EM1, formulas: [
    ['Número de mols', 'n = m / M', [['m', 'massa (g)'], ['M', 'massa molar (g/mol)']]],
    ['Constante de Avogadro', 'N = n · 6,02 × 10²³', [['N', 'número de partículas']]],
    ['Volume molar de gás', 'V = n · 22,4 L', [['', 'nas CNTP (0 °C e 1 atm); a 25 °C e 1 atm, cerca de 24,5 L/mol']]],
    ['Massa molar de uma substância', 'M = Σ(massas atômicas × índices)', [['', 'ex.: H₂O = 2 × 1 + 16 = 18 g/mol']]],
  ] },
  { assunto: 'Estequiometria', serie: EM1, formulas: [
    ['Proporção da equação balanceada', 'nA / coef A = nB / coef B', [['coef', 'coeficiente estequiométrico']]],
    ['Rendimento', 'rendimento (%) = (obtido / teórico) × 100', [['', 'massa ou mols']]],
    ['Pureza', 'massa pura = massa da amostra × pureza (%) / 100', [['', 'só a parte pura reage']]],
    ['Fórmula percentual', '% do elemento = (massa do elemento / massa total) × 100', [['', 'por mol da substância']]],
  ] },
  { assunto: 'Gases', serie: EM1, formulas: [
    ['Equação de Clapeyron', 'p · V = n · R · T', [['R', '0,082 atm·L/mol·K ou 8,31 J/mol·K'], ['T', 'temperatura em kelvin']]],
    ['Lei geral dos gases', 'p₁V₁ / T₁ = p₂V₂ / T₂', [['T', 'em kelvin']]],
    ['Pressão parcial (Dalton)', 'pₐ = xₐ · p_total', [['xₐ', 'fração em mols do gás A']]],
    ['Densidade de um gás', 'd = p · M / (R · T)', [['M', 'massa molar (g/mol)']]],
  ] },
  { assunto: 'Soluções', serie: EM2, formulas: [
    ['Concentração comum', 'C = m₁ / V', [['m₁', 'massa do soluto (g)'], ['V', 'volume da solução (L)']]],
    ['Concentração em mol/L', 'M = n₁ / V', [['n₁', 'mols do soluto'], ['V', 'volume da solução (L)']]],
    ['Título em massa', 'τ = m₁ / (m₁ + m₂)', [['m₂', 'massa do solvente']]],
    ['Relação entre concentrações', 'C = τ · d · 1000 = M · M₁', [['d', 'densidade da solução (g/mL)'], ['M₁', 'massa molar do soluto']]],
    ['Partes por milhão', 'ppm = (massa do soluto / massa da solução) × 10⁶', [['', 'para soluções muito diluídas']]],
    ['Diluição', 'C₁ · V₁ = C₂ · V₂', [['', 'a quantidade de soluto não muda']]],
    ['Mistura de soluções do mesmo soluto', 'C_f · V_f = C₁V₁ + C₂V₂', [['V_f', 'V₁ + V₂']]],
    ['Titulação (neutralização)', 'n(H⁺) = n(OH⁻)', [['', 'no ponto de equivalência']]],
  ] },
  { assunto: 'Propriedades coligativas', serie: EM2, formulas: [
    ['Fator de van\'t Hoff', 'i = 1 + α(q − 1)', [['α', 'grau de ionização'], ['q', 'número de partículas por fórmula']]],
    ['Ebulioscopia', 'Δt_e = K_e · W · i', [['W', 'molalidade (mol/kg de solvente)'], ['K_e', 'constante ebulioscópica']]],
    ['Crioscopia', 'Δt_c = K_c · W · i', [['K_c', 'constante crioscópica']]],
    ['Pressão osmótica', 'π = M · R · T · i', [['M', 'concentração em mol/L']]],
  ] },
  { assunto: 'Termoquímica', serie: EM2, formulas: [
    ['Variação de entalpia', 'ΔH = H_produtos − H_reagentes', [['ΔH < 0', 'exotérmica (libera calor)'], ['ΔH > 0', 'endotérmica (absorve calor)']]],
    ['Lei de Hess', 'ΔH_total = ΔH₁ + ΔH₂ + …', [['', 'soma das etapas, invertendo o sinal da etapa invertida']]],
    ['Entalpia por energia de ligação', 'ΔH = Σ(ligações rompidas) − Σ(ligações formadas)', [['', 'romper absorve energia; formar libera']]],
    ['Entalpia de formação', 'ΔH = ΣΔH_f(produtos) − ΣΔH_f(reagentes)', [['', 'substâncias simples na forma mais estável têm ΔH_f = 0']]],
  ] },
  { assunto: 'Cinética química', serie: EM2, formulas: [
    ['Velocidade média', 'v = |Δ[ ]| / Δt', [['[ ]', 'concentração (mol/L)']]],
    ['Lei da velocidade', 'v = k · [A]ᵃ · [B]ᵇ', [['k', 'constante de velocidade'], ['a, b', 'ordens (para reação elementar, iguais aos coeficientes)']]],
    ['Meia-vida (1ª ordem)', 't½ = 0,693 / k', [['', 'não depende da concentração inicial']]],
  ] },
  { assunto: 'Equilíbrio químico', serie: EM2, formulas: [
    ['Constante de equilíbrio', 'K꜀ = [C]ᶜ · [D]ᵈ / ([A]ᵃ · [B]ᵇ)', [['', 'para aA + bB ⇌ cC + dD; sólidos e líquidos puros não entram']]],
    ['Constante em pressões', 'Kₚ = K꜀ · (R · T)^Δn', [['Δn', 'mols gasosos dos produtos − dos reagentes']]],
    ['Grau de equilíbrio', 'α = quantidade que reagiu / quantidade inicial', [['α', 'entre 0 e 1']]],
    ['Lei da diluição de Ostwald', 'Kᵢ = α² · M / (1 − α)  ≈  α² · M', [['', 'aproximação para eletrólitos fracos (α pequeno)']]],
  ] },
  { assunto: 'pH e equilíbrio iônico', serie: EM2, formulas: [
    ['Produto iônico da água', 'K_w = [H⁺] · [OH⁻] = 10⁻¹⁴', [['', 'a 25 °C']]],
    ['pH e pOH', 'pH = −log [H⁺]  ·  pOH = −log [OH⁻]', [['[H⁺]', 'em mol/L']]],
    ['Relação pH + pOH', 'pH + pOH = 14', [['', 'a 25 °C; pH < 7 ácido, = 7 neutro, > 7 básico']]],
    ['Constante de ionização ácida', 'Kₐ = [H⁺] · [A⁻] / [HA]', [['', 'quanto maior, mais forte o ácido']]],
    ['Produto de solubilidade', 'K_ps = [Aᵐ⁺]ˣ · [Bⁿ⁻]ʸ', [['', 'para AₓBᵧ(s) ⇌ xAᵐ⁺ + yBⁿ⁻']]],
  ] },
  { assunto: 'Eletroquímica', serie: EM3, formulas: [
    ['Diferença de potencial da pilha', 'ΔE° = E°_red(cátodo) − E°_red(ânodo)', [['', 'pilha espontânea: ΔE° > 0']]],
    ['Carga elétrica', 'Q = i · t', [['Q', 'carga (C)'], ['i', 'corrente (A)'], ['t', 'tempo (s)']]],
    ['Constante de Faraday', '1 F = 96.500 C', [['', 'carga de 1 mol de elétrons']]],
    ['Massa depositada na eletrólise', 'm = M · i · t / (k · 96.500)', [['M', 'massa molar'], ['k', 'elétrons por íon (carga)']]],
  ] },
  { assunto: 'Radioatividade', serie: EM3, formulas: [
    ['Emissão alfa (α)', 'ᴬ_ZX → ᴬ⁻⁴_(Z−2)Y + ⁴₂α', [['', 'o núcleo perde 2 prótons e 2 nêutrons']]],
    ['Emissão beta (β⁻)', 'ᴬ_ZX → ᴬ_(Z+1)Y + ⁰₋₁β', [['', 'um nêutron vira próton']]],
    ['Meia-vida', 'm = m₀ / 2ⁿ  ·  t = n · t½', [['n', 'número de meias-vidas']]],
  ] },
  { assunto: 'Química orgânica', serie: EM3, formulas: [
    ['Fórmula geral dos alcanos', 'CₙH₂ₙ₊₂', [['n', 'número de carbonos']]],
    ['Alcenos e ciclanos', 'CₙH₂ₙ', [['', 'uma ligação dupla, ou um ciclo']]],
    ['Alcinos e alcadienos', 'CₙH₂ₙ₋₂', [['', 'uma tripla, ou duas duplas']]],
    ['Isômeros ópticos (Van\'t Hoff)', 'IOA = 2ⁿ', [['n', 'carbonos quirais diferentes'], ['IOA', 'isômeros opticamente ativos']]],
  ] },
]
