/* =========================
   MENU MOBILE
========================= */

function toggleMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.toggle("show");

}


function closeMenu() {

    const menu = document.getElementById("mobileMenu");

    menu.classList.remove("show");

}


/* =========================
   BOTÃO "TENHO INTERESSE"
========================= */

function interest(productName) {

    const phone = "5500000000000";

    const message =
        `Olá! Vi o catálogo e tenho interesse no produto "${productName}". Gostaria de saber mais informações, disponibilidade e valores.`;

    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}
