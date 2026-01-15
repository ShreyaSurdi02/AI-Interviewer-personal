// export default async function fetchFunction({
//     crudMethod,apiUrl,postData,setError
// }){
//     try {
//         const response = await fetch(apiUrl,{
//             method : crudMethod,
//             headers : {
//                 "Content-Type" : "application/json"
//             },
//             ...((crudMethod === "POST" || crudMethod === "PUT") && {
//                 body : JSON.stringify(postData)
//             } )
//         });
//         const result = await response.json();
//         if(!response.ok) return setError(result);
//         return result;
//     } catch (error) {
//         setError(error.message);
//     }
// }
// TEMPORARY COMPANY LOGIN (MOCK)
export async function loginCompany(data) {
  console.log("Mock loginCompany called with:", data);

  // Simulate slow API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        token: "mock-company-token",
        company: {
          name: "Mock Company",
          email: data.email
        }
      });
    }, 1000);
  });
}

// TEMPORARY COMPANY SIGNUP (MOCK)
export async function registerCompany(data) {
  console.log("Mock registerCompany called with:", data);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Company registration mock success",
      });
    }, 1000);
  });
}
