
const stripe_pk = 'pk_test_51K6pNiIbxjeJD6w8gGJPrnLyazHXKV29Bkb6skmIOCz8vYaj7Yltdm0l1qEYGYMWKcDhMFEIkaogka4B1mzZWgrL007pzDKPta'
const stripe = Stripe(stripe_pk);

// Retrieve the "payment_intent_client_secret" query parameter
const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
);

// Retrieve the Payment Intent

stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {

    console.log('paymentIntent', paymentIntent)

//Retrieve document elements to update
    const message = document.querySelector('#message')
    const payment_amount = document.querySelector('#payment-amount')
    const payment_id = document.querySelector('#payment-id')

//Currency Formatter
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: paymentIntent.currency,
    });

//Set payment intent id and payment amount
    payment_id.innerText = `Payment Intent Id: ${paymentIntent.id}`
    payment_amount.innerText = `Total Payment: ${formatter.format(paymentIntent.amount/100)}`


//Set message
    switch (paymentIntent.status) {
        case 'succeeded':
            message.innerText = 'Your payment has been successfully processed!';
            break;

        case 'processing':
            message.innerText = "Payment processing. We'll update you when payment is received.";
            break;

        case 'requires_payment_method':
            message.innerText = 'Payment failed. Please try another payment method.';
            break;

        default:
            message.innerText = 'Something went wrong.';
            break;

    }
}).catch(e => console.log(e))