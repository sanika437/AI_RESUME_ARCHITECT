const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;

    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          user.subscription = "pro";
          await user.save();
          console.log(`Successfully upgraded user ${userId} to pro plan.`);
        } else {
          console.error(`User not found for ID: ${userId}`);
        }
      } catch (err) {
        console.error("Error upgrading user to pro:", err);
      }
    } else {
      console.error("No client_reference_id found in the session.");
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = {
  handleStripeWebhook,
};
