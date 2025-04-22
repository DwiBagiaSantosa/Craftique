import customAPI from "../api"

export const updateProfile = async (userId, userData) => {
    // console.log("Calling updateProfile with:", userId, userData);
    const res = await customAPI.put(`auth/user/${userId}/update`, userData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    console.log("Update response:", res.data);
    return res.data
}

export const getCurrentUser = async () => customAPI.get('/auth/getuser').then((res) => res.data)