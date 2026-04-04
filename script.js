const products = [
    { id: 1, title: "Термос 'Золотой Рог'", price: 1250, img: "web7.jpg", story: "Стальной корпус и двойные стенки." },
    { id: 2, title: "Шоппер 'Владивосток'", price: 1100, img: "web8.jpg", story: "Натуральный хлопок повышенной прочности." },
    { id: 3, title: "Флешки 'Галька'", price: 850, img: "web9.jpg", story: "Корпус в виде обточенного морем камня." },
    { id: 4, title: "Подстаканник 'Приморье'", price: 2800, img: "web10.jpg", story: "Авторское литье из латуни." },
    { id: 5, title: "Пляжный коврик 'Песок'", price: 1950, img: "web11.jpg", story: "Быстросохнущий материал." },
    { id: 6, title: "Пляжный зонт 'Штиль'", price: 1000, img: "web12.jpg", story: "Надежная защита от солнца." },
    { id: 7, title: "Пляжная шляпа 'Лазурная'", price: 600, img: "web13.jpg", story: "Классическое плетение из соломки." },
    { id: 8, title: "Поднос 'Японское море'", price: 750, img: "web14.jpg", story: "Деревянная основа с росписью." },
    { id: 9, title: "Чехол для наушников ", price: 400, img: "web15.jpg", story: "Защитный кейс с тигром." },
    { id: 10, title: "Набор 'Пикник у моря'", price: 900, img: "web16.jpg", story: "Термос и сумка-холодильник." },
    { id: 11, title: "Набор юного океанолога", price: 1400, img: "web17.jpg", story: "Для изучения морской флоры." },
    { id: 12, title: "3D-пазл 'Собери маяк'", price: 1300, img: "web19.jpg", story: "Копия маяка Эгершельд." },
    { id: 13, title: "Набор для творчества", price: 700, img: "web20.jpg", story: "Приморская глина и ракушки." },
    { id: 14, title: "Карта-светильник Приморья", price: 350, img: "web21.jpg", story: "Мягкий свет и контуры края." },
    { id: 15, title: "Подвесной светильник 'Медуза'", price: 2100, img: "web22.jpg", story: "Дизайнерское освещение." },
    { id: 16, title: "Термос 'Капитан'", price: 950, img: "web23.jpg", story: "Матовое покрытие." },
    { id: 17, title: "Наклейки 'На память'", price: 500, img: "web24.jpg", story: "Виниловые стикеры." },
    { id: 18, title: "Сумка-холодильник 'Бриз'", price: 450, img: "web25.jpg", story: "Сохранит напитки прохладными." }
];

let cart = [];

function initProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/300x250'">
            <h3>${p.title}</h3>
            <p>${p.story}</p>
            <span class="product-price">${p.price}</span>
            <button class="btn-buy" data-id="${p.id}">В корзину</button>
        </div>
    `).join('');

    grid.querySelectorAll('.btn-buy').forEach(btn => {
        btn.onclick = () => addToCart(products.find(item => item.id == btn.dataset.id), btn);
    });
}

function addToCart(product, btn) {
    cart.push(product);
    document.getElementById('cart-count').innerText = cart.length;
    const oldText = btn.innerText;
    btn.innerText = 'Добавлено! ✓';
    btn.style.background = 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)';
    setTimeout(() => {
        btn.innerText = oldText;
        btn.style.background = '';
    }, 800);
}

function showCartModal() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('total-price');
    const modal = document.getElementById('cart-modal');
    let total = 0;

    list.innerHTML = cart.length === 0 ? "Корзина пуста" : cart.map((item, index) => {
        total += item.price;
        return `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;">
            <span>${item.title}</span>
            <span>${item.price} ₽ <span onclick="removeFromCart(${index})" style="color:red; cursor:pointer; margin-left:10px;">✕</span></span>
        </div>`;
    }).join('');
    
    totalEl.innerText = total;
    modal.style.display = 'block';
}

window.removeFromCart = (index) => { cart.splice(index, 1); document.getElementById('cart-count').innerText = cart.length; showCartModal(); };

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    document.getElementById('open-cart').onclick = showCartModal;
    document.getElementById('close-cart-btn').onclick = () => document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('send-tg-btn').onclick = () => {
        if (cart.length === 0) return alert("Корзина пуста!");
        const text = "Заказ:\n" + cart.map((it, i) => `${i+1}. ${it.title}`).join('\n') + `\nИтого: ${document.getElementById('total-price').innerText}₽`;
        window.open(`https://t.me/MR7LVD?text=${encodeURIComponent(text)}`, '_blank');
    };
});
