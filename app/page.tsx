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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-indigo-800 to-gray-900 text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎮 Cookie Clicker Challenge 🎮
      </motion.h1>
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="Enter Your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-80 p-3 border-2 border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <motion.button
          onClick={handleLogin}
          className="px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-xl text-white text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        {user && (
          <motion.div
            className="flex flex-col items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-2xl font-semibold">
              <p>🏆 Score: {user.score}</p>
              <p className="mt-2">🎁 Prizes: {user.prizes}</p>
            </div>
            <motion.button
              onClick={handleClick}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Click Me!
            </motion.button>
          </motion.div>
        )}
        {message && (
          <motion.div
            className="mt-6 w-80 bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-xl shadow-xl flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold">
                <span className="text-2xl font-bold">
                  {message.includes('points') && message.split(' ')[2]}
                </span>{' '}
                points!
              </p>
              {message.includes('prize') && (
                <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <span>🎁</span> Prize Won
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center">
              <motion.span
                className="font-bold text-lg"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                🌟
              </motion.span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Prize Notification */}
      <AnimatePresence>
        {showPrizeNotification && (
          <motion.div
            className="fixed top-16 transform -translate-x-1/2 py-4 px-8 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xl font-bold rounded-xl shadow-lg flex justify-center items-center"
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
