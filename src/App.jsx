import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav";
import { googleLogout } from "@react-oauth/google";
import ToggleableButton from "./components/ToggableButton";

function App() {
  // Moods
  const moods = [
    { value: 1, emoji: "1.png" },
    { value: 2, emoji: "2.png" },
    { value: 3, emoji: "3.png" },
  ];
  const [selectedMood, setSelectedMood] = useState(2);
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.value);
  };

  // ---------------- Activies ----------------------

  const [activities, setActivities] = useState([]);

  // use API route to get last used activities and change when updated

  useEffect(() => {
    axios
      .get("/api/days/prev-activities")
      .then((response) => {
        console.log(response);
        // Extract the activities from the response data
        setActivities(response.data);

        // Do something with the activities
        console.log("Activities from the most recent day:", activities);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error getting activities:", error);
      });
  }, []);





  // ------- Button * Active Status * for Activities -------

  const [selectedActivities, setSelectedActivities] = useState({});

  const handleActivitySelect = (activity) => {
    console.log("the activity is", activity);
    setSelectedActivities((prevActivities) => {
      console.log("the prev activities are:", prevActivities)
      const updatedActivities = { ...prevActivities };
      updatedActivities[activity] = !updatedActivities[activity];
      return updatedActivities;
      console.log("updated activities are:", updatedActivities)
    });
  };


    //// test

    // const [isSelected, setIsSelected] = useState(false);
  
    // const handleClick = () => {
    //   setIsSelected(!isSelected);
    // };

    // const handleButton = (activity) => {
    //   handleClick();
    //   handleActivitySelect(activity);
    // }



  
    // ---------------- Form Submission ----------------------


    const handleSubmit = () => {
      // Get an array of selected activities based on the keys of the object
      const selectedActivityNames = Object.keys(selectedActivities);
    
      // Map the selected activities to the activities array with completed status
      const newActivities = activities.map((activity) => ({
        name: activity,
        completed: selectedActivityNames.includes(activity), // Check if it's selected
      }));
    
      const newDay = {
        moodValue: selectedMood,
        activities: newActivities,
      };
      
    axios
      .post("/api/days", newDay)
      .then((response) => {
        console.log("Day created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating day:", error);
      });

    setSelectedActivities([]);
    setSelectedMood(null);
  };




  return (
    <div className="bg-white h-screen w-screen ">
      {/* <Nav />   removed until I need it, arrow for now */}

      <div className="flex mt-[4rem] ml-[2rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-9 h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="square"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </div>
             {/* ------------------------------------------------------------------------ */}

      <div className="flex content-center justify-center mt-10">
        <div className="bg-white shadow-sm border-[.4rem] border-black mx-[2rem] rounded-sm w-full max-w-lg">
          {/* ----------- HEADER ----------- */}

          <div className="py-[1.5rem] px-[3rem]">
            <div className="content-center flex justify-between">
              <h1 className="text-xl font-bold">10/11</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="px-[3rem] bg-gray-200">



            {/* ----------- MOOD ----------- */}
            <h2 className="text-xl text-black mb-4 font-bold pt-[1.5rem]">How u feeling today pal?</h2>
            <div className="mb-4 flex justify-center space-x-4">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={`text-3xl cursor-pointer ${
                    selectedMood === mood.value
                      ? "opacity-100 custom-spin"
                      : "opacity-40 hover:opacity-100"
                  }`}
                  onClick={() => handleMoodSelect(mood)}
                >
                  <img src={mood.emoji} alt={`Mood ${mood.value}`} />
                </button>
              ))}
            </div>

            {/* ----------- Activities ----------- */}
            <div>

  <h3 className="text-xl text-black mb-4 font-bold pt-[1rem]">What did you do today?</h3>
  <div className="space-x-2">
  {activities.map((activity) => (
          <ToggleableButton
            key={activity}
            label={activity}
            isSelected={selectedActivities[activity]}
            onClick={() => handleActivitySelect(activity)}
          />
        ))}
  </div>
</div>

            {/* ----------- Button Event ----------- */}

            <div className="mt-4 text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Submit
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
