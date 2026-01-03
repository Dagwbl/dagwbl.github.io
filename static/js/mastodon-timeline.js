// Mastodon timeline pagination
document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.getElementById('mastodon-list');
  const paginationEl = document.getElementById('mastodon-pagination');
  
  if (!listEl || !paginationEl) return;

  const ITEMS_PER_PAGE = 10;
  const items = Array.from(listEl.querySelectorAll('.mastodon-item'));
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  let currentPage = 1;

  function renderPagination() {
    paginationEl.innerHTML = '';

    // Get i18n text from data attributes
    const prevText = paginationEl.dataset.prev || '←';
    const nextText = paginationEl.dataset.next || '→';

    // Previous button
    const prevBtn = createPaginationItem(prevText, 'prev', currentPage === 1);
    if (currentPage > 1) {
      prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    }
    paginationEl.appendChild(prevBtn);

    // Page numbers with ellipsis
    const maxVisible = 7;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisible) {
      if (currentPage <= Math.ceil(maxVisible / 2)) {
        endPage = maxVisible;
      } else if (currentPage >= totalPages - Math.floor(maxVisible / 2)) {
        startPage = totalPages - maxVisible + 1;
      } else {
        startPage = currentPage - Math.floor(maxVisible / 2);
        endPage = currentPage + Math.floor(maxVisible / 2);
      }

      if (startPage > 1) {
        const firstBtn = createPaginationItem('1');
        firstBtn.addEventListener('click', () => goToPage(1));
        paginationEl.appendChild(firstBtn);

        if (startPage > 2) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'mastodon-pagination-ellipsis';
          ellipsis.textContent = '...';
          paginationEl.appendChild(ellipsis);
        }
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      const btn = createPaginationItem(String(i), null, false, i === currentPage);
      btn.addEventListener('click', () => goToPage(i));
      paginationEl.appendChild(btn);
    }

    if (totalPages > maxVisible && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'mastodon-pagination-ellipsis';
        ellipsis.textContent = '...';
        paginationEl.appendChild(ellipsis);
      }

      const lastBtn = createPaginationItem(String(totalPages));
      lastBtn.addEventListener('click', () => goToPage(totalPages));
      paginationEl.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = createPaginationItem(nextText, 'next', currentPage === totalPages);
    if (currentPage < totalPages) {
      nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
    }
    paginationEl.appendChild(nextBtn);

    // Info text
    const info = document.createElement('span');
    info.className = 'mastodon-pagination-info';
    info.textContent = `${currentPage} / ${totalPages}`;
    paginationEl.appendChild(info);
  }

  function createPaginationItem(text, type = null, disabled = false, active = false) {
    const btn = document.createElement('button');
    btn.className = 'mastodon-pagination-item';
    btn.textContent = text;
    
    if (type) btn.dataset.type = type;
    if (disabled) btn.disabled = true;
    if (active) btn.classList.add('active');
    
    btn.type = 'button';
    return btn;
  }

  function renderPage(page) {
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;

    items.forEach((item, idx) => {
      if (idx >= startIdx && idx < endIdx) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });

    // Scroll to top of list
    listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPage(page);
    renderPagination();
  }

  // Handle goto input and button
  const gotoInput = document.getElementById('mastodon-goto-input');
  const gotoBtn = document.getElementById('mastodon-goto-btn');

  function handleGoto() {
    const pageNum = parseInt(gotoInput.value, 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      gotoInput.style.borderColor = '#ef4444';
      setTimeout(() => {
        gotoInput.style.borderColor = '';
      }, 1500);
      return;
    }
    goToPage(pageNum);
    gotoInput.value = '';
  }

  if (gotoInput && gotoBtn) {
    gotoBtn.addEventListener('click', handleGoto);
    gotoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleGoto();
    });
    gotoInput.max = totalPages;
  }

  // Initial render
  renderPagination();
  renderPage(1);
});
