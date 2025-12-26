import jwtDecode from "jwt-decode";

// Check if token expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const now = Date.now() / 1000; // seconds
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};

// Remove tokens
export const clearAuthTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
