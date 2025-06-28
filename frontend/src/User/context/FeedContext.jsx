import { createContext, useContext, useState } from "react";
const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [showMessageList, setShowMessageList] = useState(false);

    return (
        <FeedContext.Provider value={{ showMessageList, setShowMessageList }}>
            {children}
        </FeedContext.Provider>
    );
};

export const useFeedContext = () => useContext(FeedContext);