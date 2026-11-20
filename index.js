 function scrollBooks(rowId, direction) {
            const row = document.getElementById(rowId);
            if (row) row.scrollBy({ left: direction * 360, behavior: "smooth" });
        }