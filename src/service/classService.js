import axios from "axios";

export async function getClassDetails(courseId, deptId, classId) {
  
  try {
    let res = await axios({
      url: `/course/${courseId}/${deptId}/${classId}`,
      method: "get",
      timeout: 8000,
    });
    if (res.status === 200) {
      console.log(res.status);
    }
    return res.data;
  } catch (err) {
     return err
  }
}


export async function getClassStudents(courseId, deptId, classId) {
  
  try {
    let res = await axios({
      url: `/course/${courseId}/${deptId}/${classId}/students`,
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
