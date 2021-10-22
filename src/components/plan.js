import React, { useState, useEffect } from 'react';
import './PlanScreen.css';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const PlanScreen = () => {
    const [ products, setProducts] = useState([]);
    const [ subscription, setSubscription ] = useState(null);
    const user = useSelector(selectUser);

    
    useEffect(() => {
        db
        .collection('products')
        .where('active', '==', true)
        .get()
        .then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const priceSnap = await productDoc.ref.collection("prices").get();
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });
    }, []);

    useEffect(() => {
        db
        .collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_start: subscription.data().current_period_start.seconds,
                    current_period_end: subscription.data().current_period_end.seconds,
                })
            })
        })
    }, [user.uid]);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot( async (snap) => {
            const { error, sessionId } = snap.data();

            if(error) {
                // Show an error to your customerand inspect your cloud function logs in the firebase console.
                alert(`An error occured: ${error.message}`);
            }
            if(sessionId) {
                // We have a session, let's redirect to Checkout session
                // Init Stripe
                const stripe = await loadStripe('pk_test_51JmKULA4PymycJZ71UL89cQNzj6jjuTtYiWswTz410JeAqH35LFVpkchAhF6Kkt6JPJotCSrDEWLdZhXIVzct3gh00tQRLSuFj');
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };
    
    return (
        <div className="planScreen">
            {subscription && <p>Renewal date: { new Date(subscription?.current_period_end * 1000).toLocaleDateString() }</p>}
            {Object.entries(products).map(([productId, productData]) => {
                // add some logic to check if user's subscription is active
                const isCurrentPackage = productData.name?.toLowerCase()
                    .includes(subscription.role);

                const priceId = productData.prices.priceId;
                return (
                    <div key={productId} className={`${isCurrentPackage && 'planScreen__plan--disabled'} planScreen__plan`} >
                        <div className="planScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(priceId)}>
                            {isCurrentPackage? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen
