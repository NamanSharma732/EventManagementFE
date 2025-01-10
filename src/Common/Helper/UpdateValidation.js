// checking is there any change in input field or not
// export const isDataChanged = (initialData, currentData) => {
//     return JSON.stringify(initialData) !== JSON.stringify(currentData);
//   };

// for team only
export const keyMapping = {
  teamCategory: "category",
  teamGender: "teamType",
  teamCountry: "country",
  teamName: "teamName",
  sortName: "shortName",
  imageURL: "flagURL",
};

const getRelevantFields = (data, keys,mapping) => {
    return keys.reduce((obj, key) => {
      const mappedKey = mapping[key] || key;
      if (data.hasOwnProperty(mappedKey)) {
        obj[key] = data[mappedKey];
      }
      return obj;
    }, {});
  };
  

export const isDataChanged = (initialData, currentData,keys, mapping) => {
    const relevantInitialData = getRelevantFields(initialData,keys,  mapping);
    const relevantCurrentData = getRelevantFields(currentData, keys, mapping);
    return JSON.stringify(relevantInitialData) !== JSON.stringify(relevantCurrentData);
  };
  
