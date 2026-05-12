import { OrderItem, CAKE_LABELS } from '../types'
export function buildWhatsAppMessage(order: OrderItem): string {
  const addOnsList =
    order.addOns && order.addOns.length > 0
      ? order.addOns.map(a => a.replace('-', ' ')).join(', ')
      : 'None'

  const msg = `
🎂 *New Cake Order — YumiGo Bakery*

🍰 *Cake:* ${CAKE_LABELS[order.cakeType]?.label || order.cakeType}
🥚 *Egg Option:* ${order.eggOption === 'egg' ? 'With Egg' : 'Eggless'}
⚖️ *Size:* ${order.size}
💎 *Shape:* ${order.shape}
✍️ *Message on Cake:* ${order.customMessage || 'None'}
🎁 *Add-ons:* ${addOnsList}
📸 *Photo Cake:* ${order.photoUpload ? 'Yes (Photo will be shared)' : 'No'}

🗓️ *Delivery Date:* ${order.deliveryDate || 'Not selected'}
🕒 *Time Slot:* ${order.timeSlot || 'Not selected'}
🚚 *Delivery Type:* ${order.deliveryType}

${order.deliveryType === 'delivery' && order.address
  ? `📍 *Address:* ${order.address}`
  : ''}

📝 *Instructions:* ${order.deliveryInstructions || 'None'}

👤 *Name:* ${order.customerName || 'N/A'}
📞 *Phone:* ${order.customerPhone || 'N/A'}

💰 *Total:* ₹${order.totalPrice}

Thank you for ordering from YumiGo! 🧡
`.trim()

  const encoded = encodeURIComponent(msg)

  return `https://wa.me/918278854238?text=${encoded}`
}