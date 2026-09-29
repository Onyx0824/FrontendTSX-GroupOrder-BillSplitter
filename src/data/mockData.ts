export const initialMockData = {
  myGroup: {
    inProgress: [
      { date: '11/05', nameEn: 'Sunny Café', nameZh: '陽光咖啡', price: 128 },
      { date: '12/14', nameEn: 'Green Bowl', nameZh: '綠碗沙拉', price: 86 }
    ],
    history: [
      { date: '10/28', nameEn: 'Pizza Party', nameZh: '披薩派對', price: 611 },
      { date: '10/15', nameEn: 'Burger King', nameZh: '漢堡王', price: 521 },
      { date: '09/30', nameEn: 'Taco Stand', nameZh: '塔可攤', price: 233 },
      { date: '09/12', nameEn: 'Noodle House', nameZh: '麵食館', price: 78 },
      { date: '08/20', nameEn: 'Milk Tea Shop', nameZh: '飲料店', price: 46 },
      { date: '08/01', nameEn: 'Sushi Express', nameZh: '爭鮮壽司', price: 55 }
    ]
  },
  menuItems: [
    { nameEn: 'Bubble Tea', nameZh: '珍珠奶茶', price: 55 },
    { nameEn: 'Latte', nameZh: '拿鐵', price: 70 },
    { nameEn: 'Green Tea', nameZh: '綠茶', price: 45 },
    { nameEn: 'Matcha Latte', nameZh: '抹茶拿鐵', price: 80 },
    { nameEn: 'Black Coffee', nameZh: '黑咖啡', price: 50 }
  ],
  dashboardOrders: [
    { nameEn: 'Alice', nameZh: '小美', items: 'Bubble Tea ×2', price: 110, status: 'confirmed' as const },
    { nameEn: 'Bob', nameZh: '小明', items: 'Latte ×1, Green Tea ×1', price: 115, status: 'confirmed' as const },
    { nameEn: 'Carol', nameZh: '小華', items: 'Matcha Latte ×1', price: 80, status: 'pending' as const },
    { nameEn: 'Dave', nameZh: '小李', items: 'Black Coffee ×2', price: 100, status: 'confirmed' as const },
    { nameEn: 'Eve', nameZh: '小依', items: 'Bubble Tea ×1, Latte ×1', price: 125, status: 'pending' as const }
  ],
  invoiceMatch: {
    categoryEn: 'Restaurant',
    categoryZh: '餐廳',
    orderTotal: 530,
    items: [
      { nameEn: 'Bubble Tea', nameZh: '珍珠奶茶', qty: 3, unitPrice: 55, totalPrice: 165 },
      { nameEn: 'Latte', nameZh: '拿鐵', qty: 2, unitPrice: 70, totalPrice: 140 },
      { nameEn: 'Green Tea', nameZh: '綠茶', qty: 1, unitPrice: 45, totalPrice: 45 },
      { nameEn: 'Matcha Latte', nameZh: '抹茶拿鐵', qty: 1, unitPrice: 80, totalPrice: 80 }
    ]
  },
  splitSettings: {
    rules: [
      { nameEn: 'Delivery Fee', nameZh: '外送費', amount: 60, ruleEn: 'By Proportion', ruleZh: '按比例' },
      { nameEn: 'Service Fee', nameZh: '服務費', amount: 15, ruleEn: 'Even Split', ruleZh: '均分' },
      { nameEn: 'Discount', nameZh: '折扣', amount: -40, ruleEn: 'By Proportion', ruleZh: '按比例' },
      { nameEn: 'Remainder', nameZh: '尾差', amount: null, ruleEn: 'Leader Absorbs', ruleZh: '團長吸收' }
    ],
    members: [
      { nameEn: 'Alice', nameZh: '小美', total: 116, detailsEn: 'Food $110 +$17 -$11', detailsZh: '餐點 $110 +$17 -$11' },
      { nameEn: 'Bob', nameZh: '小明', total: 121, detailsEn: 'Food $115 +$18 -$12', detailsZh: '餐點 $115 +$18 -$12' },
      { nameEn: 'Carol', nameZh: '小華', total: 85, detailsEn: 'Food $80 +$13 -$8', detailsZh: '餐點 $80 +$13 -$8' },
      { nameEn: 'Dove', nameZh: '小鴿', total: 106, detailsEn: 'Food $100 +$16 -$10', detailsZh: '餐點 $100 +$16 -$10' },
      { nameEn: 'Eve', nameZh: '小依', total: 132, detailsEn: 'Food $125 +$20 -$13', detailsZh: '餐點 $125 +$20 -$13' }
    ],
    totalDue: 560
  },
  paymentTracking: {
    collected: [
      { nameEn: 'Alice', nameZh: '小美', amount: 116 },
      { nameEn: 'Bob', nameZh: '小明', amount: 121 },
      { nameEn: 'Eve', nameZh: '小依', amount: 132 }
    ],
    pending: [
      { nameEn: 'Carol', nameZh: '小華', amount: 85 },
      { nameEn: 'Dove', nameZh: '小鴿', amount: 106 }
    ]
  },
  orderDraft: {
    items: [
      { 
        nameEn: 'Bubble Tea', 
        nameZh: '珍珠奶茶', 
        price: 55, 
        detailsEn: 'Qty: 1 · Size: Large · Ice: Less · Sugar: Half', 
        detailsZh: '數量: 1 · 大小: 大杯 · 冰量: 少 · 甜度: 半',
        needsInput: false 
      },
      { 
        nameEn: 'Chicken Cutlet', 
        nameZh: '雞排', 
        price: 70, 
        detailsEn: 'Qty: 1 · Spicy: No', 
        detailsZh: '數量: 1 · 辣度: No',
        needsInput: false 
      },
      { 
        nameEn: 'Latte', 
        nameZh: '拿鐵', 
        price: 0, 
        detailsEn: 'Qty: 1 · Size: ? · Ice: ?', 
        detailsZh: '數量: 1 · 大小: ? · 冰量: ?',
        needsInput: true,
        warningEn: 'Needs your input',
        warningZh: '需要你補充'
      }
    ]
  },
  myOrders: {
    activeGroup: {
      nameEn: 'Sunny Café • 10/31',
      nameZh: '陽光咖啡 • 10/31',
      status: 'CONFIRMED',
      items: [
        {
          nameEn: 'Bubble Tea',
          nameZh: '珍珠奶茶',
          price: 55,
          detailsEn: 'Large · Less Ice · Half Sugar',
          detailsZh: '大杯 • 少 Ice • 半 Sugar'
        },
        {
          nameEn: 'Chicken Cutlet',
          nameZh: '雞排',
          price: 70,
          detailsEn: 'No Spicy',
          detailsZh: '不辣'
        }
      ]
    },
    history: [
      { nameEn: 'Green Bowl', nameZh: '綠碗沙拉', date: '10/28', price: 86, statusEn: 'Closed', statusZh: '已結案' },
      { nameEn: 'Pizza Party', nameZh: '披薩派對', date: '10/20', price: 64, statusEn: 'Closed', statusZh: '已結案' }
    ]
  },
  myPayment: {
    groupNameEn: 'Sunny Café • 10/31',
    groupNameZh: '陽光咖啡 • 10/31',
    status: 'UNPAID',
    totalAmount: 116,
    items: [
      { nameEn: 'Bubble Tea ×1', nameZh: '珍珠奶茶 ×1', price: 55 },
      { nameEn: 'Chicken Cutlet ×1', nameZh: '雞排 ×1', price: 70 }
    ],
    foodSubtotal: 125,
    deliveryFee: { nameEn: 'Delivery Fee (20%)', nameZh: '外送費分攤 (20%)', amount: 17 },
    discount: { nameEn: 'Discount (20%)', nameZh: '折扣分攤 (20%)', amount: -11 },
    paymentInfo: {
      payToEn: 'Leader (Alice)',
      payToZh: '團長 (小美)',
      methodEn: 'Bank Transfer',
      methodZh: '銀行轉帳',
      account: '012-345678-9'
    }
  }
};