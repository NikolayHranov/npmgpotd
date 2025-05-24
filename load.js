document.addEventListener("DOMContentLoaded", function () {
    const includeHTML = async (selector, file) => {
        const element = document.querySelector(selector);
        if (element) {
            const response = await fetch(file);
            const html = await response.text();
            element.innerHTML = html;
        }
    };

    includeHTML("#site-header", "header.html");
    includeHTML("#site-footer", "footer.html");

    document.body.style.visibility = 'visible';
});
