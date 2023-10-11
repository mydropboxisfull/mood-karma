import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
import Nav from './components/Nav';
import { googleLogout } from '@react-oauth/google';



function App() {










  // Moods
    const moods = [1, 2, 3, 4, 5];
    const [selectedMood, setSelectedMood] = useState(null);
    const handleMoodSelect = (mood) => {
      setSelectedMood(mood);
    };
    //Activies
    const [activities, setActivities] = useState(['Meditated', 'Worked out', 'Journaled', 'Coded']);
    const [selectedActivities, setSelectedActivities] = useState([]);
    
    const handleActivitySelect = (activity) => {
      setSelectedActivities((prevActivities) => {
        if (prevActivities.includes(activity)) {
          return prevActivities.filter((item) => item !== activity);
        } else {
          return [...prevActivities, activity];
        }
      });
    };

 

    // selectedActivities returns an Array with activities 'meditated' , 'Worked out' , etc

    const handleSubmit = () => {
      // Map the selected activities to the activities array with completed status
      const newActivities = activities.map((activity) => ({
        name: activity,
        completed: selectedActivities.includes(activity), // Check if it's selected
      }));
    
      const newDay = {
        moodValue: selectedMood,
        activities: newActivities,
      };
    
      axios.post('/api/days', newDay)
        .then((response) => {
          console.log('Day created successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error creating day:', error);
        });
    };
    


  return (


    <div className='bg-gray-500 h-screen w-screen '>
        <Nav/>



        <div className='flex content-center justify-center mt-20'>

     

    <div className="bg-gray-800 p-4 rounded-lg shadow-lg max-w-2xl">


    {/* ----------- MOOD ----------- */}
      <h2 className="text-2xl text-white mb-4">Rate today's mooood:</h2>
      <div className="mb-4 flex justify-center space-x-4">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={`text-3xl cursor-pointer ${
              selectedMood === mood
                ? 'opacity-100 text-red-500'
                : 'opacity-20 hover:opacity-100'
            }`}
            onClick={() => handleMoodSelect(mood)}
          >
            {mood}
          </button>
        ))}
      </div>





          {/* ----------- Activities ----------- */}
      <div>
        <h3 className="text-xl text-white mb-2">Today I ...</h3>
        {activities.map((activity) => (
          <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            className="form-checkbox text-blue-500"
            value="Meditated"
            checked={selectedActivities.includes(activity)}
            onChange={() => handleActivitySelect(activity)}
          />
          <span className="text-white">{activity}</span>
        </label>
        ))}
      </div>




          {/* ----------- Button Event ----------- */}


      <div className="mt-4 text-center">
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </div>






    </div>


    </div>

    </div>
  );
}

export default App;
