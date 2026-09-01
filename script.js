/* =========================================
   CONFIGURAÇÃO DO WHATSAPP
========================================= */

const WHATSAPP = "5519974185281";


/* =========================================
   PRODUTOS
========================================= */

/*
   IMPORTANTE:

   Quando tivermos as fotos reais, vamos
   substituir os campos "image" pelas imagens.

   Exemplo:

   image: "images/guardanapo-floral.jpg"

*/

const products = [

    {
        id: 1,
        name: "Guardanapo Floral",
        category: "Guardanapos",
        description:
            "Guardanapo de tecido com estampa floral delicada, perfeito para compor mesas especiais.",
        image: "",
        featured: true
    },

    {
        id: 2,
        name: "Guardanapo Xadrez",
        category: "Guardanapos",
        description:
            "Modelo clássico e delicado para deixar a mesa charmosa em qualquer ocasião.",
        image: "",
        featured: false
    },

    {
        id: 3,
        name: "Guardanapo Natural",
        category: "Guardanapos",
        description:
            "Uma opção neutra e elegante para diferentes estilos de mesa posta.",
        image: "",
        featured: false
    },

    {
        id: 4,
        name: "Jogo Americano Natural",
        category: "Jogos Americanos",
        description:
            "Peça versátil para compor uma mesa aconchegante e cheia de personalidade.",
        image: "",
        featured: true
    },

    {
        id: 5,
        name: "Jogo Americano Floral",
        category: "Jogos Americanos",
        description:
            "Estampa delicada para adicionar charme e personalidade à composição.",
        image: "",
        featured: false
    },

    {
        id: 6,
        name: "Toalha de Mesa",
        category: "Toalhas",
        description:
            "Peça artesanal para deixar sua mesa ainda mais bonita e acolhedora.",
        image: "",
        featured: false
    },

    {
        id: 7,
        name: "Kit Mesa Posta",
        category: "Kits",
        description:
            "Uma combinação especial de peças para criar uma mesa harmoniosa.",
        image: "",
        featured: true
    },

    {
        id: 8,
        name: "Kit Presente",
        category: "Kits",
        description:
            "Uma seleção delicada para transformar carinho em um presente especial.",
        image: "",
        featured: false
    }

];


/* =========================================
   SELEÇÃO
========================================= */

let selectedProducts = [];


/* =========================================
   CARREGAR PRODUTOS
========================================= */

function renderProducts(category = "Todos") {

    const container =
        document.getElementById("products");

    container.innerHTML = "";


    const filteredProducts =
        category === "Todos"

            ? products

            : products.filter(
                product =>
                    product.category === category
            );


    filteredProducts.forEach(product => {

        const isSelected =
            selectedProducts.includes(product.id);


        const card =
            document.createElement("article");

        card.className = "product-card";


        let imageHTML;


        if (product.image) {

            imageHTML = `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-photo"
                >
            `;

        } else {

            imageHTML = `
                <div class="image-placeholder">

                    <span>
                        Foto de ${product.name}
                    </span>

                </div>
            `;

        }


        card.innerHTML = `

            <div class="product-image">

                ${imageHTML}

                ${
                    product.featured

                        ? `<span class="product-tag">
                                Destaque
                           </span>`

                        : ""
                }

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>


                <button
                    class="interest-button ${isSelected ? "selected" : ""}"
                    onclick="toggleProduct(${product.id})"
                >

                    ${
                        isSelected

                            ? "✓ Selecionado"

                            : "Tenho interesse"
                    }

                    <span>→</span>

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================
   FILTROS
========================================= */

function filterProducts(category, button) {

    document
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    renderProducts(category);

}


/* =========================================
   ADICIONAR / REMOVER PRODUTO
========================================= */

function toggleProduct(id) {

    if (selectedProducts.includes(id)) {

        selectedProducts =
            selectedProducts.filter(
                productId => productId !== id
            );

    } else {

        selectedProducts.push(id);

    }


    updateSelectionCount();


    const activeCategory =
        document
            .querySelector(".category.active")
            ?.dataset.category || "Todos";


    renderProducts(activeCategory);

}


/* =========================================
   CONTADOR
========================================= */

function updateSelectionCount() {

    const count =
        selectedProducts.length;


    document
        .getElementById("selectionCount")
        .textContent = count;


    document
        .getElementById("mobileSelectionCount")
        .textContent = count;

}


/* =========================================
   ABRIR SELEÇÃO
========================================= */

function openSelection() {

    renderSelection();


    document
        .getElementById("selectionOverlay")
        .classList.add("show");


    document.body.classList.add("modal-open");

}


/* =========================================
   FECHAR SELEÇÃO
========================================= */

function closeSelection() {

    document
        .getElementById("selectionOverlay")
        .classList.remove("show");


    document.body.classList.remove("modal-open");

}


/* =========================================
   FECHAR CLICANDO FORA
========================================= */

function closeSelectionOutside(event) {

    if (
        event.target.id ===
        "selectionOverlay"
    ) {

        closeSelection();

    }

}


/* =========================================
   RENDERIZAR SELEÇÃO
========================================= */

function renderSelection() {

    const container =
        document.getElementById(
            "selectedProducts"
        );


    const empty =
        document.getElementById(
            "emptySelection"
        );


    const sendButton =
        document.getElementById(
            "sendSelection"
        );


    container.innerHTML = "";


    if (selectedProducts.length === 0) {

        empty.style.display = "block";

        sendButton.disabled = true;

        return;

    }


    empty.style.display = "none";

    sendButton.disabled = false;


    selectedProducts.forEach(id => {

        const product =
            products.find(
                item => item.id === id
            );


        if (!product) return;


        const item =
            document.createElement("div");


        item.className =
            "selected-item";


        item.innerHTML = `

            <span class="selected-item-name">
                ${product.name}
            </span>

            <button
                class="remove-item"
                onclick="toggleProduct(${product.id}); renderSelection();"
            >

                Remover

            </button>

        `;


        container.appendChild(item);

    });

}


/* =========================================
   ENVIAR SELEÇÃO PELO WHATSAPP
========================================= */

function sendSelection() {

    if (selectedProducts.length === 0) {

        return;

    }


    const selectedNames =
        selectedProducts.map(id => {

            const product =
                products.find(
                    item => item.id === id
                );

            return `• ${product.name}`;

        });


    const message =

        "Olá! Vi o catálogo do Ateliê Grazy Moraes e gostaria de saber mais sobre estas peças:%0A%0A"

        +

        selectedNames.join("%0A")

        +

        "%0A%0AGostaria de saber os valores e a disponibilidade. 🤎";


    const url =
        `https://wa.me/${WHATSAPP}?text=${message}`;


    window.open(url, "_blank");

}


/* =========================================
   MENU MOBILE
========================================= */

function toggleMenu() {

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    menu.classList.toggle("show");

}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderProducts();

        updateSelectionCount();

    }
);
