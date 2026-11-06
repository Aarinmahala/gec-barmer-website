import React, { createContext, useContext } from 'react';
import DefaultImageLinks from './ImageLinks';

// Create the image link context
const ImageLinkContext = createContext();

// Image links provider that always uses the static DefaultImageLinks
export const ImageLinkProvider = ({ children }) => {
  // Always use the DefaultImageLinks - no state or localStorage
  const imageLinks = DefaultImageLinks;
  const isLoading = false;
  
  // These functions are now disabled (they would just return the original DefaultImageLinks)
  const updateImageLink = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  const addImageToArray = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  const addImageToObject = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  const removeImage = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  const addCategory = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  const resetToDefaults = () => {
    console.warn('Image management through admin panel is disabled. Edit ImageLinks.js directly.');
  };
  
  return (
    <ImageLinkContext.Provider 
      value={{ 
        imageLinks, 
        isLoading,
        updateImageLink, 
        addImageToArray, 
        addImageToObject, 
        removeImage,
        addCategory,
        resetToDefaults
      }}
    >
      {children}
    </ImageLinkContext.Provider>
  );
};

// Custom hook for using image link context
export const useImageLinks = () => {
  return useContext(ImageLinkContext);
}; 