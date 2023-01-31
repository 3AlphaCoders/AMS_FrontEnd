import axios from "axios";

export async function getDepartmentTeachers(courseId, deptId) {
  
  try {
    let res = await axios({
      url: `/course/${courseId}/${deptId}/teachers`,
      method: "get",
      timeout: 8000,
    });
    // if (res.status === 200) {
    //   console.log(res.status);
    // }
    return res.data;
  } catch (err) {
     return err
  }
}
