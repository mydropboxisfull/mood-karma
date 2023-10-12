import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import Nav from "./components/Nav";
import { googleLogout } from "@react-oauth/google";
import ToggleableButton from "./components/ToggableButton";

function App() {


    // ---------------- User mistakes ----------------------

    const [noMood, setNoMood] = useState(false);
    const [noActivity, setNoActivity] = useState(false);


  // ---------------- MOOD ----------------------
  const moods = [
    { value: 1, emoji: "1.png" },
    { value: 2, emoji: "2.png" },
    { value: 3, emoji: "3.png" },
  ];
  const [selectedMood, setSelectedMood] = useState(null);
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.value);
    setNoMood(false)
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
    setNoActivity(false);
    console.log("the activity is", activity);
    setSelectedActivities((prevActivities) => {
      console.log("the prev activities are:", prevActivities);
      const updatedActivities = { ...prevActivities };
      updatedActivities[activity] = !updatedActivities[activity];
      return updatedActivities;
    });
  };

  // ---------------- Edit Activities ----------------------

  const [editToggle, setEditToggle] = useState(false);

  const onEditToggle = () => {
    setEditToggle(!editToggle);
    setSelectedActivities([]);
  };

  // ---------------- Form Submission ----------------------

  const handleSubmit = () => {
    const hasCompletedActivity = Object.values(selectedActivities).some(activity => activity === true);
    console.log("our new func", hasCompletedActivity)

    // Check for user errors

    if (selectedMood === null && hasCompletedActivity === false) {
      setNoMood(true);
      setNoActivity(true);
    }

    else if (selectedMood === null) {
    setNoMood(true);

    }
    else if (hasCompletedActivity === false) {
      setNoActivity(true);
      }

    else {
    
    


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
  }};

  // ------------------------------------------------------------------------
  // -------------------------------HTML STUFFz-----------------------------------------
  // ------------------------------------------------------------------------

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
            {/* ---------------------- MOOD ---------------------- */}
            <h2 className="text-xl text-black mb-4 font-bold pt-[1.5rem]">
              How u feeling pal?
            </h2>
            {noMood && (
              <div className="flex justify-start pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>

                <p className="text-red-500 text-sm pb-2">
                  You need to select a mood pal...
                </p>
              </div>
            )}

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

            {/* ---------------------- Activities ---------------------- */}
            <div className="pb-6">
              <h3 className="text-xl text-black mb-4 font-bold pt-[1rem]">
                What did you do today?
              </h3>
              {noActivity && (
              <div className="flex justify-start pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clip-rule="evenodd"
                  />
                </svg>

                <p className="text-red-500 text-sm pb-2">
                  You need to select what you did today pal...
                </p>
              </div>
            )}
              <div className="justify-end flex my-2">
                <button onClick={onEditToggle}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 ${
                      editToggle ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
              </div>

              <div className="space-x-2">
                {activities.map((activity) => (
                  <ToggleableButton
                    key={activity}
                    label={activity}
                    isSelected={selectedActivities[activity]}
                    onClick={() => handleActivitySelect(activity)}
                    isBeingEdited={editToggle}
                  />
                ))}
              </div>
            </div>

            {/* ---------------------- Button Event  ---------------------- */}
          </div>
          <div className="my-4 text-center">
            <div className="flex justify-between">
              <div className="px-[2rem]"></div>

              <button
                onClick={handleSubmit}
                Ac
                className="bg-black hover:bg-gray-400 text-white py-3 w-full px-full px-[2rem] rounded-sm"
              >
                Submit
              </button>
              <div className="px-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
