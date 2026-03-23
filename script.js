const products = [
    { id: 1, title: "Сумка 'Морской узел'", price: 1200, img: "Web1.jpg" },
    { id: 2, title: "Чехол 'Морской узел'", price: 800, img: "Web2.jpg" },
    { id: 3, title: "Футболка 'Морской узел'", price: 900, img: "Web4.jpg" },
    { id: 4, title: "Кепка 'Морской узел'", price: 750, img: "cap.jpg" }
];
let cart = [];

// Функция отрисовки товаров
function initProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img">
                <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/300x250?text=Нет+фото'">
            </div>
            <h3>${p.title}</h3>
            <p class="price">${p.price} ₽</p>
            <button class="buy-btn" data-id="${p.id}">В корзину</button>
        </div>
    `).join('');

    grid.querySelectorAll('.buy-btn').forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id');
            const product = products.find(item => item.id == id);
            addToCart(product, btn);
        };
    });
}

function addToCart(product, btn) {
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    
    const originalText = btn.innerText;
    btn.innerText = 'Добавлено! ✅';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '#ee9b00';
    }, 800);
}

// Глобальная функция удаления для вызова из HTML модалки
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    // Обновляем список в открытой модалке
    showCartModal(); 
};

function showCartModal() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('total-price');
    const modal = document.getElementById('cart-modal');
    let total = 0;

    list.innerHTML = cart.length === 0 ? "Корзина пуста" : cart.map((item, index) => {
        total += item.price;
        return `
            <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;">
                <span>${item.title} — ${item.price} ₽</span>
                <span onclick="removeFromCart(${index})" style="color:red; cursor:pointer; font-weight:bold; padding:0 10px;">✕</span>
            </div>`;
    }).join('');
    
    totalEl.innerText = total;
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    initProducts();

    const openBtn = document.getElementById('open-cart');
    const closeBtn = document.getElementById('close-cart-btn');
    const sendBtn = document.getElementById('send-tg-btn');
    const modal = document.getElementById('cart-modal');

    if (openBtn) openBtn.onclick = showCartModal;
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };
    
    if (sendBtn) {
        sendBtn.onclick = () => {
            if (cart.length === 0) return alert("Корзина пуста!");
            const text = "Новый заказ:\n" + cart.map((it, i) => `${i+1}. ${it.title} - ${it.price}₽`).join('\n') + `\n\nИтого: ${document.getElementById('total-price').innerText}₽`;
            window.open(`https://t.me/MR7LVD?text=${encodeURIComponent(text)}`, '_blank');
        };
    }

    // Закрытие по клику вне модалки
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };
});
