
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".pattu.allsarees img");
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const modalRating = document.getElementById("modal-rating");
    const closeModal = document.querySelector(".close");

    images.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImage.src = img.src;
            modalTitle.textContent = img.dataset.title;
            modalDescription.textContent = img.dataset.description;
            modalPrice.textContent = img.dataset.price;
            modalRating.textContent = img.dataset.rating;
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
