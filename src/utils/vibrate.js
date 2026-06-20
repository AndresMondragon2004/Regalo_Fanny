export const vibrate = (pattern) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(pattern);
    } catch (e) {
      // Ignore vibration errors on unsupported devices
    }
  }
};

export const heartBeatVibrate = () => vibrate([100, 100, 100]);
export const successVibrate = () => vibrate([200, 100, 200, 100, 500]);
export const softVibrate = () => vibrate(15);
