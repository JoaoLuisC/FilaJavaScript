 // Crie uma instância da fila
 let minhaFila = new Fila(10);

 // Função para adicionar um elemento à fila OK
 function adicionarElemento() {

    const novoNome = document.getElementById("txtNovoNome");
    const novoCpf = document.getElementById("txtNovoCpf");

    // Verificar se tem algo digitado e mostrar mensagem se necessário

    if(novoNome.value == "" || novoCpf.value == ""){//CONFERE SE TEM ALGO DIGITADO NO CAMPO 
        alert("Preencha todos os campos!");
    }else{
        const novoAtendimento= new Atendimento();   //INSTANCIANDO UM NOVO ELEMENTO ATENDIMENTO
        novoAtendimento.nome = novoNome.value;      
        novoAtendimento.cpf = novoCpf.value;        
        novoAtendimento.data = obterDataAtual();    
        novoAtendimento.hora = obterHoraAtual(); 

        if (minhaFila.enqueue(novoAtendimento)) {
            console.log(minhaFila.toString());
            alert(`${novoAtendimento.nome} entrou na fila às ${novoAtendimento.data}
            ${novoAtendimento.hora} \nSua posicao na fila é: ${minhaFila.itens.length}`);
            
            //SETANDO OS CAMPOS PARA VAZIO E DANDO FOCUS EM NOME
            //E MOSTRANDO A FILA

            novoNome.value = "";
            novoCpf.value = "";
            novoNome.focus();
            mostrarFila();
         }
         else{
            alert("Fila Cheia :(");
         }      

    }
 }
//--------------------------------------------------------------------------------------------
 // Função para remover o primeiro elemento da fila OK
 function realizarAtendimento() {

    if(minhaFila.isEmpty()){//CONFERE SE TEM ALGO DIGITADO NO CAMPO 
        alert("Fila Vazia");
    }else{
        const remove = minhaFila.dequeue();
        const tempoAtendimento = calcularDiferencaHoras(remove.hora, obterHoraAtual(),); //MOSTRA O TEMPO DE ESPERA
        alert(remove.nome + " foi atendido apos esperar por " + tempoAtendimento);      
        console.log(minhaFila.toString());
        mostrarFila();
    }


    // verificar se não está vazia antes de atender
    // mostrar dados da pessoa atendida utilizando a funcao mostrarMensagemRemocao
    
 }
 //--------------------------------------------------------------------------------
 //Função Para busca CPF OK
 function buscarCpf() {
    const cpf = document.getElementById("txtNovoCpf").value.trim(); // o trim retira os espaços em branco
    let atendimento = new Atendimento(); // vamos pesquisar só por CPF

    // Deve retornar a posição na fila e caso não seja encontrado avisar, crie um contador de posicões

    let i = 0;

    for (let item of minhaFila.itens) { // VER TODOS OS ELEMENTOS DA FILA
        atendimento.cpf = cpf;
        i++;
        if (item.equals(atendimento)) {   // VERIFICAR CADA ELEMENTO DA FILA COM EQUALS
            alert("Achou! Posição: " + i);
            return;
        }
    }
    alert("CPF não encontrado!"); // CASO NÃO ENCONTRAR
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
    const lblMensagemRemocao = document.getElementById("lblMensagemRemocao");
    lblMensagemRemocao.innerHTML ="Próximo a ser atendido(a): "+ pessoaAtendida.nome;
    lblMensagemRemocao.style.display = "block";
}
//--------------------------------------------------------------------------------------------
 // Função para mostrar a  fila
 function mostrarFila() {

    const filaElemento = document.getElementById("listPessoasFila");
    filaElemento.textContent = minhaFila.toString();      //CONVERTE EM STRING
    filaElemento.innerHTML = "";
 
    let i = 0;
 
    for (let item of minhaFila.itens) {
       i++;
       const itemElement = document.createElement("ul");
       itemElement.innerText = item.toString();
       filaElemento.appendChild(itemElement);
    }
 
    if (i == 0) {
       pessoasFila.innerHTML = "Fila Vazia!"
    } else
       pessoasFila.innerHTML = "";
 
 
    if (minhaFila.itens[0] != null)
       mostrarMensagemRemocao(minhaFila.itens[0]);
    else {
       lblMensagemRemocao.innerHTML = "Próximo a ser atendido(a): Fila Vazia!";
       lblMensagemRemocao.style.display = "block";
    }

}
//--------------------------------------------------------------------------------------------
 // funcao data
 function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
    let ano = dataAtual.getFullYear();
    // Formata a data como "dd/mm/aaaa"
    let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
    return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);
  
  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
  
  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;
  
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
