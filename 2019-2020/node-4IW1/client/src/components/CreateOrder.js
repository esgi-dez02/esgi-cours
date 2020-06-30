import React, { useState } from "react";
const CLIENTID = "ezafe23RAEZFCze";
const CLIENTSECRET = "ezafe23RAEZFCze";

// item => price
const products = {
  soda: 3,
  pasta: 9,
  tiramisu: 4,
};

const createTransaction = (cart) => {
  fetch("http://api-paiement/transaction", {
    method: "POST",
    headers: {
      Authorization: "Basic ".atob(`${CLIENTID}:${CLIENTSECRET}`),
    },
    body: JSON.stringify({
      amount:
        Object.keys(cart).reduce(
          (acc, product) => acc + cart[product] * products[product],
          0
        ) * 100,
      currency: "EUR",
      cart: Object.keys(cart).map((product) => ({
        unit_price: products[product],
        quantity: cart[product],
      })),
      consumer: {
        shipping_address: {
          fullName: "Toto titi",
          address: "5 rue toto",
          zipcode: "54321",
          country: "FR",
        },
        billing_address: {
          fullName: "Toto titi",
          address: "5 rue toto",
          zipcode: "54321",
          country: "FR",
        },
      },
      metadata: {
        consumer_id: 1,
        order_id: "1E2EZDAZD2ZREZD2ED",
      },
    }),
  });
};

const OrderPage = () => {
  const [cart, setCart] = useState({});
  return (
    <>
      {Object.keys(products).map((product) => (
        <li>
          {product} ({products[product]}€){" "}
          <a
            onClick={() => {
              if (cart[product]) {
                setCart({
                  ...cart,
                  [product]: cart[product] - 1,
                });
              }
            }}
          >
            -
          </a>
          {cart[product] || 0}
          <a
            onClick={() => {
              setCart({
                ...cart,
                [product]: (cart[product] || 0) + 1,
              });
            }}
          >
            +
          </a>
        </li>
      ))}
      <a onClick={() => createTransaction(cart)}>Create Transaction</a>
    </>
  );
};
