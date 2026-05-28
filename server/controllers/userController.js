const History = require("../models/History");
const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error("Get History Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const saveToHistory = async (req, res) => {
  try {
    const { type, title, data, atsScore } = req.body;
    
    if (!type || !data) {
      return res.status(400).json({ message: "Type and data are required" });
    }

    const historyItem = new History({
      userId: req.user.userId,
      type,
      title: title || "Untitled Document",
      data,
      atsScore: atsScore || null
    });

    await historyItem.save();
    res.status(201).json(historyItem);
  } catch (error) {
    console.error("Save History Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createCheckoutSession = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // You could map this to a real price ID in your Stripe Dashboard, 
    // but for demonstration we'll use a dynamic price session setup.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "CareerForge Pro Subscription",
              description: "Unlock all premium features including unlimited AI rewrites and cover letters.",
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ],
      mode: "payment", // can be 'subscription' if using actual recurring price ID
      success_url: `${process.env.CLIENT_URL}?payment=success`,
      cancel_url: `${process.env.CLIENT_URL}?payment=canceled`,
      customer_email: user.email,
      client_reference_id: req.user.userId, // We can use this to fulfill in a webhook later
    });

    // We rely on the Stripe webhook to mark them as 'pro'
    // when the checkout.session.completed event is received.

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

const devUpgrade = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, { subscription: "pro" }, { new: true });
    res.json({ message: "Upgraded to Pro in Dev Mode", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProfile,
  getUserHistory,
  saveToHistory,
  createCheckoutSession,
  devUpgrade
};
