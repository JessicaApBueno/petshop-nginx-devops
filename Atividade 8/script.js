 
        const imagensCaes = [
            './imagens/Bobtail.webp',
            './imagens/Braco%20Hungaro.webp',
            './imagens/Cairn%20Terrier.webp',
            './imagens/akita%20japon%C3%AAs.webp',
            './imagens/beagle.webp',
            './imagens/bearded%20collie.webp',
               
        ];

        const todasAsRacas = [
            { nome: 'Golden Retriever', tamanho: 'Médio-Grande', temperamento: 'Amigável, Inteligente, Gentil', nivelAtividade: 'Alta', historia: 'Originário da Escócia, o Golden Retriever foi desenvolvido para caçar aves aquáticas. É um cão de família popular, conhecido por sua natureza amigável e temperamento dócil.', caracteristicas: 'Pelo longo dourado, porte elegante, natureza paciente e amorosa.' },
            { nome: 'Labrador Retriever', tamanho: 'Médio-Grande', temperamento: 'Extrovertido, Amigável, Ativo', nivelAtividade: 'Alta', historia: 'Apesar do nome, a raça se originou em Newfoundland, Canadá. Foi usado por pescadores para ajudar a puxar redes. É um cão de família popular devido à sua inteligência e natureza brincalhona.', caracteristicas: 'Pelo curto e denso, cores preta, amarela ou chocolate, comportamento extrovertido e leal.' },
            { nome: 'Poodle', tamanho: 'Pequeno', temperamento: 'Inteligente, Orgulhoso, Ativo', nivelAtividade: 'Média', historia: 'O Poodle se originou na Alemanha como um cão de caça à água. É conhecido por sua inteligência e facilidade de treinamento. Vem em três tamanhos: Toy, Miniatura e Standard.', caracteristicas: 'Pelo encaracolado, quase hipoalergênico, muito inteligente e fácil de adestrar.' },
            { nome: 'Bulldog Francês', tamanho: 'Pequeno', temperamento: 'Afetuoso, Alerta, Paciente', nivelAtividade: 'Baixa', historia: 'Criado na França no século XIX, era o companheiro de rendeiros de renda. A raça se tornou popular entre artistas e a elite parisiense. É um cão de companhia ideal.', caracteristicas: 'Orelhas de morcego, corpo compacto, expressão facial amigável.' },
            { nome: 'Pastor Alemão', tamanho: 'Grande', temperamento: 'Corajoso, Inteligente, Fiel', nivelAtividade: 'Alta', historia: 'Originário da Alemanha no final do século XIX, foi criado para pastorear ovelhas. Atualmente é um cão de serviço muito usado pela polícia e forças armadas devido à sua inteligência e lealdade.', caracteristicas: 'Corpo atlético, porte imponente, alta capacidade de trabalho e proteção.' },
            { nome: 'Beagle', tamanho: 'Pequeno-Médio', temperamento: 'Amigável, Curioso, Determinado', nivelAtividade: 'Média', historia: 'Uma raça de caça, o Beagle é conhecido por seu olfato apurado. É um cão de companhia alegre e tolerante, que se dá bem com crianças.', caracteristicas: 'Orelhas longas e caídas, latido característico, natureza brincalhona.' },
            { nome: 'Dachshund', tamanho: 'Pequeno', temperamento: 'Teimoso, Brincalhão, Inteligente', nivelAtividade: 'Baixa', historia: 'Originário da Alemanha, o Dachshund foi criado para caçar texugos e outros animais que vivem em tocas. Sua forma alongada é ideal para essa tarefa. É um cão corajoso e teimoso.', caracteristicas: 'Corpo longo e baixo, temperamento ousado, brincalhão e enérgico.' },
            { nome: 'Shih Tzu', tamanho: 'Pequeno', temperamento: 'Amigável, Companheiro, Calmo', nivelAtividade: 'Baixa', historia: 'Uma raça de cão palaciano da China, o Shih Tzu era o cão de companhia de imperadores. É um cão de colo por excelência, conhecido por sua natureza afetuosa e calma.', caracteristicas: 'Pelo longo e luxuoso, rosto de crisântemo, personalidade adorável.' },
            { nome: 'Rottweiler', tamanho: 'Grande', temperamento: 'Corajoso, Confiante, Calmo', nivelAtividade: 'Média', historia: 'Originário da Alemanha, o Rottweiler foi um cão de gado e cão de guarda. É conhecido por sua força e instinto protetor. Requer treinamento e socialização consistentes.', caracteristicas: 'Forte e musculoso, pelagem preta com marcações castanhas, leal e confiante.' }
        ];

        function exibirGaleriaDeImagens(imagens) {
        const galeriaContainer = document.getElementById('galeria-caes');
        if (!galeriaContainer) return;
        galeriaContainer.innerHTML = '';

        imagens.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Imagem de um cão';
        img.classList.add('gallery-image');
        galeriaContainer.appendChild(img);
            });
        }
        exibirGaleriaDeImagens(imagensCaes);
       

        
        function exibirInfoRaca(nomeRaca) {
            const raca = todasAsRacas.find(r => r.nome === nomeRaca);
            const infoBox = document.getElementById('raca-info-box');
            if (raca && infoBox) {
                infoBox.innerHTML = `
                    <h4>${raca.nome}</h4>
                    <p><strong>História:</strong> ${raca.historia}</p>
                    <p><strong>Características:</strong> ${raca.caracteristicas}</p>
                `;
                infoBox.style.display = 'block';
            }
        }

       
        function pesquisarRacas() {
            const tamanho = document.getElementById('tamanho-raca').value;
            const temperamento = document.getElementById('temperamento-raca').value.toLowerCase().trim();
            const atividade = document.getElementById('atividade-raca').value;
            const resultadosContainer = document.getElementById('resultados-pesquisa');
            
       
            const resultados = todasAsRacas.filter(raca => {
                const correspondeTamanho = !tamanho || raca.tamanho.includes(tamanho);
                const correspondeAtividade = !atividade || raca.nivelAtividade.includes(atividade);
                const correspondeTemperamento = !temperamento || raca.temperamento.toLowerCase().includes(temperamento);
                
                return correspondeTamanho && correspondeAtividade && correspondeTemperamento;
            });

           
            if (resultadosContainer) {
                resultadosContainer.innerHTML = '';
            }
            
            if (resultados.length > 0) {
                resultados.forEach(raca => {
                    const card = document.createElement('div');
                    card.classList.add('raca-card-resultado'); 
                    card.innerHTML = `
                        <h4>${raca.nome}</h4>
                        <p><strong>Tamanho:</strong> ${raca.tamanho}</p>
                        <p><strong>Temperamento:</strong> ${raca.temperamento}</p>
                        <p><strong>Nível de Atividade:</strong> ${raca.nivelAtividade}</p>
                    `;
                    resultadosContainer.appendChild(card);
                });
            } else {
                resultadosContainer.innerHTML = '<p>Nenhuma raça encontrada com os critérios selecionados.</p>';
            }
        }

       
        function converterMedidas() {
            const valor = parseFloat(document.getElementById('valor-medida').value);
            const unidadeOrigem = document.getElementById('unidade-origem').value;
            const unidadeDestino = document.getElementById('unidade-destino').value;
            let resultado;

            const fatores = {
                'xicara': { 'gramas': 120, 'quilogramas': 0.120 },
                'colher_sopa': { 'gramas': 15, 'quilogramas': 0.015 }
            };
            
            const resultadoConversaoElement = document.getElementById('resultado-conversao');
            if (isNaN(valor)) {
                resultadoConversaoElement.innerText = 'Por favor, insira um valor numérico válido.';
                return;
            }

            if (unidadeOrigem === unidadeDestino) {
                resultado = valor;
            } else if (fatores[unidadeOrigem] && fatores[unidadeOrigem][unidadeDestino]) {
                resultado = valor * fatores[unidadeOrigem][unidadeDestino];
            } else {
                resultado = 'Conversão não suportada.';
            }

            if (typeof resultado === 'number') {
                resultadoConversaoElement.innerText = `Resultado: ${resultado.toFixed(2)} ${unidadeDestino}`;
            } else {
                resultadoConversaoElement.innerText = resultado;
            }
        }
        
        
        document.addEventListener('DOMContentLoaded', function() {
            exibirGaleriaDeImagens(imagensCaes);
        });