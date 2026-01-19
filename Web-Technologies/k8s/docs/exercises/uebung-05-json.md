# Übung 5: JSON-Strukturen

## Aufgabenstellung

Legen Sie zur Warenkorb-Klassen-Struktur eine beispielhafte JSON-Struktur an.

```
┌─────────────┐     ┌─────────────┐
│   Basket    │     │  Customer   │
├─────────────┤     ├─────────────┤
│ id: String  │     │ name: String│
│ checkout:   │     │ address:    │
│   Boolean   │     │   String    │
└──────┬──────┘     │ email:      │
       │            │   String    │
       ◇            └─────────────┘
       │ *
┌──────┴──────┐
│   Product   │
├─────────────┤
│ name: String│
│ amount:     │
│   number    │
│ price:      │
│   number    │
└─────────────┘
```

---

## Alternative 1: Ein einzelner Warenkorb

```json
{
  "id": "basket-001",
  "checkout": false,
  "customer": {
    "name": "Max Mustermann",
    "address": "Musterstraße 123, 12345 Musterstadt",
    "email": "max@example.com"
  },
  "products": [
    {
      "name": "Laptop",
      "amount": 1,
      "price": 999.99
    },
    {
      "name": "USB-Kabel",
      "amount": 3,
      "price": 9.99
    },
    {
      "name": "Maus",
      "amount": 1,
      "price": 29.99
    }
  ]
}
```

### Berechnete Werte (optional)

```json
{
  "id": "basket-001",
  "checkout": false,
  "customer": {
    "name": "Max Mustermann",
    "address": "Musterstraße 123, 12345 Musterstadt",
    "email": "max@example.com"
  },
  "products": [
    { "name": "Laptop", "amount": 1, "price": 999.99 },
    { "name": "USB-Kabel", "amount": 3, "price": 9.99 },
    { "name": "Maus", "amount": 1, "price": 29.99 }
  ],
  "summary": {
    "itemCount": 5,
    "totalPrice": 1059.95
  }
}
```

---

## Alternative 2: Mehrere Warenkörbe (Map/Dictionary)

Zugriff über ID als Schlüssel:

```json
{
  "basket-001": {
    "checkout": false,
    "customer": {
      "name": "Max Mustermann",
      "address": "Musterstraße 123, 12345 Musterstadt",
      "email": "max@example.com"
    },
    "products": [
      { "name": "Laptop", "amount": 1, "price": 999.99 },
      { "name": "USB-Kabel", "amount": 3, "price": 9.99 }
    ]
  },
  "basket-002": {
    "checkout": true,
    "customer": {
      "name": "Erika Musterfrau",
      "address": "Beispielweg 42, 54321 Beispielstadt",
      "email": "erika@example.com"
    },
    "products": [
      { "name": "Buch", "amount": 2, "price": 19.99 },
      { "name": "Stift", "amount": 10, "price": 1.99 }
    ]
  },
  "basket-003": {
    "checkout": false,
    "customer": {
      "name": "Hans Schmidt",
      "address": "Hauptstraße 1, 10000 Berlin",
      "email": "hans@example.com"
    },
    "products": []
  }
}
```

### Zugriff in JavaScript

```javascript
// Einzelnen Warenkorb abrufen
const basket = baskets["basket-001"];

// Alle Warenkorb-IDs
const ids = Object.keys(baskets);

// Nicht abgeschlossene Warenkörbe
const openBaskets = Object.entries(baskets)
  .filter(([id, basket]) => !basket.checkout);

// Gesamtwert eines Warenkorbs berechnen
function calculateTotal(basket) {
  return basket.products.reduce(
    (sum, product) => sum + (product.amount * product.price),
    0
  );
}
```

---

## Alternative 2b: Array von Warenkörben

```json
{
  "baskets": [
    {
      "id": "basket-001",
      "checkout": false,
      "customer": { "name": "Max", "address": "...", "email": "..." },
      "products": [...]
    },
    {
      "id": "basket-002",
      "checkout": true,
      "customer": { "name": "Erika", "address": "...", "email": "..." },
      "products": [...]
    }
  ]
}
```

### Vergleich der Strukturen

| Struktur | Vorteile | Nachteile |
|----------|----------|-----------|
| Map (Object) | O(1) Zugriff per ID | Keine Reihenfolge garantiert |
| Array | Reihenfolge erhalten, einfach iterieren | O(n) Suche per ID |

---

## TypeScript Interface (Bonus)

```typescript
interface Customer {
  name: string;
  address: string;
  email: string;
}

interface Product {
  name: string;
  amount: number;
  price: number;
}

interface Basket {
  id: string;
  checkout: boolean;
  customer: Customer;
  products: Product[];
}

// Map-Struktur
type BasketMap = Record<string, Omit<Basket, 'id'>>;

// Array-Struktur
interface BasketCollection {
  baskets: Basket[];
}
```
