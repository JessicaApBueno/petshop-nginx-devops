 // Dados para a galeria de imagens
        const imagensCaes = [
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
            'https://images.unsplash.com/photo-1588942203135-2415714397a6',
            'https://images.unsplash.com/photo-1547463777-a82f3a479426',
            'https://images.unsplash.com/photo-1563721389028-100222a7f34f',
            'https://images.unsplash.com/photo-1594950454371-d60211a76c0e',
            'https://images.unsplash.com/photo-1582239075775-8022b7d27e28'
        ];

        // Dados para as informações detalhadas das raças
        const dadosDasRacas = {
            'Labrador Retriever': {
                historia: 'O Labrador Retriever é originário da Terra Nova e era originalmente usado para auxiliar pescadores. Hoje, é uma das raças mais populares do mundo por seu temperamento amigável e inteligência.',
                caracteristicas: 'Amigável, leal, inteligente, paciente e brincalhão. Ideal para famílias.',
                imagem: 'https://images.unsplash.com/photo-1582239075775-8022b7d27e28'
            },
            'Golden Retriever': {
                historia: 'O Golden Retriever foi desenvolvido na Escócia, no século XIX, para caça de aves aquáticas. É famoso por sua pelagem dourada e sua natureza gentil.',
                caracteristicas: 'Amigável, afetuoso, inteligente e paciente. Adora brincar e nadar.',
                imagem: 'https://images.unsplash.com/photo-1594950454371-d60211a76c0e'
            },
            'Poodle': {
                historia: 'Apesar de ser a raça nacional da França, o Poodle se originou na Alemanha, onde era usado como cão d\'água. Sua inteligência e facilidade de treinamento o tornaram muito popular.',
                caracteristicas: 'Muito inteligente, brincalhão e adaptável. Ideal para pessoas com alergias, pois solta pouco pelo.',
                imagem: 'https://images.unsplash.com/photo-1601004318047-9ce48e24c4e7'
            }
        };

        // Dados para a pesquisa de raças
        const todasAsRacas = [
            { nome: 'Labrador Retriever', tamanho: 'Grande', temperamento: 'Amigável', nivelAtividade: 'Alto' },
            { nome: 'Golden Retriever', tamanho: 'Grande', temperamento: 'Amigável', nivelAtividade: 'Alto' },
            { nome: 'Poodle', tamanho: 'Médio', temperamento: 'Inteligente', nivelAtividade: 'Médio' },
            { nome: 'Bulldog Inglês', tamanho: 'Médio', temperamento: 'Calmo', nivelAtividade: 'Baixo' },
            { nome: 'Pastor Alemão', tamanho: 'Grande', temperamento: 'Inteligente', nivelAtividade: 'Alto' },
            { nome: 'Chihuahua', tamanho: 'Pequeno', temperamento: 'Inteligente', nivelAtividade: 'Baixo' },
            { nome: 'Pug', tamanho: 'Pequeno', temperamento: 'Calmo', nivelAtividade: 'Baixo' },
            { nome: 'Beagle', tamanho: 'Médio', temperamento: 'Amigável', nivelAtividade: 'Alto' }
        ];

        // Função para exibir a galeria de imagens
        function exibirGaleriaDeImagens(imagens) {
            const galeriaContainer = document.getElementById('galeria-caes');
            galeriaContainer.innerHTML = ''; // Limpa o conteúdo anterior

            imagens.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Imagem de um cão';
                img.classList.add('gallery-image');
                galeriaContainer.appendChild(img);
            });
        }

        // Função para exibir informações detalhadas de uma raça
        function exibirInfoRaca(nomeRaca) {
            const raca = dadosDasRacas[nomeRaca];
            if (raca) {
                alert(`Raça: ${nomeRaca}\n\nHistória: ${raca.historia}\n\nCaracterísticas: ${raca.caracteristicas}`);
            }
        }

        // Função para pesquisar raças com base nos filtros
        function pesquisarRacas() {
            const tamanho = document.getElementById('tamanho-raca').value;
            const temperamento = document.getElementById('temperamento-raca').value;

            const resultados = todasAsRacas.filter(raca => {
                return (tamanho === 'todos' || raca.tamanho === tamanho) &&
                       (temperamento === 'todos' || raca.temperamento === temperamento);
            });

            const resultadosContainer = document.getElementById('resultados-pesquisa');
            resultadosContainer.innerHTML = '';
            if (resultados.length > 0) {
                resultados.forEach(raca => {
                    const p = document.createElement('p');
                    p.innerText = `${raca.nome} - Tamanho: ${raca.tamanho}, Temperamento: ${raca.temperamento}`;
                    resultadosContainer.appendChild(p);
                });
            } else {
                resultadosContainer.innerText = 'Nenhuma raça encontrada com os critérios selecionados.';
            }
        }

        // Função para converter medidas
        function converterMedidas() {
            const valor = parseFloat(document.getElementById('valor-medida').value);
            const unidadeOrigem = document.getElementById('unidade-origem').value;
            const unidadeDestino = document.getElementById('unidade-destino').value;
            let resultado;

            // Fatores de conversão (exemplo: 1 xícara = 120 gramas)
            const fatores = {
                'xicara': { 'gramas': 120, 'quilogramas': 0.120 },
                'colher_sopa': { 'gramas': 15, 'quilogramas': 0.015 }
            };

            if (unidadeOrigem === unidadeDestino) {
                resultado = valor;
            } else if (fatores[unidadeOrigem] && fatores[unidadeOrigem][unidadeDestino]) {
                resultado = valor * fatores[unidadeOrigem][unidadeDestino];
            } else {
                resultado = 'Conversão não suportada.';
            }

            document.getElementById('resultado-conversao').innerText = `Resultado: ${resultado.toFixed(2)} ${unidadeDestino}`;
        }

        // Chama a função para exibir a galeria assim que a página carrega
        window.onload = function() {
            exibirGaleriaDeImagens(imagensCaes);
        };
    