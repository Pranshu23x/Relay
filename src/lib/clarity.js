/**
 * Utility to interact with Microsoft Clarity via the window object
 */
export const clarity = {
  /**
   * Track a custom event
   * @param {string} eventName - Name of the event
   */
  event: (eventName) => {
    if (window.clarity) {
      window.clarity("event", eventName);
    }
  },

  /**
   * Set a custom tag
   * @param {string} key - Tag key
   * @param {string} value - Tag value
   */
  setTag: (key, value) => {
    if (window.clarity) {
      window.clarity("set", key, value);
    }
  },

  /**
   * Identify a user
   */
  identify: (customId, customSessionId, customPageId, friendlyName) => {
    if (window.clarity) {
      window.clarity("identify", customId, customSessionId, customPageId, friendlyName);
    }
  }
};

export default clarity;
