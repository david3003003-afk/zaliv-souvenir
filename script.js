const products = [
    { id: 1, title: "Термос 'Золотой Рог'", price: 1250, img: "web7.jpg", story: "Стальной корпус и двойные стенки. Сохранит чай горячим даже во время зимней прогулки по мосту." },
    { id: 2, title: "Шоппер 'Владивосток'", price: 1100, img: "web8.jpg", story: "Натуральный хлопок повышенной прочности." },
    { id: 3, title: "Флешки 'Галька'", price: 850, img: "web9.jpg", story: "Корпус в виде обточенного морем камня. Надежное хранение ваших цифровых воспоминаний." },
    { id: 4, title: "Подстаканник 'Приморье'", price: 2800, img: "web10.jpg", story: "Авторское литье из латуни. Традиционный элемент путешествий в современном исполнении." },
    { id: 5, title: "Пляжный коврик 'Песок'", price: 1950, img: "web11.jpg", story: "Быстросохнущий материал с текстурой, вдохновленной пляжами острова Русский." },
    { id: 6, title: "Пляжный зонт 'Штиль'", price: 1000, img: "web12.jpg", story: "Надежная защита от солнца с усиленным каркасом для противостояния морскому бризу." },
    { id: 7, title: "Пляжная шляпа 'Лазурная'", price: 600, img: "web13.jpg", story: "Классическое плетение из натуральной соломки. Легкость и защита в самый жаркий полдень." },
    { id: 8, title: "Поднос 'Японское море'", price: 750, img: "web14.jpg", story: "Деревянная основа с росписью, напоминающей лазурные волны приморских бухт." },
    { id: 9, title: "Чехол для наушников ", price: 400, img: "web15.jpg", story: "Защитный кейс из плотного силикона с изображением амурского тигра." },
    { id: 10, title: "Набор 'Пикник у моря'", price: 900, img: "web16.jpg", story: "Термос и компактная сумка-холодильник. Всё, что нужно для завтрака на берегу." },
    { id: 11, title: "Набор юного океанолога", price: 1400, img: "web17.jpg", story: "Познавательный комплект для изучения морской флоры и фауны залива Петра Великого." },
    { id: 12, title: "3D-пазл 'Собери маяк'", price: 1300, img: "web19.jpg", story: "Миниатюрная копия маяка Эгершельд. Детализированная модель из дерева." },
    { id: 13, title: "Набор для творчества", price: 700, img: "web20.jpg", story: "Создайте свой уникальный сувенир из настоящей приморской глины и ракушек." },
    { id: 14, title: "Карта-светильник Приморья", price: 350, img: "web21.jpg", story: "Мягкий свет и контуры любимого края. Уютный акцент для вашего интерьера." },
    { id: 15, title: "Подвесной светильник 'Медуза'", price: 2100, img: "web22.jpg", story: "Дизайнерское освещение, вдохновленное прозрачными обитателями прибрежных вод." },
    { id: 16, title: "Термос 'Капитан'", price: 950, img: "web23.jpg", story: "Компактная модель с матовым покрытием, которое не скользит в мокрых руках." },
    { id: 17, title: "Наклейки 'На память'", price: 500, img: "web24.jpg", story: "Виниловые стикеры, которые не боятся воды. Украсьте свой ноутбук или авто." },
    { id: 18, title: "Сумка-холодильник 'Бриз'", price: 450, img: "web25.jpg", story: "Сохранит напитки прохладными в течение долгого дня на пляже." }
];
let cart = [];

function initProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <div class="product-img">
                <img src="${p.img}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/300x250?text=Проверьте+путь+к+фото'">
            </div>
            <h3>${p.title}</h3>
            <p class="product-story">${p.story}</p>
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
    btn.innerText = 'В корзине! ✓';
    btn.style.background = '#28a745';
    setTimeout(() => {
        btn.innerText = 'В корзину';
        btn.style.background = '#ee9b00';
    }, 1000);
}

function showCartModal() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('total-price');
    const modal = document.getElementById('cart-modal');
    let total = 0;

    list.innerHTML = cart.length === 0 ? "Корзина пуста" : cart.map((item, index) => {
        total += item.price;
        return `
            <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #eee;">
                <span>${item.title}</span>
                <span>${item.price} ₽ <span onclick="removeFromCart(${index})" style="color:red; cursor:pointer; margin-left:10px;">✕</span></span>
            </div>`;
    }).join('');
    
    totalEl.innerText = total;
    modal.style.display = 'block';
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    document.getElementById('cart-count').innerText = cart.length;
    showCartModal(); 
};

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    document.getElementById('open-cart').onclick = showCartModal;
    document.getElementById('close-cart-btn').onclick = () => { 
        document.getElementById('cart-modal').style.display = 'none'; 
    };
    document.getElementById('send-tg-btn').onclick = () => {
        if (cart.length === 0) return alert("Корзина пуста!");
        const text = "Заказ из каталога «Залив»:\n" + cart.map((it, i) => `${i+1}. ${it.title}`).join('\n') + `\nИтого: ${document.getElementById('total-price').innerText}₽`;
        window.open(`https://t.me/MR7LVD?text=${encodeURIComponent(text)}`, '_blank');
    };
});
