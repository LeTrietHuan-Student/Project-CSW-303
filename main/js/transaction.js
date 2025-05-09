function initTransactionDetails() {
    const transactionRows = document.querySelectorAll('.transaction-row');
    const rowDetailMap = new Map(); // Lưu trữ detailRow cho mỗi transaction-row

    // Thêm sự kiện click cho từng hàng giao dịch
    transactionRows.forEach(row => {
        rowDetailMap.set(row, null); // Khởi tạo detailRow là null cho mỗi row

        row.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngăn sự kiện click lan truyền lên document

            // Lấy detailRow từ Map
            let detailRow = rowDetailMap.get(row);

            // Nếu detail row đã mở, đóng nó
            if (detailRow) {
                detailRow.remove();
                rowDetailMap.set(row, null); // Cập nhật Map
                return;
            }

            // Tạo hàng chi tiết mới
            const cells = row.getElementsByTagName('td');
            if (cells.length < 4) return;

            const category = cells[0].childNodes[1] ? cells[0].childNodes[1].textContent.trim() : cells[0].textContent.trim();
            const method = cells[1].textContent.trim();
            const amount = cells[2].textContent.trim();
            const date = cells[3].textContent.trim();

            const table = document.getElementById('transactions-table');
            const newRow = table.insertRow(row.rowIndex + 1);
            newRow.classList.add('detail-row');
            const cell = newRow.insertCell(0);
            cell.colSpan = 4;

            const isChecked = row.classList.contains('checked-row');
            const buttonText = isChecked ? 'UNCHECKED' : 'CHECKED';

            cell.innerHTML = `
                <div class="detail-content">
                    <p><strong>Category:</strong> ${category}</p>
                    <p><strong>Payment Method:</strong> ${method}</p>
                    <p><strong>Amount:</strong> ${amount}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <button class="check-button">${buttonText}</button>
                </div>
            `;

            rowDetailMap.set(row, newRow); // Lưu detail row vào Map

            // Thêm sự kiện cho nút CHECKED/UNCHECKED
            const checkButton = cell.querySelector('.check-button');
            checkButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Ngăn sự kiện click lan truyền
                if (row.classList.contains('checked-row')) {
                    row.classList.remove('checked-row');
                    checkButton.textContent = 'CHECKED';
                } else {
                    row.classList.add('checked-row');
                    checkButton.textContent = 'UNCHECKED';
                }
            });
        });
    });

    // Thêm sự kiện click trên document để đóng tất cả detail rows khi nhấp ra ngoài
    document.addEventListener('click', (event) => {
        // Không đóng nếu click vào .detail-row
        if (event.target.closest('.detail-row')) {
            return;
        }

        // Đóng tất cả detail rows nếu click ngoài transaction-row và detail-row
        if (!event.target.closest('.transaction-row')) {
            rowDetailMap.forEach((detailRow, row) => {
                if (detailRow) {
                    detailRow.remove(); // Đóng detail row như khi click vào row
                    rowDetailMap.set(row, null); // Cập nhật Map
                }
            });
        }
    });
}

// Khởi chạy hàm khi trang đã tải xong
document.addEventListener('DOMContentLoaded', initTransactionDetails);