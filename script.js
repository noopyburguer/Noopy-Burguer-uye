const orderButton = document.getElementById('orderButton');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const checkboxes = document.querySelectorAll('.item-checkbox');
const totalPriceEl = document.getElementById('totalPrice');
const summaryItemsEl = document.getElementById('summaryItems');
const whatsappNumber = '5599984040006'; // Altere para o número correto

// Form elements
const clientName = document.getElementById('clientName');
const clientPhone = document.getElementById('clientPhone');
const clientStreet = document.getElementById('clientStreet');
const clientNumber = document.getElementById('clientNumber');
const clientComplement = document.getElementById('clientComplement');
const clientNeighborhood = document.getElementById('clientNeighborhood');
const clientZip = document.getElementById('clientZip');
const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');

function updateOrderSummary() {
  const selectedItems = [];
  let total = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const name = checkbox.dataset.name;
      const price = parseFloat(checkbox.dataset.price);
      selectedItems.push({ name, price });
      total += price;
    }
  });

  // Atualizar resumo de itens
  if (selectedItems.length === 0) {
    summaryItemsEl.innerHTML = '<p style="color: var(--muted); margin: 0;">Nenhum item selecionado</p>';
    submitOrderBtn.disabled = true;
  } else {
    summaryItemsEl.innerHTML = selectedItems
      .map(
        (item) =>
          `<div class="summary-item">
        <span>${item.name}</span>
        <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>
      </div>`
      )
      .join('');
    submitOrderBtn.disabled = false;
  }

  // Atualizar total
  totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function validateDeliveryForm() {
  const errors = [];
  
  if (!clientName.value.trim()) errors.push('Nome completo');
  if (!clientPhone.value.trim()) errors.push('Telefone');
  if (!clientStreet.value.trim()) errors.push('Rua');
  if (!clientNumber.value.trim()) errors.push('Número');
  if (!clientNeighborhood.value.trim()) errors.push('Bairro');
  
  const paymentSelected = Array.from(paymentMethodInputs).some(input => input.checked);
  if (!paymentSelected) errors.push('Método de pagamento');
  
  if (errors.length > 0) {
    alert(`Por favor, preencha os seguintes campos:\n• ${errors.join('\n• ')}`);
    return false;
  }
  
  return true;
}

// Evento para checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateOrderSummary);
});

// Evento para enviar pedido
submitOrderBtn.addEventListener('click', () => {
  if (!validateDeliveryForm()) {
    return;
  }

  const selectedItems = [];
  let total = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const name = checkbox.dataset.name;
      const price = parseFloat(checkbox.dataset.price);
      selectedItems.push({ name, price });
      total += price;
    }
  });

  if (selectedItems.length === 0) {
    alert('Selecione pelo menos um item');
    return;
  }

  const paymentMethod = Array.from(paymentMethodInputs).find(input => input.checked).value;

  const itemsList = selectedItems.map((item) => `• ${item.name}: R$ ${item.price.toFixed(2)}`).join('%0A');
  
  const deliveryInfo = `%0A%0A📦 INFORMAÇÕES DE ENTREGA:%0A` +
    `👤 Nome: ${clientName.value}%0A` +
    `📱 Telefone: ${clientPhone.value}%0A` +
    `🏠 Endereço: ${clientStreet.value}, ${clientNumber.value}${clientComplement.value ? ' - ' + clientComplement.value : ''}%0A` +
    `🏘️ Bairro: ${clientNeighborhood.value}${clientZip.value ? ' - CEP: ' + clientZip.value : ''}%0A` +
    `💳 Pagamento: ${paymentMethod}`;

  const message = `Olá, gostaria de fazer um pedido:%0A%0A${itemsList}%0A%0ATotal: R$ ${total.toFixed(2)}${deliveryInfo}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});

// Evento para botão de contato
if (orderButton) {
  orderButton.addEventListener('click', () => {
    window.location.href = `mailto:pedidos@noopyburguer.com?subject=Pedido%20Noopy%20Burguer&body=Olá%2C%20gostaria%20de%20fazer%20um%20pedido.`;
  });
}

// Inicializar
updateOrderSummary();
