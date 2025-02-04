'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [user, setUser] = useState<{ score: number; prizes: number } | null>(
    null
  );
  const [message, setMessage] = useState('');
  const [showPrizeNotification, setShowPrizeNotification] = useState(false);
  const [userId, setUserId] = useState('');

  const fetchUserData = (id: string) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  };

  const handleLogin = () => {
    if (userId) fetchUserData(userId);
  };

  const handleClick = () => {
    if (!userId) {
      setMessage('Please enter a User ID first!');
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/click`, { userId })
      .then((response) => {
        const { rewards, updatedUser } = response.data;
        setUser(updatedUser);

        // Display rewards message
        setMessage(
          `You gained ${rewards.points} points! ` +
            (rewards.prize ? 'You also won a prize!' : '')
        );

        // Show prize notification if a prize is won
        if (rewards.prize) {
          setShowPrizeNotification(true);
          setTimeout(() => setShowPrizeNotification(false), 3000); // Auto-hide notification after 3 seconds
        }
      })
      .catch((error) => console.error('Error processing click:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-gray-900 text-white">
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Cookie Clicker Clone
      </motion.h1>
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-64 p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          Login
        </button>
        {user && (
          <motion.div
            className="flex flex-col items-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-lg font-medium">Score: {user.score}</p>
            <p className="text-lg font-medium">Prizes: {user.prizes}</p>
            <motion.button
              onClick={handleClick}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold shadow-lg transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Click Me!
            </motion.button>
          </motion.div>
        )}
        {message && (
          <motion.p
            className="mt-4 text-yellow-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>

      {/* Prize Notification */}
      <AnimatePresence>
        {showPrizeNotification && (
          <motion.div
            className="fixed top-16 transform -translate-x-1/2 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg shadow-lg flex justify-center items-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            🎉 Congratulations! You won a prize! 🏆
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
