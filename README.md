# Craftique

Craftique is an E-Commerce dedicated to showcasing and selling unique, handcrafted products.

## Features

- **User Authentication:** Login, registration, and profile management.
- **Product Listings:** Dynamic product display with filtering, sorting, and pagination.
- **Product Details:** Detailed product pages featuring high-resolution images, descriptions, and pricing.
- **Shopping Cart:** Manage your cart with live updates on quantities and subtotals.
- **Checkout Process:** Secure checkout and integrated with midtrans.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Vite
- **Backend:** Node.js, Express, MongoDB (via Mongoose)
- **State Management:** Redux Toolkit
- **API Calls:** Axios
- **Others:** react-toastify for notifications, react-confirm-alert for confirmation dialogs

## Instalation

**Step 1:** Clone this repository.

```bash
git clone https://github.com/DwiBagiaSantosa/Craftique.git
```

**Step 2:** Setup the `.env` and complete the required [environment variables](#environment-variables).

**Step 3:** Install dependencies.

```bash
npm install
```

**Step 4:** Run the project

```bash
npm run dev
```

## Environtment Variables
You can create your midtrans account here [midtrans](https://dashboard.midtrans.com/registerhttps://dashboard.midtrans.com/register). After log in, change the Environment to `Sandbox` and go to integration>Configuration, copy the Client Key. You also gonna need to configure the [backend](https://github.com/DwiBagiaSantosa/craftique-backend).

```bash
# midtrans client key
VITE_CLIENT_MIDTRANS=$your_client_key
```