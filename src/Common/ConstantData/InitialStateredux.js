const initialState = {
    data: [],
    message: "",
    upcomingstatus: "",
    error: "",
    status: "idle", // initial status is "idle" for when there is no api calls
    updateStatus: "idle",// initial status is "idle" for when there is no api calls
    deleteStatus: "idle",// initial status is "idle" for when there is no api calls
    createStatus: "idle",// initial status is "idle" for when there is no api calls
  };
  
  export default initialState;