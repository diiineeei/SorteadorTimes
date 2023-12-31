var jsonDataTextArea = [];
var jsonData = [
    {
        "nome": "Rodinei",
        "imagem": "SorteadorTimes/imagens/rodinei.png"
    },
    {
        "nome": "David",
        "imagem": "SorteadorTimes/imagens/david.png"
    },
    {
        "nome": "Danilo",
        "imagem": "SorteadorTimes/imagens/danilo.png"
    },
    {
        "nome": "Kelvin",
        "imagem": "SorteadorTimes/imagens/kelvin.png"
    },
    {
        "nome": "Richard",
        "imagem": "SorteadorTimes/imagens/richard.png"
    },
    {
        "nome": "Robson",
        "imagem": "SorteadorTimes/imagens/robson.png"
    },
    {
        "nome": "Roger",
        "imagem": "SorteadorTimes/imagens/roger.png"
    },
    {
        "nome": "Aluisio",
        "imagem": "SorteadorTimes/imagens/aluisio.png"
    },
    {
        "nome": "Anderson",
        "imagem": "SorteadorTimes/imagens/anderson.png"
    },
    {
        "nome": "Gustavo",
        "imagem": "SorteadorTimes/imagens/gustavo.png"
    },
    {
        "nome": "Leo",
        "imagem": "SorteadorTimes/imagens/leo.png"
    },
    {
        "nome": "Rui Lincoln",
        "imagem": "SorteadorTimes/imagens/ruiLincoln.png"
    },
    {
        "nome": "Naldo",
        "imagem": "SorteadorTimes/imagens/naldo.png"
    },
    {
        "nome": "Matheus Edu",
        "imagem": "SorteadorTimes/imagens/matheusedu.png"
    },
    {
        "nome": "Joao Carlos",
        "imagem": "SorteadorTimes/imagens/joaocarlos.png"
    },
    {
        "nome": "Victor Marques",
        "imagem": "SorteadorTimes/imagens/default.png"
    },
    {
        "nome": "Victor Fontebasso",
        "imagem": "SorteadorTimes/imagens/default.png"
    },
    {
        "nome": "Caio",
        "imagem": "SorteadorTimes/imagens/caio.png"
    },
    {
        "nome": "Igor",
        "imagem": "SorteadorTimes/imagens/default.png"
    },
    {
        "nome": "Andrezinho",
        "imagem": "SorteadorTimes/imagens/andrezinho.png"
    }
];

function criaChecks(){
    const selectPlayers = document.getElementById('selectPlayers');
    let rowDiv;

    for (let i = 0; i < jsonData.length; i++) {
        if (rowDiv) {
            selectPlayers.appendChild(rowDiv);
        }
        rowDiv = document.createElement('div');
        rowDiv.className = 'form-check form-check-inline';

        const timePlayer = document.createElement('input');
        timePlayer.className = 'form-check-input';
        timePlayer.type = 'checkbox';
        timePlayer.value = jsonData[i].nome;
        timePlayer.id = 'checkboxPlayer' + i;

        const timePlayerName = document.createElement('label');
        timePlayerName.className = 'form-check-label text-white';
        timePlayerName.for = 'defaultCheck' + i;
        timePlayerName.type = 'checkbox';
        timePlayerName.textContent = jsonData[i].nome;
        timePlayerName.addEventListener('click', function() {
            timePlayer.checked = !timePlayer.checked;
        });

        const image = document.createElement('img');
        image.src = jsonData[i].imagem;
        image.alt = jsonData[i].nome + "'s Image";
        image.className = 'card-img-top';
        image.style.width = '30px';
        image.style.height = '30px';
        image.style.marginTop = '10px';
        image.style.marginBottom = '10px';
        image.style.marginRight = '10px';
        image.addEventListener('click', function() {
            timePlayer.checked = !timePlayer.checked;
        });

        rowDiv.appendChild(timePlayer);
        rowDiv.appendChild(image);
        rowDiv.appendChild(timePlayerName);
    }
}
criaChecks()

function removeDuplicates(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i].toLowerCase()) === -1) {
            uniqueArray.push(array[i].toLowerCase());
        }
    }

    return uniqueArray;
}

function jogadoresTextArea() {
    var checkboxes = document.querySelectorAll('input[type=checkbox]');

    const listaJogadores = document.getElementById('listaJogadores').value;
    var nomes = listaJogadores.trim().split('\n');

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            nomes.push(checkbox.value.toLowerCase());
        }
    });

    nomes = removeDuplicates(nomes);

    jsonDataTextArea = [];

    for (const nome of nomes) {
        if (nome === ''){
            continue
        }
        const jogador = jsonData.find(player => player.nome.toLowerCase() === nome.toLowerCase());
        if (jogador) {
            jsonDataTextArea.push({
                nome: nome,
                imagem: jogador.imagem
            });

        } else {
            jsonDataTextArea.push({
                nome: nome,
                imagem: 'SorteadorTimes/imagens/default.png'
            });
        }


    }
    sortearTimes(jsonDataTextArea);
}

function sortearOrdemAleatoria(array) {
    const newArray = array.slice(); // Clonar o array para não alterar o original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function recriarDiv() {
    const novaDiv = document.createElement('div');
    novaDiv.className = 'row';
    novaDiv.id = 'teamsContainer';

    // Aqui você pode adicionar os novos elementos à novaDiv
    for (let i = 0; i < jsonData.length; i++) {
        const member = jsonData[i];
        const memberCard = document.createElement('div');
        // ... (criar elementos internos, como imagem e nome)
        novaDiv.appendChild(memberCard);
    }

    // Substituir a div antiga pela nova
    teamsContainer.parentNode.replaceChild(novaDiv, teamsContainer);
}

function sortearTimesAgora(jsonPlayers) {
    sortearTimes(jsonData)
}

function sortearTimes(jsonPlayers) {
    recriarDiv();

    const ordemAleatoria = sortearOrdemAleatoria(jsonPlayers);

    const teamsContainer = document.getElementById('teamsContainer');

    let rowDiv;
    for (let i = 0; i < ordemAleatoria.length; i++) {
        if (i % 5 === 0) {
            if (rowDiv) {
                teamsContainer.appendChild(rowDiv);
            }

            rowDiv = document.createElement('div');
            rowDiv.className = 'row mb-4 col-md-12 center-images transparent';

            const timeNumber = document.createElement('div');
            timeNumber.className = 'col-md-12 text-center mt-2 h4 text-white font-weight-bold';
            timeNumber.textContent = 'Time ' + (i / 5 + 1);

            rowDiv.appendChild(timeNumber);
        }

        const member = ordemAleatoria[i];

        const memberCard = document.createElement('div');
        memberCard.className = 'col-md-2';

        const card = document.createElement('div');
        card.className = 'd-flex justify-content-center align-items-center card text-center transparent';

        const image = document.createElement('img');
        image.src = member.imagem;
        image.alt = member.nome + "'s Image";
        image.className = 'card-img-top';
        image.style.width = '100px';
        image.style.height = '100px';
        image.style.marginTop = '10px';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const name = document.createElement('h5');
        name.className = 'card-title text-white font-weight-bold';
        name.textContent = member.nome;

        cardBody.appendChild(name);
        card.appendChild(image);
        card.appendChild(cardBody);
        memberCard.appendChild(card);

        rowDiv.appendChild(memberCard);

        if (i === ordemAleatoria.length - 1) {
            teamsContainer.appendChild(rowDiv);
        }
    }
}