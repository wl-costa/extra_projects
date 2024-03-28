//Primeiro criei um array vazio que armazenará os produtos que serão cadastrados.
let products = [];

//[Função extra] - Criei uma variável para armazenar a ordem de ordenação atual.
let sortOrder = "crescente";

//Uma função que, ao ser chamada, insere o produto dentro do array produtos e logo em seguida chama a função que atualiza a lista.
function addProduct(product) {
    products.push(product);
    updateProductList();
}

//Uma função que, ao ser chamada, atualiza a lista de produtos.
function updateProductList() {
    const tbody = document.getElementById('productList').getElementsByTagName('tbody')[0];

    //Define o innerHTML do tbody como vazio para evitar duplicidade ( apanhei nessa :p )
    tbody.innerHTML = "";

    //[Função extra] - Agora os produtos são ordenados à partir do tipo de ordenação atual, baseado no valor da variável sortOrder.
    products.sort((a, b) => {
        if (sortOrder === "crescente") {
            return a.value - b.value
        } else {
            return b.value - a.value
        }
    });

    // O loop percorre o array products de forma ordenada,
    for (const product of products) {
        const newLine = tbody.insertRow();

        //Insere uma célula na linha para o nome,
        const cellName = newLine.insertCell(0);

        //Insere uma célula na linha para o valor,
        const cellValue = newLine.insertCell(1);

        //E finalmente preenche as duas celulas com o nome e valor do produto.
        cellName.textContent = product.name;
        cellValue.textContent = product.value;
    }
}

//[Função extra] - Adicionei uma função que checa se o número que está sendo inserido começa com zero , se for o caso ele retorna "false".
function validateNumber(value) {
    if (value.toString().startsWith("0")) {
        return false;
    }
    return true;
}

//Adicionei um eventListener ao formulário que executa uma arrow function.
document.getElementById('productForm').addEventListener('submit', (event) => {

    //Evita que o submit recarregue a página
    event.preventDefault();

    //Cada variável captura os valores digitados em cada campo do formulário.
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const value = document.getElementById('productValue').value;
    const available = document.getElementById('isAvailable').value;

    //[Função extra] - Se a função validateNumber retornar "false" uma mensagem de alerta é exbida
    if (!validateNumber(value)) {
        // Exibe uma mensagem de erro
        alert("Valor inválido. Insira um número inteiro sem zeros à esquerda.");
        return;
    }

    //Cria um novo objeto para armazenar os valores.
    const product = {
        name,
        description,
        value,
        available,
    };

    addProduct(product);

    //Agora os campos do formulário do formulário são limpos e voltam ao valor padrão
    document.getElementById('productForm').reset();

    //O formulário agora é ocultado através da alteração do estilo de display.
    document.getElementById('productForm').style.display = 'none';
});

//[Função extra] - Adiciona um eventListener onde ao clicar no botão "Ordenar por valor", ele altera o valor da variável sortOrder.
document.getElementById('sortButton').addEventListener('click', () => {
    if (sortOrder === "crescente") {
        sortOrder = "decrescente";
    } else {
        sortOrder = "crescente";
    }
    updateProductList();
});

//Adiciona um eventListener onde clicar no botão "Novo produto", o formulário é mostrado seguindo a mesma lógica anterior.
document.getElementById('newProduct').addEventListener('click', () => {
    document.getElementById('productForm').style.display = 'block';
});
