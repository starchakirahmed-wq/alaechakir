const packages = [
    { name: "الباقة الاقتصادية", price: 180, imgRed: "images/package1-red.webp", imgPink: "images/package1-pink.webp", imgYellow: "images/package1-yellow.webp" },
    { name: "الباقة العائلية", price: 250, imgRed: "images/package2-red.webp", imgPink: "images/package2-pink.webp", imgYellow: "images/package2-yellow.webp" },
    { name: "الباقة الكبيرة", price: 450, imgRed: "images/package3-red.webp", imgPink: "images/package3-pink.webp", imgYellow: "images/package3-yellow.webp" }
];

const extras = [
    { title: "فرش بيكينيك", mainImg: "images/brushes-pink.webp", thumbs: ["images/brushes-pink.webp","images/brushes-yellow.webp","images/brushes-red.webp"], id: "brushes" },
    { title: "مخدات بيكينيك", mainImg: "images/pillows-pink.webp", thumbs: ["images/pillows-pink.webp","images/pillows-red.webp","images/pillows-yellow.webp"], id: "pillows" },
    { title: "قفف بيكينيك", mainImg: "images/basket.webp", thumbs: [], id: "basket" }
];

function renderPackages() {
    const container = document.getElementById("packages-container");
    if(!container) return;
    container.innerHTML = packages.map((pkg, idx) => `
        <div class="card">
            <div class="card-img-container">
                <img id="pkg${idx+1}-img" src="${pkg.imgRed}" alt="${pkg.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h3>${pkg.name}</h3>
                <div class="price-tag">${pkg.price} درهم</div>
                <div class="color-selector">
                    <div class="dot red" data-pkg="${idx}" data-color="red"></div>
                    <div class="dot pink" data-pkg="${idx}" data-color="pink"></div>
                    <div class="dot yellow" data-pkg="${idx}" data-color="yellow"></div>
                </div>
                <button class="btn-order" data-pkg-name="${pkg.name}" data-pkg-idx="${idx}">طلب عبر واتساب <i class="fab fa-whatsapp"></i></button>
            </div>
        </div>
    `).join('');
    attachPackageEvents();
}

function attachPackageEvents() {
    document.querySelectorAll('.color-selector .dot').forEach(dot => {
        dot.removeEventListener('click', colorHandler);
        dot.addEventListener('click', colorHandler);
    });
    document.querySelectorAll('.btn-order').forEach(btn => {
        btn.removeEventListener('click', orderHandler);
        btn.addEventListener('click', orderHandler);
    });
}

function colorHandler(e) {
    const dot = e.currentTarget;
    const pkgIdx = dot.dataset.pkg;
    const color = dot.dataset.color;
    let imgSrc = "";
    const pkg = packages[pkgIdx];
    if(color === "red") imgSrc = pkg.imgRed;
    else if(color === "pink") imgSrc = pkg.imgPink;
    else imgSrc = pkg.imgYellow;
    const imgElem = document.getElementById(`pkg${parseInt(pkgIdx)+1}-img`);
    if(imgElem) imgElem.src = imgSrc;
}

function orderHandler(e) {
    const btn = e.currentTarget;
    const pkgName = btn.dataset.pkgName;
    const pkgIdx = btn.dataset.pkgIdx;
    const colorActive = document.querySelector(`.card:has(button[data-pkg-idx='${pkgIdx}']) .color-selector .dot.active`);
    let colorText = "";
    if(colorActive) colorText = colorActive.classList.contains('red')?"أحمر":colorActive.classList.contains('pink')?"وردي":"أصفر";
    const msg = `السلام عليكم، أريد طلب ${pkgName}${colorText ? " باللون "+colorText : ""}`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, '_blank');
}

function renderExtras() {
    const container = document.getElementById("extras-container");
    if(!container) return;
    container.innerHTML = extras.map(extra => `
        <div class="extras-gallery-card">
            <img id="${extra.id}-main" class="zoomable-image extras-main-image" src="${extra.mainImg}" alt="${extra.title}" loading="lazy">
            ${extra.thumbs.length ? `<div class="extras-thumbs">${extra.thumbs.map((thumb, i) => `<img class="extras-thumb" src="${thumb}" alt="thumb ${i}" data-target-main="${extra.id}-main">`).join('')}</div>` : ''}
            <div class="card-body"><h4>${extra.title}</h4></div>
        </div>
    `).join('');
    attachExtrasEvents();
}

function attachExtrasEvents() {
    document.querySelectorAll('.extras-thumb').forEach(thumb => {
        thumb.removeEventListener('click', thumbHandler);
        thumb.addEventListener('click', thumbHandler);
    });
}

function thumbHandler(e) {
    const thumb = e.currentTarget;
    const targetId = thumb.dataset.targetMain;
    const mainImg = document.getElementById(targetId);
    if(mainImg) mainImg.src = thumb.src;
}

function setActiveWaLinks() {
    const waFooter = document.getElementById('wa-footer');
    const waMobile = document.getElementById('wa-mobile');
    const baseMsg = "السلام عليكم، أريد الاستفسار عن البيكينيك";
    const waUrl = `https://wa.me/212600000000?text=${encodeURIComponent(baseMsg)}`;
    if(waFooter) waFooter.href = waUrl;
    if(waMobile) waMobile.href = waUrl;
}

document.addEventListener('DOMContentLoaded', () => {
    renderPackages();
    renderExtras();
    setActiveWaLinks();
});