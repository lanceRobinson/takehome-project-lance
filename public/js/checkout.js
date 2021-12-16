
const stripe_pk = 'pk_test_51K6pNiIbxjeJD6w8gGJPrnLyazHXKV29Bkb6skmIOCz8vYaj7Yltdm0l1qEYGYMWKcDhMFEIkaogka4B1mzZWgrL007pzDKPta'
const stripe = Stripe(stripe_pk);

const options = {
    clientSecret: client_secret,
    appearance: {theme: 'flat'},
};

// Set up Stripe.js and Elements to use in checkout form
const elements = stripe.elements(options);

// Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

// Add listener and handler for submit
const form = document.getElementById('payment-form');
form.addEventListener('submit', submitHandler);

// Submit handler
async function submitHandler(event) {
    event.preventDefault();

    const email = document.getElementById("email").value
    console.log('email',email)

    const {error} = await stripe.confirmPayment({
//`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
            return_url: 'http://localhost:3000/success',
            receipt_email: email
        },
    });

    if (error) {
//Show error to your customer
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
    } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
    }
}
