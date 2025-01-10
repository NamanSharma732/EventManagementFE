import API from "../API";
export const convertDateFormat = (
  inputDateString: string,
  inputFormat: string
): string => {
  const dateObject = new Date(inputDateString);
  if (inputFormat.toUpperCase() === "ISO") {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return dateObject.toLocaleDateString("en-US", options);
  }
  return dateObject.toDateString();
};
export const formatDate = (dateString: string) => {
  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", 
  };

  const date = new Date(dateString);
  return date
    .toLocaleString("en-US", options)
    .replace(/(\d+)\/(\d+)\/(\d+),?/, "$3-$1-$2");
};

export const createUser = (payload: any): Promise<any> => {
  return API.post(`/auth/createUser`, { ...payload, active: "true" });
};

export const getEvents = async (filters = {}) => {
  try {
    const response = await API.post('/events/getEvents', filters);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTasks = async (filters = {}) => {
  try {
     const response = await API.post('/task/getTasks', filters);
     return response;
  } catch (error) {
     throw error;
  }
};
export const getAttendees = async (filters = {}) => {
  try {
    const response = await API.post('/attendee/getAttendees', filters);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getNonEventAttendees = async (filters = {}) => {
  try {
    const response = await API.post('/attendee/getNonEventAttendees', filters);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createEvent = (payload: any): Promise<any> => {
  return API.post(`/events/createEvent`, { ...payload });
};
export const deleteEvent = (id: string): Promise<any> => {
  return API.delete(`/events/deleteEvent/${id}`);
};
export const removeAttendee = (id: string, eventIds: string[]): Promise<any> => {
  return API.post(`/attendee/removeAttendee/${id}`,  { eventIds } );
};

export const createTask = (payload: any): Promise<any> => {
  return API.post(`/task/createTask`, { ...payload });
};

export const addAttendeeToEvent = (payload: any): Promise<any> => {
  return API.post(`/attendee/addAttendeeToEvent`, { ...payload });
};

export const getAccountAlerts = (payload: any): Promise<any> => {
  return API.get(`/account-alert`, { ...payload });
};


export const updateEvent = (
  id: string , payload: any): Promise<any> => {
  return API.put(`/events/updateEvent/${id}`, payload);
};

export const updateTaskStatus=(
  id: string , payload: any): Promise<any> => {
  return API.put(`/task/updateTaskStatus/${id}`, payload);
};

