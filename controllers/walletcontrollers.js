const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add money to a user's wallet
const addMoney = async (req, res) => {
  try {
    const { email, amount } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.balance += amount;
    await user.save();

    res.json({ message: 'Money added successfully', balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Transfer money from one user to another
const transferMoney = async (req, res) => {
  try {
    const { fromEmail, toEmail, amount } = req.body;

    const sender = await User.findOne({ email: fromEmail });
    const receiver = await User.findOne({ email: toEmail });

    if (!sender || !receiver)
      return res.status(404).json({ error: 'Sender or receiver not found' });

    if (sender.balance < amount)
      return res.status(400).json({ error: 'Insufficient balance' });

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    res.json({ message: 'Transfer successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  addMoney,
  transferMoney,
};
