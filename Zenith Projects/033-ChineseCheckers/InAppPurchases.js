import React, { useState, useEffect } from 'react';
import { InAppPurchase } from 'react-native-in-app-purchase';

const InAppPurchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    InAppPurchase.initialize();
    InAppPurchase.fetchPurchases().then((purchases) => {
      setPurchases(purchases);
    });
  }, []);

  const handlePurchase = (productId) => {
    InAppPurchase.purchaseProduct(productId).then((purchase) => {
      console.log(purchase);
    });
  };

  return (
    <div>
      <h1>In-App Purchases</h1>
      <ul>
        {purchases.map((purchase, index) => (
          <li key={index}>
            {purchase.productId}: {purchase.transactionDate}
          </li>
        ))}
      </ul>
      <button onClick={() => handlePurchase('premium_feature')}>Buy Premium Feature</button>
    </div>
  );
};

export default InAppPurchases;