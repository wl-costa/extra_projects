//Primeiro criei um array vazio que armazenará os produtos que serão cadastrados.
let products = [];

//Uma função que, ao ser chamada, insere o produto dentro do array produtos e logo em seguida chama a função que atualiza a lista.
function addProduct(product) {
    products.push(product);
    updateProductList();
}

//Uma função que, ao ser chamada, atualiza a lista de produtos inserindo-as na tabela.
function updateProductList() {
    const tbody = document.getElementById('productList').getElementsByTagName('tbody')[0];

    //Define o innerHTML do tbody como vazio para evitar duplicidade ( apanhei nessa :p )
    tbody.innerHTML = "";

    //Agora os produtos são ordenados à partir de seus valores de maneira decrescente.
    products.sort((a, b) => a.value - b.value);

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

//Adicionei um eventListener ao formulário que executa uma arrow function.
document.getElementById('productForm').addEventListener('submit', (event) => {
    
    //Evita que o submit recarregue a página
    event.preventDefault();

    //Cada variável captura os valores digitados em cada campo do formulário.
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const value = document.getElementById('productValue').value;
    const available = document.getElementById('isAvailable').value;

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

//Adiciona um eventListener onde clicar no botão "Novo produto", o formulário é mostrado seguindo a mesma lógica anterior.
document.getElementById('newProduct').addEventListener('click', () => {
    document.getElementById('productForm').style.display = 'block';
});
