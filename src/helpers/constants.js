


export const BASE_URL = "http://206.189.91.54/api/v1"


export const customStyles = {
    container: (defaultStyles) => ({
        ...defaultStyles,
        width: "100%",
    }),

    option: (defaultStyles, state) => ({
      // You can log the defaultStyles and state for inspection
      // You don't need to spread the defaultStyles
      ...defaultStyles,
      color: state.isSelected ? "#E8E9EB" : "#011638",
      backgroundColor: state.isSelected ? "#011638" : "#E8E9EB",
      width: "100%",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      // Notice how these are all CSS properties
      backgroundColor: "#E8E9EB",
      padding: "0.5em 0.5em",
      border: "none",
      boxShadow: "none",
      width: "100%",
    }),
    // multiValue: (defaultStyles) => ({ ...defaultStyles, 
    //                                     color: "#011638", 
    //                                     backgroundColor: "#E8E9EB",
    //                                     width: "100%",   
    //                                 }),

    multiValue: (styles) => {
                                        return {
                                          ...styles,
                                          backgroundColor: "#011638",
                                        };
                                      },
                                      multiValueLabel: (styles) => ({
                                        ...styles,
                                        color: "#E8E9EB",
                                      }),
                                      multiValueRemove: (styles) => ({
                                        ...styles,
                                        color: "#E8E9EB",
                                        ':hover': {
                                          backgroundColor: "#ECA400",
                                          color: 'white',
                                        },
                                      }),
  };