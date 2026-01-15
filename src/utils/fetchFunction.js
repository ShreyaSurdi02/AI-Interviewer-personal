// src/utils/fetchFunction.js
import { REFRESH_TOKEN_URL } from "./constants";

export default async function fetchFunction({
  crudMethod,
  apiUrl,
  postData,
  setError,
}) {
  try {
<<<<<<< HEAD
    // 1️⃣ Get tokens from localStorage
    let accessToken = localStorage.getItem("aiInterviewerAccessToken");
    let refreshToken = localStorage.getItem("aiInterviewerRefreshToken");

    // 2️⃣ Prepare headers to include tokens
=======
    // Get tokens from localStorage
    let accessToken = localStorage.getItem("aiInterviewerAccessToken");
    let refreshToken = localStorage.getItem("aiInterviewerRefreshToken");

    // Prepare headers to include tokens
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
    const headers = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      headers["refresh-token"] = refreshToken;
    }

<<<<<<< HEAD
    // 3️⃣ First API call attempt
=======
    // First API call attempt
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
    let response = await fetch(apiUrl, {
      method: crudMethod,
      headers,
      ...(crudMethod === "POST" || crudMethod === "PUT"
        ? { body: JSON.stringify(postData) }
        : {}),
    });

<<<<<<< HEAD
    // 4️⃣ If success → return normally
=======
    // If success → return normally
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
    if (response.status !== 401) {
      const result = await response.json();
      if (!response.ok) {
        setError?.(result?.message || "Something went wrong");
      }
      return result;
    }

<<<<<<< HEAD
    // 5️⃣ If 401 → token expired → refresh it
    console.warn("🔁 Access token expired → Refreshing token...");
=======
    // If 401 → token expired → refresh it
    console.warn("Access token expired → Refreshing token...");
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052

    const refreshResponse = await fetch(REFRESH_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "refresh-token": refreshToken,
      },
    });

    const refreshResult = await refreshResponse.json();

<<<<<<< HEAD
    // 6️⃣ If refresh failed → logout user
    if (!refreshResponse.ok || refreshResult?.status !== "success") {
      console.error("❌ Refresh token failed!");
=======
    // If refresh failed → logout user
    if (!refreshResponse.ok || refreshResult?.status !== "success") {
      console.error("Refresh token failed!");
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

<<<<<<< HEAD
    // 7️⃣ Save new access token (handle both shapes)
=======
    // Save new access token (handle both shapes)
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
    const newAccessToken =
      refreshResult.accessToken || refreshResult.tokens?.accessToken;

    if (!newAccessToken) {
<<<<<<< HEAD
      console.error("❌ No access token in refresh response");
=======
      console.error("No access token in refresh response");
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    localStorage.setItem("aiInterviewerAccessToken", newAccessToken);
    accessToken = newAccessToken;

<<<<<<< HEAD
    // 8️⃣ Retry original API request with new token
=======
    // Retry original API request with new token
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
    const retryHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "refresh-token": refreshToken,
    };

    const retryResponse = await fetch(apiUrl, {
      method: crudMethod,
      headers: retryHeaders,
      ...(crudMethod === "POST" || crudMethod === "PUT"
        ? { body: JSON.stringify(postData) }
        : {}),
    });

    const retryResult = await retryResponse.json();

    if (!retryResponse.ok) {
      setError?.(retryResult?.message || "Something went wrong");
    }

    return retryResult;
  } catch (error) {
    console.error("Fetch Error:", error);
    setError?.(error.message);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> d1b0fd5d76d2ce9bc481b440221a66d26f4cc052
