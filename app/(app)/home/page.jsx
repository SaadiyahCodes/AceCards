'use client';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import firebase from '@/utils/firebase'; // Ensure Firebase is set up correctly
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [plan, setPlan] = useState(null);
  const router = useRouter();

  const handlePlanSelect = async (selectedPlan) => {
    try {
      // Update user's plan in Firebase
      const user = firebase.auth().currentUser;
      if (user) {
        await firebase.firestore().collection('users').doc(user.uid).update({
          plan: selectedPlan,
        });
        setPlan(selectedPlan);
      }
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  // function createNewFlashcard() {
  //   const navigate = useNavigate();
  
  //   const handleRedirect = () => {
  //     navigate('/flashcard');
  //   };
  
  // }
  const handleRedirect = () => {
    router.push('/home/flashcard');
  };


  return (
    <div className="text-center my-16">
      <SignedIn>
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
        <UserButton />

        <div className="mt-12">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2" onClick={() => handlePlanSelect('basic')}>
            Select Basic Plan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2" onClick={() => handlePlanSelect('premium')}>
            Select Premium Plan
          </button>
        </div>

        <Stack direction="row" spacing={10} justifyContent="center" sx={{ mt: 10 }}>
          <div className="mt-12">
            <h2 className="text-2xl font-bold">My Flashcards</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6">
              View All
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold">Create Flashcards</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6" onClick={handleRedirect}>
              Create Now
            </button>
            {/* <createNewFlashcard></createNewFlashcard> */}
          </div>

        </Stack>
      </SignedIn>

      <SignedOut>
        <p className="mt-6">Please log in to access the dashboard.</p>
      </SignedOut>
    </div>
  );
}


